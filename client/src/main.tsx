import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter } from 'react-router'
import About from './pages/About.tsx'
import Instruments from './pages/Instruments.tsx'
import TestimonialsSection from './pages/TestimonialsSection.tsx'
import { RouterProvider } from 'react-router-dom'
import Contact from './pages/Contact.tsx'
import { Home } from 'lucide-react'

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <App />,
  },
 
])

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
