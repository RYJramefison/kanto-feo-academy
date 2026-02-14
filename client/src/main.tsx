import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import Dashboard from './pages/dashboard/Dashboard.tsx'
import DashboardCourses from './pages/dashboard/DashboardCourses.tsx'
import DashboardPayments from './pages/dashboard/DashboardPayment.tsx'
import DashboardCalendar from './pages/dashboard/DashboardCalendar.tsx'
import DashboardProgress from './pages/dashboard/DashboardProgress.tsx'

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <App />,
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard/',
    element: <Dashboard />,
  
  },
  {
    path: '/dashboard/courses',
    element: <DashboardCourses />,
  },
  {
    path: '/dashboard/payments',
    element: <DashboardPayments />,
  },
  {
    path: '/dashboard/calendar',
    element: <DashboardCalendar />,
  },
  {
    path: '/dashboard/progress',
    element: <DashboardProgress />,
  },

 
])

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
