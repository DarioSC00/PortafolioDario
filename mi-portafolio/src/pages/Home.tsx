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
          <h2>Construyo interfaces hermosas y APIs robustas que escalan.</h2>
          <p>
            Soy Darío, desarrollador apasionado por crear soluciones web y móviles de alta calidad.
            Especializado en React, Node.js, TypeScript y arquitectura escalable.
            Mi objetivo es transformar ideas en productos listos para el mercado.
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
              <CheckCircleIcon className="tag-icon" /> Fullstack
            </span>
            <span>
              <RocketLaunchIcon className="tag-icon" /> Escalable
            </span>
            <span>
              <CodeBracketIcon className="tag-icon" /> Moderno
            </span>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-card__glow" aria-hidden="true" />
          <div className="hero-card__content">
            <div className="hero-card__header">
              <div>
                <p>Darío Salazar Cuero</p>
                <span>Full-Stack Developer</span>
              </div>
              <Icon icon="mdi:terminal" className="hero-card-icon" />
            </div>
            <div className="hero-card__body">
              <p>
                Desarrollo aplicaciones web con React, crearé backends sólidos con Node.js,
                y despliego en producción con confianza. Enfoque en código limpio y experiencia excepcional.
              </p>
              <ul>
                <li>React 19 + TypeScript</li>
                <li>Node.js / FastAPI</li>
                <li>PostgreSQL / MongoDB</li>
                <li>Docker & CI/CD</li>
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
