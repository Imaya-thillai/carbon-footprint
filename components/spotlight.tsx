'use client';

import React, { useEffect, useState } from 'react';

interface SpotlightProps {
  className?: string;
}

export function Spotlight({ className = '' }: SpotlightProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className={`fixed pointer-events-none inset-0 ${className}`}
      style={{
        background: `radial-gradient(
          600px at ${position.x}px ${position.y}px,
          rgba(16, 185, 129, 0.1),
          transparent 80%
        )`,
      }}
    />
  );
}
