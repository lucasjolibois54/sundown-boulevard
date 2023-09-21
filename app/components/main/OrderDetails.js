"use client";

import React, { useEffect, useState } from "react";

export default function OrderDetails() {
  const [selectedDrinks, setSelectedDrinks] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const emailParam = new URL(window.location.href).searchParams.get("email");
    // If an email param is present, retrieve the saved drinks from local storage
    if (emailParam) {
      setEmail(emailParam);
      const savedData = JSON.parse(localStorage.getItem(emailParam)) || {};
      setSelectedDrinks(savedData.drinks || []);
      setSelectedMeals(savedData.meals || []);
      setSelectedDate(savedData.date || "");
      setSelectedTime(savedData.time || "");
      setSelectedCustomers(savedData.customer || "");
    } else {
      // If no email param, use lastMealId
      const lastMealId = localStorage.getItem("lastMealId") || "";
      setEmail(lastMealId);
      const savedData = JSON.parse(localStorage.getItem(lastMealId)) || {};
      setSelectedDrinks(savedData.drinks || []);
      setSelectedMeals(savedData.meals || []);
      setSelectedDate(savedData.date || "");
      setSelectedTime(savedData.time || "");
      setSelectedCustomers(savedData.customer || "");
    }
  }, []);

  return (
    <main className="text-white flex-col gap-4">
      <p className="mb-8">ORDER DETAILS</p>
      <div className="flex flex-col gap-2">
        {selectedMeals.length ? <p>Meals:</p> : null}
        {selectedMeals.map((meal) => (
          <div key={meal.mealId} className="">
            <p className="text-gray-500">{meal.mealName}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {selectedDrinks.length ? <p className="mt-4">Drinks:</p> : null}
        {selectedDrinks.map((drink) => (
          <div key={drink.id}>
            <p className="text-gray-500">{drink.name}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {selectedDate ? <p className="mt-4">Date:</p> : null}
        <p className="text-gray-500">{selectedDate}</p>
      </div>
      <div className="flex flex-col gap-2">
        {selectedTime ? <p className="mt-4">Time:</p> : null}
        <p className="text-gray-500">{selectedTime}</p>
      </div>
      <div className="flex flex-col gap-2">
        {selectedCustomers ? <p className="mt-4">Customers:</p> : null}
        <p className="text-gray-500">{selectedCustomers}</p>
      </div>
    </main>
  );
}
