'use client';

import React from 'react';

export function AuroraBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Top gradient aurora */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-b from-emerald-400/20 to-transparent rounded-full blur-3xl animate-[aurora_8s_ease-infinite]"
        style={{
          backgroundSize: '200% 200%',
        }}
      />

      {/* Right gradient aurora */}
      <div
        className="absolute -top-20 right-0 w-96 h-96 bg-gradient-to-br from-green-400/15 to-transparent rounded-full blur-3xl animate-[aurora_12s_ease-infinite_reverse]"
        style={{
          backgroundSize: '200% 200%',
        }}
      />

      {/* Bottom left glow */}
      <div
        className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-t from-emerald-300/10 to-transparent rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]"
      />
    </div>
  );
}
