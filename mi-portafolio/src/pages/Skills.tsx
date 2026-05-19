import { Icon } from '@iconify/react'
import { CodeBracketSquareIcon, CloudArrowUpIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/solid'

const skillSections = [
  {
    title: 'Frontend',
    icon: CodeBracketSquareIcon,
    items: ['React', 'TypeScript', 'Vite', 'HTML5', 'CSS3', 'Interfaces responsivas'],
  },
  {
    title: 'Backend',
    icon: CloudArrowUpIcon,
    items: ['Node.js', 'Express', 'FastAPI', 'REST APIs', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: 'Infra & DevOps',
    icon: ShieldCheckIcon,
    items: ['Docker', 'CI/CD', 'GitHub Actions', 'Vercel', 'Despliegue continuo', 'Monitoring'],
  },
  {
    title: 'Experiencia & Producto',
    icon: SparklesIcon,
    items: ['UX centrado en el usuario', 'Mobile-first', 'Accesibilidad', 'Performance', 'SEO básico', 'Feedback rápido'],
  },
]

const skillHighlights = [
  {
    icon: 'mdi:lightbulb-on-outline',
    title: 'Pensamiento estratégico',
    description: 'Transformo ideas en experiencias digitales claras y útiles.',
  },
  {
    icon: 'mdi:shield-check',
    title: 'Confianza técnica',
    description: 'Uso buenas prácticas para productos robustos y confiables.',
  },
  {
    icon: 'mdi:rocket-launch-outline',
    title: 'Entrega rápida',
    description: 'Despliego soluciones funcionales con velocidad y control.',
  },
]

export default function Skills() {
  return (
    <section className="skills-page">
      <div className="section-intro">
        <span className="eyebrow">Habilidades técnicas</span>
        <h2>Experiencia completa en producto, tecnología e infraestructura.</h2>
        <p>
          Construyo soluciones con un enfoque práctico: interfaces limpias, APIs robustas y despliegue confiable.
          Todo esto respaldado por buenas prácticas de código y rendimiento.
        </p>
      </div>

      <div className="skill-highlights">
        {skillHighlights.map((highlight) => (
          <article key={highlight.title} className="skill-highlight">
            <span className="skill-highlight__icon">
              <Icon icon={highlight.icon} />
            </span>
            <div>
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="skills-grid">
        {skillSections.map((section) => {
          const IconComponent = section.icon
          return (
            <article key={section.title} className="skill-card">
              <div className="skill-card__head">
                <div className="skill-card__icon-box">
                  <IconComponent className="card-icon" />
                </div>
                <div>
                  <h3>{section.title}</h3>
                  <p className="skill-card__hint">Capacidades que impulsan cada fase del proyecto.</p>
                </div>
              </div>
              <ul className="skill-list">
                {section.items.map((item) => (
                  <li key={item}>
                    <span className="skill-bullet">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
    </section>
  )
}
