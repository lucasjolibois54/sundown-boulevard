"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

async function getData() {
  const meals = [];
  for (let i = 0; i < 9; i++) {
    const res = await fetch("https://www.themealdb.com/API/JSON/V1/1/RANDOM.PHP/");
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    meals.push(data.meals[0]);
  }
  return meals;
}

export default function FoodGenerator() {
  const [mealData, setMealData] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      const data = await getData();
      setMealData(data);
    })();
  }, []);

  const handleSaveData = () => {
    if (selectedMeal && email) {
      const savedData = {
        email: email,
        mealName: selectedMeal.strMeal,
      };
      localStorage.setItem("savedEmail", email);
      localStorage.setItem(email, JSON.stringify(savedData));
    }
  };

  return (
    <>
      <main className="min-h-screen py-12 px-4 sm:px-8">
      <h1 className="text-6xl font-semibold text-center my-0 pb-5 text-main-text">
        Choose Your Meal
      </h1>
        <div className="pt-28 sm:pt-10 flex flex-col w-full lg:flex-row mb-4">
          <div className="max-w-6xl mx-auto lg:px-0 sm:px-6 sm:py-8">
            <div className="font-medium leading-7 space-y-2 sm:grid sm:grid-cols-3 sm:gap-8 sm:space-y-0">
                {mealData.map((meal) => (
                  <div
                    key={meal.idMeal}
                    className={`rounded-lg transition transform hover:scale-105 h-96 relative ${selectedMeal && selectedMeal.idMeal === meal.idMeal ? 'border-2 border-blue-300' : ''}`}
                    onClick={() => setSelectedMeal(meal)}
                  >
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="w-full h-96 object-cover rounded-md"
                    />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

                    <div className="p-6 !z-10 absolute text-white bottom-0">
                    <h2 className="text-lg sm:text-xl font-semibold mb-0">
                        {meal.strMeal.substring(0, 25)}
                    </h2>
                    <p className="text-sm">
                        {meal.strInstructions.substring(0, 30)}...
                    </p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-5">
              <div className="flex">
                  <button
                    onClick={() => setMealData([])}
                    className="ml-2 -mb-1 px-4 py-2 bg-gray-300 text-black rounded decoration-8"
                  >
                    Generate New Meal
                  </button>
                  <Link href="/order/drinks">
                    <button
                      onClick={handleSaveData}
                      className="ml-2 -mb-1 px-4 py-2 bg-blue-300 text-black rounded decoration-8"
                    >
                      Choose Drinks
                    </button>
                  </Link>
              </div>
              <div className="border-b-2 border-gray-500 w-4/6 flex mt-5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter order email"
                  className="border-none outline-none flex-grow p-2 text-xl font-semibold input-search italic"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex py-5 px-10 max-w-6xl mx-auto items-center">
          <div className="flex-grow border-t h-6 border-gray-400"></div>
        </div>
      </main>
    </>
);
}
