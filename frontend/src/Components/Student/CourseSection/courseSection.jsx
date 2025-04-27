import { Link } from 'react-router-dom'
import { AppContext } from '../../../Context/AppContext'
import CourseCard from '../CourseCard/courseCard';
import { useContext } from 'react';

const CourseSection = () => {

  const {allCourse}=useContext(AppContext);

  return (
    <div className='py-16 md:px-40 px-8'>
      <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
      <p className='text-sm md:text-base text-gray-600 mt-3'>Discover our top-rated courses across various categories. From coding <br/> and design to business and wellness, our courses are crafted to deliver results.</p>
      
      <div className='grid grid-cols-auto px-4 md:px-0 md:py-16 py-10 gap-4'>
      {allCourse && allCourse.slice(0,4).map((course,index)=><CourseCard key={index} course={course}/>)}
      </div>

      <Link to='/course-list' onClick={()=>scrollTo(0,0)} className='text-gray-1000 font-semibold bg-sky-200 px-10 py-3 rounded border border-teal-400'>Show all courses</Link>
    </div>
  )
}

export default CourseSection