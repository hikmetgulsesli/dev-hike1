"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const isTouchDevice = () => {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

export function CursorGlow() {
  const [isTouch, setIsTouch] = useState(true);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY, isTouch]);

  if (isTouch) return null;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[90]"
      style={{
        background: smoothX.get() !== 0
          ? undefined
          : "radial-gradient(circle 300px at 50% 50%, rgba(16, 185, 129, 0.15), transparent)",
      }}
    >
      <motion.div
        className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: smoothX,
          y: smoothY,
          background:
            "radial-gradient(circle 300px at center, rgba(16, 185, 129, 0.15), transparent)",
          mixBlendMode: "screen",
        }}
      />
    </motion.div>
  );
}
