import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import Button from "../../components/Button"
import Input from "../../components/input"

// const Form = ({
//     isSignInPage = true
// }) => {
//     const [data, setData] = useState({
//         ...(!isSignInPage && { 
//             fullName: ''
//          }),
//         email: '',
//         password: '',
        
//     })
//     console.log('data =',data)

const Form = () => {
  const location = useLocation(); 
  const [isSignInPage, setIsSignInPage] = useState(true)

  useEffect(() => {
    if (location.state?.isSignIn !== undefined) {
      setIsSignInPage(location.state.isSignIn)
    }
  }, [location])
 
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
  })
  const toggleAuthMode = () => {
    setIsSignInPage(!isSignInPage)
 setData({
      fullName: "",
      email: "",
      password: "",
    }) }  
  return (
    <div className="dark:bg-[#111111] w-screen h-screen justify-center items-center flex ">
    <div className="bg-white   w-150 h-160 shadow-lg rounded-lg flex flex-col dark:text-[#ffffff] dark:bg-[#201f20] justify-center items-center px-10">
      <div className="text-6xl font-bold tracking-tight font-brand">
        <span className="bg-linear-to-r from-[#58cfd7] to-[#A415D4] bg-clip-text text-transparent">SupChat</span>
        {/* <span className="text-[#A415D4]">Chat</span> */}
      </div>
      <div className="text-xl font-light mt-2 mb-14">
        {isSignInPage ? "Sign in to continue" : "Sign up now to get started"}
      </div>

      <form className="" onSubmit= { ()=> console.log("submitted")}>
      <div className="w-full">
        {!isSignInPage && (
          <Input label="Full Name" name="fullName" placeholder="Enter your full name" className="mb-6" value={data.fullName}
            onChange={(e) =>setData({ ...data, fullName: e.target.value }) } /> )}

        <Input label="Email Address" name="email" type="email" placeholder="Enter your email address" className="mb-6"
          value={data.email} onChange={(e) =>setData({ ...data, email: e.target.value }) } />

        <Input
          label="Password" name="password" type="password" placeholder="Enter your password" className="mb-14" value={data.password}
          onChange={(e) =>setData({ ...data, password: e.target.value })} />

        <Button label={isSignInPage ? "Sign In" : "Sign Up"} className="mb-6 w-1/2 mx-auto" type="submit"/>
          </div> 
      </form>

{/* 

  return (
    <div className="bg-white w-150 h-160 shadow-lg rounded-lg text-black flex flex-col justify-center items-center px-10">
        <div className="text-6xl font-bold tracking-tight font-brand">
            <span className="text-indigo-400">Sup</span><span className="text-indigo-900">Chat</span>
        </div>
         <div className="text-xl font-light mt-2 mb-14">
           {isSignInPage ? "Sign in to continue" : "Sign up now to get started"} </div>
        <div className="w-full">
            {!isSignInPage && ( <Input label="Full Name" name="name" placeholder="Enter your full name" className="mb-6" value={data.fullName} 
            onChange={(e) =>setData({...data, fullName: e.target.value}) } /> )}
                <Input label="Email Address" name="email" type="email" placeholder="Enter your email address" className="mb-6" value={data.email} 
                onChange={(e) =>setData({...data, email: e.target.value}) } />
                <Input label="Password" name="password" type="password" placeholder="Enter your password" className="mb-14" value={data.password} 
                onChange={(e) =>setData({...data, password: e.target.value}) }/>
                <Button label={isSignInPage ? "Sign In" : "Sign Up"} className=" mb-6" />
        </div> */}
        {/* <div> 
          {isSignInPage ? "Don't have an account? " : "Already have an account? "} <span className=" text-blue-400 hover:text-blue-700 underline">
            {isSignInPage ? "Sign up" : "Sign in"}</span>
            
        </div> */}

         <div>
        {isSignInPage ? "Don't have an account? " : "Already have an account? "}
        <button
          type="button"
          onClick={toggleAuthMode}
          className="text-blue-400 hover:text-blue-700 underline cursor-pointer"
        >
          {isSignInPage ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
    </div> )}
export default Form
