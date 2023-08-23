'use client';

import { motion, useAnimation } from 'framer-motion'

export default function SearchPage() {
  const controls = useAnimation();

  return (
    <div className="container">
      <motion.input 
        type="text"
        placeholder="Search..."
        onFocus={() => controls.start({ width: '300px' })}
        onBlur={() => controls.start({ width: '200px' })}
        initial={{ width: '200px' }}
        animate={controls}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}
