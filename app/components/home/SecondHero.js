'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '@/cursor/CursorContext';

export default function SubHero() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });   // State to track cursor position
  const { setCursorText, setCursorVariant } = useCursor();

     // Update cursor position on mouse move
  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.pageX, y: e.pageY });
  };

  return (
    <div onMouseEnter={() => {
        setCursorText("");
        setCursorVariant("time");
      }}
      onMouseLeave={() => {
        setCursorText("");
        setCursorVariant("default");
      }} className="relative flex items-center justify-center w-full h-[calc(100vh-60px)]" onMouseMove={handleMouseMove}>
      
      <img src="https://res.cloudinary.com/debkwdctz/image/upload/v1693229110/lucasjolibois54_a_bar_restaurant_random_color_design_in_the_sty_5f35697c-299e-42a9-bdab-16dcb98babbf-transformed_1_lfh1dd.png" alt="Hero" className="w-full h-full object-cover absolute inset-0 z-0" />

      <motion.div
        className="absolute inset-0 bg-black opacity-100 z-10"
        initial={false}
        animate={{
          maskImage: `radial-gradient(circle 200px at ${cursorPosition.x}px ${cursorPosition.y}px, transparent 0%, black 100%)`,
          WebkitMaskImage: `radial-gradient(circle 200px at ${cursorPosition.x}px ${cursorPosition.y}px, transparent 0%, black 100%)`
        }}
      ></motion.div>

      <h1 className="z-20 text-white text-center text-5xl">Where <b>Memories</b> are Poured <br/>and Moments are <b>Savored</b></h1>
    </div>
  );
}


