import { useState } from 'react'

import './App.css'
import Form from './modules/Form/index.jsx'
import Dashboard from './modules/Dashboard/index.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className= "bg-[#d2dbe8] h-screen flex justify-center items-center">
      {/* <Form/> */}
      <Dashboard/>

    </div>  
  )
}

export default App
