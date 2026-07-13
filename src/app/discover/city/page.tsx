import React from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import DiscoverSubPageClient from '../components/DiscoverSubPageClient';
import { Toaster } from 'sonner';

export default function DiscoverCityPage() {
  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Header />
      <Toaster position="bottom-right" richColors />
      <main className="pt-16">
        <DiscoverSubPageClient
          pageType="city"
          title="Find Influencers by City"
          subtitle="Discover top creators in India's leading metro cities"
        />
      </main>
      <Footer />
    </div>
  );
}
