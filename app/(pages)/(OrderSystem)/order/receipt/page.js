'use client';
import { useState, useEffect } from 'react';

export default function Receipt() {
    const [email, setEmail] = useState('');
    const [savedData, setSavedData] = useState({
        mealName: '',
        drinks: [],
        date: '',
        time: '',
        customer: 0
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedEmail = localStorage.getItem('savedEmail') || '';
            setEmail(savedEmail);
            const data = JSON.parse(localStorage.getItem(savedEmail) || '{}');
            setSavedData(data);
        }
    }, []);

    return (
        <main className="bg-gray-100 min-h-screen flex flex-col justify-center items-center py-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-semibold mb-4">Order Summary</h1>

            <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 space-y-4">
                <div className="flex flex-col">
                    <span className="font-semibold">Email:</span>
                    <span>{email}</span>
                </div>

                <div className="flex flex-col">
                    <span className="font-semibold">Meal:</span>
                    <span>{savedData.mealName}</span>
                </div>

                <div className="flex flex-col">
                    <span className="font-semibold">Selected Drinks:</span>
                    <ul>
                        {savedData.drinks.map((drink, idx) => (
                            <li key={idx}>{drink.name}</li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col">
                    <span className="font-semibold">Date:</span>
                    <span>{savedData.date}</span>
                </div>

                <div className="flex flex-col">
                    <span className="font-semibold">Time:</span>
                    <span>{savedData.time}</span>
                </div>

                <div className="flex flex-col">
                    <span className="font-semibold">Customers:</span>
                    <span>{savedData.customer}</span>
                </div>
            </div>
        </main>
    );
}
