import { useState, useEffect, useRef } from 'react'
import { SparklesIcon, CheckCircleIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
import { Icon } from '@iconify/react'
import { getSimulatedResponse, getGeminiResponse } from '../data/aiBrain'
import type { ChatMessage } from '../data/aiBrain'

// Roles list for the compatibility matchmaker
interface RoleProfile {
  id: string
  name: string
  icon: string
  score: number
  skills: string[]
  reasons: string[]
  recommendedProjects: { title: string; repo?: string; demo?: string }[]
}

const ROLE_PROFILES: RoleProfile[] = [
  {
    id: 'frontend',
    name: 'Frontend Developer (React)',
    icon: 'mdi:react',
    score: 98,
    skills: ['React Hooks avanzados', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5/CSS3'],
    reasons: [
      'Dominio de hooks avanzados, enrutamiento con React Router y gestión de estados fluidos.',
      'Amplia experiencia maquetando interfaces modernas, accesibles, adaptables y responsivas.',
      'Sólido conocimiento en TypeScript para desarrollo seguro y arquitectura escalable.',
    ],
    recommendedProjects: [
      { title: 'Proyecto TeoSoft', repo: 'https://github.com/Andreacetre/Proyecto-TeoSoft.git' },
      { title: 'Reto Angular (GitHub Search)', repo: 'https://github.com/DarioSC00/RetoVideoTutorial.git' }
    ]
  },
  {
    id: 'backend',
    name: 'Backend Developer (Node / Python)',
    icon: 'mdi:server-network',
    score: 96,
    skills: ['Node.js (Express)', 'FastAPI & Python', 'Bases de Datos SQL & NoSQL', 'Docker', 'Seguridad JWT/RBAC'],
    reasons: [
      'Experiencia real en Lynxus (EPAM) diseñando y consumiendo APIs RESTful altamente seguras.',
      'Modelado avanzado y optimización de consultas en PostgreSQL, MySQL y esquemas MongoDB.',
      'Familiaridad con Docker para contenerización de entornos de desarrollo y despliegues.',
    ],
    recommendedProjects: [
      { title: 'API RESTful Empresarial', repo: 'https://github.com/DarioSC00/express-enterprise-api', demo: 'https://basededatosrepuestossalazar-1.onrender.com' }
    ]
  },
  {
    id: 'mobile',
    name: 'Mobile Developer (Flutter)',
    icon: 'mdi:cellphone-link',
    score: 94,
    skills: ['Flutter & Dart', 'Consumo de APIs', 'Bases de datos locales', 'Interfaces Fluidas', 'Responsive Mobile'],
    reasons: [
      'Capacidad para crear experiencias multiplataforma fluidas para iOS y Android.',
      'Consumo eficiente de microservicios, mapeo de datos y persistencia en bases de datos.',
      'Desarrollo de módulos integrados a sistemas administrativos mayores (como en Repuestos Salazar).',
    ],
    recommendedProjects: [
      { title: 'Repuestos Salazar (Web/Mobile)', repo: 'https://github.com/DarioSC00/RepuestosSalazar.git' }
    ]
  },
  {
    id: 'fullstack',
    name: 'Full-Stack Developer (Generalist)',
    icon: 'mdi:code-braces-box',
    score: 97,
    skills: ['React / TS', 'Node.js / Express', 'FastAPI & Python', 'Flutter (Móvil)', 'Bases de Datos & Docker', 'Scrum / Git'],
    reasons: [
      'Habilidad excepcional para conectar arquitecturas backend robustas con interfaces dinámicas.',
      'Práctica profesional (Lynxus/EPAM) y formación técnica del SENA avalan su polivalencia.',
      'Mentalidad de producto enfocada en resolver problemas reales de extremo a extremo.',
    ],
    recommendedProjects: [
      { title: 'Repuestos Salazar', repo: 'https://github.com/DarioSC00/RepuestosSalazar.git' },
      { title: 'Proyecto TeoSoft', repo: 'https://github.com/Andreacetre/Proyecto-TeoSoft.git' },
      { title: 'Tablero de Trabajo', repo: 'https://github.com/DarioSC00/PruebaTecnicaLynxus.git' }
    ]
  }
]

const SUGGESTED_CHIPS = [
  '¿Cuáles son las mayores fortalezas de Darío?',
  'Háblame de su experiencia laboral en Lynxus (EPAM)',
  '¿Está disponible para contratación inmediata?',
  '¿Qué proyectos destacados tiene en su portafolio?'
]

export default function AiAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputVal, setInputVal] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Compatibility Matchmaker states
  const [selectedRoleId, setSelectedRoleId] = useState<string>('fullstack')
  const [isCalculating, setIsCalculating] = useState(false)
  const [activeRole, setActiveRole] = useState<RoleProfile | null>(null)

  // Gemini API Key config states
  const [showConfig, setShowConfig] = useState(false)
  const [apiKey, setApiKey] = useState('')

  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Initialize and load theme/credentials
  useEffect(() => {
    // Initial welcome message
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: '¡Hola! 👋 Soy el **Copiloto de IA de Rubén Darío**.\n\nEstoy entrenado para responder cualquier pregunta técnica o profesional sobre su perfil, estudios (SENA), práctica laboral (EPAM/Lynxus), proyectos y disponibilidad.\n\nPrueba haciendo clic en una de las preguntas sugeridas o escribe tu propia consulta en el chat. 🚀',
        timestamp: new Date()
      }
    ])

    // Load saved API Key if any
    const savedKey = localStorage.getItem('dario_gemini_api_key')
    if (savedKey) {
      setApiKey(savedKey)
    }

    // Set default active role matching Full-Stack
    const defaultRole = ROLE_PROFILES.find(r => r.id === 'fullstack') || null
    setActiveRole(defaultRole)
  }, [])

  // Auto-scroll chat container to bottom smoothly
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages, isTyping])

  // Handle compatibility selection with temporary calculating state for aesthetic impact
  function handleRoleSelect(id: string) {
    if (id === selectedRoleId) return
    setSelectedRoleId(id)
    setIsCalculating(true)

    setTimeout(() => {
      const role = ROLE_PROFILES.find(r => r.id === id) || null
      setActiveRole(role)
      setIsCalculating(false)
    }, 650)
  }

  // Handle message submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!inputVal.trim()) return

    const userText = inputVal.trim()
    setInputVal('')
    await processUserMessage(userText)
  }

  // Process chip click
  async function handleChipClick(chipText: string) {
    await processUserMessage(chipText)
  }

  // Common messaging pipeline
  async function processUserMessage(text: string) {
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)

    // A small dynamic thinking delay for realistic pacing (300ms to 700ms)
    await new Promise(resolve => setTimeout(resolve, 500))

    let replyText = ''
    if (apiKey.trim()) {
      // Use real Gemini API
      replyText = await getGeminiResponse(apiKey.trim(), text, messages)
    } else {
      // Use local simulator
      replyText = getSimulatedResponse(text)
    }

    const assistantMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'assistant',
      text: replyText,
      timestamp: new Date(),
      isSimulated: !apiKey.trim()
    }

    setMessages(prev => [...prev, assistantMsg])
    setIsTyping(false)
  }

  // Save API Key locally
  function saveApiKey() {
    localStorage.setItem('dario_gemini_api_key', apiKey.trim())
    alert('Clave guardada localmente de manera segura en tu navegador.')
  }

  // Clear API Key
  function clearApiKey() {
    localStorage.removeItem('dario_gemini_api_key')
    setApiKey('')
    alert('Clave eliminada. El asistente volverá al modo simulación local.')
  }

  // Lightweight HTML-safe parser for basic Markdown syntax
  const formatMessageText = (text: string) => {
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>')
    formatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="chat-link inline-flex items-center gap-1">$1 <span class="chat-link-icon">↗</span></a>')

    return formatted.split('\n').map((line, i) => (
      <span key={i} className="chat-text-line">
        <span dangerouslySetInnerHTML={{ __html: line }} />
        {i < formatted.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  return (
    <section className="ai-assistant-page">
      <div className="section-intro">
        <div className="ai-header-badge animate-pulse">
          <SparklesIcon className="ai-header-icon" />
          <span>Copiloto de Reclutamiento IA</span>
        </div>
        <h2>Evalúa el perfil de Rubén Darío en segundos</h2>
        <p>
          Interactúa con un asistente inteligente entrenado sobre la hoja de vida,
          experiencia y proyectos de Darío, o calcula su nivel de afinidad con la vacante de tu empresa.
        </p>
      </div>

      <div className="ai-grid-container">
        {/* Left Side: Matchmaker */}
        <div className="ai-panel ai-matchmaker">
          <div className="panel-header">
            <Icon icon="mdi:robot-confused-outline" className="panel-header-icon" />
            <div>
              <h3>AI Compatibility Matchmaker</h3>
              <p className="panel-subtitle">Calcula la afinidad técnica para tu cargo</p>
            </div>
          </div>

          <div className="role-selector-grid">
            {ROLE_PROFILES.map((role) => (
              <button
                key={role.id}
                type="button"
                className={`role-select-card ${selectedRoleId === role.id ? 'active' : ''}`}
                onClick={() => handleRoleSelect(role.id)}
              >
                <Icon icon={role.icon} className="role-card-icon-preview" />
                <span>{role.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          <div className="compatibility-results-container">
            {isCalculating ? (
              <div className="calculating-glow">
                <span className="pulse-indicator"></span>
                <p>Analizando compatibilidad con el motor de IA...</p>
              </div>
            ) : (
              activeRole && (
                <div className="role-analysis">
                  <div className="role-analysis-header">
                    <h4>{activeRole.name}</h4>
                    <div className="compatibility-gauge">
                      <div className="gauge-value">{activeRole.score}%</div>
                      <span className="gauge-label">Afinidad</span>
                    </div>
                  </div>

                  <div className="progress-bar-container">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${activeRole.score}%` }}
                    />
                  </div>

                  <div className="analysis-section">
                    <h5>🛠️ Habilidades Clave Evaluadas:</h5>
                    <div className="skills-tags-wrap">
                      {activeRole.skills.map((skill) => (
                        <span key={skill} className="skill-analysis-badge">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="analysis-section">
                    <h5>✨ ¿Por qué Rubén Darío encaja?:</h5>
                    <ul className="reasons-list">
                      {activeRole.reasons.map((reason, idx) => (
                        <li key={idx}>
                          <CheckCircleIcon className="reason-check-icon" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="analysis-section recommended-box">
                    <h5>📂 Proyectos Recomendados para Evaluar:</h5>
                    <div className="rec-projects-list">
                      {activeRole.recommendedProjects.map((p) => (
                        <div key={p.title} className="rec-project-item">
                          <span><strong>{p.title}</strong></span>
                          <div className="rec-project-links">
                            {p.repo && (
                              <a href={p.repo} target="_blank" rel="noreferrer" title="Ver código en GitHub">
                                <Icon icon="mdi:github" /> Código
                              </a>
                            )}
                            {p.demo && (
                              <a href={p.demo} target="_blank" rel="noreferrer" title="Ver Demo en Render">
                                <Icon icon="mdi:open-in-new" /> Demo
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Right Side: Chatbot */}
        <div className="ai-panel ai-chatbot-panel">
          <div className="panel-header chat-header-extra">
            <div className="avatar-wrap">
              <span className="avatar-pulse"></span>
              <Icon icon="mdi:android" className="avatar-icon" />
            </div>
            <div>
              <div className="chat-title-row">
                <h3>Darío-AI Copilot</h3>
                {!apiKey.trim() ? (
                  <span className="brain-mode-chip local">Simulador Local</span>
                ) : (
                  <span className="brain-mode-chip gemini">Gemini En Vivo</span>
                )}
              </div>
              <p className="panel-subtitle">Resolviendo tus dudas técnicas en tiempo real</p>
            </div>
          </div>

          <div ref={chatContainerRef} className="chat-conversation-log">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-bubble-row ${msg.sender}`}>
                <div className="chat-bubble">
                  <div className="chat-bubble-content">
                    {formatMessageText(msg.text)}
                  </div>
                  <div className="chat-bubble-footer">
                    <span>
                      {msg.sender === 'user' ? 'Tú' : 'Dario Copilot'}
                      {msg.isSimulated && ' · Simulador'}
                    </span>
                    <span>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-bubble-row assistant">
                <div className="chat-bubble typing-bubble">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="chat-suggestions-chips">
            {SUGGESTED_CHIPS.map((chipText) => (
              <button
                key={chipText}
                type="button"
                className="suggestion-chip"
                onClick={() => handleChipClick(chipText)}
                disabled={isTyping}
              >
                {chipText}
              </button>
            ))}
          </div>

          <form className="chat-input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Pregúntame sobre sus estudios, tecnologías o prácticas..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={isTyping}
              maxLength={250}
              required
            />
            <button type="submit" disabled={isTyping} className="chat-send-btn" title="Enviar mensaje">
              <Icon icon="mdi:send" className="send-icon" />
            </button>
          </form>

          {/* Gemini API Key configuration panel */}
          <div className="gemini-config-drawer">
            <button
              type="button"
              className="drawer-toggle"
              onClick={() => setShowConfig(!showConfig)}
            >
              <Icon icon="mdi:cog" className="drawer-icon" />
              <span>{showConfig ? 'Ocultar Panel de Configuración IA' : 'Configurar Gemini Real (Opcional)'}</span>
            </button>

            {showConfig && (
              <div className="drawer-body">
                <p>
                  Por seguridad, tu API Key se guarda únicamente de forma local en tu propio navegador (`localStorage`).
                  Al conectarla, el chat se conectará en vivo con la inteligencia artificial real de Google (`gemini-2.5-flash`).
                </p>
                <div className="api-key-input-row">
                  <input
                    type="password"
                    placeholder="Pega tu Gemini API Key aquí..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <div className="api-actions">
                    <button type="button" onClick={saveApiKey} className="btn-save-key">
                      Guardar
                    </button>
                    {localStorage.getItem('dario_gemini_api_key') && (
                      <button type="button" onClick={clearApiKey} className="btn-clear-key">
                        Desconectar
                      </button>
                    )}
                  </div>
                </div>
                <div className="drawer-instructions">
                  <span>¿No tienes una? Consíguela gratis en </span>
                  <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer">
                    Google AI Studio <ArrowTopRightOnSquareIcon className="link-ext-icon" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
