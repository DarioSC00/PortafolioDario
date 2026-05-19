import { Icon } from '@iconify/react'
import { SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/solid'

export default function Home() {
  return (
    <section className="home-page">
      <div className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Desarrollador Full-Stack Junior</span>
          <h2>Construyo interfaces oscuras y APIs escalables con un estilo moderno.</h2>
          <p>
            Soy Rubén Darío, apasionado por crear soluciones web y móviles con React,
            Node.js, Python y Flutter. Mi portafolio refleja experiencia en desarrollo frontend,
            backend y despliegue, con enfoque en calidad, rendimiento y diseño.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="/contact">
              Contactame
              <ArrowRightIcon className="button-icon" />
            </a>
            <a className="secondary-button" href="/projects">
              Ver proyectos
            </a>
          </div>
          <div className="hero-tags">
            <span>
              <SparklesIcon className="tag-icon" /> React Hooks
            </span>
            <span>
              <SparklesIcon className="tag-icon" /> APIs RESTful
            </span>
            <span>
              <SparklesIcon className="tag-icon" /> Docker & CI/CD
            </span>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-card__glow" aria-hidden="true" />
          <div className="hero-card__content">
            <div className="hero-card__header">
              <div>
                <p>Rubén Darío Salazar Cuero</p>
                <span>Junior Full-Stack Developer</span>
              </div>
              <Icon icon="mdi:terminal" className="hero-card-icon" />
            </div>
            <div className="hero-card__body">
              <p>
                Desarrollo aplicaciones con interfaces dinámicas, arquitecturas REST, bases
                de datos y despliegue en entornos escalables.
              </p>
              <ul>
                <li>React + TypeScript</li>
                <li>Node.js / FastAPI</li>
                <li>Next.js / Flutter</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <span className="summary-chip">Ubicación</span>
          <h3>Medellín, Colombia</h3>
          <p>Trabajo con equipos ágiles y entrego productos listos para producción.</p>
        </article>
        <article className="summary-card">
          <span className="summary-chip">Inglés</span>
          <h3>Nivel B1</h3>
          <p>Comunicación en proyectos técnicos y documentación con fluidez.</p>
        </article>
        <article className="summary-card">
          <span className="summary-chip">Contacto</span>
          <h3>rubendario50cent@gmail.com</h3>
          <p>Disponible para colaborar en proyectos web y móviles.</p>
        </article>
      </div>
    </section>
  )
}
