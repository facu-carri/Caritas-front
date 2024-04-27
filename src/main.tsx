import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './login/login.tsx'
import '@css/index.css'

const routes = [
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/login",
    element: <Login/>
  }
  /*{
    path: "/game",
    element: <Game/>
  }*/
]

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
