import React, { useState } from 'react';
import { dummyTrailers } from '../assets/assets';
import ReactPlayer from 'react-player';
import BlurCircle from './BlurCircle';
import { PlayCircleIcon } from 'lucide-react';

const TrailersSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
      <p className='text-gray-300 font-medium text-lg max-w-[960px] mx-auto'>
        Trailers
      </p>

      <div className='relative mt-6 flex flex-col items-center'>
        <BlurCircle top='-100px' right='-100px' />

        <div className='w-full max-w-[960px] aspect-video'>
          <ReactPlayer
            url={currentTrailer.videoUrl}
            controls={true}
            width='100%'
            height='100%'
            className='react-player rounded-xl overflow-hidden'
          />
        </div>

        {/* Thumbnails */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8 max-w-3xl w-full'>
          {dummyTrailers.map((trailer) => (
            <div
              key={trailer.image}
              onClick={() => setCurrentTrailer(trailer)}
              className='relative h-36 sm:h-40 md:h-44 lg:h-48 rounded-lg overflow-hidden cursor-pointer
                         hover:-translate-y-1 transition duration-300'
            >
              <img
                src={trailer.image}
                alt='trailer'
                className='w-full h-full object-cover brightness-75'
              />
              <PlayCircleIcon
                strokeWidth={1.6}
                className='absolute top-1/2 left-1/2 w-8 h-8 md:w-12 md:h-12
                           transform -translate-x-1/2 -translate-y-1/2 text-white opacity-90'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrailersSection;
