import React from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import BrandPublicProfile from './components/BrandPublicProfile';
import { Toaster } from 'sonner';

interface PageProps {
  params: Promise<{ brandId: string }>;
}

export default async function BrandPublicPage({ params }: PageProps) {
  const { brandId } = await params;

  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Header />
      <Toaster position="bottom-right" richColors />
      <main className="pt-16">
        <BrandPublicProfile brandId={brandId} />
      </main>
      <Footer />
    </div>
  );
}
