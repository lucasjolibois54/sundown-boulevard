"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Aos from "aos";
import "aos/dist/aos.css";

import { useCursor } from "@/cursor/CursorContext";

import SelectedDrink from "@/app/components/order/SelectedDrink";

const randomImages = [
  "https://media.discordapp.net/attachments/1068131427910168670/1144227178481983508/lucasjolibois54_a_beer_bottle_on_a_shelf_with_a_random_color_de_ffd2a1d5-159a-4df6-8707-c984214766a7.png?width=936&height=936",
  "https://media.discordapp.net/attachments/1068131427910168670/1144227187650740255/lucasjolibois54_a_beer_bottle_on_a_shelf_with_a_random_color_de_2b3dae7b-c3f4-462e-9ddb-c50b939aff75.png?width=936&height=936",
  "https://media.discordapp.net/attachments/1068131427910168670/1144227206990659645/lucasjolibois54_a_beer_bottle_on_a_shelf_with_a_random_color_de_e37cf575-ff93-41f3-88a9-abf2c5dabf33.png?width=936&height=936",
  "https://media.discordapp.net/attachments/1068131427910168670/1144228292115824701/lucasjolibois54_a_beer_bottle_on_a_shelf_with_a_random_color_de_f5ec295b-cf7c-4086-8ca7-3524e70d396e.png?width=936&height=936",
  "https://media.discordapp.net/attachments/1068131427910168670/1144228256464257135/lucasjolibois54_a_beer_bottle_on_a_shelf_with_a_random_color_de_a08d1d8c-ffa6-4312-992e-92a1afe13591.png?width=936&height=936",
  "https://media.discordapp.net/attachments/1068131427910168670/1144228610891337878/lucasjolibois54_a_beer_bottle_on_a_shelf_with_a_random_color_de_1128ccb4-c19e-44ca-b607-825795ad8021.png?width=936&height=936",
  "https://media.discordapp.net/attachments/1068131427910168670/1144228621511307264/lucasjolibois54_a_beer_bottle_on_a_shelf_with_a_random_color_de_040cfdaf-b97d-47bd-9d84-4d78792b4a20.png?width=936&height=936",
  "https://media.discordapp.net/attachments/1068131427910168670/1144228625118408705/lucasjolibois54_a_beer_bottle_on_a_shelf_with_a_random_color_de_836ced99-4719-4dea-bfa0-b03dfb8f689d.png?width=936&height=936",
  "https://media.discordapp.net/attachments/1068131427910168670/1144228639643283476/lucasjolibois54_a_beer_bottle_on_a_shelf_with_a_random_color_de_0c274155-a9dd-44b2-9abe-ecd2060c3272.png?width=936&height=936",
];
async function getDrinks() {
  const res = await fetch("https://api.punkapi.com/V2/BEERS");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function Drink() {
  const { setCursorText, setCursorVariant } = useCursor();
  const [drinksData, setDrinksData] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);
  const [email, setEmail] = useState("");
  const [visibleDrinks, setVisibleDrinks] = useState(9);
  const [isLoading, setIsLoading] = useState(true);
  const [emailParam, setEmailParam] = useState(null);

  useEffect(() => {
    const param = new URL(window.location.href).searchParams.get("email");
    setEmailParam(param);
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });

    let isMounted = true;

    // Fetch drinks data
    (async () => {
      try {
        const drinks = await getDrinks();

        if (isMounted) {
          setDrinksData(drinks);

          // After setting the drinks data, wait for 2 seconds before setting isLoading to false
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
    })();

    const emailParam = new URL(window.location.href).searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
      const savedDrinks =
        JSON.parse(localStorage.getItem(emailParam))?.drinks || [];
      setSelectedDrinks(savedDrinks);
    } else {
      // If in localstorage, retrieve saved email and selected drinks
      const lastMealId = localStorage.getItem("lastMealId") || "";
      setEmail(lastMealId);

      const savedDrinks =
        JSON.parse(localStorage.getItem(lastMealId))?.drinks || [];
      setSelectedDrinks(savedDrinks);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDrinkSelection = (drink) => {
    setSelectedDrinks((prevDrinks) => {
      if (prevDrinks.some((d) => d.id === drink.id)) {
        return prevDrinks.filter((d) => d.id !== drink.id);
      } else {
        return [...prevDrinks, { id: drink.id, name: drink.name }];
      }
    });
  };

  const handleSaveToLocalStorage = () => {
    if (email) {
      let savedData = localStorage.getItem(email)
        ? JSON.parse(localStorage.getItem(email))
        : {};

      savedData = {
        ...savedData,
        drinks: selectedDrinks,
      };

      localStorage.setItem(email, JSON.stringify(savedData));
    }
  };

  return (
    <main
      data-aos="fade-up"
      data-aos-delay="250"
      data-aos-duration="500"
      className="min-h-screen py-12 px-4 sm:px-8"
    >
      <h1 className="text-6xl font-semibold text-center my-10 pb-5 text-main-text">
        Choose Your Drinks
      </h1>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/*{drinksData.length === 0 ? (*/}
        {isLoading
          ? //Skeleton Loading for drinks
            Array.from({ length: visibleDrinks }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-lg transition transform hover:scale-105 h-96 relative bg-gray-200 animate-pulse"
              >
                {/* Skeleton for image */}
                <div className="w-full h-2/3 bg-gray-300 rounded-t-lg"></div>
                {/* Skeleton for text */}
                <div className="w-3/4 h-6 bg-gray-300 my-2 mx-auto"></div>
                <div className="w-1/2 h-4 bg-gray-300 mx-auto"></div>
              </motion.div>
            ))
          : drinksData.slice(0, visibleDrinks).map((drink, index) => (
              <div
                onMouseEnter={() => {
                  setCursorText("Add");
                  setCursorVariant("addCart");
                }}
                onMouseLeave={() => {
                  setCursorText("");
                  setCursorVariant("default");
                }}
                key={drink.id}
                className="rounded-lg transition transform hover:scale-105 h-96 relative"
              >
                <div className="w-full h-full relative">
                  <label
                    htmlFor={`drink-checkbox-${drink.id}`}
                    className="cursor-pointer w-full h-full block"
                  >
                    <img
                      src={randomImages[index % randomImages.length]}
                      alt={drink.tagline}
                      className="w-full h-96 object-cover rounded-md"
                    />
                    {selectedDrinks.some((d) => d.id === drink.id) && (
                      <div
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.4)",
                          transition: "opacity 10.5s",
                        }}
                        className="absolute top-0 left-0 w-full h-full"
                      ></div>
                    )}
                    <p className="text-white z-10 top-0 right-0 absolute pr-2 pt-2">
                      {drink.first_brewed}
                    </p>

                    {selectedDrinks.some((d) => d.id === drink.id) && (
                      <div className="checked-drink-body absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <SelectedDrink text="BEER CHOSEN - BEER CHOSEN -" />
                      </div>
                    )}

                    <div className="p-6 !z-10 absolute text-white bottom-0">
                      <h2 className="text-lg sm:text-xl font-semibold mb-0">
                        {drink.name.substring(0, 16)}
                      </h2>
                      <p className="text-sm">
                        {drink.ingredients?.yeast || "Unknown Yeast"}
                      </p>
                    </div>
                  </label>
                  <input
                    id={`drink-checkbox-${drink.id}`}
                    type="checkbox"
                    onChange={() => handleDrinkSelection(drink)}
                    className="mr-2 absolute bottom-10 left-5 z-20 hidden"
                    checked={selectedDrinks.some((d) => d.id === drink.id)}
                  />
                </div>
              </div>
            ))}
      </div>

      {drinksData.length === 0 && !drinksData.loading && (
        <p className="text-center text-gray-600 font-semibold text-xl mt-6">
          There are no drinks available.
        </p>
      )}

      <div className="flex gap-3 absolute left-1/2 transform -translate-x-1/2 mt-10 pb-20">
        {drinksData.length > visibleDrinks && (
          <div className="text-center mt-6">
            <button
              onMouseEnter={() => {
                setCursorText("");
                setCursorVariant("time");
              }}
              onMouseLeave={() => {
                setCursorText("");
                setCursorVariant("default");
              }}
              onClick={() => setVisibleDrinks((prev) => prev + 6)}
              className="hover:cursor-none relative inline-flex items-center justify-center px-7 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white bg-transparent border-gray-400 border-2 hover:border-bgColorDark rounded-lg group"
            >
              <span className="absolute w-0 h-0 transition-all duration-1000 ease-out bg-gray-500 rounded-full group-hover:w-72 group-hover:h-72"></span>
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
              <span className="relative">View More</span>
            </button>
          </div>
        )}

        <div className="text-center mt-6">
          <Link
            onMouseEnter={() => {
              setCursorText("");
              setCursorVariant("time");
            }}
            onMouseLeave={() => {
              setCursorText("");
              setCursorVariant("default");
            }}
            href={`/order/date${emailParam ? `?email=${emailParam}` : ""}`}
            onClick={handleSaveToLocalStorage}
            className="text-center hover:cursor-none relative inline-flex items-center justify-center px-7 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 border-gray-800 border-2 hover:border-bgColorDark rounded-lg group"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-main-color rounded-full group-hover:w-72 group-hover:h-72"></span>
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span className="relative">Choose Delivery Time</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
