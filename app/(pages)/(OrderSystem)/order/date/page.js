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
    <main className="bg-gray-100 min-h-screen flex flex-col justify-center items-center py-8">
      <h1 className="text-3xl font-semibold mb-4">Pick a Date and Time</h1>

      <div className="my-4">
        <label className="block mb-2">Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className="border rounded px-2 py-1 w-40 focus:outline-none focus:border-blue-400"
        />
      </div>

      <div className="my-4">
        <label className="block mb-2">Time:</label>
        <input
          type="time"
          value={selectedTime}
          onChange={e => setSelectedTime(e.target.value)}
          className="border rounded px-2 py-1 w-40 focus:outline-none focus:border-blue-400"
        />
      </div>

      <div className="my-4 flex items-center space-x-4">
        <label className="block mb-2">Customer:</label>
        <button
          onClick={decrementCustomer}
          className="bg-gray-300 rounded px-2 py-1 focus:outline-none"
        >
          -
        </button>
        <input
          type="number"
          value={customerCount}
          readOnly
          className="border rounded px-2 py-1 w-16 text-center"
        />
        <button
          onClick={incrementCustomer}
          className="bg-gray-300 rounded px-2 py-1 focus:outline-none"
        >
          +
        </button>
      </div>

      <button
        onClick={handleSaveDateTime}
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none"
      >
        Save Date & Time
      </button>
      <Link className="text-blue-500 mt-2 hover:underline focus:outline-none" href="/order/receipt" passHref>
      Receipt
      </Link>
    </main>
  );
}



/*'use client';
import React, { useState, useEffect } from 'react';
import Customers from '@/app/components/order/Customers';
import DatePicker from '@/app/components/order/DatePicker';
import SaveButton from '@/app/components/order/SaveButton';

export default function Order() {
    const [email, setEmail] = useState('');
    const [count, setCount] = useState(1);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedEmail = localStorage.getItem('savedEmail') || '';
            setEmail(savedEmail);
        }
    }, []);

    const handleSaveAll = () => {
        if (typeof window !== 'undefined') {
            const savedData = {
                meals: JSON.parse(localStorage.getItem(email)).meals || [], // Retrieve saved drinks data
                drinks: JSON.parse(localStorage.getItem(email)).drinks || [], // Retrieve saved drinks data
                customers: count,
                date: date
            };
            localStorage.setItem(email, JSON.stringify(savedData));
        }
    };

    return (
        <main className="bg-gray-100 min-h-screen py-12 px-4 sm:px-8">
            <div className="max-w-5xl mx-auto">
                <Customers count={count} setCount={setCount} />
                <DatePicker date={date} setDate={setDate} />
                <SaveButton onSave={handleSaveAll} />
            </div>
        </main>
    );
}*/