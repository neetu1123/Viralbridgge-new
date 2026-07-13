import React from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import DiscoverSubPageClient from '../components/DiscoverSubPageClient';
import { Toaster } from 'sonner';

export default function DiscoverPremiumPage() {
  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Header />
      <Toaster position="bottom-right" richColors />
      <main className="pt-16">
        <DiscoverSubPageClient
          pageType="premium"
          title="Premium Verified Creators"
          subtitle="Hand-picked top performers with verified badges and premium status"
          badge="Premium"
        />
      </main>
      <Footer />
    </div>
  );
}
