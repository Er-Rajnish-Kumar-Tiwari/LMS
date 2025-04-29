import React from 'react'
import './final.css';
import success from './success.gif';
import { useNavigate } from 'react-router-dom';

const Final = () => {

    const navigate=useNavigate();
  return (
    <div className='final'>
        <img src={success} alt='' className='gif'></img>
        <p>Course Enrolled Successfully</p>
        <button onClick={()=>navigate('/')}>Countinue Enrollments</button>
        <button onClick={()=>navigate('/my-enrollment')}>Your Enrollements</button>
    </div>
  )
}

export default Final