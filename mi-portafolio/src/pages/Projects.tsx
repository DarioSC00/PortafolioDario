import { useState } from 'react'
import { Icon } from '@iconify/react'
import { LightBulbIcon } from '@heroicons/react/24/solid'
import VerDetalle from '../modals/VerDetalle'
import Pagination from '../components/Pagination'
import projects from '../data/projects/index'

export interface Project {
  title?: string
  description?: string
  longDescription?: string
  features?: string[]
  techStack?: string[]
  tags?: string[]
  banner?: string
  repo?: string
  demo?: string
}

const PROJECTS_PER_PAGE = 3

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)

  function openModal(p: Project) {
    setSelected(p)
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
    setSelected(null)
  }

  function handleFilterChange(newFilter: string) {
    setFilter(newFilter)
    setCurrentPage(1)
  }

  const typedProjects = projects as Project[]
  const uniqueTags = Array.from(new Set(typedProjects.flatMap((p) => p.tags || [])))
  const filteredProjects = filter === 'all' ? typedProjects : typedProjects.filter((p) => p.tags?.includes(filter))

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE)
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE
  )

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
        <div className="projects-filter-container">
          <label htmlFor="project-category-filter" className="filter-label">
            <Icon icon="mdi:filter-variant" className="filter-icon-inline" />
            <span>Filtrar por categoría:</span>
          </label>
          <div className="select-wrapper">
            <select
              id="project-category-filter"
              value={filter}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="premium-select"
            >
              <option value="all">Todos los proyectos ({typedProjects.length})</option>
              {uniqueTags.map((tag) => {
                const count = typedProjects.filter((p) => p.tags?.includes(tag)).length
                return (
                  <option key={tag} value={tag}>
                    {tag} ({count})
                  </option>
                )
              })}
            </select>
            <Icon icon="mdi:chevron-down" className="select-arrow" />
          </div>
        </div>
      )}

      <div className="projects-grid">
        {paginatedProjects.map((p, idx) => (
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
                  {p.tags.map((t: string) => (
                    <span key={t} className="project-tag">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="project-card__footer">
              <button
                onClick={() => openModal(p)}
                className="project-link primary-btn"
                data-tooltip={`Ver ficha técnica de ${p.title}`}
              >
                <span>Ver detalles</span>
                <Icon icon="mdi:arrow-right" />
              </button>
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <VerDetalle open={open} onClose={closeModal} project={selected} />
    </section>
  )
}
