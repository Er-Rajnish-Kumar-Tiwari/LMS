import React from 'react'
import { assets } from '../../../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-gray-950 md:px-36 text-left w-full text-gray-400 '>
      <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30 '> 

        <div className='flex flex-col items-center md:items-start w-full '>
          <img src={assets.logo} alt="logo" />
          <p className='text-center mt-6 md:text-left text-sm'>Tanish learning center is an easy-to-use online learning platform designed to help students and teachers connect, learn, and grow.It provides a digital space where teachers can upload lessons, quizzes, assignments, and other study materials.</p>
        </div>

        <div className='flex flex-col items-center md:items-start w-full'>
          <h2 className='text-2xl text-white font-semibold mb-5 md:mt-20'>Company</h2>
          <ul className='flex md:flex-col w-full justify-between text-sm md:space-y-2 '>
            <li>Home</li>
            <li>About</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div className='w-full flex flex-col items-center md:items-start'>
          <h2 className='text-2xl text-white font-semibold mb-5 md:mt-20'>Subscribe to our newsletter</h2>
          <p className='mb-5 md:text-start text-center'>The latest news, articles, and resources, sent <br/> to your inbox weekly.</p>

          <div className='flex gap-2 w-full'>
            <input className='px-2 rounded bg-slate-600 outline-none w-64' type="email" placeholder='Enter your email' />
            <button className='bg-blue-600 text-white px-7 py-2 rounded'>Susbcribe</button>
          </div>

        </div>

      </div>

      <p className='text-center text-xs py-4 md:text-sm'>Copyright 2025 © Tanish. All Right Reserved.</p>

    </footer>
  )
}

export default Footer