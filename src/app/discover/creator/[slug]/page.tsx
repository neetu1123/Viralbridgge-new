import React from 'react';
import type { Metadata } from 'next';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import BusinessProfileClient from '@/src/app/business/components/BusinessProfileClient';
import { fetchDiscoverProfile } from '@/src/lib/api/listings';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const profile = await fetchDiscoverProfile('creator', slug);
    const indexable = profile.discoveryStatus === 'PUBLISHED' || !profile.discoveryStatus;
    return {
      title: `${profile.name}${profile.category ? ` | ${profile.category}` : ''} Creator in ${profile.city || 'India'} | ViralBridge`,
      description: profile.shortDescription || profile.description || `Discover ${profile.name} on ViralBridge.`,
      alternates: { canonical: `/discover/creator/${slug}` },
      robots: indexable ? undefined : { index: false, follow: false },
      openGraph: {
        title: profile.name,
        description: profile.shortDescription || profile.description,
        images: profile.coverImage || profile.logo ? [profile.coverImage || profile.logo] : undefined,
      },
    };
  } catch {
    return { title: 'Listing unavailable | ViralBridge', robots: { index: false, follow: false } };
  }
}

export default async function DiscoverCreatorPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Header />
      <main className="pt-16">
        <BusinessProfileClient slug={slug} source="discover" kind="creator" />
      </main>
      <Footer />
    </div>
  );
}
