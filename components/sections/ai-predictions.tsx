'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../glass-card';
import { GradientText } from '../gradient-text';

export function AIPredictionsSection() {
  const [selectedTool, setSelectedTool] = useState<string>('emission');

  const tools = [
    {
      id: 'emission',
      icon: '📊',
      title: 'Emission Forecasting',
      description: 'AI predicts your future emissions based on current trends and seasonal patterns',
      insights: [
        'Summer: +15% increase due to air conditioning',
        'Winter: +8% increase from heating',
        'Trend: Steady if current habits maintained',
      ],
    },
    {
      id: 'recommendation',
      icon: '💡',
      title: 'Smart Recommendations',
      description: 'Personalized reduction strategies powered by machine learning',
      insights: [
        'Switch to renewable energy: Save 40kg CO₂/month',
        'Carpool 2x/week: Save 25kg CO₂/month',
        'Reduce meat 3 days/week: Save 15kg CO₂/month',
      ],
    },
    {
      id: 'impact',
      icon: '🌱',
      title: 'Impact Prediction',
      description: 'See the real-world impact of lifestyle changes before implementing them',
      insights: [
        'Going vegan would save 30kg CO₂/month',
        'Remote work 2 days/week saves 40kg CO₂/month',
        'Solar panels would offset 60kg CO₂/month',
      ],
    },
    {
      id: 'anomaly',
      icon: '🔍',
      title: 'Anomaly Detection',
      description: 'AI alerts you when your emissions spike unexpectedly',
      insights: [
        'Last month spike: 20% increase detected',
        'Cause: Extra flights (5 hours)',
        'Recommendation: Offset with green projects',
      ],
    },
  ];

  const selectedToolData = tools.find((t) => t.id === selectedTool);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <GradientText>AI-Powered Insights & Predictions</GradientText>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Our machine learning algorithms analyze your data to provide intelligent forecasts and personalized recommendations
          </p>
        </motion.div>

        {/* Tool Selection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`p-4 rounded-lg transition-all duration-300 ${
                selectedTool === tool.id
                  ? 'bg-emerald-100 dark:bg-emerald-900/40 border-2 border-emerald-500 scale-105'
                  : 'bg-white dark:bg-slate-800 border-2 border-transparent hover:border-emerald-300 dark:hover:border-emerald-700'
              }`}
            >
              <div className="text-3xl mb-2">{tool.icon}</div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">{tool.title.split(' ')[0]}</p>
            </button>
          ))}
        </motion.div>

        {/* Selected Tool Detail */}
        {selectedToolData && (
          <motion.div
            key={selectedToolData.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Left: Description */}
            <GlassCard className="p-8 flex flex-col justify-between">
              <div>
                <div className="text-5xl mb-4">{selectedToolData.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {selectedToolData.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {selectedToolData.description}
                </p>
              </div>
              <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors">
                Explore {selectedToolData.title}
              </button>
            </GlassCard>

            {/* Right: Insights */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Insights</h4>
              {selectedToolData.insights.map((insight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700"
                >
                  <p className="text-gray-900 dark:text-white font-medium">{insight}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/20"
        >
          {[
            { label: '98%', desc: 'Prediction Accuracy' },
            { label: '24/7', desc: 'Real-time Monitoring' },
            { label: '∞', desc: 'Scenario Planning' },
            { label: '🔐', desc: 'Privacy Protected' },
          ].map((item, i) => (
            <GlassCard key={i} className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                {item.label}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
