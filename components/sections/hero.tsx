'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GradientText } from '../gradient-text';
import { MagneticButton } from '../magnetic-button';
import { GlassCard } from '../glass-card';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        {/* Main heading */}
        <motion.h1
          className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight text-balance"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Take Control of Your <GradientText>Environmental Impact</GradientText>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-balance"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          EcoTrack AI helps you measure, understand, and reduce your carbon footprint
          with personalized insights and actionable recommendations.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <MagneticButton onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}>
            Start Free Calculation
          </MagneticButton>
          <Link href="/auth">
            <MagneticButton>Get Started Free</MagneticButton>
          </Link>
          <button 
            className="px-6 py-3 rounded-full border border-emerald-500 text-emerald-600 dark:text-emerald-400 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Learn More
          </button>
        </motion.div>

        {/* Stats showcase */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {[
            { label: '2.4M+', desc: 'Tons CO₂ Tracked' },
            { label: '50K+', desc: 'Active Users' },
            { label: '98%', desc: 'Accuracy Rate' },
          ].map((stat, i) => (
            <GlassCard key={i} className="p-6">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">{stat.desc}</div>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
