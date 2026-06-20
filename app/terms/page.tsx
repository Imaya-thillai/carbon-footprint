import React from 'react';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="prose dark:prose-invert max-w-none space-y-6">
        <p>Last updated: June 2026</p>
        
        <h2 className="text-2xl font-semibold mt-8">1. Acceptance of Terms</h2>
        <p>
          By accessing and using EcoTrack AI, you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h2 className="text-2xl font-semibold mt-8">2. Description of Service</h2>
        <p>
          EcoTrack AI is a web application developed for the Hack2Skill PromptWars hackathon. It provides carbon footprint 
          estimation and AI-driven sustainability recommendations. The estimations provided are approximations based on 
          national averages and should not be used for strict regulatory compliance or certified carbon accounting.
        </p>

        <h2 className="text-2xl font-semibold mt-8">3. Disclaimer of Warranties</h2>
        <p>
          The service is provided &quot;as is&quot; without warranty of any kind. We do not guarantee the accuracy, 
          completeness, or usefulness of the carbon emission factors, which are simplified for the purpose of this demonstration.
        </p>

        <h2 className="text-2xl font-semibold mt-8">4. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. We do so by posting and drawing attention to the updated terms on the site.
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
