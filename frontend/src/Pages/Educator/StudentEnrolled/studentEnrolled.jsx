import React, { useEffect, useState } from 'react'
import { dummyStudentEnrolled } from '../../../assets/assets';
import Loading from '../../../Components/Student/Loading/loading';

const StudentEnrolled = () => {

  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrollStudent = () => {
    setEnrolledStudents(dummyStudentEnrolled);
  };

  useEffect(() => {
    fetchEnrollStudent();
  }, []);

  return enrolledStudents ? (
    <div className='min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pb-0 pt-8 gap-8 mb-5'>

      <div className='w-full'>
        <h2 className='text-2xl font-bold pb-4'>Enrolled Students</h2>

        <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-gray-100 border border-gray-500/20'>

          <table className='table-fixed md:table-auto w-full overflow-hidden'>

            <thead className='text-black border-b border-gray-500/20 text-sm text-left'>
              <tr>
              <th className='px-4 py-3 text-center hidden sm:table-cell'>#</th>
                <th className='px-4 py-3 truncate font-bold'>Student name</th>
                <th className='px-4 py-3 truncate font-bold'>Course Title</th>
              </tr>
            </thead>

            <tbody className='text-sm text-gray-700'>
              {enrolledStudents.map((item, index) => {
                return (

                  <tr className='border-b border-gray-500/20' key={index}>

                    <td className='px-4 py-3 text-center hidden sm:table-cell'>{index + 1}</td>

                    <td className='md:px-4 px-2 py-3 flex items-center space-x-3'>
                      <img src={item.student.imageUrl} alt="image" className='w-9 h-9 rounded-full' />
                      <span className='truncate'>{item.student.name}</span>
                    </td>

                    <td className='px-4 py-3 truncate'>{item.courseTitle}</td>

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

export default StudentEnrolled