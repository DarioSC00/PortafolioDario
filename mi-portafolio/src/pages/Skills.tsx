import { Icon } from '@iconify/react'
import { CodeBracketSquareIcon, CloudArrowUpIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/solid'

const skillSections = [
  {
    title: 'Lenguajes de Programación',
    icon: CodeBracketSquareIcon,
    items: ['TypeScript & JavaScript', 'Python', 'Dart (Flutter)', 'Java', 'C#', 'PHP'],
  },
  {
    title: 'Frameworks & Librerías',
    icon: CloudArrowUpIcon,
    items: ['React (Hooks avanzados)', 'Next.js', 'Node.js & FastAPI', 'Flutter (Multiplataforma)', 'Laravel & .NET', 'Angular'],
  },
  {
    title: 'Bases de Datos & Backend',
    icon: ShieldCheckIcon,
    items: ['SQL (MySQL, PostgreSQL)', 'NoSQL (MongoDB)', 'Modelado de Bases de Datos', 'Administración y Optimización', 'Arquitectura de APIs RESTful'],
  },
  {
    title: 'Herramientas & DevOps',
    icon: SparklesIcon,
    items: ['Docker (Contenedores)', 'Git, GitHub & GitLab', 'Vercel, Render & Postgres', 'Postman', 'Metodologías Ágiles (Scrum)', 'Nivel de Inglés B1'],
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

      <div className="about-grid">
        {skillSections.map((section) => {
          const IconComponent = section.icon
          return (
            <article key={section.title} className="about-card">
              <div className="about-card__icon-wrapper">
                <IconComponent className="card-icon" />
              </div>
              <h3>{section.title}</h3>
              <ul className="about-list">
                {section.items.map((item) => (
                  <li key={item}>
                    <span className="about-list-bullet">✓</span>
                    <span>{item}</span>
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

