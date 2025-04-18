import React from 'react'
import Hero from '../../../Components/Student/Hero/hero'
import Companies from '../../../Components/Student/Companies/companies'
import CourseSection from '../../../Components/Student/CourseSection/courseSection'
import TestMonial from '../../../Components/Student/TestiMonial/testMonial'
import CallToAction from '../../../Components/Student/CallToAction/callToAction'
import Footer from '../../../Components/Student/Footer/footer'

const Home = () => {

  return (
    <div className='flex flex-col items-center text-center scale-y-7'>
      <Hero/>
      <Companies/>
      <CourseSection/>
      <TestMonial/>
      <CallToAction/>
      <Footer/>
    </div>
  )
}

export default Home