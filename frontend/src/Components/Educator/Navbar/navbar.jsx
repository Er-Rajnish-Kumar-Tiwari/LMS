import React from 'react'
import { assets, dummyEducatorData } from '../../../assets/assets'
import {UserButton, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const educatorData=dummyEducatorData;
  const {user}=useUser();
  const navigate=useNavigate();

  return (
    <div className='flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-3 bg-gray-300'>
      <img src={assets.logo} alt="logo"  onClick={()=>navigate("/")}  className='w-28 lg:w-32 cursor-pointer'/>

      <div className='flex gap-2 items-center'>
        <p className='text-base'>Hi! {user ? user.fullName : "Developers"}</p>
        {user ? <UserButton/> : <img src={assets.profile_img}/>}
      </div>

    </div>
  )
}

export default Navbar