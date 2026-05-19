import { Icon } from '@iconify/react'
import { BriefcaseIcon, AcademicCapIcon, GlobeAltIcon, HeartIcon } from '@heroicons/react/24/solid'

const achievements = [
  { icon: 'mdi:cellphone-link', label: 'Flutter (Móvil)' },
  { icon: 'mdi:code-braces', label: 'APIs RESTful' },
  { icon: 'mdi:database-cog', label: 'Optimización de Bases de Datos' },
  { icon: 'mdi:docker', label: 'Docker' },
  { icon: 'mdi:lightning-bolt', label: 'FastAPI & Node.js' },
  { icon: 'mdi:react', label: 'React / Next.js' },
]

export default function About() {
  return (
    <section className="about-page">
      <div className="section-intro">
        <span className="eyebrow">Sobre mí</span>
        <h2>Desarrollador Full-Stack Junior especializado en Web y Móvil</h2>
        <p>
          Especialista en la arquitectura de APIs RESTful, diseño y optimización de bases de datos y despliegue de soluciones escalables.
          Experto en el desarrollo de interfaces dinámicas con React (Hooks) y aplicaciones multiplataforma con Flutter/Dart.
          Dominio de múltiples lenguajes y frameworks, orientado a la calidad del software, contenedores con Docker y metodologías ágiles.
        </p>
      </div>

      <div className="about-grid">
        <article className="about-card">
          <div className="about-card__icon-wrapper">
            <BriefcaseIcon className="card-icon" />
          </div>
          <h3>Experiencia Profesional</h3>
          <div className="about-card__meta">
            <span className="about-card__company">Junior Software Developer (Intern – Data)</span>
            <span className="about-card__company-sub">Lynxus Solutions S.A.S. (EPAM)</span>
            <span className="about-card__date">Oct 2025 – Abr 2026</span>
          </div>
          <ul className="about-list">
            <li>
              <span className="about-list-bullet">✓</span>
              <span><strong>Desarrollo Backend:</strong> Creación, implementación y consumo de APIs REST robustas utilizando Node.js, FastAPI, TypeScript, Python, HTML5 y Docker.</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span><strong>Gestión de Datos:</strong> Modelado, administración y optimización avanzada de bases de datos relacionales (SQL, MySQL) y NoSQL (MongoDB).</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span><strong>Desarrollo Frontend:</strong> Creación de interfaces web modernas y fluidas con React y Next.js (Hooks avanzados).</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span><strong>Metodologías Ágiles:</strong> Trabajo activo en equipos bajo Scrum, y control de versiones con Git, GitHub y GitLab.</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span><strong>Idiomas:</strong> Comunicación técnica y documentación con nivel de inglés B1.</span>
            </li>
          </ul>
        </article>

        <article className="about-card">
          <div className="about-card__icon-wrapper">
            <AcademicCapIcon className="card-icon" />
          </div>
          <h3>Formación Académica</h3>
          <div className="about-card__meta">
            <span className="about-card__company">Tecnología en Análisis y Desarrollo de Software</span>
            <span className="about-card__company-sub">SENA (Servicio Nacional de Aprendizaje)</span>
            <span className="about-card__date">2023 – 2026</span>
          </div>
          <ul className="about-list">
            <li>
              <span className="about-list-bullet">✓</span>
              <span><strong>Ciclo Completo:</strong> Metodologías y fases del ciclo de vida completo de aplicaciones de software.</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span><strong>Ingeniería de Software:</strong> Modelado de requisitos, patrones de diseño y buenas prácticas.</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span><strong>Bases de Datos:</strong> Diseño relacional, normalización, optimización de consultas y almacenamiento NoSQL.</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span><strong>Desarrollo de Software:</strong> Construcción de proyectos web, móviles y empresariales.</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span><strong>Calidad:</strong> Pruebas unitarias, aseguramiento de la calidad del software e implantación.</span>
            </li>
          </ul>
        </article>

        <article className="about-card">
          <div className="about-card__icon-wrapper">
            <HeartIcon className="card-icon" />
          </div>
          <h3>Valores y Enfoque</h3>
          <ul className="about-list">
            <li>
              <span className="about-list-bullet">✓</span>
              <span><strong>Versatilidad Técnica:</strong> Agilidad para trabajar en frontend, backend y móvil asegurando consistencia.</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span><strong>Mentalidad de Producto:</strong> Foco en crear soluciones escalables que generen valor real para el usuario final.</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span><strong>Adaptabilidad y Aprendizaje:</strong> Adopción inmediata de nuevas tecnologías y resolución de problemas complejos.</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span><strong>Buenas Prácticas:</strong> Código limpio, modular, optimización de rendimiento y documentación exhaustiva.</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span><strong>Colaboración Eficiente:</strong> Comunicación transparente y asertiva en entornos ágiles multidisciplinarios.</span>
            </li>
          </ul>
        </article>

        <article className="about-card">
          <div className="about-card__icon-wrapper">
            <GlobeAltIcon className="card-icon" />
          </div>
          <h3>Conecta conmigo</h3>
          <p className="about-card__intro">Disponible en todas las plataformas para colaborar:</p>
          <div className="social-block">
            <a href="https://github.com/DarioSC00" target="_blank" rel="noreferrer" className="social-link">
              <Icon icon="akar-icons:github-fill" /> GitHub
            </a>
            <a href="https://linkedin.com/in/rubén-dario-salazar-cuero-39867125a/" target="_blank" rel="noreferrer" className="social-link">
              <Icon icon="akar-icons:linkedin-box-fill" /> LinkedIn
            </a>
            <a href="mailto:rubendario50cent@gmail.com" className="social-link">
              <Icon icon="mdi:email" /> Email
            </a>
          </div>
        </article>
      </div>

      <div className="about-achievements">
        <h3>Stack Técnico</h3>
        <div className="achievements-grid">
          {achievements.map((a) => (
            <div key={a.label} className="achievement-badge">
              <Icon icon={a.icon} className="achievement-icon" />
              <span>{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
