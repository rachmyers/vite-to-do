import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  //StrictMode causes app to render twice in development mode
 // <StrictMode>
    <App />
  //</StrictMode>,
)
