import React from 'react';
import type { Metadata } from 'next';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import BusinessProfileClient from '../components/BusinessProfileClient';
import { fetchDiscoveryProfile } from '@/src/lib/api/discovery';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const profile = await fetchDiscoveryProfile(slug);
    return {
      title: `${profile.name} | ViralBridge Discover`,
      description: profile.shortDescription || profile.description || `Discover ${profile.name} on ViralBridge.`,
      alternates: { canonical: `/business/${slug}` },
      openGraph: {
        title: profile.name,
        description: profile.shortDescription || profile.description,
        images: profile.coverImage || profile.logo ? [profile.coverImage || profile.logo] : undefined,
      },
    };
  } catch {
    return { title: 'Profile | ViralBridge Discover' };
  }
}

export default async function BusinessProfilePage({ params }: PageProps) {
  const { slug } = await params;
  let jsonLd: Record<string, unknown> | null = null;
  try {
    const profile = await fetchDiscoveryProfile(slug);
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': profile.type === 'CREATOR' ? 'Person' : 'LocalBusiness',
      name: profile.name,
      description: profile.shortDescription || profile.description,
      image: profile.logo || profile.coverImage || undefined,
      url: `https://viralbridgge-new.vercel.app/business/${slug}`,
      address: profile.locationLabel
        ? { '@type': 'PostalAddress', addressLocality: profile.city, addressRegion: profile.state, streetAddress: profile.area }
        : undefined,
    };
  } catch {
    jsonLd = null;
  }

  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Header />
      <main className="pt-16">
        {jsonLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        )}
        <BusinessProfileClient slug={slug} />
      </main>
      <Footer />
    </div>
  );
}
