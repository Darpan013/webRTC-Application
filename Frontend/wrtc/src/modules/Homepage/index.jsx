import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Applogo from "../../assests/Applogo.png"
import anonymity from "../../assests/anonymity.png"
import security from "../../assests/security.png"
import startup from "../../assests/startup.png"
import computerengineer from "../../assests/computerengineer.png"
import geography from "../../assests/geography.png"
import simple from "../../assests/simple.png"
import Desktopbg from "../../assests/Desktopbg.png"
import Mobilepg from "../../assests/Mobilebg.png"


const Homepage = () => {
  const navigate = useNavigate();
  const [themeOpen, setThemeOpen] = useState(false);
  const [darkMode, setDarkMode] = useState();
  const [ContactusOpen, setContactusOpen] = useState(false)
  useEffect(() => {
  if (ContactusOpen) {
    document.body.style.overflow = 'hidden'; // Disable scroll
  } else {
    document.body.style.overflow = 'unset'; // Enable scroll
  }
}, [ContactusOpen]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    console.log("dark mode changes to:", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <div className="h-screen w-full ">
    <div className="bg-white dark:bg-[#201f20] text-black dark:text-white  transition-colors duration-300 ">
      {/* ================= HEADER ================= */}
      <div className="w-full border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                {/* Left */}
                <div className="flex items-center gap-3 md:gap-6 ">
                    <button className="font-medium hover:text-[#1ADEEB] active:scale-103">
                    Home
                    </button>
                    {/* Theme Button */}
                    <div className="relative" >
                    <button
                        onClick ={() => setThemeOpen(true)}
                        // onClick ={() => setThemeOpen(!themeOpen)}                        
                        className="font-medium hover:text-[#1ADEEB] active:scale-103 "
                    > Theme
                    </button>    
                    </div>

                    <button onClick={() => window.open("https://github.com/Darpan013", "")} className="font-medium hover:text-[#1ADEEB] active:scale-103" >
                    GitHub
                    </button>
                </div>

                 {/* Right */}
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/users/sign_up', { state: { isSignIn: false } })} className="hover:text-[#1ADEEB] active:scale-103">
                    Sign up
                    </button>
                    <button onClick={() => navigate('/users/sign_in', { state: { isSignIn: true } })} className="px-4 py-1 rounded bg-[#1ADEEB] text-black font-medium active:scale-103">Sign in</button>
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
      <section className="flex flex-col md:flex-row justify-center items-center gap-30 md:gap-8 lg:gap-70 py-10">
        <div className="text-center ">
          <div className="w-110 h-75 rounded-xl">
            {/* LEFT IMAGE */}
            <img src={Mobilepg} />
          </div>
          <p className="mt-4 text-[#1ADEEB] font-medium">
            SUPCHAT in Mobile
          </p>
        </div>

        <div className="text-center">
          <div className="w-110 h-65  rounded-xl">
            {/* <img src="IMAGE_2" /> */}
            <img  src={Desktopbg} alt="" />
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
            <button onClick={()=>setContactusOpen(true)} className="text-sm hover:text-blue-600 ">Contact us</button>
            {ContactusOpen&& (
                <>
                    
                    <div 
                        className='fixed inset-0  bg-opacity-1 z-60 backdrop-blur-sm'
                        onClick={()=> setContactusOpen(false)}
                    />
                    
                    
                    <div className='fixed bottom-10 md:bottom-18 lg:bottom-12 left-1/2 -translate-x-1/2 w-[85%] md:w-[70%] lg:w-[85%] h-[90%] z-60 dark:bg-[#292929] bg-[#deeae9] rounded-2xl shadow-2xl'>
                      
                      
                        <div className='px-8 pt-15 md:px-20 lg:px-30 '>
                            <div className='w-full h-20 text-black dark:text-white justify-items-center font-light md:text-6xl text-5xl border-b dark:border-[#848484] '>
                                <h3>Contact Us</h3>
                                
                            </div>
                            <div className='px-5 md:px-10 lg:px-35 pt-10 mask-t-from-90% text-black dark:text-white text-xl  h-110  overflow-y-auto space-y-3'>
                                <p className="self-start">We’d love to hear from you!</p>
                                
                                <p>
                                    Whether you have a question, feedback, or have any probelm with SupChat or just want to say hello,   feel free to reach out. Our team is always open to discussions, ideas, and collaboration   opportunities. <br/>

                                    Our goal is to build an experience that feels simple, reliable, and user-focused. Your thoughts and suggestions help us improve and grow, so don’t hesitate to drop us a message. Every query is carefully reviewed, and we do our best to respond as quickly as possible <br/>

                                    You can contact us using the details below or by filling out the contact form. We usually respond   within 24–48 hours on working days 
                                  </p>

                                <p> Email: support@supchat.io </p>

                                <p> Phone: +1 555 019 4827 </p>
                                <p> Address: 221B Innovation Street, Tech District, San Francisco, CA 94107</p>
                                <p> Working Hours: Monday – Friday, 10:00 AM – 6:00 PM (PST)  </p>

                                <p> Your message matters to us, and we’re excited to connect with you.. </p>
                            </div>
                        </div>
                            

                        
                    </div>
                </>
            )} 
          </div>

        </div>
      </footer>

    </div>
    {themeOpen && (
                      <>
                      <div 
                        className='absolute inset-0  z-50  '
                        onClick={()=> setThemeOpen(false)}
                    />
                        <div  className="absolute top-13 left-20 md:top-13 md:left-53 z-50 bg-white dark:bg-gray-900 shadow-lg rounded-md p-4 w-40 border   dark:border-gray-600 ">
                              <p className="text-sm text-black dark:text-white mb-2 font-semibold">Light & Dark</p>
                              <div className="flex gap-2">
                                  <button
                                  onClick={() => { setDarkMode(false);
                                    localStorage.setItem("theme", "light"), setThemeOpen(false)}}
                                  className="flex-1 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700">Light
                                  </button>
                                  <button
                                  onClick={() => {setDarkMode(true); 
                                    localStorage.setItem("theme", "dark"), setThemeOpen(false)}}
                                  className="flex-1 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700">Dark
                                  </button>
                              </div>
                          </div>
                        </>
                    )}
                   
    </div>
    
  )
}

export default Homepage