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
    <main className="min-h-screen flex flex-col justify-center items-center py-16">
      <div className="bg-white rounded-lg shadow-lg p-8 space-y-4 w-full max-w-md">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Food Generator</h1>
          <Link className="text-blue-600" href="/order/drinks">
            Next
          </Link>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="border rounded p-2 w-full focus:outline-none focus:border-blue-400"
        />
        <button
          onClick={handleSaveData}
          className="w-full bg-blue-600 text-white rounded py-2 px-4 hover:bg-blue-700 focus:outline-none"
        >
          Save Meal
        </button>
        <button
          onClick={handleGenerateNewMeal}
          className="w-full bg-green-500 text-white rounded py-2 px-4 hover:bg-green-600 focus:outline-none"
        >
          Generate New Meal
        </button>
      </div>
      <div className="mt-8 space-y-4">
        {mealData ? (
          mealData.map((meal) => (
            <div key={meal.idMeal} className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold mb-2">{meal.strMeal}</h2>
              <img src={meal.strMealThumb} alt={meal.strMeal} className="rounded" />
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
