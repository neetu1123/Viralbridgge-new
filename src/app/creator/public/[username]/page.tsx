import React from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import CreatorPublicProfile from './components/CreatorPublicProfile';
import { Toaster } from 'sonner';

interface PageProps {
  params: Promise<{ username: string }>;
}

export default async function CreatorPublicPage({ params }: PageProps) {
  const { username } = await params;

  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Header />
      <Toaster position="bottom-right" richColors />
      <main className="pt-16">
        <CreatorPublicProfile username={username} />
      </main>
      <Footer />
    </div>
  );
}
