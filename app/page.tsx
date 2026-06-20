'use client';

import { Suspense, useEffect } from 'react';
import Lenis from 'lenis';
import { AuroraBackground } from '@/components/aurora-background';
import { MeshGradient } from '@/components/mesh-gradient';
import { FloatingParticles } from '@/components/floating-particles';
import { Spotlight } from '@/components/spotlight';
import { GifBackground } from '@/components/gif-background';
import { FloatingNavbar } from '@/components/floating-navbar';
import { HeroSection } from '@/components/sections/hero';
import { FeaturesSection } from '@/components/sections/features';
import { CalculatorSection } from '@/components/sections/calculator';
import { AIPredictionsSection } from '@/components/sections/ai-predictions';
import { AnalyticsSection } from '@/components/sections/analytics';
import { ChallengesSection } from '@/components/sections/challenges';
import { ErrorBoundary } from '@/components/error-boundary';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { PricingSection } from '@/components/sections/pricing';
import { CTASection } from '@/components/sections/cta';
import { AIChatbot } from '@/components/sections/ai-chatbot';
import { Footer } from '@/components/footer';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Background effects */}
      <div aria-hidden="true">
        <GifBackground />
        <MeshGradient />
        <AuroraBackground />
        <FloatingParticles />
        <Spotlight />
      </div>

      {/* Navigation */}
      <FloatingNavbar />

      {/* Content Sections */}
      <main id="main-content" role="main">
        <section id="hero" aria-label="Hero Section">
          <HeroSection />
        </section>

        <Suspense fallback={<div className="h-screen" aria-hidden="true" />}>
          <section id="features" aria-label="Features Section">
            <FeaturesSection />
          </section>
        </Suspense>

        <Suspense fallback={<div className="h-screen" aria-hidden="true" />}>
          <section id="calculator" aria-label="Carbon Calculator">
            <ErrorBoundary>
              <CalculatorSection />
            </ErrorBoundary>
          </section>
        </Suspense>

        <Suspense fallback={<div className="h-screen" aria-hidden="true" />}>
          <section id="ai-predictions" aria-label="AI Predictions">
            <AIPredictionsSection />
          </section>
        </Suspense>

        <Suspense fallback={<div className="h-screen" aria-hidden="true" />}>
          <section id="analytics" aria-label="Analytics Dashboard">
            <AnalyticsSection />
          </section>
        </Suspense>

        <Suspense fallback={<div className="h-screen" aria-hidden="true" />}>
          <section id="challenges" aria-label="Community Challenges">
            <ChallengesSection />
          </section>
        </Suspense>

        <Suspense fallback={<div className="h-screen" aria-hidden="true" />}>
          <section id="testimonials" aria-label="User Testimonials">
            <TestimonialsSection />
          </section>
        </Suspense>

        <Suspense fallback={<div className="h-screen" aria-hidden="true" />}>
          <section id="pricing" aria-label="Pricing Plans">
            <PricingSection />
          </section>
        </Suspense>

        <Suspense fallback={<div className="h-screen" aria-hidden="true" />}>
          <section id="cta" aria-label="Call to Action">
            <CTASection />
          </section>
        </Suspense>
      </main>

      {/* AI Assistant */}
      <ErrorBoundary>
        <AIChatbot />
      </ErrorBoundary>

      {/* Footer */}
      <Footer />
    </div>
  );
}
