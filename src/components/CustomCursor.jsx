import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -40, y: -40 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{
        transform: `translate(${pos.x - 40}px, ${pos.y - 40}px)`,
        transition: 'transform 0.05s linear',
      }}
    >
      <div className="h-20 w-20 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 opacity-80 blur-3xl" />
    </div>
  );
}
