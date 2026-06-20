'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../glass-card';
import {
  calculateMonthlyCarbon,
  predictYearlyCarbon,
  getAIAssessment,
  calculateTreeOffset,
  calculateReductionPotential,
  compareToAverage,
  CarbonInputData
} from '../../lib/carbon-calculator';

export function CalculatorSection() {
  const [formData, setFormData] = useState<CarbonInputData>({
    electricity: 50,
    gasUsage: 30,
    carMiles: 100,
    flights: 1,
    diet: 50,
    shopping: 200,
  });

  const monthlyScore = useMemo(() => calculateMonthlyCarbon(formData), [formData]);
  const yearlyPrediction = useMemo(() => predictYearlyCarbon(monthlyScore), [monthlyScore]);
  const aiAssessment = useMemo(() => getAIAssessment(monthlyScore, formData), [monthlyScore, formData]);
  const treeOffset = useMemo(() => calculateTreeOffset(monthlyScore), [monthlyScore]);
  const reductionPotential = useMemo(() => calculateReductionPotential(monthlyScore), [monthlyScore]);
  const avgComparison = useMemo(() => compareToAverage(monthlyScore), [monthlyScore]);

  const handleChange = (field: keyof CarbonInputData, value: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
              Calculate Your Carbon
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Get your personalized carbon footprint in seconds
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-8 space-y-8">
            {/* Electricity */}
            <div>
              <label htmlFor="electricity" className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-900 dark:text-white">
                  ⚡ Monthly Electricity (kWh) <span className="text-xs font-normal text-gray-500 ml-1">(US avg: 877)</span>
                </span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400" aria-hidden="true">
                  {formData.electricity}
                </span>
              </label>
              <input
                id="electricity"
                type="range"
                aria-label="Monthly Electricity in kWh"
                aria-valuemin={0}
                aria-valuemax={2000}
                aria-valuenow={formData.electricity}
                min="0"
                max="2000"
                value={formData.electricity}
                onChange={(e) => handleChange('electricity', Number(e.target.value))}
                className="w-full h-2 bg-emerald-200 dark:bg-emerald-900/30 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Gas */}
            <div>
              <label htmlFor="gasUsage" className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-900 dark:text-white">
                  🔥 Natural Gas (therms/month) <span className="text-xs font-normal text-gray-500 ml-1">(US avg: 48)</span>
                </span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400" aria-hidden="true">
                  {formData.gasUsage}
                </span>
              </label>
              <input
                id="gasUsage"
                type="range"
                aria-label="Natural Gas in therms per month"
                aria-valuemin={0}
                aria-valuemax={200}
                aria-valuenow={formData.gasUsage}
                min="0"
                max="200"
                value={formData.gasUsage}
                onChange={(e) => handleChange('gasUsage', Number(e.target.value))}
                className="w-full h-2 bg-emerald-200 dark:bg-emerald-900/30 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Car Miles */}
            <div>
              <label htmlFor="carMiles" className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-900 dark:text-white">
                  🚗 Car Miles (monthly) <span className="text-xs font-normal text-gray-500 ml-1">(US avg: 1200)</span>
                </span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400" aria-hidden="true">
                  {formData.carMiles}
                </span>
              </label>
              <input
                id="carMiles"
                type="range"
                aria-label="Monthly Car Miles"
                aria-valuemin={0}
                aria-valuemax={2000}
                aria-valuenow={formData.carMiles}
                min="0"
                max="2000"
                value={formData.carMiles}
                onChange={(e) => handleChange('carMiles', Number(e.target.value))}
                className="w-full h-2 bg-emerald-200 dark:bg-emerald-900/30 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Flights */}
            <div>
              <label htmlFor="flights" className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-900 dark:text-white">
                  ✈️ Flights (hours per month) <span className="text-xs font-normal text-gray-500 ml-1">(US avg: 1)</span>
                </span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400" aria-hidden="true">
                  {formData.flights}
                </span>
              </label>
              <input
                id="flights"
                type="range"
                aria-label="Flight hours per month"
                aria-valuemin={0}
                aria-valuemax={20}
                aria-valuenow={formData.flights}
                min="0"
                max="20"
                value={formData.flights}
                onChange={(e) => handleChange('flights', Number(e.target.value))}
                className="w-full h-2 bg-emerald-200 dark:bg-emerald-900/30 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Diet */}
            <div>
              <label htmlFor="diet" className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-900 dark:text-white">
                  🍽️ Food Spending ($/month) <span className="text-xs font-normal text-gray-500 ml-1">(US avg: $300)</span>
                </span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400" aria-hidden="true">
                  ${formData.diet}
                </span>
              </label>
              <input
                id="diet"
                type="range"
                aria-label="Monthly Food Spending in dollars"
                aria-valuemin={0}
                aria-valuemax={500}
                aria-valuenow={formData.diet}
                min="0"
                max="500"
                value={formData.diet}
                onChange={(e) => handleChange('diet', Number(e.target.value))}
                className="w-full h-2 bg-emerald-200 dark:bg-emerald-900/30 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Shopping */}
            <div>
              <label htmlFor="shopping" className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-900 dark:text-white">
                  🛍️ Shopping Spending ($/month) <span className="text-xs font-normal text-gray-500 ml-1">(US avg: $250)</span>
                </span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400" aria-hidden="true">
                  ${formData.shopping}
                </span>
              </label>
              <input
                id="shopping"
                type="range"
                aria-label="Monthly Shopping Spending in dollars"
                aria-valuemin={0}
                aria-valuemax={1000}
                aria-valuenow={formData.shopping}
                min="0"
                max="1000"
                value={formData.shopping}
                onChange={(e) => handleChange('shopping', Number(e.target.value))}
                className="w-full h-2 bg-emerald-200 dark:bg-emerald-900/30 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Results & Predictions */}
            <div className="border-t border-white/20 pt-8 space-y-6" aria-live="polite">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Monthly */}
                <div className="text-center space-y-2 p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Monthly CO₂ Footprint</p>
                  <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                    {monthlyScore} kg
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {(monthlyScore / 30).toFixed(2)} kg/day
                  </p>
                </div>

                {/* Yearly Prediction */}
                <div className="text-center space-y-2 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Predicted Yearly CO₂</p>
                  <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">
                    {yearlyPrediction} kg
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {(yearlyPrediction / 1000).toFixed(1)} metric tons
                  </p>
                </div>
              </div>

              {/* AI Assessment */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">🤖 AI Assessment</p>
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    aiAssessment.level === 'Low' ? 'bg-green-200 text-green-800' :
                    aiAssessment.level === 'Moderate' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>{aiAssessment.level}</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{aiAssessment.message}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {aiAssessment.recommendations.map((rec, i) => (
                    <li key={i} className="text-xs text-gray-600 dark:text-gray-400">{rec}</li>
                  ))}
                </ul>
              </div>

              {/* Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-white/50 dark:bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-500">vs US Average</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {avgComparison.isHigher ? '↑' : '↓'} {avgComparison.diff} kg
                  </p>
                </div>
                <div className="p-3 bg-white/50 dark:bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-500">Carbon Offset Need</p>
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {treeOffset} trees
                  </p>
                </div>
                <div className="p-3 bg-white/50 dark:bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-500">Reduction Potential</p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {reductionPotential} kg/mo
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
