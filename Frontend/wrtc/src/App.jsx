import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './index.css'
import Form from './modules/Form/index.jsx'
import Dashboard from './modules/Dashboard/index.jsx'
import Homepage from './modules/Homepage/index.jsx'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className= "bg-[#d2dbe8] h-screen flex justify-center items-center">
      {/* <Routes>
        <Route path="/" element={<Homepage/>}   />
        <Route path="/auth" element={<Form/>}   />
        <Route path="/" element={<Homepage/>}   />
      </Routes> */}
      {/* <Form/> */}
      <Dashboard/>
      {/* <Homepage/> */}

    </div>  
  )
}

export default App
