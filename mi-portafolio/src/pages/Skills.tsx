import { CheckBadgeIcon, CodeBracketSquareIcon, CloudArrowUpIcon, BoltIcon } from '@heroicons/react/24/solid'

const skillSections = [
  {
    title: 'Frontend',
    icon: CodeBracketSquareIcon,
    items: ['React', 'TypeScript', 'Vite', 'HTML5', 'CSS3', 'Responsive UI'],
  },
  {
    title: 'Backend',
    icon: CloudArrowUpIcon,
    items: ['Node.js', 'Express', 'FastAPI', 'REST APIs', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: 'Infra & DevOps',
    icon: CheckBadgeIcon,
    items: ['Docker', 'CI/CD', 'GitHub Actions', 'Vercel', 'Cloud deployment', 'Monitoring'],
  },
  {
    title: 'Product & UX',
    icon: BoltIcon,
    items: ['UX estructurado', 'Mobile-first', 'Performance', 'Accesibilidad', 'SEO básico', 'Feedback rápido'],
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
                  <p className="skill-card__hint">Conocimientos que integran cada proyecto.</p>
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
