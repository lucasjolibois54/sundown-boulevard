"use client";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Aos from "aos";
import "aos/dist/aos.css";

export default function Receipt() {
  const [email, setEmail] = useState("");
  const [savedData, setSavedData] = useState({
    email: "",
    meals: [],
    drinks: [],
    date: "",
    time: "",
    customer: 0,
  });
  const [confettiCount, setConfettiCount] = useState(300); // 300 pieces of confetti
  useEffect(() => {
    Aos.init({ duration: 1000 });
    const timer = setTimeout(() => {
      setConfettiCount(0); // After 2 seconds, set to 0
    }, 2000);
    if (typeof window !== "undefined") {
      // First, get the email stored under 'LastSavedOrderEmail'
      const savedEmail = localStorage.getItem("LastSavedOrderID") || "";
      setEmail(savedEmail);
      // Use email to get the associated data
      console.log(savedEmail);
      const data = JSON.parse(localStorage.getItem(savedEmail) || "{}");
      setSavedData(data);
      console.log(data);
    }

    return () => clearTimeout(timer);
  }, []);
  return (
    <main
      data-aos="fade-up"
      data-aos-delay="250"
      data-aos-duration="500"
      className="bg-bgColorDark min-h-screen flex flex-col items-center py-12"
    >
      <Confetti numberOfPieces={confettiCount} />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-semibold text-center my-10 pb-5 text-white">
          Order Summary
        </h1>
        <div
          className="fontordre w-full max-w-xs sm:max-w-md sm:w-96 mx-auto p-6 mt-12 shadow-md"
          style={{
            backgroundImage:
              "url('https://media.discordapp.net/attachments/1068131427910168670/1144387451993997322/vector-crumbled-paper-texture.png?width=724&height=1038')",
            backgroundSize: "cover",
          }}
        >
          <div className="pb-10 border-b border-black text-center">
            <h1 className="text-lg uppercase mb-1">
              Receipt of Sale <span className="block text-xl">LeFaim</span>
            </h1>
            <h2 className="text-sm text-gray-600 font-light">
              Customer e-mail: <span className="block">{savedData.email}</span>
            </h2>
          </div>
          <div className="mt-6">
            <div className="flex justify-center space-x-6">
              <div className="date">{savedData.date}</div>
              <div className="time">{savedData.time}</div>
            </div>
            <div className="mt-6">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">QTY</th>
                    <th className="text-left">ITEM</th>
                    <th className="text-right">{""}</th>
                  </tr>
                </thead>
                <tbody>
                  {savedData.meals.map((meal, idx) => (
                    <tr key={idx}>
                      <td className="pt-4">x 1</td>
                      <td className="pt-4">{meal.mealName}</td>
                      <td className="pt-4 text-right">{""}</td>
                    </tr>
                  ))}
                  {savedData.drinks.map((drink, idx) => (
                    <tr key={idx}>
                      <td className="pt-4">x 1</td>
                      <td className="pt-4">{drink.name}</td>
                      <td className="pt-4 text-right">{""}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="pt-4 font-bold text-lg">Total</td>
                    <td></td>
                    <td className="pt-4 text-right font-bold text-lg">{""}</td>
                  </tr>
                  <tr>
                    <td className="pt-4">Customers</td>
                    <td></td>
                    <td className="pt-4 text-right">x{savedData.customer}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <h3 className="border-t border-black pt-2 mt-6 text-center uppercase">
            Thank You!
          </h3>
        </div>
      </div>
    </main>
  );
}
