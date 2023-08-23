'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';


async function getData() {
    const res = await fetch('https://www.themealdb.com/API/JSON/V1/1/RANDOM.PHP/', {
        next: {
            revalidate: 0,
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default function FoodGenerator() {
    const [mealData, setMealData] = useState(null);
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Fetch initial data when component mounts
        (async () => {
            const data = await getData();
            setMealData(data.meals);
        })();
    }, []);

    const handleGenerateNewMeal = async () => {
        const data = await getData();
        setMealData(data.meals);
    };

    const handleSaveData = () => {
        if (mealData && mealData.length > 0 && email) {
            const savedData = {
                email: email,
                mealName: mealData[0].strMeal
            };
            localStorage.setItem('savedEmail', email); // Store email separately for easy retrieval
            localStorage.setItem(email, JSON.stringify(savedData));
        }
    };
    

    return (
        <main>
            <div>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email" 
                />
                <button onClick={handleSaveData}>Save Meal</button>
            </div>
            {mealData && mealData.map((meal) => (
                <div key={meal.idMeal}>
                    <h2>{meal.strMeal}</h2>
                    <img src={meal.strMealThumb} alt={meal.strMeal} />
                </div>
            ))}
            {!mealData && (
                <p className="text-center">Fetching data...</p>
            )}
            {mealData && mealData.length === 0 && (
                <p className="text-center">There are no dishes available, damn!</p>
            )}
            <button onClick={handleGenerateNewMeal}>Generate New Meal</button>
            <Link href="/order/drinks">
                Next
            </Link>
        </main>
    );
}
