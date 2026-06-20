'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../glass-card';
import Image from 'next/image';

const FEATURES = [
  {
    icon: '🎯',
    title: 'Accurate Tracking',
    description: 'Real-time monitoring of your carbon emissions across all lifestyle categories',
    image: '/eco-earth.png',
  },
  {
    icon: '📊',
    title: 'Smart Analytics',
    description: 'Detailed breakdown and visualization of your environmental impact',
    image: '/eco-co2-gauge.png',
  },
  {
    icon: '💡',
    title: 'AI Recommendations',
    description: 'Personalized suggestions to reduce your carbon footprint effectively',
    image: '/eco-solar-panels.png',
  },
  {
    icon: '🌱',
    title: 'Carbon Offsetting',
    description: 'Support verified carbon reduction projects and track your impact',
    image: '/eco-carbon-offset.png',
  },
  {
    icon: '👥',
    title: 'Community Challenges',
    description: 'Join others in sustainability challenges and compete on leaderboards',
    image: '/eco-wind-turbines.png',
  },
  {
    title: 'Export Report',
    description: 'Download a PDF summary of your carbon footprint',
    icon: '📊',
    color: 'from-fuchsia-400 to-fuchsia-600',
  },
];

export function FeaturesSection() {
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
            Powerful Features for Conscious Living
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to understand and reduce your environmental impact
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-6 h-full hover:shadow-lg hover:shadow-emerald-500/20 transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-2xl">
                    {feature.icon}
                  </div>
                  {feature.image && (
                    <div className="w-12 h-12 relative">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
