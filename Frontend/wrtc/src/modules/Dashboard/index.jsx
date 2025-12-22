// import pics from "../../assests/pics"
import Avatars from '../../assests/Avatars.svg'
const Dashboard = () => {

    const contacts = [
        {
            name: "Dev",
            Status: "Online",
            Img: Avatars,
        },
        {
            name: "Alex",
            Status: "Online",
            Img: Avatars,
        },
        {
            name: "John",
            Status: "Offline",
            Img: Avatars,   
        },
        {
            name: "Micah",
            Status: "Online",
            Img: Avatars,
        },
        {
            name: "Hosea",
            Status: "online",
            Img: Avatars,   
        },
        {
            name: "Merry",
            Status: "Online",
            Img: Avatars,
        }

    ]


return (
    <div className=" w-full min-h-screen flex flex-row">
        <div className=" w-[25%]  h-screen border-black bg-[#deeae9]  ">
            <div className=" flex mx-14 items-center my-8">
                <div className='w-18 h-18 cursor-pointer hover:drop-shadow-[0_0_2px_rgba(160,0,247,0.6)]  rounded-lg transition-transform duration-300 ease-in-out hover:scale-105'><img src={Avatars} alt="User profile avatar for Tutorial Dev account"/></div>
                <div className='ml-6'>
                    <h3 className='text-2xl' >
                        <span className="text-indigo-400">Sup</span>
                        <span className="text-indigo-900">Chat</span></h3>
                    <p className='text-lg font-light '>My Account</p> 
                    
                </div>
            </div> 
            <hr  />
            <div className=' mx-14 mt-8'>
                <div className='text-[#02aea0] text-lg '>Messages</div>
                <div>
                    {
                        contacts.map(({name, Status, Img}) => {
                            return(
                                <div className="  border-b border-b-gray-300 ">

                                    <div className='flex h-20  items-center py-8  hover:drop-shadow-[0_0_2px_rgba(0,217,255,0.3)] ease-in-out hover:font-semibold hover:scale-101'>
                                        <div className='w-13 h-13 border p-2 border-rounded border-[#000000] rounded-full'><img src={Img} alt="User profile avatar for Tutorial Dev account"/></div>
                                        <div className='ml-6'>
                                            <h3 className='text-lg ' >{name}</h3>
                                            <p className='text-sm font-light text-gray-600 '>{Status}</p> 
                                            
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        <div className=" w-[50%]  border-black h-screen "> </div>
        <div className=" w-[25%]  border-black h-screen "> </div>
        
    </div>
  )
}

export default Dashboard 
