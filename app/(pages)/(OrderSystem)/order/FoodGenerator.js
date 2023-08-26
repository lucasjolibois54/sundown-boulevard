"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  const [isLoading, setIsLoading] = useState(true);

  const fetchMeals = async () => {
    let isMounted = true;

    setIsLoading(true);
    try {
      const meals = await getData();

      if (isMounted) {
        setMealData(meals);

        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      if (isMounted) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;  // This flag denotes the component mount status
  
    const fetchMeals = async () => {
      setIsLoading(true);
      try {
        const meals = await getData();
  
        if (isMounted) {
          setMealData(meals);
  
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
  
    fetchMeals();
  
    // Clean up function to set the isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
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
        <h1 className="text-6xl font-semibold text-center my-10 pb-5 text-main-text">
          Choose Your Meal
        </h1>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading 
            ? Array(9).fill().map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-lg transition transform hover:scale-105 h-96 relative bg-gray-200 animate-pulse"
              >
                <div className="w-full h-2/3 bg-gray-300 rounded-t-lg"></div>
                <div className="w-3/4 h-6 bg-gray-300 my-2 mx-auto"></div>
                <div className="w-1/2 h-4 bg-gray-300 mx-auto"></div>
              </motion.div>
            ))
            : mealData.map((meal) => (
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
            ))
          }
        </div>
        <div className="mt-5">
          <div className="flex">
            <button
              onClick={fetchMeals}
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
        <div className="relative flex py-5 px-10 max-w-6xl mx-auto items-center">
          <div className="flex-grow border-t h-6 border-gray-400"></div>
        </div>
      </main>
    </>
  );
}
