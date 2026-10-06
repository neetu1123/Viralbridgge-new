'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, Sparkles } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { useAuth } from '@/src/components/AuthProvider';
import { buildAdminLoginUrl } from '@/src/lib/auth/sso';

export default function GetListedPage() {
  const { isAuthenticated, loading } = useAuth();

  const hrefFor = (path: string) => (isAuthenticated ? path : buildAdminLoginUrl(path));

  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Header />
      <main className="pt-28 pb-16 max-w-4xl mx-auto px-6">
        <p className="text-sm font-semibold text-[#7B2FF7]">Free listing</p>
        <h1 className="font-display text-4xl font-700 text-[#1F1F2E] mt-2">Get listed on ViralBridge</h1>
        <p className="mt-3 text-[#6B6B8A] max-w-2xl">
          Create a public discover profile for your business or as a creator. No campaign tools, payments, or team access unless you later upgrade.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <a href={loading ? '#' : hrefFor('/get-listed/business')} className="bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:border-[#7B2FF7]/50 transition-colors">
            <Briefcase className="text-[#7B2FF7]" />
            <h2 className="mt-4 text-xl font-semibold text-[#1F1F2E]">List as a Business</h2>
            <p className="text-sm text-[#6B6B8A] mt-2">Gyms, salons, restaurants, local services, and brands.</p>
            <span className="inline-flex mt-5 btn-primary text-sm px-4 py-2">Continue</span>
          </a>
          <a href={loading ? '#' : hrefFor('/get-listed/creator')} className="bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:border-[#7B2FF7]/50 transition-colors">
            <Sparkles className="text-[#F357A8]" />
            <h2 className="mt-4 text-xl font-semibold text-[#1F1F2E]">List as a Creator</h2>
            <p className="text-sm text-[#6B6B8A] mt-2">Photographers, makeup artists, influencers, and specialists.</p>
            <span className="inline-flex mt-5 btn-primary text-sm px-4 py-2">Continue</span>
          </a>
        </div>
        <p className="text-sm text-[#6B6B8A] mt-6">
          Already listed? <Link href="/my-listing" className="text-[#7B2FF7] font-semibold">Open My Listing</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}
