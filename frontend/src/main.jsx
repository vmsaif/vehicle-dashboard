/**
 * @file:        main.jsx
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2024-12-25
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: Main entry point for the vehicle dashboard.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
