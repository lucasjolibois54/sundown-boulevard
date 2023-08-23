'use client';
import React from 'react';

export default function Customers({ count, setCount }) {

    const decrement = () => {
        if (count > 1) {
            setCount(prevCount => prevCount - 1);
        }
    };

    const increment = () => {
        setCount(prevCount => prevCount + 1);
    };

    return (
        <div>
            <button onClick={decrement}>-</button>
            <input 
                type="number" 
                value={count} 
                readOnly 
                style={{ width: '40px', textAlign: 'center' }} 
            />
            <button onClick={increment}>+</button>
        </div>
    );
}
