"use client";

interface ScanlinesProps {
  opacity?: number;
  className?: string;
}

export function Scanlines({ opacity = 0.03, className = "" }: ScanlinesProps) {
  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[100] ${className}`}
      style={{
        background: `
          linear-gradient(to bottom, transparent 50%, rgba(16, 185, 129, ${opacity}) 50%),
          linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02))
        `,
        backgroundSize: "100% 4px, 100% 100%",
        opacity: opacity * 16,
      }}
    />
  );
}

export function HeroScanlines({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `
          linear-gradient(to bottom, transparent 50%, rgba(16, 185, 129, ${opacity}) 50%),
          linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02))
        `,
        backgroundSize: "100% 4px, 100% 100%",
      }}
    />
  );
}
