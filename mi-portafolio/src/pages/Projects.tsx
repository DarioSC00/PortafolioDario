import { useState } from 'react'
import { Icon } from '@iconify/react'
import { LightBulbIcon } from '@heroicons/react/24/solid'
import VerDetalle from '../modals/VerDetalle'
import projects from '../data/projects/index'

export interface Project {
  title: string
  description?: string
  longDescription?: string
  features?: string[]
  techStack?: string[]
  tags?: string[]
  banner?: string
  repo?: string
  demo?: string
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState<string>('all')

  function openModal(p: Project) {
    setSelected(p)
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
    setSelected(null)
  }

  const uniqueTags = Array.from(new Set(projects.flatMap((p) => p.tags || [])))
  const filteredProjects = filter === 'all' ? projects : projects.filter((p) => p.tags?.includes(filter))



  return (
    <section className="projects-page">
      <div className="section-intro">
        <span className="eyebrow">Proyectos</span>
        <h2>Trabajos que demuestran experiencia, creatividad y precisión.</h2>
        <p>
          Cada proyecto cuenta una historia de resolución de problemas reales, tecnología moderna
          y diseño pensado en el usuario. Haz clic para ver más detalles.
        </p>
      </div>

      {uniqueTags.length > 0 && (
        <div className="projects-filter">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todos ({projects.length})
          </button>
          {uniqueTags.map((tag) => {
            const count = projects.filter((p) => p.tags?.includes(tag)).length
            return (
              <button
                key={tag}
                className={`filter-btn ${filter === tag ? 'active' : ''}`}
                onClick={() => setFilter(tag)}
              >
                {tag} ({count})
              </button>
            )
          })}
        </div>
      )}

      <div className="projects-grid">
        {filteredProjects.map((p, idx) => (
          <article key={p.title} className="project-card" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="project-card__top">
              <div className="project-card__icon-wrapper">
                <Icon icon="mdi:lightning-bolt" className="project-card__icon" />
              </div>
              {p.repo && <span className="project-badge">Con repo</span>}
            </div>

            <div className="project-card__content">
              <h3>{p.title}</h3>
              <p className="project-description">{p.description}</p>

              {p.tags && (
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="project-tag">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="project-card__footer">
              <button onClick={() => openModal(p)} className="project-link primary-btn">
                <span>Ver detalles</span>
                <Icon icon="mdi:arrow-right" />
              </button>
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noreferrer" className="project-link demo-btn">
                  <Icon icon="mdi:external-link" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="projects-empty">
          <LightBulbIcon className="empty-icon" />
          <p>No hay proyectos en esta categoría aún.</p>
        </div>
      )}

      <VerDetalle open={open} onClose={closeModal} project={selected} />
    </section>
  )
}
