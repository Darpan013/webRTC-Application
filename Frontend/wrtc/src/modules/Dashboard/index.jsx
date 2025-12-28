import vc from '../../assests/vc.svg'
import Avatars from '../../assests/Avatars.svg'
import man from "../../assests/man.png"
import callingIcon from '../../assests/callingIcon.svg'
import darkmodepic from "../../assests/darmodepic.svg"
// import squarelightbg from "../../assests/squarelightbg.png"
import landscapebg from "../../assests/landscapebg.png"
import newchaticon from "../../assests/newchaticon.svg"
import menuicon from "../../assests/menuicon.svg"
import daynightlogo from "../../assests/daynightlogo.svg"
// import squaredarkbg from "../../assests/squaredarkbg.png"
// import squarebg from "../../assests/squarebg.png"
import { useState, useEffect } from 'react'




const Dashboard = () => {
    const [isThemeOpen, setThemeOpen] =useState()
    const [isSettingsOpen, setisSettingsOpen] = useState(false);
    const [isAppintroOpen, setisAppintroOpen] = useState(false);
    const [iskeyhightlightopen, setKeyhighlight]= useState(false)
    const [animateSettings, setAnimateSettings] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [darkMode, setDarkMode] = useState();

  

    const contacts = [
        {
            name: "Arthur Morgan",
            Status: "Online",
            Img: man,
        },
        {
            name: "Abigail",
            Status: "Online",
            Img: man,
        },
        {
            name: "John Marston",
            Status: "Offline",
            Img: man,   
        },
        {
            name: "Micah",
            Status: "Online",
            Img: man,
        },
        {
            name: "Hosea",
            Status: "online",
            Img: man,   
        },
        {
            name: "Merry",
            Status: "Online",
            Img: man,
        },
        {
            name: "Odrills",
            Status: "online",
            Img: man,   
        },
        {
            name: "Dutch",
            Status: "Online",
            Img: man,
        },
        {
            name: "Javier",
            Status: "online",
            Img: man,   
        },
        {
            name: "Jack Marston",
            Status: "Online",
            Img: man,
        }


    ]
    
    useEffect(() => {
    if (darkMode) {   
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  })


    useEffect(() => {
  if (isSettingsOpen) {
    // wait one frame so DOM mounts first
    requestAnimationFrame(() => {
      setAnimateSettings(true);
    });
  } else {
    setAnimateSettings(false);
  }
}, [isSettingsOpen]);

    
    // Filter contacts based on search query
    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

                                                           
return (                                                                    
    <div className=" w-full min-h-screen flex flex-col md:flex-row h-screen  ">      {/* Full Display div */}

        <div className=" bg-contain w-full md:w-[30%] lg:w-[25%]  md:min-h-screen md:h-screen h-screen flex flex-col
         dark:bg-[#282828]  bg-[#dedede] ">  {/* Left side full sized box div */}
            <div className=" flex mx-8 items-center justify-between my-6">      {/* Account Setting & Webrtc app logo, Top div */}

                <button  className='w-18 h-18 md:w-14 md:h-14 lg:w-20 lg:h-20 hover:drop-shadow-[0_0_2px_rgba(160,0,247,0.6)]  rounded-lg transition-transform duration-300 ease-in-out hover:scale-105'><img src={Avatars} alt="User profile avatar for Tutorial Dev account"/>
                </button>
                
                <div className='ml-auto mr-2'>
                    <p className='text-3xl' >
                        <span className="bg-linear-to-r text-2xl md:text-xl lg:text-2xl font-bold from-[#58cfd7] to-[#A415D4] bg-clip-text   text-transparent">SupChat</span></p>
                    <button  className='text-md md:text-sm lg:text-lg  ease-in-out   text-[#2e2e2e] dark:text-[#ffffff]  '>My Account</button> 
                    
                </div>
                <span 
                        
                        className=' flex-1   '>
                        <img onClick={() => setisSettingsOpen(true)} src={menuicon} alt="menu icon" className='dark:bg-[#9b9b9b] cursor-pointer hover:scale-105 transition-transform
                        active:scale-95 w-8 h-8 md:w-6 lg:w-8 lg:h-8 md:h-6 ml-auto mt-5 ' />
                    </span>
            </div> 
            <hr className="border-[#cbcbcb]" />
            <div className=' ml-6 md:ml-10 mt-3 flex-1 overflow-hidden '>      
                <div className='text-[#02aea0] p-1 items-center '>Messages</div>         
                <div className='overflow-y-auto h-[calc(100%-2rem)]'>               {/* Active chat contact list  */}
                    <div className='mr-6 md:mr-10'>
                        {                                      
                            contacts.map(({name, Status, Img}) => {                          
                                return(                                                     
                                    <div className="   border-b-[#3d3d3d] dark:border-b-[#393939] ">   

                                        <div className='flex h-20  items-center py-8  ease-in-out hover:font-semibold hover:scale-101'>
                                            <div className='w-12 h-12 `shrink-0` p-0.5 rounded-full bg-linear-to-r from-[#1ADEEB] to-[#A415D4] hover:from-[#A415D4] hover:to-[#1ADEEB]'><img src={Img} className='w-full h-full rounded-full bg-[#deeae9] object-cover ' alt="User profile avatar for Tutorial Dev account"/></div>
                                            <div className='ml-6'>
                                                <h3 className='text-lg dark:text-[#ffffff] ' >{name}</h3>
                                                <p className='text-sm font-light dark:text-[#aeaeae] text-gray-600 '>{Status}</p> 
                                                
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
                                                                                   {/* Active Contact Details and Call Button */}
                                                                                   
        <div className='dark:bg-[#242424] bg-[#e1e1e1] flex-1 w-full md:w-[70%] lg:w-[75%] '>
        <div style={{backgroundImage: `url(${landscapebg})`,backgroundBlendMode: 'overlay',
                    backgroundSize:'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
         }} className=" dark:bg-[#252525cc] h-screen lg:h-screen md:h-screen flex-1  min-w-0  flex flex-col items-center relative ">

            <div className='w-[95%] md:w-[90%] lg:w-[85%] flex items-center gap-3 mt-4 md:mt-7'>
                
                <div className='bg-[#dedede] dark:bg-[#282828] border-2 border-[#b3b3b3] dark:border-[#777777] flex-1 h-14 sm:h-16 md:h-20 rounded-full flex items-center px-3 sm:px-4 md:px-6 lg:px-12 shadow-2xl gap-2 sm:gap-3 overflow-hidden'>
                    <div className='cursor-pointer rounded-full bg-linear-to-r from-[#A415D4] to-[#1ADEEB] p-0.5 shrink-0'>
                        <img src={man} className='w-10 h-10 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full' alt="image not found" />
                    </div>
                    
                    <div className='ml-2 sm:ml-3 md:ml-4 my-auto mr-auto min-w-0 shrink-2 overflow-hidden'>
                        <span className='text-sm sm:text-base md:text-lg lg:text-xl dark:text-[#ffffff] block truncate'>
                            Darpan Rajput
                        </span>      
                        <p className='text-xs sm:text-sm md:text-base lg:text-lg font-light dark:text-[#aeaeae] text-gray-600'>
                            Online
                        </p>
                    </div>

                    <div className='cursor-pointer ease-in-out hover:scale-110 shrink-0'>
                        <img src={vc} className='w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 hover:drop-shadow-[0_0_2px_rgba(10,0,30,0.6)] active:scale-105' alt="image not found" />
                    </div>
                    
                    <div className='cursor-pointer ease-in-out hover:scale-110 shrink-0'>
                        <img src={callingIcon} className='w-8 h-8 mb-1.5 sm:w-10 sm:h-10 md:w-11 md:h-11 mr-1 md:mr-2 hover:drop-shadow-[0_0_2px_rgba(20,0,80,0.6)] active:scale-105' alt="image not found" />
                    </div>
                </div>
                
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className='bg-[#deeae9] rounded-full dark:bg-[#282828] dark:border-[#777777] h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 flex items-center justify-center shadow-2xl cursor-pointer hover:scale-105 transition-transform hover:bg-[#c9dedd] dark:hover:bg-[#282828] active:scale-95 border-2 border-[#b3b3b3] shrink-0'
                >
                    <img src={newchaticon} alt="new chat" className='w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10' />
                </button>

            </div>
                                                                                {/* Active Chat box */}
            <div className='mask-t-from-98% w-full overflow-y-auto h-full border-b  '>
                <div className=' px-2 md:px-10 py-10 flex flex-col gap-1.5 '>
                    <div className='h-auto max-w-[60%]  bg-[#bc93c9e1] rounded-b-xl rounded-tr-2xl font-semibold p-3 self-start'>Lorem ipsum dolor sit amet consectetur.</div>
                    <div className='h-auto max-w-[60%]  bg-[#58ced7d9] rounded-b-xl rounded-tl-2xl font-semibold p-3 self-end ml-auto '> Lorem ipsum, dolor sit</div><div className='h-auto max-w-[60%]  bg-[#bc93c9e1] rounded-b-xl rounded-tr-2xl font-semibold p-3 self-start'>Lorem ipsum dolor sit amet consectetur.</div>
                    <div className='h-auto max-w-[60%]  bg-[#58ced7d9] rounded-b-xl rounded-tl-2xl font-semibold p-3 self-end ml-auto '> Lorem ipsum, dolor sit</div><div className='h-auto max-w-[60%]  bg-[#bc93c9e1] rounded-b-xl rounded-tr-2xl font-semibold p-3 self-start'>Lorem ipsum dolor sit amet consectetur.</div>
                    <div className='h-auto max-w-[60%]  bg-[#58ced7d9] rounded-b-xl rounded-tl-2xl font-semibold p-3 self-end ml-auto '> Lorem ipsum, dolor sit</div><div className='h-auto max-w-[60%]  bg-[#bc93c9e1] rounded-b-xl rounded-tr-2xl font-semibold p-3 self-start'>Lorem ipsum dolor sit amet consectetur.</div>
                    <div className='h-auto max-w-[60%]  bg-[#58ced7d9] rounded-b-xl rounded-tl-2xl font-semibold p-3 self-end ml-auto '> Lorem ipsum, dolor sit</div><div className='h-auto max-w-[60%]  bg-[#58ced7d9] rounded-b-xl rounded-tl-2xl font-semibold p-3 self-end ml-auto '> Lorem ipsum, dolor sit</div><div className='h-auto max-w-[60%]  bg-[#bc93c9e1] rounded-b-xl rounded-tr-2xl font-semibold p-3 self-start'>Lorem ipsum dolor sit amet consectetur.</div>
                    <div className='h-auto max-w-[60%]  bg-[#58ced7d9] rounded-b-xl rounded-tl-2xl font-semibold p-3 self-end ml-auto '> Lorem ipsum, dolor sit</div><div className='h-auto max-w-[60%]  bg-[#bc93c9e1] rounded-b-xl rounded-tr-2xl font-semibold p-3 self-start'>Lorem ipsum dolor sit amet consectetur.</div>
                    <div className='h-auto max-w-[60%]  bg-[#58ced7d9] rounded-b-xl rounded-tl-2xl font-semibold p-3 self-end ml-auto '> Lorem ipsum, dolor sit</div><div className='h-auto max-w-[60%]  bg-[#bc93c9e1] rounded-b-xl rounded-tr-2xl font-semibold p-3 self-start'>Lorem ipsum dolor sit amet consectetur.</div>
                    <div className='h-auto max-w-[60%]  bg-[#58ced7d9] rounded-b-xl rounded-tl-2xl font-semibold p-3 self-end ml-auto '> Lorem ipsum, dolor sit</div>
                    

                    
                    
 



                </div>
            </div>
            <div className='py-3 w-full flex  justify-items-center'>
                <input  placeholder='Type a message.. ' className='border-black w-full' type='text' />
            </div>
        </div>
        {isThemeOpen&& (
            <>
                <div 
                        className='absolute inset-0   z-70 '
                        onClick={()=> {setThemeOpen(false), setisSettingsOpen(false)}}
                    />
                <div className={`
                        absolute top-30 left-53 md:top-25 md:left-23 lg:left-53 lg:top-30
                        w-42 h-38 md:w-40 md:h-38 lg:w-41 lg:h-38  
                        bg-white dark:bg-[#4b4b4b]
                        rounded-lg shadow-2xl
                        transform transition-all duration-300 ease-out
                        origin-top-right z-70
                        ${animateSettings
                            ? "scale-100 opacity-100 translate-x-0 translate-y-0"
                            : "scale-75 opacity-0 -translate-x-4 -translate-y-4"}
                        `}>
                        <div className='  items-center flex px-4'>
                            <h2 className='text-xl font-semiboldbold text-black dark:text-white  my-1'>Theme</h2>
                            <img className='h-5 w-5 ml-auto' src={daynightlogo} alt="" />
                        </div>
                        <hr />
                        
                        
                        <div className='p-7  gap-1 flex items-start flex-col text-black dark:text-white text-left'>
                        <button onClick={()=> setDarkMode(true)} className=' hover:text-[#0051ff] dark:hover:text-[#7279ff] hover:scale-102'>Dark</button>
                        <hr className='bg-black'/>
                        <button onClick={()=> setDarkMode(false)} className=' hover:text-[#0051ff] dark:hover:text-[#7279ff] hover:scale-102'>Light</button>
                        
                        </div>
                    </div>

            
            </>
        )}

        {isAppintroOpen && (
            <>
                    
                    <div 
                        className='absolute inset-0  bg-opacity-1 z-60 backdrop-blur-sm'
                        onClick={()=> setisAppintroOpen(false)}
                    />
                    
                    
                    <div className='absolute top-15 left-10 w-[82%] h-[85%] z-60 dark:bg-[#292929]  bg-[#deeae9] rounded-2xl shadow-2xl overflow-hidden md:top-10 md:left-20 lg:top-15 lg:left-35'>
                        <div className='px-8 pt-20 md:px-20 lg:px-30 '>
                            <div className='w-full h-20 text-black dark:text-white justify-items-center font-light md:text-6xl text-5xl border-b dark:border-[#848484] '>
                                <h3>App Info</h3>
                                
                            </div>
                            <div className='px-5 md:px-10 lg:px-35 pt-10 text-black dark:text-white text-xl justify-items-center'>
                                <p>SupChat is a simple, experience-driven messaging platform designed for real conversations.
                                    It focuses on clarity, comfort, and consistency, so users can connect without distractions, clutter, or unnecessary features.</p>
                            </div>
                        </div>
                            

                        
                    </div>
                </>
        )}
        </div>
        {iskeyhightlightopen&& (
            <>
                 <>
                    
                    <div 
                        className='absolute inset-0  bg-opacity-1 z-60 backdrop-blur-sm'
                        onClick={()=> setKeyhighlight(false)}
                    />
                    
                    
                    <div className='absolute top-15 left-10 w-[82%] h-[85%] z-60 dark:bg-[#292929]  bg-[#deeae9] rounded-2xl shadow-2xl overflow-hidden md:top-10 md:left-20 lg:top-15 lg:left-35'>
                        <div className='px-8 pt-20 md:px-20 lg:px-30 '>
                            <div className='w-full  h-20 text-black dark:text-white justify-items-center font-light lg:text-6xl md:text-6xl text-4xl border-b dark:border-[#848484] '>
                                <h3>Key Highlights</h3>
                                
                            </div>
                            <div className='px-5 md:px-10 lg:px-35 pt-10 mask-t-from-90% text-black dark:text-white text-xl justify-items-center h-110  overflow-y-auto space-y-3'>
                                <div className='space-y-8 '>
                                    <p>
                                        <p className='font-bold'>• Experience-Driven : </p>
                                        
                                        Built around how chatting feels, not how many features it lists.
                                        Everything is designed to stay smooth, familiar, and comfortable.
                                    </p>
                                    <p>
                                        <p className='font-bold'>• Adaptive by Design :</p>
                                       Theme preferences and layout behavior adjust naturally, keeping the experience comfortable over time.
                                    </p>
                                    <p>
                                        <p className='font-bold'>• Clean & Distraction-Free :</p>
                                        No unnecessary animations, no feature overload.
                                        Just what’s needed for communication, done properly.

                                    </p>
                                    <p>
                                        <p className='font-bold'>• Consistent Across Devices :</p>
                                        The interface remains intuitive whether you’re on a laptop, tablet, or phone—without breaking flow.

                                    </p>
                                    <p>
                                        <p className='font-bold'>• Always Connected :</p>
                                        SupChat lets you stay connected with friends from anywhere, without complicating the experience


                                    </p>
                                    <p>
                                        <p className='font-bold'>• Dark Theme Optimized :</p>
                                        Designed with a well-balanced dark theme that’s easy on the eyes, especially for long or late-night usage.


                                    </p>
                                    <p>
                                        <p className='font-bold'>• Integrated Calling :</p>
                                        Calling is built into the experience, allowing users to switch from text to voice without leaving the app.


                                    </p>
                                </div>
                            </div>
                        </div>
                            

                        
                    </div>
                </>
            </>
        )}
                                                {/* app intro box */}
        {isSettingsOpen && (
                <>
                {/* Backdrop - only covers chat area */}
                    <div 
                        className='absolute inset-0  z-50   '
                        onClick={() => setisSettingsOpen(false)}
                    />
                    <div className={`
                        absolute top-30 left-53 md:top-25 md:left-23 lg:left-53 lg:top-30
                        w-42 h-35 md:w-40 md:h-35 lg:w-41 lg:h-35  
                        bg-white dark:bg-[#4b4b4b]
                        rounded-lg shadow-2xl
                        transform transition-all duration-300 ease-out
                        origin-top-right z-50
                        ${animateSettings
                            ? "scale-100 opacity-100 translate-x-0 translate-y-0"
                            : "scale-75 opacity-0 -translate-x-4 -translate-y-4"}
                        `}>
                        
                        
                        <div className='p-7  gap-1.5 flex items-start flex-col text-left text-black dark:text-white '>
                        <button onClick={()=>{setisAppintroOpen(true)}} className=' hover:text-[#0051ff] dark:hover:text-[#7279ff] hover:scale-102'>App Intro</button>
                        <hr className='bg-black'/>
                        <button onClick={()=>{setKeyhighlight(true)}} className=' hover:text-[#0051ff] dark:hover:text-[#7279ff] hover:scale-102'> Key Highlights</button>
                        <hr />
                        <button  onClick={()  => {setThemeOpen(true)}

                        //  { setDarkMode(!darkMode)}
                        }
                        
                        className='hover:text-[#0051ff] dark:hover:text-[#7279ff] hover:scale-102 '
                    >
                        Theme</button>
                        </div>
                    </div>


                
                </>
            )}
        {/* Modal Component */}
            {isModalOpen && (
                <>
                    {/* Backdrop - only covers chat area */}
                    <div 
                        className='absolute inset-0  bg-opacity-1 z-40 backdrop-blur-xs'
                        onClick={()=> setIsModalOpen(false)}
                    />
                    
                    {/* Modal Box - positioned in chat area */}
                    <div className='absolute top-16 right-20 md:right-30 z-50 w-75 md:w-85 lg:w-95 max-h-[70vh] dark:bg-[#282828] bg-[#deeae9] rounded-2xl shadow-2xl overflow-hidden'>
                        
                        {/* Header */}
                        <div className='bg-linear-to-r from-[#58cfd7] to-[#A415D4] p-4 flex justify-between items-center'>
                            <h2 className='text-xl font-bold text-white'>New Chat</h2>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className='text-white  text-3xl hover:scale-110 transition-transform leading-none'
                            >
                                ×
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div className='p-3'>
                            <input 
                                type="text" 
                                placeholder="Search contacts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='w-full px-4 py-2 rounded-full border-2 border-[#02aea0] focus:outline-none focus:border-[#A415D4] transition-colors text-sm dark:text-[#ffffff]'
                            />
                        </div>

                        {/* Contact List */}
                        <div className='overflow-y-auto max-h-[50vh] px-3 pb-3'>
                            {filteredContacts.map(({name, Status, Img }, index) => (
                                <div 
                                    key={index}
                                    className='flex items-center py-3 px-3 hover:bg-[#c9dedd] dark:hover:bg-[#4a5251] rounded-2xl cursor-pointer transition-colors border-b border-gray-300 last:border-b-0'
                                >
                                    <div className='w-10 h-10 p-0.5 rounded-full bg-linear-to-r from-[#1ADEEB] to-[#A415D4]'>
                                        <img src={Img} className='rounded-full bg-[#deeae9] object-cover' alt="Avatar"/>
                                    </div>
                                    <div className='ml-3 flex-1 min-w-0'>
                                        <h3 className='text-base font-medium truncate dark:text-white'>{name}</h3>
                                        <p className='text-xs text-gray-600 dark:text-[#9a9a9a]'>{Status}</p>
                                    </div>
                                    <button className='bg-[#02aea0] text-white px-4 py-1.5 rounded-full hover:bg-[#028a7f] transition-colors text-sm'>
                                        Add
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
            
        
    </div>
    
  )
}

export default Dashboard