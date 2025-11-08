import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fontsource/geist-sans"; // Geist Sans
import "@fontsource/geist-mono"; // Geist Mono
import '@/styles/index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
