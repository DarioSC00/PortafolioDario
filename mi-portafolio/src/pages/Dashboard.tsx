import { useEffect, useMemo, useState } from 'react'
import { FolderIcon, ServerStackIcon, SparklesIcon, LinkIcon, ChartBarSquareIcon, RocketLaunchIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { loadProjects, saveProjects } from '../data/projects/storage'

const summaryItems = [
  {
    icon: FolderIcon,
    title: 'Proyectos',
    valueKey: 'projects',
    description: 'Iniciativas completas y activas.',
  },
  {
    icon: SparklesIcon,
    title: 'Tecnologías',
    valueKey: 'tech',
    description: 'Herramientas clave que se usan con frecuencia.',
  },
  {
    icon: ServerStackIcon,
    title: 'Etiquetas',
    valueKey: 'tags',
    description: 'Categorías que estructuran cada proyecto.',
  },
  {
    icon: LinkIcon,
    title: 'Repos/Demos',
    valueKey: 'links',
    description: 'Accesos públicos disponibles para revisión.',
  },
]

const insightCards = [
  {
    icon: RocketLaunchIcon,
    label: 'Velocidad',
    value: 'Lanzamiento ágil',
    hint: 'Entrega de versiones funcionales rápidamente.',
  },
  {
    icon: ShieldCheckIcon,
    label: 'Confianza',
    value: 'Calidad controlada',
    hint: 'Revisiones frecuentes y estándares sólidos.',
  },
  {
    icon: ChartBarSquareIcon,
    label: 'Escala',
    value: 'Estructura lista',
    hint: 'Diseño pensado para crecimiento y mantenimiento.',
  },
]

export default function Dashboard() {
  const [projects, setProjects] = useState(() => loadProjects())

  useEffect(() => {
    function onUpdate() {
      setProjects(loadProjects())
    }
    window.addEventListener('projects-updated', onUpdate)
    return () => window.removeEventListener('projects-updated', onUpdate)
  }, [])

  const totalProjects = projects.length
  const totalTech = useMemo(() => new Set(projects.flatMap((p: any) => p.techStack || [])).size, [projects])
  const totalTags = useMemo(() => new Set(projects.flatMap((p: any) => p.tags || [])).size, [projects])
  const repoCount = projects.filter((p: any) => p.repo).length
  const demoCount = projects.filter((p: any) => p.demo).length
  const totalLinks = repoCount + demoCount

  const techCounts = useMemo(() => {
    const map: Record<string, number> = {}
    projects.forEach((p: any) => {
      ;(p.techStack || []).forEach((t: string) => {
        map[t] = (map[t] || 0) + 1
      })
    })
    return map
  }, [projects])

  const tagCounts = useMemo(() => {
    const map: Record<string, number> = {}
    projects.forEach((p: any) => {
      ;(p.tags || []).forEach((t: string) => {
        map[t] = (map[t] || 0) + 1
      })
    })
    return map
  }, [projects])

  const topTech = Object.entries(techCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)

  function addExampleProject() {
    const next = [
      ...projects,
      {
        title: `Nuevo proyecto ${projects.length + 1}`,
        description: 'Ejemplo de proyecto para el dashboard.',
        longDescription: 'Este proyecto de ejemplo ayuda a ver cómo la vista se actualiza dinámicamente.',
        features: ['Nueva tarjeta', 'Actualiza métricas', 'Persistencia automática'],
        techStack: ['React'],
        tags: ['Demo'],
        repo: '',
        demo: '',
      },
    ]
    saveProjects(next)
    setProjects(next)
  }

  const maxTech = Math.max(...Object.values(techCounts), 1)
  const maxTag = Math.max(...Object.values(tagCounts), 1)

  return (
    <section className="dashboard-page">
      <div className="section-intro">
        <span className="eyebrow">Dashboard</span>
        <h2>Monitorea tus proyectos con claridad y estilo.</h2>
        <p>Todo el detalle de tus proyectos, tecnologías y resultados con una vista limpia, moderna y consistente.</p>
      </div>

      <div className="dashboard-summary-grid">
        {summaryItems.map((item) => {
          const Icon = item.icon
          const value =
            item.valueKey === 'projects'
              ? totalProjects
              : item.valueKey === 'tech'
              ? totalTech
              : item.valueKey === 'tags'
              ? totalTags
              : totalLinks

          return (
            <article key={item.title} className="dashboard-card dashboard-summary-card">
              <div className="dashboard-card__top">
                <Icon className="dashboard-card-icon" />
                <div>
                  <span className="summary-chip">{item.title}</span>
                  <p className="dashboard-card__hint">{item.description}</p>
                </div>
              </div>
              <div className="dashboard-card__value">{value}</div>
            </article>
          )
        })}
      </div>

      <div className="dashboard-info-grid">
        {insightCards.map((item) => {
          const Icon = item.icon
          return (
            <article key={item.label} className="dashboard-card dashboard-stat-card">
              <div className="dashboard-stat-card__head">
                <Icon className="dashboard-stat-card__icon" />
                <span>{item.label}</span>
              </div>
              <div className="dashboard-stat-card__value">{item.value}</div>
              <p>{item.hint}</p>
            </article>
          )
        })}
      </div>

      <div className="dashboard-charts">
        <article className="dashboard-card dashboard-chart">
          <div className="chart-card-header">
            <div>
              <span className="summary-chip">Tecnologías</span>
              <h3>Tecnologías más usadas</h3>
            </div>
            <button className="secondary-button" onClick={addExampleProject}>Agregar ejemplo</button>
          </div>
          <div className="dashboard-chart-preview">
            {topTech.map(([tech, count]) => (
              <span key={tech} className="dashboard-chart-badge">
                {tech} · {count}
              </span>
            ))}
          </div>
          <ul className="chart-list">
            {Object.entries(techCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([tech, count]) => (
                <li key={tech} className="chart-row">
                  <strong>{tech}</strong>
                  <div className="chart-bar-wrap">
                    <div className="chart-bar" style={{ width: `${(count / maxTech) * 100}%` }} />
                  </div>
                  <span>{count}</span>
                </li>
              ))}
          </ul>
        </article>

        <article className="dashboard-card dashboard-chart">
          <div className="chart-card-header">
            <div>
              <span className="summary-chip">Etiquetas</span>
              <h3>Etiquetas más frecuentes</h3>
            </div>
            <span className="dashboard-note">Visibilidad rápida de temas y dominios.</span>
          </div>
          <div className="dashboard-chart-preview">
            {topTags.map(([tag, count]) => (
              <span key={tag} className="dashboard-chart-badge">
                {tag} · {count}
              </span>
            ))}
          </div>
          <ul className="chart-list">
            {Object.entries(tagCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([tag, count]) => (
                <li key={tag} className="chart-row">
                  <strong>{tag}</strong>
                  <div className="chart-bar-wrap">
                    <div className="chart-bar" style={{ width: `${(count / maxTag) * 100}%` }} />
                  </div>
                  <span>{count}</span>
                </li>
              ))}
          </ul>
        </article>
      </div>

      <div className="dashboard-projects">
        <div className="dashboard-projects-header">
          <div>
            <span className="summary-chip">Proyectos</span>
            <h3>Resumen de cada proyecto</h3>
          </div>
          <span className="dashboard-note">Los datos se actualizan en tiempo real al editar tu portafolio.</span>
        </div>

        <div className="dashboard-project-list">
          {projects.map((project: any) => (
            <article key={project.title} className="project-summary-card">
              <div className="project-summary-card__head">
                <div>
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                </div>
                <div className="project-summary-pill">
                  {project.repo && <span>Repo</span>}
                  {project.demo && <span>Demo</span>}
                  {!project.repo && !project.demo && <span>Sin enlaces</span>}
                </div>
              </div>

              <div className="project-summary-meta">
                <span>{project.techStack?.join(' • ') || 'Sin tech stack'}</span>
                <div className="project-summary-tags">
                  {project.tags?.map((tag: string) => (
                    <span key={tag} className="modal-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
