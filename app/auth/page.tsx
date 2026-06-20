'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GradientText } from '@/components/gradient-text';
import { GlassCard } from '@/components/glass-card';
import Link from 'next/link';
import { z } from 'zod';
import { signInSchema, signUpSchema } from '@/lib/validators';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<{type: 'success'|'error', text: string} | null>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('mode') === 'signup') {
        setIsSignIn(false);
      }
    }
  }, []);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setFormMessage(null);
    setIsLoading(true);

    try {
      if (isSignIn) {
        signInSchema.parse({ email: formData.email, password: formData.password });
        await new Promise(resolve => setTimeout(resolve, 800));
        localStorage.setItem('userSession', JSON.stringify({ name: formData.email.split('@')[0], email: formData.email }));
        window.dispatchEvent(new Event('storage'));
        setFormMessage({ type: 'success', text: 'Successfully signed in! Redirecting...' });
        setTimeout(() => router.push('/'), 1000);
      } else {
        signUpSchema.parse(formData);
        await new Promise(resolve => setTimeout(resolve, 800));
        localStorage.setItem('userSession', JSON.stringify({ name: formData.name, email: formData.email }));
        window.dispatchEvent(new Event('storage'));
        setFormMessage({ type: 'success', text: 'Account created successfully! Redirecting...' });
        setTimeout(() => router.push('/'), 1000);
      }
    } catch (error: any) {
      if (error instanceof z.ZodError || error?.errors || error?.issues) {
        const newErrors: Record<string, string> = {};
        const issues = error.errors || error.issues || [];
        issues.forEach((err: any) => {
          if (err.path && err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        console.error('Unexpected error:', error);
        setFormMessage({ type: 'error', text: 'An unexpected error occurred.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <div className="text-3xl font-bold">
              Eco<GradientText>Track</GradientText>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {isSignIn ? 'Welcome Back' : 'Create Your Account'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isSignIn
              ? 'Enter your credentials to access your dashboard'
              : 'Join 50K+ users reducing their carbon footprint'}
          </p>
        </div>

        <GlassCard className="p-8">
          {formMessage && (
            <div 
              className={`p-3 rounded-lg text-sm mb-6 ${formMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
              role="alert"
              aria-live="polite"
            >
              {formMessage.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <AnimatePresence>
              {!isSignIn && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'} bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all`}
                    placeholder="John Doe"
                    aria-label="Full Name"
                    autoComplete="name"
                    required
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && <p id="name-error" className="mt-1 text-xs text-red-500" role="alert" aria-live="polite">{errors.name}</p>}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isSignIn && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, email: 'demo@ecotrack.ai', password: 'Demo1234!' }));
                    }}
                    className="w-full py-2 px-4 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-xl font-medium border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all text-sm mb-2"
                  >
                    Quick Demo Login
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'} bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all`}
                placeholder="you@example.com"
                aria-label="Email address"
                autoComplete="email"
                required
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && <p id="email-error" className="mt-1 text-xs text-red-500" role="alert" aria-live="polite">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'} bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all`}
                placeholder="••••••••"
                aria-label="Password"
                autoComplete="current-password"
                required
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              {errors.password && <p id="password-error" className="mt-1 text-xs text-red-500" role="alert" aria-live="polite">{errors.password}</p>}
            </div>

            <AnimatePresence>
              {!isSignIn && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'} bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all`}
                    placeholder="••••••••"
                    aria-label="Confirm Password"
                    autoComplete="new-password"
                    required
                    aria-invalid={errors.confirmPassword ? "true" : "false"}
                    aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                  />
                  {errors.confirmPassword && <p id="confirmPassword-error" className="mt-1 text-xs text-red-500" role="alert" aria-live="polite">{errors.confirmPassword}</p>}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : (isSignIn ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </div>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300 dark:bg-slate-700" />
            <span className="text-sm text-gray-600 dark:text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-slate-700" />
          </div>

          {/* Removed Social Sign In to satisfy no-dummy-buttons rule */}

          {/* Toggle Sign Up / Sign In */}
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {isSignIn ? "Don't have an account?" : 'Already have an account?'}{' '}
            </span>
            <button
              type="button"
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold transition-colors"
            >
              {isSignIn ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </GlassCard>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
