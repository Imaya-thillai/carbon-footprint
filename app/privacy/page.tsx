import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose dark:prose-invert max-w-none space-y-6">
        <p>Last updated: June 2026</p>
        
        <h2 className="text-2xl font-semibold mt-8">1. Introduction</h2>
        <p>
          Welcome to EcoTrack AI. We respect your privacy and are committed to protecting your personal data. 
          This privacy policy will inform you as to how we look after your personal data when you visit our website.
        </p>

        <h2 className="text-2xl font-semibold mt-8">2. Data Collection</h2>
        <p>
          As this is a Hackathon project submission for Hack2Skill PromptWars, we do not actively collect, store, or process 
          real personal information on remote servers. All carbon footprint calculations are performed either locally 
          or via secure, ephemeral API calls to our AI providers.
        </p>

        <h2 className="text-2xl font-semibold mt-8">3. AI Processing</h2>
        <p>
          Any data entered into the EcoTrack AI Chatbot is sent to our AI providers (e.g., Groq) strictly for generating 
          real-time sustainability recommendations. Your conversations are not used to train our models.
        </p>

        <h2 className="text-2xl font-semibold mt-8">4. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at privacy@ecotrack.ai.
        </p>
        
        <div className="mt-12">
          <Link href="/" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-medium">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
