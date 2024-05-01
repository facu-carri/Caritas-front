import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/main/App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RouteProvider from './context/RouteContext.tsx'
import Login from './routes/login/Login.tsx'
import '@css/index.css'

const routes = [
  {
    path: "/",
    element: <App/>,// app debe subdividirse en 3: Intercambiador, Ayudante, Administrador
  },
  {
    path: "/login",
    element: <Login/>
  }
]

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouteProvider>
      <RouterProvider router={router} />
    </RouteProvider>
  </React.StrictMode>
)