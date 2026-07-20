import React from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import CreateCampaignClient from './components/CreateCampaignClient';

export default function CreateCampaignPage() {
  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Header />
      <main className="pt-16">
        <CreateCampaignClient />
      </main>
      <Footer />
    </div>
  );
}
