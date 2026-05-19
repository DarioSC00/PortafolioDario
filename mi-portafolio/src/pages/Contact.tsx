import { Icon } from '@iconify/react'
import { EnvelopeOpenIcon, PhoneIcon } from '@heroicons/react/24/solid'

export default function Contact() {
  return (
    <section className="contact-page">
      <div className="section-intro">
        <span className="eyebrow">Contacto</span>
        <h2>Hablemos de tu próximo proyecto.</h2>
        <p>
          Estoy listo para colaborar en aplicaciones web o móviles, potenciar tu presencia digital y
          construir soluciones reales y bien diseñadas.
        </p>
      </div>

      <div className="contact-grid">
        <article className="contact-card">
          <EnvelopeOpenIcon className="card-icon" />
          <h3>Correo</h3>
          <a href="mailto:rubendario50cent@gmail.com">rubendario50cent@gmail.com</a>
        </article>
        <article className="contact-card">
          <PhoneIcon className="card-icon" />
          <h3>Teléfono</h3>
          <a href="tel:+573128914563">+57 312 891 4563</a>
        </article>
        <article className="contact-card">
          <Icon icon="akar-icons:linkedin-box-fill" className="card-icon" />
          <h3>LinkedIn</h3>
          <a href="https://linkedin.com/in/rubén-dario-salazar-cuero-39867125a/" target="_blank" rel="noreferrer">
            linkedin.com/in/rubén-dario-salazar-cuero-39867125a/
          </a>
        </article>
        <article className="contact-card">
          <Icon icon="akar-icons:github-fill" className="card-icon" />
          <h3>GitHub</h3>
          <a href="https://github.com/DarioSC00" target="_blank" rel="noreferrer">
            github.com/DarioSC00
          </a>
        </article>
      </div>
    </section>
  )
}
