    import React, { useState } from 'react';
    import BlurCircle from './BlurCircle';
    import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
    import toast from 'react-hot-toast';
    import { useNavigate } from 'react-router-dom';

    const DateSelect = ({ dateTime = {}, id }) => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);

    const onBookHandler = () => {
        if (!selected) {
        return toast.error('Please select a date');
        }
        navigate(`/movies/${id}/${selected}`);
        scrollTo(0, 0);
    };

    const dateKeys = Object.keys(dateTime);

    return (
        <div id="dateSelect" className="pt-30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg">
            <BlurCircle top="-100px" left="-100px" />
            <BlurCircle top="100px" right="0px" />

            <div className="w-full">
            <p className="text-xl font-semibold text-white">Choose Date</p>

            {dateKeys.length === 0 ? (
                <p className="text-sm text-red-400 mt-4">No available dates to select.</p>
            ) : (
                <div className="flex items-center gap-6 text-base mt-5">
                <ChevronLeftIcon width={28} />
                <div className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
                    {dateKeys.map((date) => (
                    <button
                        onClick={() => setSelected(date)}
                        key={date}
                        className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer transition-all ${
                        selected === date
                            ? 'bg-primary text-white'
                            : 'border border-primary/70 hover:bg-primary/20 text-white'
                        }`}
                    >
                        <span className="text-lg font-bold">{new Date(date).getDate()}</span>
                        <span className="text-sm">
                        {new Date(date).toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                    </button>
                    ))}
                </div>
                <ChevronRightIcon width={28} />
                </div>
            )}
            </div>

            <button
            onClick={onBookHandler}
            className="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer"
            >
            Book Now
            </button>
        </div>
        </div>
    );
    };

    export default DateSelect;
