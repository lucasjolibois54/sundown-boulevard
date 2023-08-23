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
        if (customerCount > 1) {  // Ensure count is never less than 1
            setCustomerCount(prev => prev - 1);
        }
    };

    const handleSaveDateTime = () => {
        if (typeof window !== 'undefined' && selectedDate && selectedTime) {
            let savedData = localStorage.getItem(email) ? JSON.parse(localStorage.getItem(email)) : {};

            // Preserve existing data and update/add the date, time and customer count
            savedData = {
                ...savedData,
                date: selectedDate,
                time: selectedTime,
                customer: customerCount  
            };

            localStorage.setItem(email, JSON.stringify(savedData));
        }
    };

    return (
        <main>
            <h1 className="text-center">Pick a Date and Time</h1>
            
            <div className="my-4">
                <label>Date: </label>
                <input 
                    type="date" 
                    value={selectedDate} 
                    onChange={(e) => setSelectedDate(e.target.value)} 
                />
            </div>

            <div className="my-4">
                <label>Time: </label>
                <input 
                    type="time" 
                    value={selectedTime} 
                    onChange={(e) => setSelectedTime(e.target.value)} 
                />
            </div>

            <div className="my-4">  {/* Counter component */}
                <label>Customer: </label>
                <button onClick={decrementCustomer}>-</button>
                <input 
                    type="number" 
                    value={customerCount} 
                    readOnly 
                />
                <button onClick={incrementCustomer}>+</button>
            </div>

            <button onClick={handleSaveDateTime}>Save Date & Time</button>
            <Link href="/">Home</Link>
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