import { BrowserRouter, useRoutes } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import { routes } from './routes/routes'
import { LanguageProvider } from './context/LanguageContext'
import { notifyVisit } from './utils/notify'

function AppRoutes() {
  return useRoutes(routes)
}

function App() {
  useEffect(() => {
    notifyVisit()
  }, [])

  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
