"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed w-[300px] h-[300px] rounded-full pointer-events-none z-0"
      style={{
        background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
        transform: "translate(-50%, -50%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
