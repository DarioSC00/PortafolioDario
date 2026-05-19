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
				<header className="flex items-start justify-between">
					<h3 className="text-xl font-semibold text-white">{project?.title}</h3>
					<button
						onClick={onClose}
						aria-label="Cerrar"
						className="text-gray-400 hover:text-white"
					>
						✕
					</button>
				</header>

				<div className="mt-4 text-sm text-gray-300 space-y-4">
					{project?.description || 'No hay descripción disponible.'}

					{project?.longDescription && (
						<div className="modal-longtext">
							{project.longDescription}
						</div>
					)}

					{project?.features && (
						<div>
							<h4 className="mt-2 font-medium text-gray-200">Características</h4>
							<ul className="mt-2 ml-4 list-disc text-gray-300">
								{project.features.map((f) => (
									<li key={f}>{f}</li>
								))}
							</ul>
						</div>
					)}

					{project?.techStack && (
						<div className="mt-3 flex flex-wrap gap-2">
								{project.techStack.map((t) => (
									<span key={t} className="modal-tech-badge">
										{t}
									</span>
								))}
						</div>
					)}

					{project?.tags && (
						<div className="mt-4 flex flex-wrap gap-2">
							{project.tags.map((t) => (
								<span key={t} className="modal-tag">
									{t}
								</span>
							))}
						</div>
					)}

					{ (project?.repo || project?.demo) && (
						<div className="mt-4 modal-links">
							{project.repo && (
								<a className="btn-gradient" href={project.repo} target="_blank" rel="noreferrer">
									<Icon icon="mdi:github" /> Repo
								</a>
							)}
							{project.demo && (
								<a className="btn-secondary" href={project.demo} target="_blank" rel="noreferrer">
									<Icon icon="mdi:monitor" /> Demo
								</a>
							)}
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
