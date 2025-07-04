    import React, { useState, useEffect } from 'react'
    import { dummyBookingData } from '../assets/assets'
    import BlurCircle from '../components/BlurCircle' 
    import timeFormat from '../lib/timeFormat'
    import { dateFormat } from '../lib/dateFormat'

    const MyBookings = () => {
    const currency = import.meta.env.VITE_CURRENCY
    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getMyBookings = async () => {
        setBookings(dummyBookingData)
        setIsLoading(false)
    }

    useEffect(() => {
        getMyBookings()
    }, [])

    return !isLoading ? (
        <div className="relative px-6 md:px-16 lg:px-40 pt-24 min-h-[80vh]">
        <BlurCircle top="100px" left="100px" />
        <BlurCircle bottom="0px" left="600px" />

        <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

        {bookings.map((item, index) => (
            <div
            key={index}
            className="flex flex-col md:flex-row justify-between bg-primary/5 border border-primary/20 rounded-xl p-4 gap-4 mb-6 shadow-sm hover:shadow-md transition"
            >
            {/* Movie Info */}
            <div className="flex gap-4">
                <img
                src={item.show.movie.poster_path}
                alt={item.show.movie.title}
                className="w-32 h-auto rounded-lg object-cover object-bottom"
                />
                <div className="flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-semibold">{item.show.movie.title}</h2>
                    <p className="text-gray-400 text-sm">{timeFormat(item.show.movie.runtime)}</p>
                </div>
                <p className="text-gray-400 text-sm mt-2">{dateFormat(item.show.showDateTime)}</p>
                </div>
            </div>

            {/* Booking Details */}
            <div className="flex flex-col justify-between text-sm md:items-end md:text-right gap-2">
                <div>
                <p>
                    <span className="text-gray-400">Total Tickets:</span> {item.bookedSeats.length}
                </p>
                <p>
                    <span className="text-gray-400">Seat Number:</span> {item.bookedSeats.join(', ')}
                </p>
                <p>
                    <span className="text-gray-400">Amount:</span> {currency}
                    {item.amount}
                </p>
                </div>

                {!item.isPaid && (
                <button className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-dull transition active:scale-95">
                    Pay Now
                </button>
                )}
            </div>
            </div>
        ))}
        </div>
    ) : (
        <div className="flex justify-center items-center min-h-[60vh] text-white">
        Loading seat layout...
        </div>
    )
    }

    export default MyBookings
