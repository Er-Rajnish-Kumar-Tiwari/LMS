import React from 'react'
import { assets } from '../../../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-gray-200 md:px-36 text-left w-full text-black absolute'>

      <div className='flex flex-col md:flex-row md:items-start items-center px-8 md:px-0 justify-between  md:gap-10 py-3'>

        <div className='flex items-center gap-3'>
          <img src={assets.logo} alt="logo"   className='w-28 lg:w-32 cursor-pointer'/> 
          <p className='items-center text-xl pt-6 '>|</p>
          <p className='text-center  py-4 md:pt-10 pt-12 md:text-sm text-xs'>Copyright 2025 © Tanish. All Right Reserved.</p>
        </div>

        <div className='flex gap-2 md:items-center md:pt-7 p-0 text-center'>
          <img src={assets.facebook_icon} alt="" />
          <img src={assets.instagram_icon} alt="" />
          <img src={assets.twitter_icon} alt="" />
        </div>
      </div>

    </footer>
  )
}

export default Footer