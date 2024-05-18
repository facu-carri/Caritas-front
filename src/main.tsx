import '@css/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './routes/login/Login.tsx'
import AuthProvider from './context/AuthContext.tsx'
import RoleBasedRouting from './libs/RoleRouting.tsx'

const routes = [
  {
    path: "/*",
    element:
    <AuthProvider>
      <RoleBasedRouting/>
    </AuthProvider>,
  },
  {
    path: "/login",
    element: <Login/>
  }
]

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)