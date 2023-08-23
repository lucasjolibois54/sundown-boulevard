"use client";
import { useState } from "react";

export default function Search() {
  const [email, setEmail] = useState("");
  const [savedData, setSavedData] = useState({});

  const handleGetData = () => {
    const data = localStorage.getItem(email);
    if (data) {
      setSavedData(JSON.parse(data));
    } else {
      setSavedData({});
    }
  };

  return (
    <>
      <main className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen">
        <div className="w-4/6 mx-auto">
          <div className="flex items-center border-b-2 border-gray-500">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border-none outline-none flex-grow p-2 text-6xl font-semibold input-search italic"
            />
            <button
              onClick={handleGetData}
              className="ml-2 -mb-1 px-4 py-2 bg-gray-300 text-black rounded decoration-8"
            >
              <b>→</b>
            </button>
          </div>

          <div className="">
            <div className="bg-gray-200 py-5 px-5 rounded-br-xl rounded-bl-xl absolute w-4/6">
              {savedData.email && (
                <>
                <h2 className="text-4xl font-semibold input-search mb-10">
                {savedData.email ? <p>Order Overview</p> : "Not available"}
              </h2>
                <p>
                {savedData.email ? <p>Email: {savedData.email}</p> : "Not available"}
                </p></>
              )}
              <p>
                {savedData.mealName ? <p>Meal: {savedData.mealName}</p> : "Not available"}
              </p>
                           <p>Date & Time: {savedData.date ? savedData.date.toString() : "Not available"}</p>
            <p>Number of Customers: {savedData.customer ? savedData.customer : "Not available"}</p>

              {savedData.drinks && savedData.drinks.length > 0 && (
                <div>
                  <p>Selected Drinks:</p>
                  <ul>
                    {savedData.drinks.map((drink) => (
                      <div key={drink.id}>
                        {drink.name ? drink.name : "Not available"}
                      </div>
                      /*<div key={drink.id}>
                {drink.name ? <p>Selected Drink: {drink.name}</p> : "Not available"}
              </div>*/
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {!savedData.email &&
            !savedData.date &&
            !savedData.count &&
            (!savedData.drinks || savedData.drinks.length === 0) && (
              <p>No data found for this email.</p>
            )}
        </div>
      </main>
    </>
  );
}
