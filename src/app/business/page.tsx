import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import BusinessSearchClient from './components/BusinessSearchClient';

export const metadata: Metadata = {
  title: 'Discover Businesses & Creators | ViralBridge',
  description: 'Search local businesses, brands, and creators on ViralBridge by category and city.',
};

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Header />
      <main className="pt-16">
        <Suspense fallback={<div className="max-w-screen-xl mx-auto px-6 py-16 text-sm text-[#6B6B8A]">Loading search…</div>}>
          <BusinessSearchClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
