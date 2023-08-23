'use client';
import React from 'react';

export default function SaveButton({ onSave }) {
    return (
        <button onClick={onSave} className="bg-blue-500 text-white px-4 py-2 rounded">
            Save All Data
        </button>
    );
}
