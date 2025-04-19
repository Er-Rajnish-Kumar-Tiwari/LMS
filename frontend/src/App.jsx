import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './Pages/Student/Home/home'
import CourseList from './Pages/Student/CourseList/courseList'
import CourseDetails from './Pages/Student/CourseDetails/courseDetails'
import MyEnrollments from './Pages/Student/MyEnrollments/myEnrollments'
import Players from './Pages/Student/Players/players'
import Loading from './Components/Student/Loading/loading'
import EducatorInfo from './Pages/Educator/EducatorInfo/educatorInfo'
import Dashboard from './Pages/Educator/Dashboard/dashboard'
import AddCourse from './Pages/Educator/AddCourse/addCourse'
import MyCourse from './Pages/Educator/MyCourse/myCourse'
import StudentEnrolled from './Pages/Educator/StudentEnrolled/studentEnrolled'
import Navbar from './Components/Student/Navbar/navbar'
import "quill/dist/quill.snow.css";

const App = () => {

  const isEducator=useMatch("/educator/*");

  return (
    <div className='text-default min-h-screen bg-white'>
      
      {!isEducator && <Navbar/>}

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/course-list' element={<CourseList />} />
        <Route path='/course-list/:input' element={<CourseList />} />
        <Route path='/course-details/:id' element={<CourseDetails />} />
        <Route path='/my-enrollment' element={<MyEnrollments />} />
        <Route path='/players/:courseId' element={<Players />} />
        <Route path='/loading/:path' element={<Loading />} />

        <Route path='/educator' element={<EducatorInfo />}>

          <Route path='dashboard' element={<Dashboard />} />
          <Route path='add-course' element={<AddCourse />} />
          <Route path='my-course' element={<MyCourse />} />
          <Route path='student-enrolled' element={<StudentEnrolled />} />

        </Route>

      </Routes>
    </div>
  )
}

export default App