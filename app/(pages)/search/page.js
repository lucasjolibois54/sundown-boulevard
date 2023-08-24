"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Search() {
  const [email, setEmail] = useState("");
  const [savedData, setSavedData] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false); // Track button click

  const handleGetData = () => {
    const data = localStorage.getItem(email);
    if (data) {
      setSavedData(JSON.parse(data));
    } else {
      setSavedData({});
    }
    setButtonClicked(true); // Set button clicked to true
  };

  const handleClearData = () => {
    setEmail("");
    setSavedData({});
    setButtonClicked(false); // Reset button click state
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1, // Adjust the delay here
      },
    }),
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
              onClick={handleClearData}
              className="ml-2 -mb-1 px-4 py-2 bg-red-500 text-white rounded decoration-8"
            >
              Clear
            </button>
            <button
              onClick={handleGetData}
              className="ml-2 -mb-1 px-4 py-2 bg-gray-300 text-black rounded decoration-8"
            >
              <b>→</b>
            </button>
          </div>

          <div className="">
            {buttonClicked && !savedData.email && (
              <p className="mt-20 absolute">No data found for this email.</p>
            )}
            {savedData.email && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-gray-200 py-5 px-5 rounded-br-xl rounded-bl-xl absolute w-4/6"
              >
                <h2 className="text-4xl font-semibold input-search mb-10">
                  {savedData.email ? <p>Order Overview</p> : "Not available"}
                </h2>
                <motion.p
                  initial="hidden"
                  animate="visible"
                  variants={listItemVariants}
                  custom={0}
                >
                  {savedData.email ? <p>Email: {savedData.email}</p> : "Not available"}
                </motion.p>
                <motion.p
                  initial="hidden"
                  animate="visible"
                  variants={listItemVariants}
                  custom={1}
                >
                  {savedData.mealName ? <p>Meal: {savedData.mealName}</p> : ""}
                </motion.p>
                <motion.p
                  initial="hidden"
                  animate="visible"
                  variants={listItemVariants}
                  custom={2}
                >
                  {savedData.date ? <p> Date & Time: {savedData.date.toString()}</p> : ""}
                </motion.p>
                <motion.p
                  initial="hidden"
                  animate="visible"
                  variants={listItemVariants}
                  custom={3}
                >
                  {savedData.customer ? <p> Number of Customers: {savedData.customer} </p> : ""}
                </motion.p>
                {savedData.drinks && savedData.drinks.length > 0 && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={listItemVariants}
                    custom={4}
                  >
                    <p>Selected Drinks:</p>
                    <ul>
                      {savedData.drinks.map((drink, index) => (
                        <motion.li
                          key={drink.id}
                          variants={listItemVariants}
                          custom={index + 5}
                        >
                          {drink.name ? drink.name : ""}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}