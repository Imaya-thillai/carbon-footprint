'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../glass-card';

const TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    role: 'Environmental Activist',
    content: 'EcoTrack has completely changed how I think about my daily choices. I&apos;ve reduced my carbon footprint by 40% in just 6 months!',
    avatar: '👩‍💼',
  },
  {
    name: 'Michael Chen',
    role: 'Tech Manager',
    content: 'The analytics are incredibly detailed and easy to understand. I love competing on the leaderboard with friends.',
    avatar: '👨‍💻',
  },
  {
    name: 'Emma Williams',
    role: 'Sustainability Consultant',
    content: 'I recommend EcoTrack to all my clients. It&apos;s the best tool for tracking corporate sustainability goals.',
    avatar: '👩‍🎓',
  },
  {
    name: 'David Rodriguez',
    role: 'Parent',
    content: 'My kids love the challenges! It&apos;s turned sustainability into a fun family activity.',
    avatar: '👨‍👧‍👦',
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Loved by Users Worldwide
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            See what our community says about EcoTrack
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-6 h-full">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-lg">⭐</span>
                  ))}
                </div>

                {/* Content */}
                <p className="text-base mb-6 text-gray-800 dark:text-gray-200 italic">
                  &quot;{testimonial.content}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16"
        >
          {[
            { stat: '4.9/5', label: 'Average Rating' },
            { stat: '50K+', label: 'Happy Users' },
            { stat: '2.4M+', label: 'Tons CO₂ Tracked' },
          ].map((item, i) => (
            <GlassCard key={i} className="p-6 text-center">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                {item.stat}
              </div>
              <p className="text-gray-600 dark:text-gray-400">{item.label}</p>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
