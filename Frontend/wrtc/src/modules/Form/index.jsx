import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Button from "../../components/Button"
import Input from "../../components/input"

const Form = ({
    isSignInPage = true
}) => {
    const [data, setData] = useState({
        ...(!isSignInPage && { 
            fullName: ''
         }),
        email: '',
        password: '',
        
    }) 
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
      console.log("data :>>", data);
      e.preventDefault()
      const res = await fetch(`http://localhost:8000/api/${isSignInPage ? 'login': 'register' }`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if(res.status === 400){
        alert('Invalid Credentials')
      }else{
        const resData = await res.json()
        if(resData.token){
          localStorage.setItem('user:token', resData.token)
          localStorage.setItem('user:detail', JSON.stringify(resData.user))
          
          navigate('/dashboard')
        }
    }
      
      
    }

  return (
    <div className="dark:bg-[#111111] w-screen h-screen justify-center items-center flex ">
    <div className="bg-white w-85 md:w-110 md:h-150 lg:w-150 h-auto py-6 md:py-0 lg:h-160 shadow-lg rounded-lg flex flex-col dark:text-[#ffffff] dark:bg-[#201f20] justify-center items-center px-2 md:px-10 lg:px-10">
      <div className="text-5xl md:text-6xl font-bold tracking-tight font-brand">
        <span className="bg-linear-to-r from-[#58cfd7] to-[#A415D4] bg-clip-text text-transparent">SupChat</span>
        {/* <span className="text-[#A415D4]">Chat</span> */}
      </div>
      <div className="text-lg md:text-xl font-light mt-2 mb-14">
        {isSignInPage ? "Sign in to continue" : "Sign up now to get started"}
      </div>

      <form className="" onSubmit= { (e)=> handleSubmit(e)}>
      <div className=" w-70 md:w-90 lg:w-110 " >
        {!isSignInPage && (
          <Input label="Full Name" name="fullName" isRequired={true} placeholder="Enter your full name" className="bg-gray-200   dark:text-[#ffffff]  text-gray-900 mb-6 w-full rounded-xl dark:bg-[#2e2e2e] dark:placeholder:opacity-50 placeholder:opacity-90 " value={data.fullName}
            onChange={(e) =>setData({ ...data, fullName: e.target.value }) } /> )}

        <Input label="Email Address" name="email" type="email" placeholder="Enter your email address" className="mb-6 w-full bg-gray-200  dark:bg-[#2e2e2e] dark:placeholder:opacity-50 placeholder:opacity-90 dark:text-[#ffffff] text-gray-900 rounded-xl"
          value={data.email} isRequired={true} onChange={(e) =>setData({ ...data, email: e.target.value }) } />

        <Input
          label="Password" name="password" isRequired={true} type="password" placeholder="Enter your password" className="w-full mb-14 bg-gray-200  dark:bg-[#2e2e2e] dark:placeholder:opacity-50  dark:text-[#ffffff] text-gray-900 rounded-xl " value={data.password}
          onChange={(e) =>setData({ ...data, password: e.target.value })} />

        <Button label={isSignInPage ? "Sign In" : "Sign Up"} className="mb-6 w-full" type="submit"/>
          </div> 
      </form>


         <div>
        {isSignInPage ? "Don't have an account? " : "Already have an account? "}
        <button
          type="button"
          onClick={()=> navigate(`/users/${isSignInPage ? 'sign_up' : "sign_in"}`)}
          className="text-blue-400 hover:text-blue-700 underline cursor-pointer"
        >
          {isSignInPage ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
    </div> )}
export default Form









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