import React, { useContext } from 'react'
import { AppContext } from '../../../Context/AppContext'
import { assets } from '../../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

  const {isEducator}=useContext(AppContext);

  const menuItems=[
    {name:"Dashboard",path:"/educator/dashboard",icon:assets.home_icon},
    {name:"Add Course",path:"/educator/add-course",icon:assets.add_icon},
    {name:"My Course",path:"/educator/my-course",icon:assets.my_course_icon},
    {name:"Student Enrolled",path:"/educator/student-enrolled",icon:assets.person_tick_icon},    
  ];

  return isEducator && (
    <div className='md:w-64 w-16 border-r min-h-screen text-base border-gray-500 flex flex-col py-2 bg-gradient-to-b from-cyan-100/30'>

      {menuItems.map((item)=>{
        return(

          <NavLink to={item.path} key={item.name} end={item.path==='/educator'}
          className={({isActive})=>`flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 border-b border-blue-200 ${isActive ? "bg-indigo-50 border-r-[6px] border-indigo-500/90":"hover:bg-gray-100/90"}`}>
            <img src={item.icon} alt="icon" className='w-6 h-6'/>
            <p className='md:block hidden text-center'>{item.name}</p>
          </NavLink>

        )
      })}

    </div>
  )
}

export default Sidebar