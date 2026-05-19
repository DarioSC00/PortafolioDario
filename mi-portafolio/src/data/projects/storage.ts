import defaults from './index'

const KEY = 'portfolio_projects_v1'

export function loadProjects() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaults
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return defaults
    return parsed
  } catch (e) {
    return defaults
  }
}

export function saveProjects(list: any[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list))
    // notify other windows/components
    window.dispatchEvent(new CustomEvent('projects-updated'))
  } catch (e) {
    // ignore
  }
}

export function clearStored() {
  localStorage.removeItem(KEY)
  window.dispatchEvent(new CustomEvent('projects-updated'))
}
