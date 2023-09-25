"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Search() {
  const [email, setEmail] = useState("");
  const [allSavedData, setAllSavedData] = useState([]);
  const [savedData, setSavedData] = useState([]);

  // const [savedData, setSavedData] = useState({
  //   email: "",
  //   meals: [],
  //   drinks: [],
  //   date: "",
  //   time: "",
  //   customer: 0,
  // });

  const fetchData = () => {
    if (typeof window !== "undefined" && email) {
      // Save the email to the localStorage with the key LatestSearchedEmail
      localStorage.setItem("LatestSearchedEmail", email);

      const StoredData = Object.keys(localStorage).map((key) => {
        let parsedData = null;
        try {
          parsedData = JSON.parse(localStorage.getItem(key));
        } catch (error) {
          console.error(`Error parsing data for key ${key}: ${error}`);
        }
        return parsedData;
      });

      const validStoredData = StoredData.filter((data) => {
        return data && data.email === email;
      });

      console.log("filtered data", validStoredData);

      setAllSavedData(validStoredData);

      // const data = JSON.parse(localStorage.getItem(ID) || "{}");
      // if (data && data.meals) {
      //   // check if data exists
      //   setSavedData(data);

      //   console.log("fetchData in search data", data);
      //   console.log("fetchData in search data.meals", data.meals);
      // } else {
      //   alert("No data found for this email!");
      //   setSavedData({
      //     email: "",
      //     meals: [],
      //     drinks: [],
      //     date: "",
      //     time: "",
      //     customer: 0,
      //   });
      // }
    }
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

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <>
      <main
        data-aos="fade-up"
        data-aos-delay="250"
        data-aos-duration="500"
        className="!bg-white h-screen w-screen"
      >
        <div className="max-w-6xl mx-auto absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen">
          <div className="w-4/6 mx-auto">
            <div className="flex items-center border-b-2 border-gray-500">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border-none outline-none flex-grow p-2  text-lg md:text-6xl font-semibold input-search italic"
              />

              <button
                onClick={fetchData}
                className="ml-2 -mb-1 px-4 py-2 bg-gray-300 text-black rounded decoration-8"
              >
                <b>→</b>
              </button>
            </div>

            {allSavedData.length > 0 &&
              allSavedData.map((order, index) => (
                <div
                  key={index}
                  className="text-sm m-6 border-b border-black grid grid-cols-2 w-2/4 justify-between"
                >
                  <div className="col-start-1 col-end-2">
                    <div className="mb-2">
                      <p>
                        <b>Meals:</b>
                      </p>
                      {order.meals.map((meal, index) => (
                        <p key={index}>{meal.mealName}</p>
                      ))}
                    </div>
                    <div className="mb-2">
                      <p>
                        <b>Date:</b>
                      </p>
                      <p>{order.date}</p>
                    </div>
                    <div className="mb-2">
                      <p>
                        <b>Time:</b>
                      </p>
                      <p>{order.time}</p>
                    </div>
                  </div>
                  <div className="col-start-2 col-end-3">
                    <div className="mb-2">
                      <p>
                        <b>Drinks:</b>
                      </p>
                      {order.drinks.map((drink, index) => (
                        <p key={index}>{drink.name}</p>
                      ))}
                    </div>

                    <div className="mb-2">
                      <p>
                        <b>Guests:</b>
                      </p>
                      <p>{order.customer}</p>
                    </div>
                  </div>

                  <Link
                    className=" flex items-center justify-center col-start-1 col-end-2 p-2 bg-black w-20 text-white rounded mb-4 mt-4"
                    href={`/order?id=${order.id}`}
                  >
                    EDIT
                  </Link>

                  <button className="border border-black p-2 rounded w-20 col-start-2 col-end-3 mb-4 mt-4">
                    DELETE
                  </button>
                </div>
              ))}
          </div>
        </div>
      </main>
    </>
  );
}

{
  /* <motion.div
initial={{ height: 0, opacity: 0 }}
animate={{ height: "auto", opacity: 1 }}
exit={{ height: 0, opacity: 0 }}
className="bg-gray-200 py-5 px-5 rounded-br-xl rounded-bl-xl absolute w-4/6"
>
{order.meals && order.meals.length > 0 && (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={listItemVariants}
    custom={4}
  >
    <p>Selected Meals:</p>
    <ul>
      {order.meals.map((meal, index) => (
        <motion.li
          key={meal.mealId}
          variants={listItemVariants}
          custom={index + 5}
        >
          {meal.mealName ? meal.mealName : ""}
        </motion.li>
      ))}
    </ul>
  </motion.div>
)}
<motion.p
  initial="hidden"
  animate="visible"
  variants={listItemVariants}
  custom={2}
>
  {order.date ? <span> Date {order.date}</span> : ""}
</motion.p>
<motion.p
  initial="hidden"
  animate="visible"
  variants={listItemVariants}
  custom={2}
>
  {order.date ? <span> Time: {order.time}</span> : ""}
</motion.p>
<motion.p
  initial="hidden"
  animate="visible"
  variants={listItemVariants}
  custom={3}
>
  {order.customer ? (
    <span> Number of Customers: {order.customer} </span>
  ) : (
    ""
  )}
</motion.p>
{order.drinks && order.drinks.length > 0 && (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={listItemVariants}
    custom={4}
  >
    <p>Selected Drinks:</p>
    <ul>
      {order.drinks.map((drink, index) => (
        <motion.li
          key={drink.id}
          variants={listItemVariants}
          custom={index + 5}
        >
          {drink.name ? drink.name : ""}
        </motion.li>
      ))}
    </ul>
    <motion.div
      initial="hidden"
      animate="visible"
      variants={listItemVariants}
      custom={2}
    >
      <Link href={`/order?email=${email}`}>
        <button className="ml-0 mt-3 -mb-1 px-4 py-2 bg-gray-300 text-black rounded decoration-8">
          <b>Update Order</b>
        </button>
      </Link>
    </motion.div>
  </motion.div>
)}
</motion.div> */
}
