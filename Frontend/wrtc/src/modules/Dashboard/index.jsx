import Avatars from '../../assests/Avatars.svg'
import man from "../../assests/man.png"
import landscapebg from "../../assests/landscapebg.png"
import newchaticon from "../../assests/newchaticon.svg"
import daynightlogo from "../../assests/daynightlogo.svg"
import { useState, useEffect, useRef } from 'react'
import Input from "../../components/input"
import { io } from "socket.io-client"


const Dashboard = () => {
    const [isThemeOpen, setThemeOpen] =useState()
    const [isSettingsOpen, setisSettingsOpen] = useState(false);
    const [isAppintroOpen, setisAppintroOpen] = useState(false);
    const [iskeyhightlightopen, setKeyhighlight]= useState(false)
    const [animateSettings, setAnimateSettings] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [darkMode, setDarkMode] = useState();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);


    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


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
        if (darkMode) {   
        document.documentElement.classList.add("dark");
        } else {
        document.documentElement.classList.remove("dark");
        }
    }, [darkMode])

    
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

    
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')))
    const [conversations, setConversations] = useState([])
    const [messages, setMessages] = useState({})
    const [message, setMessage] = useState('')
    const [users, setUsers] = useState([])
    const [socket, setSocket] = useState(null)
    const messageRef = useRef(null)

    console.log(messages, 'messages');
    

    useEffect(() => {
        setSocket(io('https://supchat-rgpq.onrender.com'))
    }, [])

    useEffect(() =>{
        socket?.emit('addUser', user?.id);
        socket?.on('getUsers', users => {
            console.log('activeUsers:>>', users)
        })
        socket?.on('getMessage', data => {
            setMessages(prev => ({
                ...prev,
                messages: [...prev.messages, { user: data.user, message: data.message }]
            }) )
        })
    }, [socket])

    useEffect(() => {
        if (isMobile && messages?.receiver?.fullName) {
            console.log('receiver is :>>',isMobile, messages?.receiver?.fullName);
            
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobile, messages?.receiver?.fullName]);


    useEffect(()=>{
        messageRef?.current?.scrollIntoView({ behaviour: 'smooth'})
    }, [messages?.messages])

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user:detail'))
        const fetchConversations = async() =>{
            const res = await fetch(`https://supchat-rgpq.onrender.com/api/conversations/${loggedInUser?.id}`,{
                method: 'GET',
                headers: {
                    'content-Type': 'application/json'
                }
            });
            const resData = await res.json()
            setConversations(resData)
        }
        fetchConversations()
    }, [])

    useEffect(()=>{
        const fetchUsers = async() => {
            const res = await fetch(`https://supchat-rgpq.onrender.com/api/users/${user?.id}`, {
                method: 'GET',
                headers: {
                    'content-Type': 'application/json',
                }
            })
            const resData = await res.json()
            setUsers(resData)
        }
        fetchUsers()

    },[])
    
    // Filter contacts based on search query
    const filteredContacts = users.filter(contact => 
        contact.user?.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    


    const fetchMessages = async(conversationId, receiver)=>{
        const res = await fetch(`https://supchat-rgpq.onrender.com/api/message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId} `,{
            method: 'GET',
            headers: {
                'Contenent-Type': 'application/json'
            }
        })

        const resData = await res.json()
        setMessages({messages: resData, receiver, conversationId})
    
    }

    const sendMessage = async(e) => {
        socket?.emit('sendMessage', {
            conversationId: messages?.conversationId,
            senderId: user?.id,
            message,
            receiverId: messages?.receiver?.receiverId
        })
        const res = await fetch(`https://supchat-rgpq.onrender.com/api/message`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                conversationId: messages?.conversationId,
                senderId: user?.id,
                message,
                receiverId: messages?.receiver?.receiverId
            })
        });
        setMessage('')
    }

    
    
  return (                                                                    
    <div className=" w-full  flex flex-col md:flex-row h-screen  ">      {/* Full Display div */}

        <div  className={` bg-contain w-full md:w-[32%] lg:w-[27%]  min-h-screen md:h-screen  flex flex-col
         dark:bg-[#282828]  bg-[#dedede] ${isMobile && messages?.receiver?.fullName ? 'hidden' : 'block'} `}>  {/* Left side full sized box div */}
            <div className=" flex mx-4 items-center justify-between my-6 ">      {/* Account Setting & Webrtc app logo, Top div */}

                <div  className='w-18 h-18 md:w-14 md:h-14 lg:w-20 lg:h-20 hover:drop-shadow-[0_0_2px_rgba(160,0,247,0.2)] lg:mt-0 mt-2  rounded-lg transition-transform '><img src={Avatars} alt="User profile avatar for Tutorial Dev account"/>
                </div>
                
                <div className=' my-auto p-1 flex-1 overflow-hidden  sm:self-start'>
                    <div className='text-3xl ' >
                        <span className="text-xl md:text-md lg:text-xl text-[#2e2e2e] dark:text-[#ffffff] block truncate ">{user.fullName}</span></div>
                    <button  className='text-md md:text-sm lg:text-md font-light  ease-in-out   text-[#2e2e2e] dark:text-[#ffffff]  '>My Account</button> 
                    
                </div>
                <span className=' shrink-0 '>
                        <div onClick={() => setisSettingsOpen(true)} className=' cursor-pointer hover:scale-105 transition-transform
                        active:scale-95 text-4xl font-bold md:w-6 lg:w-8 lg:h-8 md:h-6 ml-auto mt-5 dark:text-white scale-y-[0.8] ' >☰</div>
                </span>
            </div> 
            <hr className="border-[#cbcbcb]" />
            <div className=' ml-6 md:ml-10 mt-3 flex-1 overflow-hidden '>      
                <div className='text-[#02aea0] p-1 items-center '>Chats 🗪</div>         
                <div className='overflow-y-auto h-[calc(100%-2rem)]'>               {/* Active chat contact list  */}
                    <div className='mr-6 md:mr-10 '>
                        {
                        conversations.length > 0?
                                                                 
                            conversations.map(({conversationId, user}) => {                                                            
                                return(                                                     
                                    <div className="   border-b-[#3d3d3d] dark:border-b-[#393939] ">   

                                        <div className='flex h-20  items-center py-8  ease-in-out hover:font-semibold hover:scale-101 ' onClick={()=> fetchMessages(conversationId, user) }>
                                            <div className='w-12 h-12 shrink-0 p-0 rounded-full '><img src={man} className='w-full h-full rounded-full' alt="User profile"/></div>
                                            <div className='ml-6'>
                                                <h3 className='text-lg dark:text-[#ffffff] ' >{user?.fullName}</h3>
                                                <p className='text-sm font-light dark:text-[#aeaeae] text-gray-600 '>{user?.email}</p> 
                                                
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        : <div className='text-center text-lg font-semibold mt-30 text-[#000bdaae]'> No Conversations</div>
                        }
                    </div>
                </div>
            </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className='absolute bg-[#deeae9] rounded-full dark:bg-[#282828] dark:border-[#777777] bottom-[3%] left-[86%] lg:left-[21%] md:left-[24%] w-10 h-10 sm:h-12 sm:w-12 md:h-14 md:w-14 flex items-center justify-center shadow-2xl cursor-pointer hover:scale-105 transition-transform hover:bg-[#c9dedd] dark:hover:bg-[#282828] active:scale-95 border-2 border-[#b3b3b3] shrink-0'
                >
                    <img src={newchaticon} alt="new chat" className='w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10' />
                </button>
        </div>
                                                                                   {/* Active Contact Details and Call Button */}
                                                                                   
        <div
            className={`dark:bg-[#242424] bg-[#e1e1e1] flex-1 w-full md:w-[70%] lg:w-[75%]
                ${isMobile && !messages?.receiver?.fullName ? 'hidden' : 'block'}
            `}
        >
        <div style={{backgroundImage: `url(${landscapebg})`,backgroundBlendMode: 'overlay',
                    backgroundSize:'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
         }} className=" dark:bg-[#252525cc] h-screen lg:h-screen md:h-screen flex-1  min-w-0  flex flex-col items-center relative ">

            {
                messages?.receiver?.fullName &&
                
                <div className='w-[95%] md:w-[90%] lg:w-[85%] flex items-center gap-3 mt-4 md:mt-7'>
                    
                    <div className='bg-[#dedede] dark:bg-[#282828] border-2 border-[#b3b3b3] dark:border-[#777777] flex-1 h-14 sm:h-16 md:h-20 rounded-full flex items-center px-3 sm:px-4 md:px-6 lg:px-12 shadow-2xl gap-2 sm:gap-3 overflow-hidden'>
                        <div className='cursor-pointer rounded-full bg-linear-to-r from-[#A415D4] to-[#1ADEEB] p-0.5 shrink-0'>
                            <img src={man} className='w-10 h-10 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full' alt="image not found" />
                        </div>
                        
                        <div className='ml-2 sm:ml-3 md:ml-4 my-auto mr-auto min-w-0 shrink-2 overflow-hidden gap-0'>
                            <span className='text-sm sm:text-base md:text-lg lg:text-xl mb-0 dark:text-[#ffffff] my-0 block truncate'>
                                {messages?.receiver?.fullName}
                            </span>      
                            <span className='text-xs opacity-60 sm:text-sm md:text-sm lg:text-md font-extralight mt-0
                             dark:text-[#aeaeae] text-gray-600 block truncate'>
                                {messages?.receiver?.email} 
                            </span>
                        </div>

                        {/* <div className='cursor-pointer ease-in-out hover:scale-110 shrink-0 mr-3'>
                            <div className= 'active:scale-105 text-4xl mb-2.5 ' >📸</div>
                        </div> */}
                        
                        <div className='cursor-pointer ease-in-out hover:scale-110 shrink-0'>
                            <div  className=' active:scale-105 text-3xl'>📞</div>
                        </div>
                    </div>
                </div>
            }

        {
        messages?.receiver?.fullName ? (
            <>                                                                    {/* Active Chat box */}
            <div className='mask-t-from-98% w-full overflow-y-auto h-full  '>
                    
                    
                {
                    messages?.messages?.length > 0 ? (
                        messages?.messages?.map(({ message, user : { id } = {} }) => {
                            return (
                            <>
                                <div className=' px-2 md:px-10 py-1.5 flex flex-col gap-1.5 pt-4 '>
                                <div className={`h-auto max-w-[60%] rounded-b-xl font-semibold p-3 ${id === user?.id ? 'self-end ml-auto rounded-tl-2xl bg-[#52bfc7d9] dark:text-white dark:bg-[#208e94f0]':'self-start text-black dark:bg-[#590a71f0] dark:text-white  rounded-tr-2xl bg-[#a857c1e1]'}`}>
                                    {message} </div>
                                <div ref={messageRef}></div>    
                                </div>
                            </>
                        )
                    }) ) :
                    <div className=' mt-5 w-auto '>
                        <div className='text-center p-1 w-fit mx-auto text-[#02aea0]  text-xl opacity-80 font-semibold mt-1 rounded-2xl dark:bg-[#282828] bg-[#dedede]'> Silence is boring… say something 😄 </div>
                    </div>
                        
                }
                    
            </div>
            <div className='w-full gap-1  md:gap-2 flex items-center px-1 py-3 md:pb-6 md:pt-1.5 md:px-10'>
                <div className='px-2  w-[80%]'>
                    <Input 
                         placeholder='Type something… 👋' value={message} onChange={(e)=> setMessage(e.target.value)} className='bg-white border border-gray-500 dark:bg-[#2b2b2b] dark:text-[#ffffff] text-gray-900 w-full  text-sm shadow-md rounded-full outline-none' />
                    
                </div>
                <div  className={`cursor-pointer ease-in-out hover:scale-110 shrink-0 ${!message && 'pointer-events-none'}`}>
                        <div className= 'active:scale-105 text-3xl  text-black dark:text-white font-bold rotate-90 pr-0' >𓄲</div>   
                </div>
                <div className={`cursor-pointer ease-in-out hover:scale-110 shrink-0 ${!message && 'pointer-events-none'}`} onClick={()=> sendMessage()}>
                        <div className= 'active:scale-105 text-3xl mb-1.5 text-black dark:text-white pl-0' >ᯓ➤</div>   
                </div>
            </div>
            </>
        ) : <div className='text-center  w-auto mx-auto text-[#02aea0] text-lg font-semibold mt-10 rounded-2xl dark:bg-[#282828] bg-[#dedede]'>Choose a conversation to begin 🚀</div>
        }
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
                        <button onClick={()=>{
                            setDarkMode(true);
                            localStorage.setItem("theme", "dark");
                            }}>Dark</button>
                        <hr className='bg-black'/>
                        <button onClick={()=> {
                            setDarkMode(false);
                            localStorage.setItem("theme", "light");
                            }}>Light</button>
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
                        className='absolute inset-0  bg-opacity-1 z-40 '
                        onClick={()=> setIsModalOpen(false)}
                    />
                    
                    {/* Modal Box - positioned in chat area */}
                    <div className='absolute top-0 z-50 left-0 md:right-30 max-h-[70vh] dark:bg-[#282828] bg-[#deeae9] shadow-2xl overflow-hidden  bg-contain w-full md:w-[32%] lg:w-[27%]  min-h-screen md:h-screen  flex flex-col
          '>
                        
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
                            {filteredContacts.map(({userId, user}) => (
                                <div
                                    className='flex items-center py-3 px-3 hover:bg-[#c9dedd] dark:hover:bg-[#4a5251] rounded-2xl cursor-pointer transition-colors border-b border-gray-300 last:border-b-0' onClick={()=>{
                                        fetchMessages('new', user);
                                        setIsModalOpen(false);
                                    } }
                                >
                                    <div className='w-10 h-10 p-0.5 rounded-full bg-linear-to-r from-[#1ADEEB] to-[#A415D4]'>
                                        <img src={man} className='rounded-full bg-[#deeae9] object-cover' alt="Avatar"/>
                                    </div> `    `
                                    <div className='ml-3 flex-1 min-w-0'>
                                        <h3 className='text-base font-medium truncate dark:text-white'>{user?.fullName}</h3>
                                        <p className='text-xs text-gray-600 dark:text-[#9a9a9a]'>{user?.email}</p>
                                    </div>
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