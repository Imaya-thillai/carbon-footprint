'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Features', icon: '✨', id: 'features' },
  { label: 'Calculator', icon: '🧮', id: 'calculator' },
  { label: 'Analytics', icon: '📊', id: 'analytics' },
  { label: 'Pricing', icon: '💰', id: 'pricing' },
];

export function FloatingNavbar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          role="navigation"
          aria-label="Floating quick navigation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={i}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative group px-3 py-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label={`Scroll to ${item.label}`}
                title={item.label}
              >
                <span className="text-xl" aria-hidden="true">{item.icon}</span>
                <div 
                  role="tooltip"
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-xs whitespace-nowrap bg-gray-900 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                >
                  {item.label}
                </div>
              </motion.button>
            ))}
            <div className="w-px h-6 bg-white/10 mx-2" aria-hidden="true" />
            <motion.a
              href="/auth"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-emerald-500/50 transition-shadow focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              Sign Up
            </motion.a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
