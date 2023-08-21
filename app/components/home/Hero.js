"use client"

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


export default function Hero() {
  const [imageWidth, setImageWidth] = useState('33.33vw');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://anestisxasapotaverna.gr/wp-content/uploads/2021/12/ARTICLE-1.jpg",
    "https://plus.unsplash.com/premium_photo-1687354253403-1a7500195e47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
  ];

  // Effect to change the image index every 1.5 seconds, creating the carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500);

    // Cleanup (clear the interval when component unmounted)
    return () => clearInterval(interval);
  }, []);

  // The handler function to adjust image width based on scrolling
  const handleScroll = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const newScrollY = window.scrollY;
    const percentageScrolled = newScrollY / maxScroll;
    const newWidth = Math.min(33.33 + (100 - 33.33) * percentageScrolled, 100);
    setImageWidth(`${newWidth}vw`);
  };

  // Effect to attach and detach scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define animation variants for the image transitions
const imageVariants = {
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-100%" }
  };
  

  return (
    <motion.div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'sticky',
        top: '0',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ 
        width: imageWidth, 
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <img 
          src={images[currentImageIndex]} 
          alt="Rotating Landscape" 
          style={{ 
            width: 'auto', 
            height: 'auto', 
            maxWidth: '100%', 
            maxHeight: '100%'
          }} 
        />
      </div>
    </motion.div>
  );
};


