import { Icon } from '@iconify/react'
import { BriefcaseIcon, AcademicCapIcon, GlobeAltIcon, CodeBracketIcon, SparklesIcon, HeartIcon } from '@heroicons/react/24/solid'

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
            <li>APIs REST con Node.js, Python y TypeScript</li>
            <li>Diseño y modelado SQL y NoSQL</li>
            <li>Interfaces modernas con React y Next.js</li>
            <li>Metodologías Agile (Scrum, Kanban)</li>
            <li>Git avanzado, PR reviews y pair programming</li>
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
            <li>Ciclo completo de desarrollo de software</li>
            <li>Metodologías ágiles e ingeniería de software</li>
            <li>Bases de datos relacionales y NoSQL</li>
            <li>Seguridad en aplicaciones web</li>
            <li>Proyectos capstone con clientes reales</li>
          </ul>
        </article>

        <article className="about-card">
          <div className="about-card__icon-wrapper">
            <HeartIcon className="card-icon" />
          </div>
          <h3>Valores y Enfoque</h3>
          <ul className="about-list">
            <li>✓ Calidad de código y testing</li>
            <li>✓ Comunicación clara y documentación</li>
            <li>✓ Mentalidad de aprendizaje continuo</li>
            <li>✓ Responsabilidad y profesionalismo</li>
            <li>✓ Pasión por resolver problemas</li>
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
