'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TimePicker() {
  const [email, setEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerCount, setCustomerCount] = useState(1);

  useEffect(() => {
    // Get email from localStorage
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('savedEmail') || '';
      setEmail(savedEmail);
    }
  }, []);

  // Increment and decrement functions
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
        date: selectedDate,
        time: selectedTime,
        customer: customerCount,
      };

      localStorage.setItem(email, JSON.stringify(savedData));
    }
  };

  return (
<main className=" min-h-screen flex flex-col  items-center py-12 max-w-6xl mx-auto"> {/* justify-center */}
<h1 className="text-6xl font-semibold text-center my-10 pb-5 text-main-text">
        Choose Your Drinks
      </h1>
    <div className="bg-time-color/40 p-8 rounded-xl shadow-md space-y-8 w-full max-w-lg">
        <div>
            <label className="block text-gray-300 font-medium mb-2">Date:</label>
            <input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
            />
        </div>

        <div>
            <label className="block text-gray-300 font-medium mb-2">Time:</label>
            <input
                type="time"
                value={selectedTime}
                onChange={e => setSelectedTime(e.target.value)}
                className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
            />
        </div>

        <div className="flex items-center space-x-4">
            <label className="text-gray-300 font-medium mb-2 mr-2">Customer:</label>
            <button
                onClick={decrementCustomer}
                className="bg-gray-300 rounded px-3 py-2 hover:bg-gray-400 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-200 transition"
            >
                -
            </button>
            <input
                type="number"
                value={customerCount}
                readOnly
                className="border rounded px-3 py-2 w-16 text-center"
            />
            <button
                onClick={incrementCustomer}
                className="bg-gray-300 rounded px-3 py-2 hover:bg-gray-400 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-200 transition"
            >
                +
            </button>
        </div>

        <button
            onClick={handleSaveDateTime}
            className="w-full bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200 transition"
        >
            Save Date & Time
        </button>
    </div>

    <Link className="text-blue-500 mt-4 hover:underline focus:outline-none" href="/order/receipt" passHref>
        Receipt
    </Link>
</main>

  );
}
