"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Aos from "aos";
import "aos/dist/aos.css";

import { useCursor } from "@/cursor/CursorContext";
import SelectedDrink from "@/app/components/order/SelectedDrink";

// Generate the next unique ID for a meal
const getNextId = () => {
  // Fetch the last used ID from localStorage (return string as integer)
  const lastId = parseInt(localStorage.getItem("lastMealId") || "0", 10);
  // Increment the ID by one
  const nextId = lastId + 1;
  // Save the new ID to localStorage for future use
  localStorage.setItem("lastMealId", nextId.toString());
  return nextId; // Return the generated ID
};

// Fetch meal data from API
async function getData(savedMeal) {
  const meals = [];
  if (savedMeal) {
    // if saved meal add first
    meals.push(savedMeal);
  }
  // Fetch data to fill up the util we have 9 meals
  for (let i = meals.length; i < 9; i++) {
    const res = await fetch(
      "https://www.themealdb.com/API/JSON/V1/1/RANDOM.PHP/"
    );
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    meals.push(data.meals[0]);
  }
  return meals;
}

export default function FoodGenerator() {
  const [mealData, setMealData] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setCursorText, setCursorVariant } = useCursor();
  const [isEmailSaved, setIsEmailSaved] = useState(false);
  const [generatedId, setGeneratedId] = useState(null);
  const [emailParam, setEmailParam] = useState(null);

  // Fetch a saved meal from local storage
  const fetchSavedMeal = (id) => {
    const savedData = JSON.parse(localStorage.getItem(id));

    if (savedData.meals) {
      const savedMealData = savedData.meals.map((meal) => ({
        idMeal: meal.mealId,
        strMeal: meal.mealName,
        strMealThumb: meal.strMealThumb || "",
        strInstructions: meal.strInstructions || "",
      }));
      setMealData(savedMealData);
      savedData.meals.forEach((meal) => {
        setSelectedMeal((prevSelectedMeals) => [
          ...prevSelectedMeals,
          {
            idMeal: meal.mealId,
            strMeal: meal.mealName,
            strMealThumb: meal.strMealThumb || "",
            strInstructions: meal.strInstructions || "",
          },
        ]);
      });
    }
  };

  // Fetch meal data and set it in the state
  const fetchMeals = async () => {
    let isMounted = true;
    setIsLoading(true);
    const newMeals = await getData(); // Fetch new meals

    // Merge new meals with existing mealData
    setMealData((prevMealData) => [...prevMealData, ...newMeals]);
    try {
      if (isMounted) {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      if (isMounted) setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initialize the Aos (Animate on scroll)
    Aos.init({ duration: 1000 });
    let isMounted = true; // To avoid setting state on an unmounted component

    const param = new URL(window.location.href).searchParams.get("id");

    setEmailParam(param);

    const fetchAndSetMeals = async () => {
      try {
        // If there's an email param, attempt to fetch the saved meal
        let savedMeal = null;
        if (emailParam) {
          savedMeal = fetchSavedMeal(emailParam);
        }

        // Fetch meals, including the saved one if it exists
        const meals = await getData(savedMeal);
        if (isMounted) {
          setMealData((prevMealData) => [...prevMealData, ...meals]);
          setTimeout(() => {
            setIsLoading(false); // Set the loading state to false after 2 seconds
          }, 2000);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) setIsLoading(false); // If there's an error, set loading to false
      }
    };

    fetchAndSetMeals(); // Call the fetch and set meals function

    // Cleanup for component unmount
    return () => {
      isMounted = false; // When the component is unmounted, set isMounted to false
    };
  }, [emailParam]); // This useEffect runs when the emailParam state changes

  const handleSaveData = () => {
    if (selectedMeal.length > 0) {
      const emailParam = new URL(window.location.href).searchParams.get("id");

      const storageKey = emailParam || getNextId().toString();

      // Get existing data from local storage or initialize as an empty array
      const existingData = JSON.parse(localStorage.getItem(emailParam)) || [];

      // Merge the new meal data with the existing data
      const updatedData = {
        ...existingData,
        meals: [
          ...selectedMeal.map((meal) => ({
            mealId: meal.idMeal,
            mealName: meal.strMeal,
            strMealThumb: meal.strMealThumb,
            strInstructions: meal.strInstructions,
          })),
        ],
      };

      localStorage.setItem(storageKey, JSON.stringify(updatedData));
      setGeneratedId(storageKey);
    }
  };

  const handleToggleMeal = (meal) => {
    setSelectedMeal((prevSelectedMeals) => {
      const mealIndex = prevSelectedMeals.findIndex(
        (index) => index.idMeal === meal.idMeal
      );

      if (mealIndex === -1) {
        // Meal not selected, add it to the selected meals
        return [...prevSelectedMeals, meal];
      } else {
        // Meal already selected, remove it from the selected meals
        const updatedSelectedMeals = [...prevSelectedMeals];
        updatedSelectedMeals.splice(mealIndex, 1);
        return updatedSelectedMeals;
      }
    });
  };

  return (
    <>
      <main
        data-aos="fade-up"
        data-aos-delay="250"
        data-aos-duration="500"
        onMouseEnter={() => {
          setCursorText("");
          setCursorVariant("default");
        }}
        onMouseLeave={() => {
          setCursorText("");
          setCursorVariant("default");
        }}
        className="min-h-screen py-12 px-4 sm:px-8 max-w-5xl mx-auto"
      >
        <h1 className="text-6xl font-semibold text-center my-10 pb-5 text-main-text">
          Choose Your Meal
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-between mb-5"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array(9)
                .fill()
                .map((_, idx) => (
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
                  onMouseEnter={() => {
                    setCursorText("+");
                    setCursorVariant("addCart");
                  }}
                  onMouseLeave={() => {
                    setCursorText("");
                    setCursorVariant("default");
                  }}
                  key={meal.mealName}
                  className={`rounded-lg transition transform hover:scale-105 h-96 relative cursor-pointer`}
                  onClick={() => handleToggleMeal(meal)}
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-96 object-cover rounded-md"
                  />

                  {selectedMeal.some(
                    (selected) => selected.idMeal === meal.idMeal
                  ) && (
                    <div
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        transition: "opacity 10.5s",
                      }}
                      className="absolute top-0 left-0 w-full h-full"
                    ></div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
                  <div className="p-6 !z-10 absolute text-white bottom-0">
                    <h2 className="text-lg sm:text-xl font-semibold mb-0">
                      {meal.strMeal.substring(0, 22)}
                    </h2>
                    <p className="text-sm">
                      {meal.strInstructions.substring(0, 30)}...
                    </p>
                  </div>

                  {selectedMeal.some(
                    (selected) => selected.idMeal === meal.idMeal
                  ) && (
                    <div className="checked-drink-body absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <SelectedDrink text="MEAL CHOSEN - MEAL CHOSEN -" />
                    </div>
                  )}
                </div>
              ))}
        </div>
        <div className="mt-5">
          <div className="flex gap-3 absolute left-1/2 transform -translate-x-1/2 mt-10 pb-20">
            <button
              onMouseEnter={() => {
                setCursorText("");
                setCursorVariant("time");
              }}
              onMouseLeave={() => {
                setCursorText("");
                setCursorVariant("default");
              }}
              onClick={fetchMeals}
              className="hover:cursor-none relative inline-flex items-center justify-center px-7 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white bg-transparent border-gray-400 border-2 hover:border-bgColorDark rounded-lg group"
            >
              <span className="absolute w-0 h-0 transition-all duration-1000 ease-out bg-gray-500 rounded-full group-hover:w-72 group-hover:h-72"></span>
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
              <span className="relative">Generate New Meals</span>
            </button>
            <Link
              onMouseEnter={() => {
                setCursorText("");
                setCursorVariant("time");
              }}
              onMouseLeave={() => {
                setCursorText("");
                setCursorVariant("default");
              }}
              href={`/order/drinks${emailParam ? `?id=${emailParam}` : ""}`}
              onClick={handleSaveData}
              className="text-center hover:cursor-none relative inline-flex items-center justify-center px-7 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 border-gray-800 border-2 hover:BORDER-bgColorDark rounded-lg group"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-main-color rounded-full group-hover:w-72 group-hover:h-72"></span>
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
              <span className="relative">
                {isEmailSaved ? "Update Order" : "Choose Drinks"}
              </span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
