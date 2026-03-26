interface ScanlinesProps {
  opacity?: number;
}

export function Scanlines({ opacity = 0.03 }: ScanlinesProps) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        background: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, ${opacity * 5}) 50%), linear-gradient(90deg, rgba(255, 0, 0, ${opacity / 2}), rgba(0, 255, 0, ${opacity / 4}), rgba(0, 0, 255, ${opacity / 2}))`,
        backgroundSize: "100% 4px, 100% 100%",
      }}
    />
  );
}
