"use client";

import React, { useEffect, useState } from "react";

export default function OrderDetails() {
  const [selectedDrinks, setSelectedDrinks] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const emailParam = new URL(window.location.href).searchParams.get("email");
    // If an email param is present, retrieve the saved drinks from local storage
    if (emailParam) {
      setEmail(emailParam);
      const savedData = JSON.parse(localStorage.getItem(emailParam)) || {};
      setSelectedDrinks(savedData.drinks || []);
      setSelectedMeals(savedData.meals || []);
    } else {
      // If no email param, use lastMealId
      const lastMealId = localStorage.getItem("lastMealId") || "";
      setEmail(lastMealId);
      const savedData = JSON.parse(localStorage.getItem(lastMealId)) || {};
      setSelectedDrinks(savedData.drinks || []);
      setSelectedMeals(savedData.meals || []);
    }
  }, []);

  return (
    <main className="text-white flex-col gap-4">
      <p>ORDER DETAILS</p>
      <div className="flex flex-col gap-2">
        <p>Meals:</p>
        {selectedMeals.map((meal) => (
          <div key={meal.mealId}>
            <p>{meal.mealName}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <p>Drinks:</p>
        {selectedDrinks.map((drink) => (
          <div key={drink.id}>
            <p>{drink.name}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
