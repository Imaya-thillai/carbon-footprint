'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { GlassCard } from '../glass-card';

const monthlyData = [
  { month: 'Jan', carbon: 240, target: 200 },
  { month: 'Feb', carbon: 220, target: 200 },
  { month: 'Mar', carbon: 200, target: 200 },
  { month: 'Apr', carbon: 190, target: 200 },
  { month: 'May', carbon: 180, target: 200 },
  { month: 'Jun', carbon: 170, target: 200 },
];

const categoryData = [
  { name: 'Transportation', value: 45, color: '#10b981' },
  { name: 'Energy', value: 30, color: '#34d399' },
  { name: 'Diet', value: 15, color: '#6ee7b7' },
  { name: 'Waste', value: 10, color: '#a7f3d0' },
];

// Memoize charts to prevent re-rendering on parent updates
const MemoizedLineChart = React.memo(() => (
  <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
    <Tooltip
      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
      itemStyle={{ color: '#fff' }}
    />
    <Legend />
    <Line type="monotone" dataKey="actual" name="Actual Emissions" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
    <Line type="monotone" dataKey="target" name="Target Goal" stroke="#3b82f6" strokeWidth={3} strokeDasharray="5 5" dot={false} />
  </LineChart>
));
MemoizedLineChart.displayName = 'MemoizedLineChart';

const MemoizedPieChart = React.memo(() => (
  <PieChart>
    <Pie
      data={categoryData}
      cx="50%"
      cy="50%"
      innerRadius={80}
      outerRadius={120}
      paddingAngle={5}
      dataKey="value"
    >
      {categoryData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={entry.color} />
      ))}
    </Pie>
    <Tooltip
      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
      itemStyle={{ color: '#fff' }}
    />
    <Legend verticalAlign="bottom" height={36} />
  </PieChart>
));
MemoizedPieChart.displayName = 'MemoizedPieChart';

export function AnalyticsSection() {
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
            Visualize Your Progress
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Track your carbon reduction journey with detailed analytics
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Trend */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-6">
              <h3 className="text-2xl font-bold mb-6">Monthly Emissions</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <MemoizedLineChart />
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </motion.div>

          {/* Category Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-6">
              <h3 className="text-2xl font-bold mb-6">Emissions by Category</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <MemoizedPieChart />
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        >
          {[
            { label: 'Avg Monthly', value: '195 kg', trend: '-5%' },
            { label: 'Total Saved', value: '340 kg', trend: '+12%' },
            { label: 'Goal Progress', value: '97%', trend: 'On Track' },
          ].map((stat, i) => (
            <GlassCard key={i} className="p-6">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {stat.value}
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">{stat.trend}</div>
              </div>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
