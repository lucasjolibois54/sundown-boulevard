
'use client'

import { motion } from "framer-motion";
import { getVariants } from './CursorSettings';
import { useCursor } from './CursorContext';

export default function CursorComponent() {
  const { cursorText, cursorVariant, mousePos } = useCursor();
  const currentVariants = getVariants(mousePos.x, mousePos.y);

  return (
    <motion.div
      variants={currentVariants}
      className="circle"
      animate={cursorVariant}
      style={{ x: mousePos.x, y: mousePos.y }}
    >
      <span className="cursorText">{cursorText}</span>
    </motion.div>
  );
}

