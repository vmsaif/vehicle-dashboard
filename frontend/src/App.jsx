/**
 * @file:        App.jsx
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2024-12-26
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: Main entry point for the vehicle dashboard.
 */


import './styles/App.css'
import Dashboard from './assets/components/Dashboard'
import ExternalRef from './assets/components/ExternalRef'
import Instructions from './assets/components/Instructions'

function App() {

  return (
    <>
    <div>
      <Dashboard />
    </div>
      <ExternalRef />
      <Instructions />
    </>
  )
}

export default App
