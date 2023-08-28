
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function TimePicker() {
  const [email, setEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [customerCount, setCustomerCount] = useState(1);
  const [showTimeModal, setShowTimeModal] = useState(false);

  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('savedEmail') || '';
      setEmail(savedEmail);
    }
  }, []);

  const handleDateSelect = ({ start }) => {
    setSelectedDate(start);
    setShowTimeModal(true);
  };

  const handleTimeSelect = (time) => {
    const dateTime = moment(`${selectedDate.toISOString().split('T')[0]} ${time}`);
    setSelectedTime(dateTime);
    setShowTimeModal(false);
  };

  const handleSaveDateTime = () => {
    if (selectedDate && selectedTime) {
      let savedData = localStorage.getItem(email) ? JSON.parse(localStorage.getItem(email)) : {};
  
      savedData = {
        ...savedData,
        date: moment(selectedDate).format('YYYY-MM-DD'),
        time: selectedTime.format('HH:mm'),
        customer: customerCount,
      };
  
      localStorage.setItem(email, JSON.stringify(savedData));
    }
  };
  

 /* const handleSaveDateTime = () => {
    if (selectedDate && selectedTime) {
      let savedData = {
        date: selectedDate.toISOString().split('T')[0],  // Saves the date in 'YYYY-MM-DD' format
        time: selectedTime.format('HH:mm'),
        customer: customerCount,
      };

      localStorage.setItem(email, JSON.stringify(savedData));
    }
  };*/

  return (
    <main className="min-h-screen flex flex-col items-center py-12 max-w-6xl mx-auto">
      <h1 className="text-6xl font-semibold text-center my-10 pb-5 text-white">
        Delivery Informations
      </h1>

      <div className="p-8 rounded-xl shadow-2xl space-y-8 w-full bg-white bg-opacity-10 backdrop-blur-md">
        <div className="react-calendar shadow-lg rounded-lg overflow-hidden">
          {/* <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            views={['month']}
            events={[]}
            style={{ height: "700px" }}
            onSelectSlot={handleDateSelect}
            selectable={true}
            dayPropGetter={(date) => {
              if (selectedDate && moment(date).isSame(selectedDate, 'day')) {
                return {
                  style: {
                    backgroundColor: '#007DDB',
                  },
                };
              }
            }}
          /> */}
          <Calendar
  localizer={localizer}
  defaultDate={new Date()}
  defaultView="month"
  views={['month']}
  events={[]}
  style={{ height: "700px" }}
  onSelectSlot={handleDateSelect}
  selectable={true}
  dayPropGetter={(date) => {
    if (selectedDate && moment(date).isSame(selectedDate, 'day')) {
      return {
        style: {
          backgroundColor: '#007DDB',
        },
      };
    }
  }}
  components={{
    toolbar: (toolbarProps) => {
      return (
        <div className="rbc-toolbar">
          <span className="rbc-btn-group">
            <button onClick={() => toolbarProps.onNavigate('PREV')}>Back</button>
            <button onClick={() => toolbarProps.onNavigate('NEXT')}>Next</button>
          </span>
          <span className="rbc-toolbar-label">{toolbarProps.label}</span>
          <span className="rbc-btn-group !text-gray-900 text-center">
            <div className='flex gap-3'>
          <div className="flex items-center space-x-4 border-2 border-none px-2 py-1 rounded-lg ">
          <label className="text-gray-300 font-medium mt-1 mr-2">Customer:</label>
          <button
            onClick={() => setCustomerCount(prev => prev - 1)}
            className="!bg-gray-700 !text-white !rounded !px-3 !py-2 !hover:bg-gray-600 !active:bg-gray-800 !focus:outline-none !focus:ring !focus:ring-gray-200 !transition-shadow !shadow-md"
          >
            -
          </button>
          <input
            type="number"
            value={customerCount}
            readOnly
            className="border rounded px-3 py-1 pr-2 w-16 text-center shadow-md bg-transparent text-white"
          />
          <button
            onClick={() => setCustomerCount(prev => prev + 1)}
            className="!bg-gray-700 !text-white !rounded !px-3 !py-2 !hover:bg-gray-600 !active:bg-gray-800 !focus:outline-none !focus:ring !focus:ring-gray-200 !transition-shadow !shadow-md"
          >
            +
          </button>
        </div>
        <Link
              href="/order/receipt"
              onClick={handleSaveDateTime}
              class="hover:cursor-none relative inline-flex items-center justify-center px-7 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 border-gray-400 border-2 hover:BORDER-bgColorDark rounded-lg group"
            >
              <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-main-color rounded-full group-hover:w-72 group-hover:h-72"></span>
              <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
              <span class="relative">Complete Order</span>
            </Link>
        </div>
          </span>
        </div>
      );
    }
  }}
/>

        </div>
        
        {/* Modal for time slot selection */}
        {showTimeModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white rounded p-4 space-y-4">
                <h2 className="text-xl font-semibold mb-2">Select a time slot:</h2>
                {timeSlots.map((time, index) => (
                  <button key={index} onClick={() => handleTimeSelect(time)} className="w-full bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-500 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200 transition-shadow shadow-md">
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* <div className="flex items-center space-x-4 hidden">
          <label className="text-gray-300 font-medium mb-2 mr-2">Customer:</label>
          <button
            onClick={() => setCustomerCount(prev => prev - 1)}
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
            onClick={() => setCustomerCount(prev => prev + 1)}
            className="bg-gray-700 text-white rounded px-3 py-2 hover:bg-gray-600 active:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-200 transition-shadow shadow-md"
          >
            +
          </button>
        </div> */}
        
        {/* <button
          onClick={handleSaveDateTime}
          className=" w-full mt-4 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-500 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200 transition-shadow shadow-md"
        >
          Save Date & Time
        </button> */}
        
        {/* <div className="mt-6 text-white">
          <p><strong>Selected Date:</strong> {selectedDate?.toDateString()}</p>
          <p><strong>Selected Time:</strong> {selectedTime?.format('HH:mm')}</p>
          <p><strong>Customer Count:</strong> {customerCount}</p>
        </div>
        
        <Link className="text-blue-400 mt-4 hover:underline focus:outline-none" href="/order/receipt" passHref>
          Receipt
        </Link> */}
      </div>
    </main>
  );
}
