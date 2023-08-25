'use client'
import React, { createContext, useState, useContext, useEffect } from "react";

const CursorContext = createContext();

export const CursorProvider = ({ children }) => {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <CursorContext.Provider value={{ cursorText, setCursorText, cursorVariant, setCursorVariant, mousePos }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  return useContext(CursorContext);
};
