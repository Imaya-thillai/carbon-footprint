'use client';

import React from 'react';
import { GlassCard } from './glass-card';

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 mt-20" role="contentinfo" aria-label="Site footer">
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent mb-2">
                EcoTrack
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Making sustainability simple for everyone
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#features" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Features</a></li>
                <li><a href="#calculator" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Calculator</a></li>
                <li><a href="#analytics" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Analytics</a></li>
                <li><a href="#pricing" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Pricing</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Hackathon project — legal pages not applicable
              </p>
            </div>
          </div>

          {/* Social & Bottom */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2025 EcoTrack AI. All rights reserved. Built for Hack2Skill PromptWars.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
