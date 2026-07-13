import React from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import DiscoverSubPageClient from '../components/DiscoverSubPageClient';
import { Toaster } from 'sonner';

export default function DiscoverPlatformPage() {
  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Header />
      <Toaster position="bottom-right" richColors />
      <main className="pt-16">
        <DiscoverSubPageClient
          pageType="platform"
          title="Find Creators by Platform"
          subtitle="Search influencers on Instagram, YouTube, TikTok, and more"
        />
      </main>
      <Footer />
    </div>
  );
}
