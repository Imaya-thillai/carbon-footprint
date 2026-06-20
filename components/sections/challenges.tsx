'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../glass-card';

const CHALLENGES = [
  {
    title: 'Bike Week',
    description: 'Replace car trips with bike rides for 7 days',
    participants: '12,450',
    reward: '500 points',
    difficulty: 'Medium',
  },
  {
    title: 'Meatless May',
    description: 'Go vegetarian for the entire month',
    participants: '28,930',
    reward: '1,000 points',
    difficulty: 'Hard',
  },
  {
    title: 'Energy Saver',
    description: 'Reduce electricity usage by 20% this month',
    participants: '5,620',
    reward: '300 points',
    difficulty: 'Easy',
  },
  {
    title: 'Zero Waste',
    description: 'Produce zero waste for 30 days',
    participants: '8,340',
    reward: '800 points',
    difficulty: 'Hard',
  },
];

export function ChallengesSection() {
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
            Community Challenges
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Join thousands of people making a difference
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CHALLENGES.map((challenge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-6 hover:border-emerald-400/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {challenge.description}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4 ${
                    challenge.difficulty === 'Easy' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                    challenge.difficulty === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                    'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  }`}>
                    {challenge.difficulty}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Participants</p>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">
                      {challenge.participants}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Reward</p>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">
                      {challenge.reward}
                    </p>
                  </div>
                  <div>
                    <button className="w-full px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors">
                      Join
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Leaderboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Global Leaderboard</h3>
              <span className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 px-2 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                Demo Data
              </span>
            </div>
            <div className="space-y-4">
              {[
                { rank: 1, name: 'Alex Chen', score: '15,420', reduction: '-42%' },
                { rank: 2, name: 'Jordan Williams', score: '14,890', reduction: '-38%' },
                { rank: 3, name: 'Sam Martinez', score: '13,250', reduction: '-35%' },
                { rank: 4, name: 'You', score: '8,540', reduction: '-18%' },
              ].map((entry, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 w-8">
                      #{entry.rank}
                    </span>
                    <div>
                      <p className="font-semibold">{entry.name}</p>
                      <p className="text-xs text-gray-500">{entry.score} points</p>
                    </div>
                  </div>
                  <span className="text-green-600 dark:text-green-400 font-bold">{entry.reduction}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
