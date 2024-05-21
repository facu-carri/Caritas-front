import '@css/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './routes/login/Login.tsx'
import AuthProvider from './context/AuthContext.tsx'
import RoleBasedRouting from './libs/RoleRouting.tsx'
import FormularioRegistroIntercambiador from './routes/exchanger/FormularioRegistroIntercambiador.tsx'
import LogoutProvider from './context/LogoutContext.tsx'
import { routes } from './libs/constants.ts'
import CustomModalProvider from './context/CustomModalContext.tsx'

const _routes = [
  {
    path: "/*",
    element:
      <LogoutProvider>
        <AuthProvider>
          <CustomModalProvider>
            <RoleBasedRouting/>
          </CustomModalProvider>
        </AuthProvider>
      </LogoutProvider>,
  },
  {
    path: routes.login,
    element: <Login/>
  },
  {
    path: routes.register,
    element: <FormularioRegistroIntercambiador />
  }
]

const router = createBrowserRouter(_routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)