import React from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import CampaignPublicDetail from './components/CampaignPublicDetail';
import { Toaster } from 'sonner';

interface PageProps {
  params: Promise<{ campaignId: string }>;
}

export default async function CampaignPublicPage({ params }: PageProps) {
  const { campaignId } = await params;

  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Header />
      <Toaster position="bottom-right" richColors />
      <main className="pt-16">
        <CampaignPublicDetail campaignId={campaignId} />
      </main>
      <Footer />
    </div>
  );
}
