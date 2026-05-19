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
} from '@heroicons/react/24/solid'
import { Icon } from '@iconify/react'

const navItems = [
  { to: '/', label: 'Inicio', icon: HomeIcon },
  { to: '/dashboard', label: 'Dashboard', icon: ChartBarIcon },
  { to: '/about', label: 'Acerca de', icon: UserCircleIcon },
  { to: '/skills', label: 'Habilidades', icon: SparklesIcon },
  { to: '/projects', label: 'Proyectos', icon: BriefcaseIcon }, 
  { to: '/contact', label: 'Contacto', icon: EnvelopeIcon },
]

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `nav-link${isActive ? ' active' : ''}`

export default function DefaultLayout() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
    const initialTheme = saved ?? (prefersLight ? 'light' : 'dark')
    setTheme(initialTheme)
    document.documentElement.classList.toggle('light-theme', initialTheme === 'light')
  }, [])

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
    document.documentElement.classList.toggle('light-theme', nextTheme === 'light')
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-panel">
          <div>
            <p className="eyebrow">Portafolio</p>
            <h1>Rubén Darío Salazar</h1>
          </div>
          <div className="brand-panel-actions">
            <button type="button" onClick={toggleTheme} className="theme-toggle">
              {theme === 'light' ? <MoonIcon className="theme-icon" /> : <SunIcon className="theme-icon" />}
              <span>{theme === 'light' ? 'Modo oscuro' : 'Modo claro'}</span>
            </button>
            <div className="brand-chip">
              <BoltIcon className="brand-icon" />
              Full-Stack Junior
            </div>
          </div>
        </div>

        <nav className="navbar" aria-label="Menú principal">
          {navItems.map((item) => {
            const IconComponent = item.icon
            return (
              <NavLink key={item.to} to={item.to} className={linkClasses}>
                <IconComponent className="nav-icon" />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
      </header>

      <main className="page-content">
        <Outlet />
      </main>

      <footer className="app-footer">
        <div>
          <span>Medellín, Colombia</span>
          <span>312 891 4563</span>
        </div>
        <div className="footer-links">
          <a href="https://github.com/DarioSC00" target="_blank" rel="noreferrer">
            <Icon icon="akar-icons:github-fill" /> GitHub
          </a>
          <a href="https://linkedin.com/in/rubén-dario-salazar-cuero-39867125a/" target="_blank" rel="noreferrer">
            <Icon icon="akar-icons:linkedin-box-fill" /> LinkedIn
          </a>
        </div>
      </footer>
    </div>
  )
}
