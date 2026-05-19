import { Icon } from '@iconify/react'
import { EnvelopeOpenIcon, PhoneIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/solid'

export default function Contact() {
  return (
    <section className="contact-page">
      <div className="section-intro">
        <span className="eyebrow">Contacto</span>
        <h2>Conectemos de forma directa y sencilla.</h2>
        <p>
          Si tienes una propuesta de colaboración, una oferta de trabajo o simplemente deseas realizar una consulta,
          puedes escribirme o llamarme a través de cualquiera de mis medios oficiales.
        </p>
      </div>

      <div className="contact-wrapper">
        <div className="contact-info-grid">
          <article className="contact-card">
            <div className="about-card__icon-wrapper" style={{ margin: '0 auto 16px' }}>
              <EnvelopeOpenIcon className="card-icon" />
            </div>
            <h4>Correo Electrónico</h4>
            <a href="mailto:rubendario50cent@gmail.com" className="contact-link">
              rubendario50cent@gmail.com
            </a>
            <p className="contact-meta">Respuesta garantizada en 24h</p>
          </article>

          <article className="contact-card">
            <div className="about-card__icon-wrapper" style={{ margin: '0 auto 16px' }}>
              <PhoneIcon className="card-icon" />
            </div>
            <h4>Teléfono / WhatsApp</h4>
            <a href="tel:+573128914563" className="contact-link">
              +57 312 891 4563
            </a>
            <p className="contact-meta">Llamadas o mensajes instantáneos</p>
          </article>

          <article className="contact-card">
            <div className="about-card__icon-wrapper" style={{ margin: '0 auto 16px' }}>
              <MapPinIcon className="card-icon" />
            </div>
            <h4>Ubicación</h4>
            <p className="contact-text-value">Medellín, Colombia</p>
            <p className="contact-meta">Disponible para trabajo 100% remoto</p>
          </article>

          <article className="contact-card">
            <div className="about-card__icon-wrapper" style={{ margin: '0 auto 16px' }}>
              <ClockIcon className="card-icon" />
            </div>
            <h4>Disponibilidad</h4>
            <p className="contact-text-value">Proyectos Freelance & Full-time</p>
            <p className="contact-meta">Listo para incorporarme</p>
          </article>
        </div>

        <div className="contact-socials-centered">
          <h4>Redes Profesionales</h4>
          <div className="social-links-centered">
            <a href="https://linkedin.com/in/rubén-dario-salazar-cuero-39867125a/" target="_blank" rel="noreferrer" className="social-icon" title="LinkedIn">
              <Icon icon="akar-icons:linkedin-box-fill" />
            </a>
            <a href="https://github.com/DarioSC00" target="_blank" rel="noreferrer" className="social-icon" title="GitHub">
              <Icon icon="akar-icons:github-fill" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
