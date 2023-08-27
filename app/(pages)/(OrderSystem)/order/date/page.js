'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function TimePicker() {
  const [email, setEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [customerCount, setCustomerCount] = useState(1);
  const [currentViewedMonth, setCurrentViewedMonth] = useState(moment().month());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('savedEmail') || '';
      setEmail(savedEmail);
    }
  }, []);

  const handleDateSelect = ({ start }) => {
    setSelectedDate(start);
  };

  const handleNavigate = (newDate, view, action) => {
    if (moment(newDate).isSame(new Date(), 'day') && action === "TODAY") {
      setSelectedDate(newDate);
    } else if (moment(newDate).month() !== currentViewedMonth) {
      setSelectedDate(null);
      setCurrentViewedMonth(moment(newDate).month());
    }
  };

  const incrementCustomer = () => setCustomerCount(prev => prev + 1);
  const decrementCustomer = () => {
    if (customerCount > 1) {
      setCustomerCount(prev => prev - 1);
    }
  };

  const handleSaveDateTime = () => {
    if (typeof window !== 'undefined' && selectedDate && selectedTime) {
      let savedData = localStorage.getItem(email) ? JSON.parse(localStorage.getItem(email)) : {};

      savedData = {
        ...savedData,
        date: selectedDate.toISOString().split('T')[0],  // Saves the date in 'YYYY-MM-DD' format
        time: selectedTime,
        customer: customerCount,
      };

      localStorage.setItem(email, JSON.stringify(savedData));
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center py-12 max-w-6xl mx-auto"> {/*  bg-gradient-to-br from-purple-600 to-indigo-700 */}
      <h1 className="text-6xl font-semibold text-center my-10 pb-5 text-white">
        Choose Delivery Time
      </h1>
      <div className="p-8 rounded-xl shadow-2xl space-y-8 w-full  bg-white bg-opacity-10 backdrop-blur-md">
        <div className="react-calendar shadow-lg rounded-lg overflow-hidden">
          <Calendar
          className='w-full text-white my-custom-calendar'
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            views={['month']}
            events={[]}
            style={{ height: "700px"}}
            onSelectSlot={handleDateSelect}
            selectable={true}
            onNavigate={handleNavigate}
            dayPropGetter={(date) => {
              if (selectedDate && moment(date).isSame(selectedDate, 'day')) {
                return {
                  style: {
                    backgroundColor: '#007DDB',
                  },
                };
              }
            }}
          />
        </div>
        <div>
          <label className="block text-gray-300 font-medium mb-2">Time:</label>
          <input
            type="time"
            value={selectedTime}
            onChange={e => setSelectedTime(e.target.value)}
            className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition-shadow shadow-md"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-gray-300 font-medium mb-2 mr-2">Customer:</label>
          <button
            onClick={decrementCustomer}
            className="bg-gray-700 text-white rounded px-3 py-2 hover:bg-gray-600 active:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-200 transition-shadow shadow-md"
          >
            -
          </button>
          <input
            type="number"
            value={customerCount}
            readOnly
            className="border rounded px-3 py-2 w-16 text-center shadow-md"
          />
          <button
            onClick={incrementCustomer}
            className="bg-gray-700 text-white rounded px-3 py-2 hover:bg-gray-600 active:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-200 transition-shadow shadow-md"
          >
            +
          </button>
        </div>
        <button
          onClick={handleSaveDateTime}
          className="w-full bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-500 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200 transition-shadow shadow-md"
        >
          Save Date & Time
        </button>
        <div className="mt-6 text-white">
          <p><strong>Selected Date:</strong> {selectedDate?.toDateString()}</p>
          <p><strong>Selected Time:</strong> {selectedTime}</p>
          <p><strong>Customer Count:</strong> {customerCount}</p>
        </div>
        <Link className="text-blue-400 mt-4 hover:underline focus:outline-none" href="/order/receipt" passHref>
          Receipt
        </Link>
      </div>
    </main>
  );
}
