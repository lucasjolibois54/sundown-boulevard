'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

async function getDrinks() {
    const res = await fetch('https://api.punkapi.com/V2/BEERS');

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default function Drink() {
    const [drinksData, setDrinksData] = useState([]);
    const [selectedDrinks, setSelectedDrinks] = useState([]);
    const [email, setEmail] = useState('');

    useEffect(() => {
        (async () => {
            const drinks = await getDrinks();
            setDrinksData(drinks);
        })();

        if (typeof window !== 'undefined') {
            const savedEmail = localStorage.getItem('savedEmail') || '';
            setEmail(savedEmail);
        }
    }, []);

    const handleDrinkSelection = (drink) => { // argument
        setSelectedDrinks(prevDrinks => {
            if (prevDrinks.some(d => d.id === drink.id)) {
                return prevDrinks.filter(d => d.id !== drink.id);
            } else {
                return [...prevDrinks, { id: drink.id, name: drink.name }];
            }
        });
    };

    const handleSaveToLocalStorage = () => {
        if (typeof window !== 'undefined') {
            let savedData = localStorage.getItem(email) ? JSON.parse(localStorage.getItem(email)) : {};
    
            // Preserve existing data (only update/add the drinks key)
            savedData = {
                ...savedData,
                drinks: selectedDrinks
            };
    
            localStorage.setItem(email, JSON.stringify(savedData));
        }
    };
    

    return (
        <main className="bg-gray-100 min-h-screen py-12 px-4 sm:px-8">
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {drinksData.map((drink) => (
                    <div key={drink.id} className="bg-white shadow-md rounded-lg transition transform hover:scale-105">
                        <img 
                            src={drink.image_url} 
                            alt={drink.tagline}
                            className="w-full h-48 object-cover rounded-t-lg" 
                        />
                        <div className="p-6">
                            <h2 className="text-lg sm:text-xl font-semibold mb-2">{drink.name}</h2>
                            <input 
                                type="checkbox" 
                                onChange={() => handleDrinkSelection(drink)} 
                                className="mr-2"
                            />
                            Select
                        </div>
                    </div>
                ))}
            </div>

            {drinksData.length === 0 && (
                <p className="text-center text-gray-600 font-semibold text-xl mt-6">
                    There are no drinks available.
                </p>
            )}

            <div className="text-center mt-6">
                <button onClick={handleSaveToLocalStorage} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Save Selected Drinks
                </button>
            </div>
            <Link href="/order/date">
                Next
            </Link>
        </main>
    );
}
