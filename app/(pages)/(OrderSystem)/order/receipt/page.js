"use client";
import { useState, useEffect } from "react";

export default function Receipt() {
  const [email, setEmail] = useState("");
  const [savedData, setSavedData] = useState({
    mealName: "",
    drinks: [],
    date: "",
    time: "",
    customer: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEmail = localStorage.getItem("savedEmail") || "";
      setEmail(savedEmail);
      const data = JSON.parse(localStorage.getItem(savedEmail) || "{}");
      setSavedData(data);
    }
  }, []);

  return (
    <main className="bg-bgColorDark min-h-screen flex flex-col items-center py-12"> {/* justify-center */}
        <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-semibold text-center my-10 pb-5 text-white">
        Order Summary
      </h1>
        <div className="fontordre w-full max-w-xs sm:max-w-md sm:w-96 mx-auto p-6 mt-12 shadow-md" 
     style={{ backgroundImage: "url('https://media.discordapp.net/attachments/1068131427910168670/1144387451993997322/vector-crumbled-paper-texture.png?width=724&height=1038')", backgroundSize: 'cover' }}>
    <div className="pb-10 border-b border-black text-center">
        <h1 className="text-lg uppercase mb-1">
            Receipt of Sale <span className="block text-xl">LeFaim</span>
        </h1>
        <h2 className="text-sm text-gray-600 font-light">
            Customer e-mail: <span className="block">{email}</span>
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
                        <th className="text-right">AMT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="pt-4">x 1</td>
                        <td className="pt-4">{savedData.mealName}</td>
                        <td className="pt-4 text-right">NaN</td>
                    </tr>
                    {savedData.drinks.map((drink, idx) => (
                        <tr key={idx}>
                            <td className="pt-4">x 1</td>
                            <td className="pt-4">{drink.name}</td>
                            <td className="pt-4 text-right">NaN</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td className="pt-4 font-bold text-lg">Total</td>
                        <td></td>
                        <td className="pt-4 text-right font-bold text-lg">32.1</td>
                    </tr>
                    <tr>
                        <td className="pt-4">Cash</td>
                        <td></td>
                        <td className="pt-4 text-right">32.1</td>
                    </tr>
                    <tr>
                        <td className="pt-4">Change</td>
                        <td></td>
                        <td className="pt-4 text-right">32.1</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
    <h3 className="border-t border-black pt-2 mt-6 text-center uppercase">
        Thank You!
    </h3>
</div>


      {/* <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 space-y-4">
                <div className="flex flex-col">
                    <span className="font-semibold">Email:</span>
                    <span>{email}</span>
                </div>

                <div className="flex flex-col">
                    <span className="font-semibold">Meal:</span>
                    <span>{savedData.mealName}</span>
                </div>

                <div className="flex flex-col">
                    <span className="font-semibold">Selected Drinks:</span>
                    <ul>
                        {savedData.drinks.map((drink, idx) => (
                            <li key={idx}>{drink.name}</li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col">
                    <span className="font-semibold">Date:</span>
                    <span>{savedData.date}</span>
                </div>

                <div className="flex flex-col">
                    <span className="font-semibold">Time:</span>
                    <span>{savedData.time}</span>
                </div>

                <div className="flex flex-col">
                    <span className="font-semibold">Customers:</span>
                    <span>{savedData.customer}</span>
                </div>
            </div>*/}
            </div>
    </main>
  );
}
