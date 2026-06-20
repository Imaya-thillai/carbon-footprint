'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../glass-card';
import { MagneticButton } from '../magnetic-button';
import { useRouter } from 'next/navigation';

const PLANS = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'Perfect for getting started',
    features: [
      'Basic carbon calculator',
      'Monthly dashboard',
      'Email support',
      'Up to 3 devices',
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: '/month',
    description: 'Most popular',
    features: [
      'Everything in Starter',
      'Advanced analytics',
      'Carbon offsetting',
      'Unlimited devices',
      'API access',
      'Priority support',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations',
    features: [
      'Everything in Pro',
      'Team management',
      'Custom integrations',
      'Dedicated account manager',
      'Advanced reporting',
      'SLA guarantee',
    ],
    highlighted: false,
  },
];

export function PricingSection() {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubscribe = (planName: string) => {
    const session = localStorage.getItem('userSession');
    if (!session) {
      router.push('/auth');
    } else {
      setToastMessage(`Successfully subscribed to ${planName} plan!`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-24 left-1/2 z-50 bg-emerald-500 text-white px-6 py-3 rounded-full shadow-lg font-medium"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Choose the plan that&apos;s right for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard
                className={`p-8 h-full flex flex-col ${
                  plan.highlighted ? 'ring-2 ring-emerald-500 scale-105 shadow-2xl shadow-emerald-500/20' : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-gray-600 dark:text-gray-400">{plan.period}</span>}
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <span className="text-emerald-600 dark:text-emerald-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div onClick={() => handleSubscribe(plan.name)}>
                  <MagneticButton className="w-full">
                    {plan.name === 'Starter' ? 'Get Started' : 'Subscribe Now'}
                  </MagneticButton>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* FAQ Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'Can I cancel anytime?',
                a: 'Yes, cancel your subscription at any time from your account settings. No questions asked.',
              },
              {
                q: 'Do you offer a free trial?',
                a: 'Our Starter plan is completely free forever. Upgrade to Pro anytime to unlock more features.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, Apple Pay, Google Pay, and PayPal.',
              },
              {
                q: 'Is my data secure?',
                a: 'Yes, we use enterprise-grade encryption and comply with GDPR and CCPA regulations.',
              },
            ].map((item, i) => (
              <GlassCard key={i} className="p-6">
                <h4 className="font-bold mb-2">{item.q}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.a}</p>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
