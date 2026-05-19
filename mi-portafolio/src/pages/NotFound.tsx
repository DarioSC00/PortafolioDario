import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="notfound-page">
      <div className="notfound-card">
        <h2>404</h2>
        <p>La ruta que buscas no existe.</p>
        <Link className="primary-button" to="/">Volver al inicio</Link>
      </div>
    </section>
  )
}
