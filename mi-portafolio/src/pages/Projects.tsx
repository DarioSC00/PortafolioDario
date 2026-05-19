import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import VerDetalle from '../modals/VerDetalle'
import defaults from '../data/projects'
import { loadProjects } from '../data/projects/storage'

type Project = (typeof defaults)[number]

export default function Projects() {
	const [projects, setProjects] = useState<Project[]>(() => loadProjects())
	const [selected, setSelected] = useState<Project | null>(null)
	const [open, setOpen] = useState(false)

	useEffect(() => {
		function onUpdate() {
			setProjects(loadProjects())
		}
		window.addEventListener('projects-updated', onUpdate)
		return () => window.removeEventListener('projects-updated', onUpdate)
	}, [])

	function openModal(p: Project) {
		setSelected(p)
		setOpen(true)
	}

	function closeModal() {
		setOpen(false)
		setSelected(null)
	}

	return (
		<section className="projects-page">
			<div className="section-intro">
				<span className="eyebrow">Proyectos</span>
				<h2>Trabajos que demuestran el poder del código y el diseño.</h2>
				<p>
					Cada proyecto está pensado para resolver un problema real con tecnología
					escalable y estética profesional.
				</p>
			</div>

			<div className="projects-grid">
				{projects.map((p) => (
					<article key={p.title} className="project-card">
						<div className="project-card__header">
							<Icon icon="mdi:lightning-bolt" className="card-icon" />
							<h3>{p.title}</h3>
						</div>
						<p>{p.description}</p>
						<div className="project-tags">
							{p.tags?.map((t) => (
								<span key={t}>{t}</span>
							))}
						</div>

						<div className="mt-4 flex gap-3">
							<button onClick={() => openModal(p)} className="project-link">
								Ver detalles
							</button>
							<a className="project-link" href="/contact">
								Contacta para ver más
							</a>
						</div>
					</article>
				))}
			</div>

			<VerDetalle open={open} onClose={closeModal} project={selected} />
		</section>
	)
}
