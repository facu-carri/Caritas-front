import '@css/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { MainRouter } from './routes/routes';
import { QueryClient, QueryClientProvider } from 'react-query';

const router = createBrowserRouter(MainRouter());
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />

    </QueryClientProvider>
  </React.StrictMode>
)