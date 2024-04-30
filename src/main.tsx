import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/main/App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './routes/login/login.tsx'
import '@css/index.css'
import RouteProvider from './context/RouteContext.tsx'

const routes = [
  {
    path: "/",
    element: <App/>,
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
