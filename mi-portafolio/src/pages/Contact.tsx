import { Icon } from '@iconify/react'
import { EnvelopeOpenIcon, PhoneIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Aquí iría la lógica real de envío
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section className="contact-page">
      <div className="section-intro">
        <span className="eyebrow">Contacto</span>
        <h2>Hablemos sobre tu próximo proyecto.</h2>
        <p>
          Estoy disponible para colaborar en aplicaciones web, potenciar tu presencia digital,
          y construir soluciones que realmente impacten. Escribeme sin dudas.
        </p>
      </div>

      <div className="contact-wrapper">
        <div className="contact-form-section">
          <h3>Envíame un mensaje</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Correo</label>
              <input
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Mensaje</label>
              <textarea
                placeholder="Cuéntame sobre tu proyecto..."
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="primary-button">
              Enviar mensaje
            </button>
            {submitted && (
              <div className="form-success">
                ✓ Mensaje enviado. Te responderé pronto.
              </div>
            )}
          </form>
        </div>

        <div className="contact-info-section">
          <h3>Información de contacto</h3>
          <div className="contact-info-grid">
            <article className="contact-card">
              <EnvelopeOpenIcon className="card-icon" />
              <h4>Correo</h4>
              <a href="mailto:rubendario50cent@gmail.com" className="contact-link">
                rubendario50cent@gmail.com
              </a>
              <p className="contact-meta">Respondo en 24h</p>
            </article>
            <article className="contact-card">
              <PhoneIcon className="card-icon" />
              <h4>Teléfono</h4>
              <a href="tel:+573128914563" className="contact-link">
                +57 312 891 4563
              </a>
              <p className="contact-meta">WhatsApp disponible</p>
            </article>
            <article className="contact-card">
              <MapPinIcon className="card-icon" />
              <h4>Ubicación</h4>
              <p className="contact-link">Medellín, Colombia</p>
              <p className="contact-meta">100% remoto</p>
            </article>
            <article className="contact-card">
              <ClockIcon className="card-icon" />
              <h4>Disponibilidad</h4>
              <p className="contact-link">Proyectos freelance</p>
              <p className="contact-meta">Tiempo flexible</p>
            </article>
          </div>

          <div className="contact-socials">
            <h4>Redes profesionales</h4>
            <div className="social-links">
              <a href="https://linkedin.com/in/rubén-dario-salazar-cuero-39867125a/" target="_blank" rel="noreferrer" className="social-icon">
                <Icon icon="akar-icons:linkedin-box-fill" />
              </a>
              <a href="https://github.com/DarioSC00" target="_blank" rel="noreferrer" className="social-icon">
                <Icon icon="akar-icons:github-fill" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon">
                <Icon icon="akar-icons:twitter-fill" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
