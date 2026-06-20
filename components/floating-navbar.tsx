'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'Features', icon: '✨', id: 'features' },
  { label: 'Calculator', icon: '🧮', id: 'calculator' },
  { label: 'Analytics', icon: '📊', id: 'analytics' },
  { label: 'Pricing', icon: '💰', id: 'pricing' },
];

export function FloatingNavbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    // Check local storage for session
    const session = localStorage.getItem('userSession');
    if (session) {
      try {
        const user = JSON.parse(session);
        setUserName(user.name.split(' ')[0]); // Get first name
      } catch (e) {
        // Ignore
      }
    }

    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Listen for storage changes from other tabs or auth page
    const handleStorageChange = () => {
      const newSession = localStorage.getItem('userSession');
      if (newSession) {
        try {
          const user = JSON.parse(newSession);
          setUserName(user.name.split(' ')[0]);
        } catch (e) {
          setUserName(null);
        }
      } else {
        setUserName(null);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    setUserName(null);
    window.dispatchEvent(new Event('storage')); // trigger update across app
    router.push('/');
  };

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
            
            {/* Theme Toggle */}
            {mounted && (
              <motion.button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
            )}

            {/* Auth Button */}
            {userName ? (
              <div className="flex items-center gap-2 ml-2">
                <span className="text-white text-sm font-medium hidden sm:inline-block">Hi, {userName}</span>
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-red-500/80 hover:text-white transition-colors"
                  title="Logout"
                >
                  <LogOut size={16} />
                </motion.button>
              </div>
            ) : (
              <motion.a
                href="/auth"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 ml-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-emerald-500/50 transition-shadow"
              >
                Sign Up
              </motion.a>
            )}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
