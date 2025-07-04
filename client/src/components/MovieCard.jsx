    import { StarIcon } from 'lucide-react';
    import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import timeFormat from '../lib/timeFormat';

    const MovieCard = ({ movie }) => {
    const navigate = useNavigate();

    return (
        <div
        className='flex flex-col justify-between p-4 bg-gray-900 rounded-2xl shadow-lg 
                    hover:-translate-y-1 hover:shadow-xl transition-transform duration-300 
                    w-[16.5rem] text-white'
        >
        <img
            onClick={() => {
            navigate(`/movies/${movie._id}`);
            scrollTo(0, 0);
            }}
            src={movie.backdrop_path}
            alt={movie.title}
            className='rounded-xl h-52 w-full object-cover object-center cursor-pointer'
        />

        <div className='mt-3 space-y-1'>
            <h3 className='font-semibold text-lg truncate'>{movie.title}</h3>

            <p className='text-sm text-gray-400'>
            {new Date(movie.release_date).getFullYear()} •{" "}
            {movie.genres.slice(0, 2).map((genre) => genre.name).join(" | ")} •{" "}
            {timeFormat(movie.runtime)}
            </p>
        </div>

        <div className='flex items-center justify-between mt-4'>
            <button
            onClick={() => {
                navigate(`/movies/${movie._id}`);
                scrollTo(0, 0);
            }}
            className='px-4 py-2 text-sm bg-primary hover:bg-primary-dull 
                        transition-colors duration-200 rounded-full font-medium'
            >
            Buy Tickets
            </button>

            <span className='flex items-center gap-1 text-sm text-gray-300'>
            <StarIcon className='w-4 h-4 text-yellow-400 fill-yellow-400' />
            {movie.vote_average.toFixed(1)}
            </span>
        </div>
        </div>
    );
    };

    export default MovieCard;
