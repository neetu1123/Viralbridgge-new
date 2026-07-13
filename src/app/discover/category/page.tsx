import React from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import DiscoverSubPageClient from '../components/DiscoverSubPageClient';
import { Toaster } from 'sonner';

export default function DiscoverCategoryPage() {
  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Header />
      <Toaster position="bottom-right" richColors />
      <main className="pt-16">
        <DiscoverSubPageClient
          pageType="category"
          title="Browse Creators by Category"
          subtitle="Find niche experts across every content vertical"
        />
      </main>
      <Footer />
    </div>
  );
}
