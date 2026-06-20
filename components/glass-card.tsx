'use client';

import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  animated?: boolean;
}

export function GlassCard({
  children,
  className = '',
  hover = true,
  animated = false,
}: GlassCardProps) {
  return (
    <div
      className={`
        relative rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl
        ${hover ? 'transition-all duration-300 hover:border-white/30 hover:bg-white/15' : ''}
        ${animated ? 'animate-[slide-up_0.6s_ease-out]' : ''}
        ${className}
      `}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
