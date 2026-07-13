import React from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import DiscoverSubPageClient from '../components/DiscoverSubPageClient';
import { Toaster } from 'sonner';

export default function DiscoverLanguagePage() {
  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Header />
      <Toaster position="bottom-right" richColors />
      <main className="pt-16">
        <DiscoverSubPageClient
          pageType="language"
          title="Discover Creators by Language"
          subtitle="Connect with creators who speak your audience's language"
        />
      </main>
      <Footer />
    </div>
  );
}
