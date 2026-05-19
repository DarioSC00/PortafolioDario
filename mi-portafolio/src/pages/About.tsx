import { Icon } from '@iconify/react'
import { BriefcaseIcon, AcademicCapIcon, GlobeAltIcon } from '@heroicons/react/24/solid'

export default function About() {
  return (
    <section className="about-page">
      <div className="section-intro">
        <span className="eyebrow">Perfil profesional</span>
        <h2>Full-Stack Junior con visión de producto y buenas prácticas.</h2>
        <p>
          Desarrollador de software con experiencia en el ciclo completo de aplicaciones web
          y móviles. Me especializo en APIs REST, diseño de bases de datos y experiencia de usuario.
        </p>
      </div>

      <div className="about-grid">
        <article className="about-card">
          <BriefcaseIcon className="card-icon" />
          <h3>Experiencia</h3>
          <p>Lynxus Solutions S.A.S. (EPAM) — Oct 2025 / Abr 2026</p>
          <ul>
            <li>APIs REST con Node.js, Python y TypeScript.</li>
            <li>Modelado de SQL y NoSQL.</li>
            <li>Interfaces modernas con React y Next.js.</li>
            <li>Metodologías Agile y control de versiones.</li>
          </ul>
        </article>

        <article className="about-card">
          <AcademicCapIcon className="card-icon" />
          <h3>Educación</h3>
          <p>Tecnología en Análisis y Desarrollo de Software — SENA</p>
          <p>2023 - 2026</p>
        </article>

        <article className="about-card">
          <GlobeAltIcon className="card-icon" />
          <h3>Idiomas</h3>
          <p>Español nativo · Inglés B1</p>
          <div className="social-block">
            <a href="https://github.com/DarioSC00" target="_blank" rel="noreferrer">
              <Icon icon="akar-icons:github-fill" /> GitHub
            </a>
            <a href="https://linkedin.com/in/rubén-dario-salazar-cuero-39867125a/" target="_blank" rel="noreferrer">
              <Icon icon="akar-icons:linkedin-box-fill" /> LinkedIn
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}
