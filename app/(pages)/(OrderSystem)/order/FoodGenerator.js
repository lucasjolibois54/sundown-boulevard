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
      <main className="min-h-screen">
        <div className="pt-28 sm:pt-20 flex flex-col w-full lg:flex-row mb-4">
          <div className="max-w-6xl mx-auto lg:px-0 sm:px-6 sm:py-8">
            <div className="font-medium leading-7 space-y-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0">
                {mealData.map((meal) => (
                  <div
                    key={meal.idMeal}
                    className={`bg-white rounded-lg p-4 relative ${selectedMeal && selectedMeal.idMeal === meal.idMeal ? 'border-2 border-blue-300' : ''}`}
                    onClick={() => setSelectedMeal(meal)}
                  >
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="w-screen !h-[100%] object-cover rounded"
                    />
                    <h2 className="text-lg mt-2">
                        {meal.strMeal.substring(0, 12)}...
                    </h2>
                    <p className="text-sm mt-2">
                        {meal.strInstructions.substring(0, 100)}...
                    </p>
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
