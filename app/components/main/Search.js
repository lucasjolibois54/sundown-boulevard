'use client';
import { useState } from 'react';

export default function Search() {
    const [email, setEmail] = useState('');
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
        <main>
            <div>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email to retrieve meal" 
                />
                <button onClick={handleGetData}>Get Meal</button>
            </div>
            {savedData.email && (
                <div>
                    <p>Email: {savedData.email}</p>
                    <p>Saved Meal: {savedData.mealName}</p>
                </div>
            )}
                        {savedData.drinks && savedData.drinks.length > 0 && (
                <div>
                    <p>Selected Drinks:</p>
                    <ul>
                        {savedData.drinks.map(drink => (
                            <li key={drink.id}>{drink.name}</li>
                        ))}
                    </ul>
                </div>
            )}
            {!savedData.email && <p>No data found for this email.</p>}
        </main>
    );
}