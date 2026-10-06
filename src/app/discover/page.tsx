import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import BusinessSearchClient from '../business/components/BusinessSearchClient';

export const metadata: Metadata = {
  title: 'Discover Businesses & Creators | ViralBridge',
  description: 'Search registered businesses and creators on ViralBridge. Get listed free.',
};

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Header />
      <main className="pt-16">
        <Suspense fallback={<div className="max-w-screen-xl mx-auto px-6 py-16 text-sm text-[#6B6B8A]">Loading search…</div>}>
          <BusinessSearchClient mode="discover" />
        </Suspense>
        <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 pb-16">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
            <h2 className="font-semibold text-[#1F1F2E]">Looking for campaign-ready creators?</h2>
            <p className="text-sm text-[#6B6B8A] mt-1">Browse the creator marketplace by city, language, category, or platform.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/discover/city" className="rounded-full border border-[#E5E7EB] px-4 py-2 text-sm">By city</Link>
              <Link href="/discover/language" className="rounded-full border border-[#E5E7EB] px-4 py-2 text-sm">By language</Link>
              <Link href="/discover/category" className="rounded-full border border-[#E5E7EB] px-4 py-2 text-sm">By category</Link>
              <Link href="/discover/platform" className="rounded-full border border-[#E5E7EB] px-4 py-2 text-sm">By platform</Link>
              <Link href="/explore/creators-v2" className="rounded-full border border-[#7B2FF7] text-[#7B2FF7] px-4 py-2 text-sm">Creator marketplace</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
