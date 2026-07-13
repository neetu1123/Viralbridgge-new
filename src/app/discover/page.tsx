import React from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import DiscoverHubClient from './components/DiscoverHubClient';
import { Toaster } from 'sonner';

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Header />
      <Toaster position="bottom-right" richColors />
      <main className="pt-16">
        <DiscoverHubClient />
      </main>
      <Footer />
    </div>
  );
}
