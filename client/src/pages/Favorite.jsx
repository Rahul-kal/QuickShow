import React from 'react'
import { dummyShowsData } from '../assets/assets'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'

const Favorite = () => {
  return dummyShowsData.length > 0 ? (
    <div className='relative px-6 md:px-16 lg:px-40 xl:px-44 py-20 overflow-hidden min-h-[80vh] text-white'>

      {/* Decorative Blur Circles */}
      <BlurCircle top='150px' left='0px' />
      <BlurCircle bottom='50px' right='50px' />

      {/* Section Heading */}
      <h1 className='text-3xl md:text-4xl font-bold text-center mb-10 py-6'>
        Your Favourite Movies
      </h1>

      {/* Movie Grid */}
      <div className='flex flex-wrap gap-8 justify-center'>
        {dummyShowsData.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center min-h-[80vh] text-center px-4 text-white'>
      <h1 className='text-3xl font-bold mb-2'>No Movies Available</h1>
      <p className='text-gray-400'>Check back later for updated listings.</p>
    </div>
  )
}

export default Favorite
