import React, { useContext } from 'react'
import { assets } from '../../../assets/assets'
import { Link } from 'react-router-dom'
import { AppContext } from '../../../Context/AppContext'

const CourseCard = ({course}) => {

  const {calculateTotalRating}=useContext(AppContext);

  return (
    <Link to={'/course-details/'+course._id} onClick={()=>scrollTo(0,0)} className='border border-gray-600/30 overflow-hidden rounded-lg pb-6 shadow-lg'>
      <img className='w-full' src={course.courseThumbnail} alt="image" />
 
      <div className='p-3 text-left'>
        <h3 className='text-base font-semibold'>{course.courseTitle}</h3>
        <p className='text-gray-600 text-base'>{course.educator}</p>

        <div className='flex items-center space-x-2'>
          <p className='font-semibold'>{calculateTotalRating(course)}</p>

          <div className='flex'>
            {[...Array(5)].map((_,i)=>(<img className='w-3.5 h-3.5' src={i<Math.floor(calculateTotalRating(course)) ? assets.star : assets.star_blank} key={i} alt='star'/>))}
          </div>

          <p className='text-gray-600'>({course.courseRatings.length})</p>

        </div>

        <p className='text-base font-semibold text-gray-900'>Rs.{((course.coursePrice-course.discount*course.coursePrice/100)*85).toFixed(2)}</p>
        
      </div>

    </Link>
  )
}

export default CourseCard