import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import BusinessSearchClient from '../../components/BusinessSearchClient';

interface PageProps {
  params: Promise<{ categorySlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const label = categorySlug.replace(/-/g, ' ');
  return {
    title: `${label} | ViralBridge Discover`,
    description: `Find ${label} businesses and creators on ViralBridge.`,
    alternates: { canonical: `/business/category/${categorySlug}` },
  };
}

export default async function BusinessCategoryPage({ params }: PageProps) {
  const { categorySlug } = await params;
  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Header />
      <main className="pt-16">
        <Suspense fallback={<div className="px-6 py-16 text-sm text-[#6B6B8A]">Loading…</div>}>
          <BusinessSearchClient initialCategory={categorySlug} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
