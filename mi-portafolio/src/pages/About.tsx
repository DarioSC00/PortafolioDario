import { Icon } from '@iconify/react'
import { BriefcaseIcon, AcademicCapIcon, GlobeAltIcon, HeartIcon } from '@heroicons/react/24/solid'

const achievements = [
  { icon: 'mdi:code-braces', label: 'APIs REST' },
  { icon: 'mdi:react', label: 'React Hooks' },
  { icon: 'mdi:database', label: 'SQL/NoSQL' },
  { icon: 'mdi:docker', label: 'Docker' },
]

export default function About() {
  return (
    <section className="about-page">
      <div className="section-intro">
        <span className="eyebrow">Sobre mí</span>
        <h2>Full-Stack Junior enfocado en código limpio y arquitectura escalable.</h2>
        <p>
          Desarrollador de software con pasión por crear aplicaciones que resuelven problemas reales.
          Mi enfoque es en frontend moderno, APIs robustas, y despliegue confiable.
        </p>
      </div>

      <div className="about-grid">
        <article className="about-card">
          <div className="about-card__icon-wrapper">
            <BriefcaseIcon className="card-icon" />
          </div>
          <h3>Experiencia Profesional</h3>
          <div className="about-card__meta">
            <span className="about-card__company">Lynxus Solutions S.A.S. (EPAM)</span>
            <span className="about-card__date">Oct 2025 – Abr 2026</span>
          </div>
          <ul className="about-list">
            <li>
              <span className="about-list-bullet">✓</span>
              <span>APIs REST con Node.js, Python y TypeScript</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span>Diseño y modelado SQL y NoSQL</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span>Interfaces modernas con React y Next.js</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span>Metodologías Agile (Scrum, Kanban)</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span>Git avanzado, PR reviews y pair programming</span>
            </li>
          </ul>
        </article>

        <article className="about-card">
          <div className="about-card__icon-wrapper">
            <AcademicCapIcon className="card-icon" />
          </div>
          <h3>Formación Académica</h3>
          <div className="about-card__meta">
            <span className="about-card__company">Tecnólogo en Análisis y Desarrollo de Software</span>
            <span className="about-card__date">SENA · 2023 – 2026</span>
          </div>
          <ul className="about-list">
            <li>
              <span className="about-list-bullet">✓</span>
              <span>Ciclo completo de desarrollo de software</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span>Metodologías ágiles e ingeniería de software</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span>Bases de datos relacionales y NoSQL</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span>Seguridad en aplicaciones web</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span>Proyectos capstone con clientes reales</span>
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
              <span>Calidad de código y testing</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span>Comunicación clara y documentación</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span>Mentalidad de aprendizaje continuo</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span>Responsabilidad y profesionalismo</span>
            </li>
            <li>
              <span className="about-list-bullet">✓</span>
              <span>Pasión por resolver problemas</span>
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
