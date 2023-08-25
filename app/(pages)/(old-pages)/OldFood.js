"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

async function getData() {
  const res = await fetch(
    "https://www.themealdb.com/API/JSON/V1/1/RANDOM.PHP/",
    {
      next: {
        revalidate: 0,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function FoodGenerator() {
  const [mealData, setMealData] = useState(null);
  const [email, setEmail] = useState("");

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
      localStorage.setItem("savedEmail", email); // Store email separately for easier retrieval
      localStorage.setItem(email, JSON.stringify(savedData));
    }
  };

  return (
    <>
      <main className="min-h-screen">
        <div className="pt-28 sm:pt-20 flex flex-col w-full lg:flex-row mb-4">
          {/* Max width container, center aligned, with some padding */}
          <div className="max-w-6xl mx-auto lg:px-0 sm:px-6 sm:py-8">
            {/* <!-- Grid columns + some font styles for the children elements to inherit --> */}
            <div className="font-medium leading-7 space-y-2 sm:grid sm:grid-cols-2 lg:grid-cols-2 sm:gap-4 sm:space-y-0">
              {/* <!-- Grid cell #1 --> */}
              <div className="mt-0 space-y-4">
                {mealData ? (
                  mealData.map((meal) => (
                    <div
                      key={meal.idMeal}
                      className="bg-white rounded-lg p-4 relative"
                    >
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="w-screen !h-[100%] object-cover rounded"
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-center">Fetching data...</p>
                )}
                {mealData && mealData.length === 0 && (
                  <p className="text-center">There are no dishes available.</p>
                )}
              </div>

              {/* <!-- Grid cell #2 --> */}
              <div className=" py-3 sm:px-6 md-lg:ml-0 xl:ml-0 md-lg:mt-10 xl:mt-10 rounded">
                <div className="mt-0 space-y-0">
                  {mealData ? (
                    mealData.map((meal) => (
                      <div key={meal.idMeal} className=" p-4 relative">
                        <h2 className="sm:!leading-tight pt-4 sm:mt-5 text-6xl xsm:text-5xl sm:text-6xl md-lg:text-5xl lg:text-6xl font- stroke-title">
                          {meal.strMeal.substring(0, 12)}...
                        </h2>
                        <p className="text-base md:text-lg text-dark-text pt-5 lg:px-24 lg:pl-0 lg:pr-20 max-w-2xl font-light mt-2">
                          {meal.strInstructions.substring(0, 400)}...
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center">Fetching data...</p>
                  )}
                  {mealData && mealData.length === 0 && (
                    <p className="text-center">
                      There are no dishes available.
                    </p>
                  )}
                  <div className="flex">
                    <button
                      onClick={handleGenerateNewMeal}
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
        </div>
        <div className="relative flex py-5 px-10 max-w-6xl mx-auto items-center">
          <div className="flex-grow border-t h-6 border-gray-400"></div>
        </div>
      </main>
    </>
  );
}
