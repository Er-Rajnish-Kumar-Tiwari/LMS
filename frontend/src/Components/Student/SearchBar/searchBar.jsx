import React, { useContext, useState } from 'react'
import { assets } from '../../../assets/assets'
import {useNavigate } from 'react-router-dom'
import { AppContext } from '../../../Context/AppContext';

const SearchBar = () => {

  const navigate=useNavigate();
  const {input,setInput}=useContext(AppContext);

  const onSearchHandle=(e)=>{
    e.preventDefault();

    navigate("/course-list");
  }


  return (
      <form onSubmit={onSearchHandle} className='max-w-xl md:w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded-md'>

        <img src={assets.search_icon} alt='search' className='md:w-auto w-10 px-3'/>
        <input type='text' value={input} onChange={(e)=>setInput(e.target.value)} placeholder='Search for Courses' className='w-full h-full outline-none text-gray-800 font-bold' required/>
        <button type='submit' className='bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1'>Search</button>
      
      </form>
  )
}

export default SearchBar