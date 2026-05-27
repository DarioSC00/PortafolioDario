import { NavLink, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  BoltIcon,
  HomeIcon,
  UserCircleIcon,
  SparklesIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  ChartBarIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import { Icon } from '@iconify/react'

const navItems = [
  { to: '/', label: 'Inicio', icon: HomeIcon },
  { to: '/dashboard', label: 'Dashboard', icon: ChartBarIcon },
  { to: '/about', label: 'Acerca de', icon: UserCircleIcon },
  { to: '/skills', label: 'Habilidades', icon: SparklesIcon },
  { to: '/projects', label: 'Proyectos', icon: BriefcaseIcon }, 
  { to: '/copiloto-ia', label: 'Copiloto IA', icon: BoltIcon, isNew: true },
  { to: '/contact', label: 'Contacto', icon: EnvelopeIcon },
]

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `nav-link${isActive ? ' active' : ''}`

export default function DefaultLayout() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
    const initialTheme = saved ?? (prefersLight ? 'light' : 'dark')
    setTheme(initialTheme)
    document.documentElement.classList.toggle('light-theme', initialTheme === 'light')
  }, [])

  function toggleMenu() {
    setMenuOpen((current) => !current)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
    document.documentElement.classList.toggle('light-theme', nextTheme === 'light')
  }

  return (
    <div className="app-shell">
      {/* Ambient glassmorphic glowing spheres */}
      <div className="ambient-glows" aria-hidden="true">
        <div className="glow-sphere glow-1"></div>
        <div className="glow-sphere glow-2"></div>
        <div className="glow-sphere glow-3"></div>
      </div>

      <header className="app-header">
        <div className="brand-panel">
          <div>
            <p className="eyebrow">Portafolio</p>
            <h1>Rubén Darío Salazar</h1>
          </div>
          <div className="brand-panel-actions">
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle"
              data-tooltip="Alternar tema claro/oscuro"
            >
              {theme === 'light' ? <MoonIcon className="theme-icon" /> : <SunIcon className="theme-icon" />}
              <span>{theme === 'light' ? 'Modo oscuro' : 'Modo claro'}</span>
            </button>
            <div className="brand-chip" data-tooltip="Disponible para contratación inmediata">
              <BoltIcon className="brand-icon" />
              Full-Stack Junior
            </div>
          </div>
        </div>

        <div className="navbar-control">
          <button
            type="button"
            className="navbar-toggle"
            onClick={toggleMenu}
            aria-controls="main-navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <XMarkIcon className="navbar-toggle-icon" /> : <Bars3Icon className="navbar-toggle-icon" />}
            <span>{menuOpen ? 'Cerrar menú' : 'Menú'}</span>
          </button>
        </div>

        <nav id="main-navigation" className={`navbar${menuOpen ? ' open' : ''}`} aria-label="Menú principal">
          {navItems.map((item) => {
            const IconComponent = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClasses}
                data-tooltip={`Ir a ${item.label}`}
                onClick={closeMenu}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative' }}>
                  <IconComponent className="nav-icon" />
                  <span>{item.label}</span>
                  {item.isNew && (
                    <span className="navbar-new-badge">IA</span>
                  )}
                </div>
              </NavLink>
            )
          })}
        </nav>
      </header>

      <main className="page-content">
        <Outlet />
      </main>

      <footer className="app-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="pulse-indicator" data-tooltip="En línea / Activo ahora"></span>
          <span>Medellín, Colombia</span>
          <span>•</span>
          <span>312 891 4563</span>
        </div>
        <div className="footer-links">
          <a
            href="https://github.com/DarioSC00"
            target="_blank"
            rel="noreferrer"
            data-tooltip="Visitar mi GitHub"
          >
            <Icon icon="akar-icons:github-fill" /> GitHub
          </a>
          <a
            href="https://linkedin.com/in/rubén-dario-salazar-cuero-39867125a/"
            target="_blank"
            rel="noreferrer"
            data-tooltip="Conectar en LinkedIn"
          >
            <Icon icon="akar-icons:linkedin-box-fill" /> LinkedIn
          </a>
        </div>
      </footer>
    </div>
  )
}
