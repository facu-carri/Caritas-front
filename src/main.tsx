import '@css/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './routes/login/Login.tsx'
import AuthProvider from './context/AuthContext.tsx'
import RoleBasedRouting from './libs/RoleRouting.tsx'
import FormularioRegistroIntercambiador from './routes/exchanger/FormularioRegistroIntercambiador.tsx'
import LogoutProvider from './context/LogoutContext.tsx'

const routes = [
  {
    path: "/*",
    element:
      <LogoutProvider>
        <AuthProvider>
          <RoleBasedRouting/>
        </AuthProvider>
      </LogoutProvider>,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: '/register',
    element: <FormularioRegistroIntercambiador />
  }
]

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)