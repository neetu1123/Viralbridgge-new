import React from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import HeroSection from './components/HeroSection';
import SocialProofStrip from './components/SocialProofStrip';
import HowItWorks from './components/HowItWorks';
import FeaturedCampaigns from './components/FeaturedCampaigns';
import TopCreators from './components/TopCreators';
import CtaSection from './components/CtaSection';
export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg-base overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <SocialProofStrip />
        <HowItWorks />
        <FeaturedCampaigns />
        <TopCreators />
        <CtaSection />
      </main>
      <Footer />
    </main>
  );
}