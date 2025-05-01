import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../Context/AppContext'
import { useNavigate } from 'react-router-dom';
import { Line } from "rc-progress";
import Footer from '../../../Components/Student/Footer/footer';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyEnrollments = () => {

  const { enrolledCourse, calculateCourseTime, fetchEnrolledCourse, calculateNOL } = useContext(AppContext);
  const navigate = useNavigate();


  const [progressArray, setProgressArray] = useState([]);

  const courseProgress = async () => {

    try {

      const token = localStorage.getItem("token");

      const tempProgress =await Promise.all(

        enrolledCourse.map(async (course) => {
          const response = await axios.post("https://lms-backend-sgs2.onrender.com/get-course-progress", { courseId: course._id }, { headers: { token: token } });
          console.log(course);

          const totalLectures = calculateNOL(course);
          const lectureComplete = response.data.progressData ? response.data.progressData.lectureCompleted.length : 0

          return {lectureComplete,totalLectures};
        })
      )

      setProgressArray(tempProgress);
    }

    catch (error) {
      toast.error(error.Message);
    }

  };

  const token=localStorage.getItem("token");
  useEffect(()=>{
    if(token){
      courseProgress();
      console.log(enrolledCourse);
    }
  },[token]);

  
  useEffect(()=>{
    if(enrolledCourse && enrolledCourse.length>0){
      courseProgress();
    }
  },[enrolledCourse]);


  return (
    <>

      <div className='md:px-36 px-8 pt-10 mb-10'>
        <h1 className='text-2xl font-semibold text-gray-900'>My Enrollments</h1>

        <table className='md:table-auto table-fixed w-full border overflow-hidden mt-10'>

          <thead className='text-gray-950 border-b border-gray-600/20 text-sm text-left max-sm:hidden'>
            <tr>
              <th className='px-4 py-3 font-semibold truncate'>Course</th>
              <th className='px-4 py-3 font-semibold truncate'>Durations</th>
              <th className='px-4 py-3 font-semibold truncate'>Completed</th>
              <th className='px-4 py-3 font-semibold truncate'>Status</th>
            </tr>
          </thead>

          <tbody className='text-gray-800'>
            {enrolledCourse && enrolledCourse.map((course, index) => {
              return (
                <tr key={index} className='border-b border-gray-600/20'>

                  <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
                    <img src={course.courseThumbnail} alt="image" className='w-14 sm:w-24 md:w-28 rounded' />

                    <div className='flex-1'>
                      <p className='mb-1 max-sm:text-sm'>{course.courseTitle}</p>
                      <Line strokeWidth={2} percent={progressArray[index] ? (progressArray[index].lectureComplete * 100) / progressArray[index].totalLectures : 0} className='bg-gray-300 rounded-full' />

                    </div>
                  </td>

                  <td className='px-4 py-3 max-sm:hidden'>
                    {calculateCourseTime(course)}
                  </td>

                  <td className='px-4 py-3 max-sm:hidden'>
                    {progressArray[index] && `${progressArray[index].lectureComplete} / ${progressArray[index].totalLectures}`} <span>lectures</span>
                  </td>

                  <td className='px-4 py-3 max-sm:text-right'>
                    <button onClick={() => navigate("/players/" + course._id)} className='px-3 sm:px-5 py-1 sm:py-2 bg-blue-700 max-sm:text-xs text-white rounded'>{progressArray[index] && progressArray[index].lectureComplete / progressArray[index].totalLectures === 1 ? "Complete" : "On Going"}</button>
                  </td>

                </tr>
              )
            })}
          </tbody>

        </table>
      </div>

      <Footer />
    </>
  )
}

export default MyEnrollments