'use client';

import React from 'react';

export function MeshGradient() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-50">
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
          </filter>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: '#047857', stopOpacity: 0.05 }} />
          </linearGradient>
          <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#34d399', stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0.05 }} />
          </linearGradient>
        </defs>

        {/* Blurred circles */}
        <circle cx="200" cy="200" r="300" fill="url(#grad1)" filter="url(#blur)" />
        <circle cx="1200" cy="400" r="350" fill="url(#grad2)" filter="url(#blur)" />
        <circle cx="600" cy="700" r="280" fill="url(#grad1)" filter="url(#blur)" />
      </svg>
    </div>
  );
}
