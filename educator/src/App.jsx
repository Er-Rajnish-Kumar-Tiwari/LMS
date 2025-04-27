import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EducatorInfo from './Pages/Educator/EducatorInfo/educatorInfo';
import Dashboard from './Pages/Educator/Dashboard/dashboard';
import AddCourse from './Pages/Educator/AddCourse/addCourse';
import MyCourse from './Pages/Educator/MyCourse/myCourse';
import StudentEnrolled from './Pages/Educator/StudentEnrolled/studentEnrolled';
import "quill/dist/quill.snow.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='text-default min-h-screen bg-white'>

        <Routes>
          <Route path='/educator' element={<EducatorInfo />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='add-course' element={<AddCourse />} />
            <Route path='my-course' element={<MyCourse />} />
            <Route path='student-enrolled' element={<StudentEnrolled />} />
          </Route>
        </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;
