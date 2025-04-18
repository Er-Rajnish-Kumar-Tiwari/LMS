import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../../Components/Educator/Navbar/navbar'
import Footer from '../../../Components/Educator/Footer/footer'
import Sidebar from '../../../Components/Educator/Sidebar/sidebar'

const EducatorInfo = () => {
  return (
    <div className='bg-gradient-to-b from-cyan-200/70'>
      <Navbar/>
      <div className='flex'>
        <Sidebar/>
        <div className='flex-1'>
        {<Outlet/>}
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default EducatorInfo