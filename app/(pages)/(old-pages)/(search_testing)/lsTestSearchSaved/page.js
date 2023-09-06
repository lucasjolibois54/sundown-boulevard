"use client";
import { useState } from "react";
import Link from "next/link";

export default function Receipt() {
  const [email, setEmail] = useState("");
  const [savedData, setSavedData] = useState({
    mealName: "",
    drinks: [],
    date: "",
    time: "",
    customer: 0,
  });

  const fetchData = () => {
    if (typeof window !== "undefined" && email) {
      // Save the email to the localStorage with the key LatestSearchedEmail
      localStorage.setItem("LatestSearchedEmail", email);

      const data = JSON.parse(localStorage.getItem(email) || "{}");
      if (data && data.mealName) {  // check if data exists
        setSavedData(data);
      } else {
        alert("No data found for this email!");
        setSavedData({
          mealName: "",
          drinks: [],
          date: "",
          time: "",
          customer: 0,
        });
      }
    }
  };

  return (
    <main className="text-white">
      <div>
        <input
          type="email"
          placeholder="Enter customer email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={fetchData}>Search</button>
        <div>
            <div>
              <div>{savedData.date}</div>
              <div>{savedData.time}</div>
            </div>
            <div>
                    <p>{savedData.mealName}</p>
                  {savedData.drinks.map((drink, idx) => (
                    <div key={idx}>
                      <p>{drink.name}</p>
                    </div>
                  ))}
                  <div>
                    <p>x{savedData.customer}</p>
                  </div>
            </div>
        </div>
      </div>
      <Link href="/order">Update Order</Link>
    </main>
  );
}
