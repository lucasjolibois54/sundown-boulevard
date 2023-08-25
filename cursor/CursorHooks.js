'use client'

import { useRef } from "react";
import useMouse from "@react-hook/mouse-position";

export function useCursorPos() {
  const ref = useRef(null);
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100
  });

  let mouseXPosition = mouse.x !== null ? mouse.clientX : 0;
  let mouseYPosition = mouse.y !== null ? mouse.clientY : 0;

  return { mouseXPosition, mouseYPosition, ref };
}
