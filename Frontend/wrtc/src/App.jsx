// import { children, useState } from 'react'
// import {Routes, Route, Navigate} from 'react-router-dom'
// import './index.css'
// import Form from './modules/Form/index.jsx'
// import Dashboard from './modules/Dashboard'
// import Homepage from './modules/Homepage'

// const ProtectedRoute = ({ children}) => {
//   const isLoggedIn = localStorage.getItem('user:token', 'test-token-123') !== null || true
//   console.log('isloggedin : ', isLoggedIn);
  
//   if(!isLoggedIn) {return <Navigate to={'/users/sign_in'} /> }
//   else if( isLoggedIn && ['/users/sign_in', '/users/sign_up'].includes(window.location.pathname)){
//     return <Navigate to={'/'} />
//   }
    
//     return children
// }

// function App() {

//   return (
   
//       <Routes>
//         <Route path='/' element={
//         <ProtectedRoute>
//           <Dashboard/>
//         </ProtectedRoute> }/>
//         <Route path="/users/sign_in" element={
          
//             <Form isSignInPage={true}/>
          
//           }  />
//         <Route path="/users/sign_up" element={
           
//             <Form isSignInPage={false}/>
          
//           }  />
//           {/* <Route path="/homepage" element={
//           <ProtectedRoute>
//             <Homepage/>
//           </ProtectedRoute>
//           }  /> */}
//       </Routes>

  
//   )
// }

// export default App



import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Form from './modules/Form/index.jsx'
import Dashboard from './modules/Dashboard'
import Homepage from './modules/Homepage'

// Protects Dashboard - redirects to Homepage if not logged in
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('user:token') !== null || false
  console.log('Dashboard protection - isLoggedIn:', isLoggedIn);
  
  if (!isLoggedIn) {
    return <Navigate to='/' replace />  // Go to Homepage, not sign-in
  }
  
  return children
}

// Redirects logged-in users away from auth pages to Dashboard
const AuthRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('user:token') !== null || false
  console.log('Auth page - isLoggedIn:', isLoggedIn);
  
  if (isLoggedIn) {
    return <Navigate to='/dashboard' replace />  // Already logged in, go to Dashboard
  }
  
  return children
}

function App() {
  return (
    <Routes>
      {/* PUBLIC Homepage - Everyone can access */}
      <Route path='/' element={<Homepage/>} />
      
      {/* PUBLIC Auth pages - Only for NOT logged-in users */}
      <Route 
        path="/users/sign_in" 
        element={
          <AuthRoute>
            <Form isSignInPage={true}/>
          </AuthRoute>
        }  
      />
      <Route 
        path="/users/sign_up" 
        element={
          <AuthRoute>
            <Form isSignInPage={false}/>
          </AuthRoute>
        }  
      />
      
      {/* PROTECTED Dashboard - Only for logged-in users */}
      <Route 
        path='/dashboard' 
        element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App