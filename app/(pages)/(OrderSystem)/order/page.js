import React from 'react'
import FoodGenerator from './FoodGenerator'

export default function Order() {
  return (
    <div className='className="max-w-6xl mx-auto"'>
      <FoodGenerator/>
    </div>
  )
}




/*
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

async function getData() {
  const res = await fetch('https://www.themealdb.com/API/JSON/V1/1/RANDOM.PHP/', {
    next: {
      revalidate: 0,
    },
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
        mealName: mealData[0].strMeal,
      };
      localStorage.setItem('savedEmail', email); // Store email separately for easier retrieval
      localStorage.setItem(email, JSON.stringify(savedData));
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center  py-16">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Food Generator</h1>
      <Link className="text-blue-600" href="/order/drinks">
        Next
      </Link>
    </div>
    
    <div className="w-4/6 mx-auto flex items-center border-b-2 border-gray-500">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="border-none outline-none flex-grow p-2 text-6xl font-semibold input-search italic"
      />
      <button
        onClick={handleSaveData}
        className="ml-2 -mb-1 px-4 py-2 bg-red-500 text-white rounded decoration-8"
      >
        Save Meal
      </button>
      <button
        onClick={handleGenerateNewMeal}
        className="ml-2 -mb-1 px-4 py-2 bg-gray-300 text-black rounded decoration-8"
      >
        Generate New Meal
      </button>
    </div>

    <div className="mt-0 space-y-4">
      {mealData ? (
        mealData.map((meal) => (
          <div key={meal.idMeal} className="bg-white rounded-lg shadow p-4 relative">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-screen !h-[40vh] object-cover rounded" />
            <h2 className="text-xl font-semibold mb-2">{meal.strMeal}</h2>
          </div>
        ))
      ) : (
        <p className="text-center">Fetching data...</p>
      )}
      {mealData && mealData.length === 0 && (
        <p className="text-center">There are no dishes available.</p>
      )}
    </div>
</main>

  );
}
 */