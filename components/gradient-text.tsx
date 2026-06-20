'use client';

import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
}

export function GradientText({
  children,
  className = '',
  animated = true,
}: GradientTextProps) {
  return (
    <span
      className={`
        bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600
        bg-clip-text text-transparent bg-300% bg-no-repeat
        ${animated ? 'animate-[gradient-shift_3s_ease-infinite]' : ''}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
