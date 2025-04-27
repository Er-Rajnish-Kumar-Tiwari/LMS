import React, { useState } from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './Pages/Student/Home/home'
import CourseList from './Pages/Student/CourseList/courseList'
import CourseDetails from './Pages/Student/CourseDetails/courseDetails'
import MyEnrollments from './Pages/Student/MyEnrollments/myEnrollments'
import Players from './Pages/Student/Players/players'
import Loading from './Components/Student/Loading/loading'
import Navbar from './Components/Student/Navbar/navbar'
import "quill/dist/quill.snow.css";
import Login from './Components/Student/Login/login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [showLogin,setShowLogin]=useState(false);
  const isEducator=useMatch("/educator/*");

  return (
    <div className='text-default min-h-screen bg-white'>
      
      {showLogin ? <Login setShowLogin={setShowLogin}/> : <></>}
      {!isEducator && <Navbar setShowLogin={setShowLogin} />}
      <ToastContainer/>

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/course-list' element={<CourseList />} />
        <Route path='/course-list/:input' element={<CourseList />} />
        <Route path='/course-details/:id' element={<CourseDetails />} />
        <Route path='/my-enrollment' element={<MyEnrollments />} />
        <Route path='/players/:courseId' element={<Players />} />
        <Route path='/loading/:path' element={<Loading />} />

      </Routes>
    </div>
  )
}

export default App