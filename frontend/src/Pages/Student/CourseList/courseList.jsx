import React, { useContext, useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import { assets } from '../../../assets/assets';
import { AppContext } from '../../../Context/AppContext';
import CourseCard from '../../../Components/Student/CourseCard/courseCard';
import Footer from '../../../Components/Student/Footer/footer';

const CourseList = () => {

  const navigate = useNavigate();
  const {input,setInput}=useContext(AppContext);
  const {allCourse}=useContext(AppContext);
  const [filterData,setFilterData]=useState([]);

  const onSearchHandle = (e) => {
    e.preventDefault();

    navigate("/course-list/" + input);
  };

  useEffect(()=>{
    if(allCourse && allCourse.length>0){
      const tempCourse=allCourse.slice();

      input ?
      setFilterData(tempCourse.filter(item=>item.courseTitle.toLowerCase().includes(input.toLowerCase())))
      :setFilterData(tempCourse);
    }
  },[allCourse,input]);

  return (
    <>
      <div className='relative md:px-36 px-8 pt-20 text-left '>

        <div className='flex md:flex-row flex-col gap-6 items-start justify-between'>

          <div>
            <h1 className='font-semibold text-gray-950 text-4xl'>Course List</h1>
            <p className='text-gray-600 text-base'><span className='text-blue-700 cursor-pointer' onClick={() => navigate("/")}>Home / </span><span className='cursor-pointer' onClick={() => navigate("/course-list")}>Course List</span></p>
          </div>

          <form onSubmit={onSearchHandle} className='max-w-xl w-full md:h-11 h-9 flex items-center  bg-white border border-gray-500/20 rounded-md'>

            <img src={assets.search_icon} alt='search' className='md:w-auto w-10 px-3' />
            <input type='text' value={input} onChange={(e) => setInput(e.target.value)} placeholder='Search for Courses' className='w-full h-full outline-none text-gray-800 font-bold' required />
            <button type='submit' className='bg-blue-600 rounded text-white md:px-10 px-7 md:py-1.5 py-1 mx-1'>Search</button>

          </form>

        </div>

        {input && <div className='inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600 text-base font-bold'><p>{input}</p><img src={assets.cross_icon} className='cursor-pointer' onClick={()=>setInput("")}/></div>}

        <div className='grid md:grid-cols-4 grid-cols-auto  my-16 gap-3 px-2 md:p-0'>
          {filterData.map((course,index)=><CourseCard course={course} key={index}/>)}
        </div>
      </div>

      <Footer/>
    </>

  )
}

export default CourseList