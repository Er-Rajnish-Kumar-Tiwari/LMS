import React, { useEffect, useState } from 'react'

const Rating = ({ intialRating, onRate }) => {

  const [rating, setRating] = useState(intialRating || 0);

  const handleRating = (value) => {
    setRating(value);

    if (onRate) {
      onRate(value);
    }
  };

  useEffect(() => {

    if (intialRating) {
      setRating(intialRating);
    }

  }, [intialRating])

  return (
    <div className='flex items-center'>

      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;

        return (
          <span onClick={() => handleRating(starValue)} key={index} className={`text-xl sm:text-2xl cursor-pointer transition-colors ${starValue <= rating ? "text-yellow-400" : "text-gray-400"}`}>&#9733;</span>
        )

      })}

      <p className='md:text-base text-xs font-semibold ml-5 text-blue-600'>Your Ratings : {rating}</p>
    </div>
  )
}

export default Rating