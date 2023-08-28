'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '@/cursor/CursorContext';

export default function SubHero() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const { setCursorText, setCursorVariant } = useCursor();

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
      }} className="relative w-full h-[calc(100vh-60px)]" onMouseMove={handleMouseMove}>
      <img src="https://plus.unsplash.com/premium_photo-1688385848467-781c5394c017?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgeljfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2944&q=80" alt="Hero" className="w-full h-full object-cover" />

      <motion.div
        className="absolute inset-0 bg-black opacity-100"
        initial={false}
        animate={{
          maskImage: `radial-gradient(circle 100px at ${cursorPosition.x}px ${cursorPosition.y}px, transparent 0%, black 100%)`,
          WebkitMaskImage: `radial-gradient(circle 100px at ${cursorPosition.x}px ${cursorPosition.y}px, transparent 0%, black 100%)`
        }}
      ></motion.div>
    </div>
  );
}

