import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/main/App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RouteProvider from './context/RouteContext.tsx'
import Login from './routes/login/login.tsx'
import '@css/index.css'
import Maps from './routes/maps/Map.tsx'

const routes = [
  {
    path: "/",
    element: <App/>,// app debe subdividirse en 3: Intercambiador, Ayudante, Administrador
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/maps",
    element: <Maps/>
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