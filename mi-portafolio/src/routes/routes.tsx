import DefaultLayout from '../layout/DefaultLayout'
import Home from '../pages/Home'
import About from '../pages/About'
import Skills from '../pages/Skills'
import Projects from '../pages/Projects'
import Dashboard from '../pages/Dashboard'
import Contact from '../pages/Contact'
import NotFound from '../pages/NotFound'
import AiAssistant from '../pages/AiAssistant'



export const routes = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'skills', element: <Skills /> },
      { path: 'projects', element: <Projects /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'contact', element: <Contact /> },
      { path: 'copiloto-ia', element: <AiAssistant /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
