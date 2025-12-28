import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Applogo from "../../assests/Applogo.png"
import anonymity from "../../assests/anonymity.png"
import security from "../../assests/security.png"
import startup from "../../assests/startup.png"
import computerengineer from "../../assests/computerengineer.png"
import geography from "../../assests/geography.png"
import simple from "../../assests/simple.png"

const Homepage = () => {
  const navigate = useNavigate();
  const [themeOpen, setThemeOpen] = useState(false);
  const [darkMode, setDarkMode] = useState();
  useEffect(() => {
    console.log("dark mode changes to:", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
      console.log("added dark class");
      
    } else {
      document.documentElement.classList.remove("dark");
      console.log("removed dark class");
      
    }
    console.log("current classes:", document.documentElement.className);
    
  }, [darkMode]);
  return (
    <div className="h-screen w-full ">
    <div className="bg-white dark:bg-[#201f20] text-black dark:text-white  transition-colors duration-300 ">
      {/* ================= HEADER ================= */}
      <div className="w-full border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                {/* Left */}
                <div className="flex items-center gap-6">
                    <button className="font-medium hover:text-[#1ADEEB] active:scale-103">
                    Home
                    </button>
                    {/* Theme Button */}
                    <div className="relative" >
                    <button
                        onClick ={() => setThemeOpen(!themeOpen)}
                        // onClick ={() => setThemeOpen(!themeOpen)}                        
                        className="font-medium hover:text-[#1ADEEB] active:scale-103 "
                    > Theme
                    </button>    
                    {themeOpen && (
                      <div onMouseLeave={()=> setThemeOpen(!themeOpen)} className="absolute top-7 left-0 bg-white dark:bg-gray-900 shadow-lg rounded-md p-4 w-40 border    dark:border-gray-700">
                            <p className="text-sm mb-2 font-semibold">Light & Dark</p>
                            <div className="flex gap-2">
                                <button
                                onClick={() => {console.log("light button clicked");
                                 setDarkMode(false)}}
                                className="flex-1 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700">Light
                                </button>
                                <button
                                onClick={() => setDarkMode(true)}
                                className="flex-1 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700">Dark
                                </button>
                            </div>
                        </div>
                    )}
                    
                    </div>

                    <button className="font-medium hover:text-[#1ADEEB] active:scale-103">
                    GitHub
                    </button>
                </div>

                 {/* Right */}
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/auth', { state: { isSignIn: false } })} className="hover:text-[#1ADEEB] active:scale-103">
                    Sign up
                    </button>
                    <button onClick={() => navigate('/auth', { state: { isSignIn: true } })} className="px-4 py-1 rounded bg-[#1ADEEB] text-black font-medium active:scale-103">Sign in</button>
                </div>
            </div>
      </div>

      {/* ================= HERO ================= */}
      <section className="text-center py-16">
        {/* App Logo */}
        <div className="w-45 h-45 mx-auto rounded-full flex items-center justify-center">
          {/* PUT YOUR LOGO SRC HERE */}
          <img src={Applogo} alt="SupChat" className="w-full h-full " />
        </div>

        <h1 className="mt-6 text-2xl font-semibold">
          the next way to connect
        </h1>
      </section>

      {/* ================= APP PREVIEW ================= */}
      <section className="flex flex-col md:flex-row justify-center items-center gap-12 py-10">
        <div className="text-center">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl">
            {/* LEFT IMAGE */}
            <img src="" />
          </div>
          <p className="mt-4 text-[#1ADEEB] font-medium">
            SUPCHAT in Mobile
          </p>
        </div>

        <div className="text-center">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl">
            {/* RIGHT IMAGE */}
            {/* <img src="IMAGE_2" /> */}
          </div>
          <p className="mt-4 text-[#1ADEEB] font-medium">
            SUPCHAT in Windows & MAC OS
          </p>
        </div>
      </section>

      {/* ================= WHY SUPCHAT ================= */}
      <section className="text-center py-16">
        <h2 className="text-3xl font-semibold mb-12">
          Why SupChat ?
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-2">  

          {[
            [<img src={simple} ></img>,"Simple", "SupChat keeps conversations simple, clean, and easy to enjoy"],
            [<img src={anonymity} ></img>,"Private", "SupChat messages are heavily encrypted and can self-destruct."],
            [<img src={startup} ></img>,"Fast", "SupChat delivers messages faster than any other application."],
            [<img src={security} ></img>,"Secure", "SupChat keeps your messages safe from hacker attacks."],
            [<img src={computerengineer}/>,"Adaptive","SUPCHAT is an experience-driven platform built to adapt with time and users."],
            [<img src={geography} ></img>,"Anywhere", "SupChat lets you join friends from the any part of the world."]
          ].map(([image,title, desc]) => (
            // <div key={image}>
                <div key={title} className="text-center">
                  <div className="w-24 h-24 mx-auto  rounded-full mb-4">
                    {image}
                    
                  </div>
                  <h3 className="text-xl text-[#1ADEEB] font-medium">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-black dark:text-gray-300">
                    {desc}
                  </p>
                {/* </div> */}
            </div>
          ))}

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between px-6 gap-8">

          <div>
            <h3 className="font-bold mb-2">SupChat</h3>
            <p className="text-sm max-w-md">
              SupChat is a cloud-based mobile and desktop messaging app with a focus on security and speed.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">About</h4>
            <p className="text-sm">Contact us</p>
          </div>

        </div>
      </footer>

    </div>
    </div>
  )
}

export default Homepage