import { ArrowRightIcon, ClockIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { assets, dummyShowsData, dummyDateTimeData } from '../assets/assets';
import isoTimeFormat from '../lib/isoTimeFomart';
import BlurCircle from '../components/BlurCircle';
import toast from 'react-hot-toast';

const SeatLayout = () => {
  const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]];

  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const occupiedSeats = []; // For now, assume none. Replace this with real data if needed.
  const navigate = useNavigate();

  const getShow = () => {
    const foundShow = dummyShowsData.find(show => show._id === id);
    if (foundShow) {
      const availableTimes = dummyDateTimeData[date]?.filter(item => item.showId.includes(foundShow._id)) || [];
      setShow({
        ...foundShow,
        timings: availableTimes
      });
    }
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) return toast("Please select time first");
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) return toast("You can select maximum 5 seats");
    if (occupiedSeats.includes(seatId)) return toast("This seat is already booked");

    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(seat => seat !== seatId)
        : [...prev, seatId]
    );
  };

  useEffect(() => {
    getShow();
  }, [id, date]);

  const renderSeats = (row, count = 10) => (
    <div key={row} className="flex gap-4 mt-4 items-center">
      <span className="w-6 text-sm font-medium">{row}</span>
      <div className="flex flex-wrap items-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          const isSelected = selectedSeats.includes(seatId);
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`h-8 w-8 border rounded text-sm transition border-primary/60 hover:bg-primary/20 ${isSelected ? 'bg-primary text-white' : 'bg-transparent'}`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  const bookTickets = async () => {
    try {
      if (!selectedTime || selectedSeats.length === 0) return toast.error('Please select a time and seats');
      // Proceed to checkout logic
      toast.success("Proceeding to checkout...");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return show ? (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-10 md:pt-20">
      {/* Available Timings */}
      <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-6">Available Timings</p>
        <div className="mt-5 space-y-1">
          {(show.timings || []).map((item) => (
            <div
              key={item.time}
              className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${selectedTime?.time === item.time ? 'bg-primary text-white' : 'hover:bg-primary/20'}`}
              onClick={() => setSelectedTime(item)}
            >
              <ClockIcon className="w-4 h-4" />
              <p className="text-sm">{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seats Layout */}
      <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
        <BlurCircle top='-100px' left='-100px' />
        <BlurCircle bottom='0' right='0' />
        <h1 className='text-2xl font-semibold mb-4'>Select your seat</h1>
        <img src={assets.screenImage} alt='screen' />
        <p className='text-gray-400 text-sm mb-6'>SCREEN SIDE</p>

        <div className="flex flex-col items-center mt-12 text-xs text-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-6 sm:gap-8 md:gap-4 lg:gap-6 mb-10 w-full max-w-xl">
            {groupRows[0].map(row => renderSeats(row))}
          </div>

          <div className='grid grid-cols-2 gap-11'>
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>
                {group.map(row => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => navigate('/my-bookings')} className='flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95'>
          Proceed to Checkout
          <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
        </button>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-[60vh] text-white">
      Loading seat layout...
    </div>
  );
};

export default SeatLayout;
