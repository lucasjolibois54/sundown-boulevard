"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Aos from "aos";
import "aos/dist/aos.css";

import { useCursor } from "@/cursor/CursorContext";
import SelectedDrink from "@/app/components/order/SelectedDrink";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

async function getData() {
  const meals = [];
  // Fetch data (loop) as long as there are less than 9
  for (let i = 0; i < 9; i++) {
    const res = await fetch(
      "https://www.themealdb.com/API/JSON/V1/1/RANDOM.PHP/"
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    meals.push(data.meals[0]); // Push the first meal data from API into 'meals' array
  }
  return meals;
}

export default function FoodGenerator() {
  const [mealData, setMealData] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { setCursorText, setCursorVariant } = useCursor();
  const [isEmailSaved, setIsEmailSaved] = useState(false);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    localStorage.setItem("savedEmail", newEmail);
  };

  // Function to fetch meals data and handle loading state
  const fetchMeals = async () => {
    let isMounted = true;

    setIsLoading(true);
    try {
      const meals = await getData(); // Fetch meal data

      if (isMounted) {
        setMealData(meals); // Update meal data state

        // Delay loading
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

  // useEffect to fetch meals data on component mount
  useEffect(() => {
    Aos.init({ duration: 1000 });

    let isMounted = true;

    // Function to fetch meals data and update state
    const fetchMeals = async () => {
      setIsLoading(true);
      try {
        const meals = await getData(); // Fetch meal data

        if (isMounted) {
          setMealData(meals); // Update meal data state

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

    // Initialize meal data
    fetchMeals();

    // Clean up function (set isMounted to false when unmounts)
    return () => {
      isMounted = false;
    };
  }, []); // Empty array (useEffect runs only on mount)

  // useEffect to update the email saved status
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail && savedEmail === email) {
      setIsEmailSaved(true);
    } else {
      setIsEmailSaved(false);
    }
  }, [email]);

  // Save selected meal to localStorage
  const handleSaveData = () => {
    if (selectedMeal && email) {
      // Fetch existing data
      const existingData = JSON.parse(localStorage.getItem(email) || "{}");

      // Update only the relevant fields (meal data)
      const updatedData = {
        ...existingData,
        email: email,
        mealId: selectedMeal.idMeal,
        mealName: selectedMeal.strMeal,
      };

      localStorage.setItem("savedEmail", email);
      localStorage.setItem(email, JSON.stringify(updatedData));
    }
  };

  // Save selected meal to localStorage
  /*const handleSaveData = () => {
  if (selectedMeal && email) {
    // Update "savedEmail" to the currently entered email
    const savedEmail = email;
    localStorage.setItem("savedEmail", savedEmail);

    // Fetch existing data
    const existingData = JSON.parse(localStorage.getItem(savedEmail) || '{}');

    // Update only the relevant fields (meal data)
    const updatedData = {
      ...existingData,
      email: savedEmail,
      mealId: selectedMeal.idMeal,
      mealName: selectedMeal.strMeal,
    };

    localStorage.setItem(savedEmail, JSON.stringify(updatedData));
  }
};*/

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
        <div className="flex flex-col md:flex-row items-center justify-between mb-5">
          <div className="border-b-2 border-gray-500 flex-grow mb-5 md:mb-0 md:mr-5">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange} // Use the new handler
              placeholder="Enter order email"
              className="border-none outline-none bg-transparent text-gray-300 flex-grow p-2 text-xl font-semibold input-search italic"
            />
          </div>
          <div>
            <div className="flex space-x-2">
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
                href="/order/drinks"
                onClick={(e) => {
                  if (!emailRegex.test(email)) {
                    e.preventDefault();
                    alert("Please enter a valid email address.");
                  } else {
                    handleSaveData();
                  }
                }}
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
        </div>

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
                /*<div
                  key={meal.idMeal}
                  className={`rounded-lg transition transform hover:scale-105 h-96 relative ${
                    selectedMeal && selectedMeal.idMeal === meal.idMeal
                      ? "border-2 border-blue-300"
                      : ""
                  }`}*/
                <div
                  onMouseEnter={() => {
                    setCursorText("Add");
                    setCursorVariant("addCart");
                  }}
                  onMouseLeave={() => {
                    setCursorText("");
                    setCursorVariant("default");
                  }}
                  key={meal.idMeal}
                  className={`rounded-lg transition transform hover:scale-105 h-96 relative cursor-pointer`}
                  onClick={() =>
                    setSelectedMeal(
                      selectedMeal && selectedMeal.idMeal === meal.idMeal
                        ? null
                        : meal
                    )
                  }
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-96 object-cover rounded-md"
                  />
                  {selectedMeal && selectedMeal.idMeal === meal.idMeal && (
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
                  {selectedMeal && selectedMeal.idMeal === meal.idMeal && (
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
            {/* <Link href="/order/drinks">
              <button
                onClick={handleSaveData}
                className="ml-2 -mb-1 px-4 py-2 bg-blue-300 text-black rounded decoration-8"
              >
                Choose Drinks
              </button>
            </Link> */}
            <Link
              onMouseEnter={() => {
                setCursorText("");
                setCursorVariant("time");
              }}
              onMouseLeave={() => {
                setCursorText("");
                setCursorVariant("default");
              }}
              href="/order/drinks"
              onClick={handleSaveData}
              className="text-center hover:cursor-none relative inline-flex items-center justify-center px-7 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 border-gray-800 border-2 hover:BORDER-bgColorDark rounded-lg group"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-main-color rounded-full group-hover:w-72 group-hover:h-72"></span>
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
              <span className="relative">Choose Delivery Time</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
