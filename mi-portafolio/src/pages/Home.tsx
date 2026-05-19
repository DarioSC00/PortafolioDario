import { Icon } from '@iconify/react'
import { SparklesIcon, ArrowRightIcon, CheckCircleIcon, RocketLaunchIcon, CodeBracketIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="home-page">
      <div className="hero-panel">
        <div className="hero-copy">
          <div className="hero-badge">
            <SparklesIcon className="hero-badge-icon" />
            Desarrollador Full-Stack Junior
          </div>
          <h2>Construyo interfaces dinámicas y APIs robustas que escalan.</h2>
          <p>
            Soy Rubén Darío, desarrollador Full-Stack Junior apasionado por crear soluciones web y móviles de alta calidad.
            Especializado en interfaces reactivas con React, aplicaciones multiplataforma con Flutter/Dart y arquitecturas escalables con Node.js y FastAPI.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to="/contact">
              Iniciemos juntos
              <ArrowRightIcon className="button-icon" />
            </Link>
            <Link className="secondary-button" to="/projects">
              Explora mi trabajo
            </Link>
          </div>
          <div className="hero-tags">
            <span>
              <CheckCircleIcon className="tag-icon" /> Web & Móvil
            </span>
            <span>
              <RocketLaunchIcon className="tag-icon" /> Full-Stack
            </span>
            <span>
              <CodeBracketIcon className="tag-icon" /> Docker / SQL
            </span>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-card__glow" aria-hidden="true" />
          <div className="hero-card__content">
            <div className="hero-card__header">
              <div>
                <p>Rubén Darío Salazar</p>
                <span>Full-Stack Junior Developer</span>
              </div>
              <Icon icon="mdi:terminal" className="hero-card-icon" />
            </div>
            <div className="hero-card__body">
              <p>
                Desarrollo de software de extremo a extremo, desde el frontend web y móvil con React y Flutter, hasta backend robusto con APIs REST, optimización de bases de datos y DevOps.
              </p>
              <ul>
                <li>React / Next.js (Hooks)</li>
                <li>Flutter & Dart (Móvil)</li>
                <li>Node.js / FastAPI (APIs)</li>
                <li>SQL / MongoDB / Docker</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <div className="summary-card__icon">
            <Icon icon="mdi:map-marker" />
          </div>
          <span className="summary-chip">Ubicación</span>
          <h3>Medellín, Colombia</h3>
          <p>Trabajo 100% remoto, disponible para equipos globales.</p>
        </article>
        <article className="summary-card">
          <div className="summary-card__icon">
            <Icon icon="mdi:book-open" />
          </div>
          <span className="summary-chip">Inglés</span>
          <h3>B1 Intermediate</h3>
          <p>Comunicación fluida en código y documentación técnica.</p>
        </article>
        <article className="summary-card">
          <div className="summary-card__icon">
            <Icon icon="mdi:email-outline" />
          </div>
          <span className="summary-chip">Disponible</span>
          <h3>Proyectos freelance</h3>
          <p>Construyamos tu próxima idea juntos, desde 0.</p>
        </article>
      </div>
    </section>
  )
}
