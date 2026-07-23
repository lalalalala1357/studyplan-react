import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClient , QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'
//import { BrowserRouter } from 'react-router-dom'

const QueryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);