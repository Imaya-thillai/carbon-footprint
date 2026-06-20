'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { GlassCard } from '../glass-card';
import { MagneticButton } from '../magnetic-button';

export function CTASection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-12 text-center space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of people reducing their carbon footprint. Start tracking your
              environmental impact today and get personalized recommendations to live more
              sustainably.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/auth">
                <MagneticButton>Get Started Free</MagneticButton>
              </Link>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              No credit card required • Free forever plan available • Cancel anytime
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
