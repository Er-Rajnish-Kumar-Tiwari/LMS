import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../Context/AppContext'
import Loading from '../../../Components/Student/Loading/loading';

const MyCourse = () => {

  const { allCourse } = useContext(AppContext);
  const [myCourseData, setMyCourseData] = useState([]);

  const fetchMyCourse = () => {
    setMyCourseData(allCourse);
  };

  useEffect(() => {
    fetchMyCourse();
  }, []);

  return myCourseData ? (
    <div className='min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pb-0 pt-8 gap-8 mb-5'>

      <div className='w-full'>
        <h2 className='text-2xl font-bold pb-4'>My Courses</h2>

        <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-gray-100 border border-gray-500/20'>

          <table className='table-fixed md:table-auto w-full overflow-hidden'>

            <thead className='text-black border-b border-gray-500/20 text-sm text-left'>
              <tr>
                <th className='px-4 py-3 truncate font-bold'>All Courses</th>
                <th className='px-4 py-3 truncate font-bold'>Earnings</th>
                <th className='px-4 py-3 truncate font-bold'>Students</th>
                <th className='px-4 py-3 truncate font-bold'>Published On</th>
              </tr>
            </thead>

            <tbody className='text-sm text-gray-700'>
              {myCourseData.map((item, index) => {
                return (

                  <tr className='border-b border-gray-500/20' key={index}>

                    <td className='md:px-4 px-2 py-3 flex items-center space-x-3 truncate'>
                      <img src={item.courseThumbnail} alt="image" className='w-16 rounded' />
                      <span className='truncate hidden md:block'>{item.courseTitle}</span>
                    </td>

                    <td className='px-4 py-3'>{((item.coursePrice - item.discount * item.coursePrice / 100) * 85).toFixed(2)}</td>

                    <td className='px-4 py-3'>{item.enrolledStudents.length}</td>

                    <td className='md:px-4 py-3  '>{new Date(item.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                      day: 'numeric'
                      })}
                    </td>

                  </tr>

                )
              })}
            </tbody>

          </table>

        </div>

      </div>

    </div>

  ) : <Loading />
}

export default MyCourse