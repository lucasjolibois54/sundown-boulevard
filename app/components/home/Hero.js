"use client"

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


export default function Hero() {
  const [imageWidth, setImageWidth] = useState('33.33vw');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
 /* const images = [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://anestisxasapotaverna.gr/wp-content/uploads/2021/12/ARTICLE-1.jpg",
    "https://plus.unsplash.com/premium_photo-1687354253403-1a7500195e47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
  ];*/

  const images = [
    "https://res.cloudinary.com/debkwdctz/image/upload/v1693229110/lucasjolibois54_a_bar_restaurant_random_color_design_in_the_sty_5f35697c-299e-42a9-bdab-16dcb98babbf-transformed_1_lfh1dd.png",
    "https://media.discordapp.net/attachments/1068131427910168670/1145780464733388921/lucasjolibois54_a_beer_bottle_on_a_shelf_with_a_random_color_de_b5a8d85a-301e-4db2-8568-497fc851ccf6.png?width=1036&height=1036",
    "https://media.discordapp.net/attachments/1068131427910168670/1144306975409188994/lucasjolibois54_a_bar_restaurant_random_color_design_in_the_sty_743d5f49-2be2-42c3-a51d-830871af13b8.png?width=1036&height=1036"
  ];

  // Effect to change the image index every 1.5 seconds, creating the carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

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
        /><h1 className='absolute text-center z-10 text-7xl'><b>Crafted</b> Drinks 
        <b> Endless</b> Nights</h1>
      </div>
    </motion.div>
  );
};


