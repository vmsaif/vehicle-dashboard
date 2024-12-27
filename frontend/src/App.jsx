import { useState } from 'react'
import './styles/App.css'
import Dashboard from './assets/components/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <Dashboard />
    </div>
    </>
  )
}

export default App
