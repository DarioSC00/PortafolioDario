import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '@iconify/react'
import { XMarkIcon } from '@heroicons/react/24/solid'

type Project = {
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

interface Props {
	open: boolean
	onClose: () => void
	project?: Project | null
}

export default function VerDetalle({ open, onClose, project }: Props) {
	const [visible, setVisible] = useState(open)
	const [closing, setClosing] = useState(false)

	useEffect(() => {
		if (open) {
			setVisible(true)
			// lock scroll
			document.body.style.overflow = 'hidden'
		}
	}, [open])

	useEffect(() => {
		if (!visible) {
			document.body.style.overflow = ''
		}
	}, [visible])

	function handleClose() {
		setClosing(true)
		// allow animation
		setTimeout(() => {
			setClosing(false)
			setVisible(false)
			document.body.style.overflow = ''
			onClose()
		}, 240)
	}

	if (!visible) return null

	const content = (
		<div className="modal-wrapper" aria-modal="true" role="dialog" onClick={handleClose}>
			<div className="modal-overlay" />

			<div className={`modal-panel ${closing ? 'modal-leave' : 'modal-enter'}`} onClick={(e) => e.stopPropagation()}>
				<header className="modal-header">
					<div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
						<Icon icon="mdi:package-variant" className="modal-icon" />
						<div>
							<h3 className="modal-title">{project?.title}</h3>
							<div className="modal-subtitle">{project?.description}</div>
						</div>
					</div>

					<button onClick={handleClose} className="modal-close" aria-label="Cerrar">
						<XMarkIcon width={22} height={22} />
					</button>
				</header>


				<div className="modal-body" style={{ display: 'grid', gap: '20px' }}>
					
					{project?.longDescription && (
						<div className="modal-section">
							<h4 className="modal-section-title">
								<Icon icon="mdi:text-box-outline" className="modal-section-icon" />
								Detalles del Proyecto
							</h4>
							<div className="modal-longtext">
								{project.longDescription}
							</div>
						</div>
					)}

					{project?.features && (
						<div className="modal-section">
							<h4 className="modal-section-title">
								<Icon icon="mdi:star-circle" className="modal-section-icon" />
								Características Clave
							</h4>
							<ul className="modal-feature-list">
								{project.features.map((f) => (
									<li key={f} className="modal-feature-item">
										<span className="modal-feature-dot">•</span>
										<p style={{ margin: 0, color: 'var(--text)', lineHeight: 1.65 }}>{f}</p>
									</li>
								))}
							</ul>
						</div>
					)}

					{project?.techStack && (
						<div className="modal-section">
							<h4 className="modal-section-title">
								<Icon icon="mdi:code-tags" className="modal-section-icon" />
								Tecnologías Utilizadas
							</h4>
							<div className="modal-badge-row">
								{project.techStack.map((t) => (
									<span key={t} className="modal-tech-badge">
										{t}
									</span>
								))}
							</div>
						</div>
					)}

					{project?.tags && (
						<div className="modal-section">
							<h4 className="modal-section-title">
								<Icon icon="mdi:label" className="modal-section-icon" />
								Etiquetas
							</h4>
							<div className="modal-tag-row">
								{project.tags.map((t) => (
									<span key={t} className="modal-tag">
										{t}
									</span>
								))}
							</div>
						</div>
					)}

					{(project?.repo || project?.demo) && (
						<div className="modal-section" style={{ marginTop: '10px' }}>
							<h4 className="modal-section-title">
								<Icon icon="mdi:link-variant" className="modal-section-icon" />
								Enlaces
							</h4>
							<div className="modal-links">
								{project.repo && (
									<a className="btn-gradient" href={project.repo} target="_blank" rel="noreferrer">
										<Icon icon="mdi:github" /> Repositorio
									</a>
								)}
								{project.demo && (
									<a className="btn-secondary" href={project.demo} target="_blank" rel="noreferrer">
										<Icon icon="mdi:monitor" /> Demo Activa
									</a>
								)}
							</div>
						</div>
					)}

				</div>

				<div className="modal-actions">
					<button onClick={handleClose} className="primary-button">
						Cerrar
					</button>
				</div>
			</div>
		</div>
	)

	return createPortal(content, document.body)
}
