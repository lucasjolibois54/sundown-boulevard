
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

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
  const [drinksData, setDrinksData] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      const drinks = await getDrinks();
      setDrinksData(drinks);
    })();

    if (typeof window !== "undefined") {
      const savedEmail = localStorage.getItem("savedEmail") || "";
      setEmail(savedEmail);
    }
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
    if (typeof window !== "undefined") {
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
    <main className="min-h-screen py-12 px-4 sm:px-8">
        <h1 className="text-6xl font-semibold text-center my-10 pb-5">Choose Your Drinks</h1>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {drinksData.map((drink, index) => (
          <div
            key={drink.id}
            className="bg-white rounded-lg transition transform hover:scale-105 h-96"
          >
            <img
              src={randomImages[index % randomImages.length]}
              alt={drink.tagline}
              className="w-full absolute h-96 object-cover"
            />
            <div className="p-6 !z-10 absolute text-white bottom-0">
              <h2 className="text-lg sm:text-xl font-semibold mb-2">
                {drink.name}
              </h2>
              <input
                type="checkbox"
                onChange={() => handleDrinkSelection(drink)}
                className="mr-2"
              />
              Select
            </div>
          </div>
        ))}
      </div>

      {drinksData.length === 0 && (
        <p className="text-center text-gray-600 font-semibold text-xl mt-6">
          There are no drinks available.
        </p>
      )}

      <div className="text-center mt-6">
        <Link href="/order/date">
          <button
            onClick={handleSaveToLocalStorage}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Choose Delivery Time
          </button>
        </Link>
      </div>
    </main>
  );
}







{/*
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

async function getDrinks() {
  const res = await fetch("https://api.punkapi.com/V2/BEERS");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function Drink() {
  const [drinksData, setDrinksData] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      const drinks = await getDrinks();
      setDrinksData(drinks);
    })();

    if (typeof window !== "undefined") {
      const savedEmail = localStorage.getItem("savedEmail") || "";
      setEmail(savedEmail);
    }
  }, []);

  const handleDrinkSelection = (drink) => {
    // argument
    setSelectedDrinks((prevDrinks) => {
      if (prevDrinks.some((d) => d.id === drink.id)) {
        return prevDrinks.filter((d) => d.id !== drink.id);
      } else {
        return [...prevDrinks, { id: drink.id, name: drink.name }];
      }
    });
  };

  const handleSaveToLocalStorage = () => {
    if (typeof window !== "undefined") {
      let savedData = localStorage.getItem(email)
        ? JSON.parse(localStorage.getItem(email))
        : {};

      // Preserve existing data (only update/add the drinks key)
      savedData = {
        ...savedData,
        drinks: selectedDrinks,
      };

      localStorage.setItem(email, JSON.stringify(savedData));
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen py-12 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {drinksData.map((drink) => (
          <div
            key={drink.id}
            className="bg-white rounded-lg transition transform hover:scale-105"
          >
            <img
              src={drink.image_url}
              alt={drink.tagline}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-2">
                {drink.name}
              </h2>
              <input
                type="checkbox"
                onChange={() => handleDrinkSelection(drink)}
                className="mr-2"
              />
              Select
            </div>
          </div>
        ))}
      </div>

      {drinksData.length === 0 && (
        <p className="text-center text-gray-600 font-semibold text-xl mt-6">
          There are no drinks available.
        </p>
      )}

      <div className="text-center mt-6">
        <Link href="/order/date">
          <button
            onClick={handleSaveToLocalStorage}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Choose Delivery Time
          </button>
        </Link>
      </div>
    </main>
  );
}
*/}