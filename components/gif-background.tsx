'use client';

import React from 'react';

export function GifBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      {/* Animated GIF */}
      <div className="absolute inset-0">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mxj_files-paws-25466-dp5hRoSfVwpkXCGsHqg2uan7Nj93vC.gif"
          alt="Background pattern"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Light overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/30 dark:from-slate-950/70 dark:via-slate-950/50 dark:to-slate-950/30" />

      {/* Additional blur and light effect */}
      <div className="absolute inset-0 backdrop-blur-[2px] bg-white/20 dark:bg-slate-950/20" />

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-white/40 dark:to-slate-950/40" />
    </div>
  );
}
