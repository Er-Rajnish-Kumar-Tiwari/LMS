import React from 'react'
import { assets, dummyTestimonial } from '../../../assets/assets'

const TestMonial = () => {
  return (
    <div className='pb-14 px-8 md:px-0'>

      <h2 className='text-3xl font-medium text-gray-900'>Testimonials</h2>
      <p className='md:text-base text-gray-600 mt-3'>Hear from our learners as they share their journeys of <br/> transformation, success, and how our platform has made a difference in their lives.</p>
      
      <div className='grid grid-cols-auto gap-8 mt-14'>
        {dummyTestimonial.map((test,index)=>{
          return(

            <div key={index} className='text-sm text-left border border-gray-600/30 pb-6 rounded-lg bg-white shadow [0px_4px_15px_0px] shadow-black/5 overflow-hidden mx-2'>
              <div className='flex items-center gap-4 px-5 py-4 bg-gray-600/10'>
                <img className='h-12 w-12 rounded-full' src={test.image} alt={test.name} />

                <div>
                  <h1 className='text-lg font-medium text-gray-900 '>{test.name}</h1>
                  <p className='text-gray-900/80'>{test.role}</p>
                </div>

              </div>

                <div className='p-5 pb-7'>
                  <div className='flex gap-0.5'>
                    {[...Array(5)].map((_,i)=>(<img className='h-1000' src={i<Math.floor(test.rating)?assets.star : assets.star_blank} alt='star' key={i}/>))}
                  </div>
                  <p className='text-gray-600 mt-5'>{test.feedback}</p>
                </div>

                <a href="#" className='text-blue-600 underline px-5'>Read more</a>
            </div>
          )

        })}
      </div>

    </div>
  )
}

export default TestMonial