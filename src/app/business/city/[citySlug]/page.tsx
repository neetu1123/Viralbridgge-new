import React, { Suspense } from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import BusinessSearchClient from '../../components/BusinessSearchClient';

interface PageProps {
  params: Promise<{ citySlug: string }>;
}

export default async function BusinessCityPage({ params }: PageProps) {
  const { citySlug } = await params;
  const city = citySlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Header />
      <main className="pt-16">
        <Suspense fallback={<div className="px-6 py-16 text-sm text-[#6B6B8A]">Loading…</div>}>
          <BusinessSearchClient initialCity={city} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
