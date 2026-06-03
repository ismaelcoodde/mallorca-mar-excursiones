import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 1. Importamos el router
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Envolvemos toda la app en BrowserRouter para poder tener varias páginas */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
