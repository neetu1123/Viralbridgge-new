'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { useAuth } from '@/src/components/AuthProvider';
import { buildAdminLoginUrl } from '@/src/lib/auth/sso';
import { getAdminBase } from '@/src/lib/auth/session';
import {
  fetchListingAnalytics,
  fetchListingEnquiries,
  fetchMyListing,
  publishListing,
  unpublishListing,
  updateListing,
  upgradeListing,
  type ListingEnquiry,
  type ListingMineResponse,
  type OwnerListing,
} from '@/src/lib/api/listings';

export default function MyListingClient({ section = 'overview' }: { section?: 'overview' | 'settings' | 'enquiries' }) {
  const { isAuthenticated, loading } = useAuth();
  const [mine, setMine] = useState<ListingMineResponse | null>(null);
  const [analytics, setAnalytics] = useState<{ views: number; enquiries: number; contacts: number } | null>(null);
  const [enquiries, setEnquiries] = useState<ListingEnquiry[]>([]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      window.location.replace(buildAdminLoginUrl('/my-listing'));
    }
  }, [loading, isAuthenticated]);

  const reload = async () => {
    const data = await fetchMyListing();
    setMine(data);
    if (data.listing) {
      const [stats, leads] = await Promise.all([fetchListingAnalytics(), fetchListingEnquiries()]);
      setAnalytics(stats);
      setEnquiries(leads);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    reload().catch((err) => setError(err instanceof Error ? err.message : 'Failed to load listing'));
  }, [isAuthenticated]);

  const listing = mine?.listing;
  const adminBase = getAdminBase();

  const toggleVisible = async (row: OwnerListing) => {
    setSaving(true);
    try {
      if (row.is_visible) await unpublishListing(row.id);
      else await updateListing(row.id, { is_visible: true });
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8F7FC]">
        <Header />
        <p className="pt-28 text-center text-sm text-[#6B6B8A]">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Header />
      <main className="pt-24 pb-16 max-w-4xl mx-auto px-6">
        <h1 className="font-display text-3xl font-700 text-[#1F1F2E]">My Listing</h1>
        <p className="text-sm text-[#6B6B8A] mt-1">A lightweight dashboard for your public discover profile. Campaigns and payments stay in Brand/Creator accounts.</p>
        <div className="mt-4 flex gap-2">
          <Link href="/my-listing" className={`px-3 py-1.5 rounded-full text-sm border ${section === 'overview' ? 'bg-[#7B2FF7] text-white border-[#7B2FF7]' : 'bg-white'}`}>Overview</Link>
          <Link href="/my-listing/enquiries" className={`px-3 py-1.5 rounded-full text-sm border ${section === 'enquiries' ? 'bg-[#7B2FF7] text-white border-[#7B2FF7]' : 'bg-white'}`}>Enquiries</Link>
          <Link href="/my-listing/settings" className={`px-3 py-1.5 rounded-full text-sm border ${section === 'settings' ? 'bg-[#7B2FF7] text-white border-[#7B2FF7]' : 'bg-white'}`}>Settings</Link>
        </div>
        {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
        {!listing ? (
          <div className="mt-8 bg-white border rounded-2xl p-8 text-center">
            <p className="text-[#1F1F2E] font-semibold">You do not have a listing yet.</p>
            <Link href="/get-listed" className="inline-flex mt-4 btn-primary text-sm px-5 py-2.5">Get Listed Free</Link>
          </div>
        ) : (
          <>
            {section === 'overview' && (
              <div className="mt-6 grid sm:grid-cols-3 gap-3">
                {[
                  ['Status', listing.status],
                  ['Profile views', String(analytics?.views ?? listing.profile_views)],
                  ['Enquiries', String(analytics?.enquiries ?? enquiries.length)],
                ].map(([label, value]) => (
                  <div key={label} className="bg-white border rounded-2xl p-4">
                    <p className="text-xs text-[#9AA0B4]">{label}</p>
                    <p className="text-lg font-semibold mt-1">{value}</p>
                  </div>
                ))}
                <div className="sm:col-span-3 bg-white border rounded-2xl p-5">
                  <h2 className="font-semibold">{listing.name}</h2>
                  <p className="text-sm text-[#6B6B8A] mt-1">{listing.category} · {listing.city || 'No city'} · {listing.status} · {listing.is_visible ? 'Visible' : 'Hidden'}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href={listing.publicPath} className="btn-primary text-sm px-4 py-2">View public profile</Link>
                    <Link href={listing.type === 'CREATOR' ? '/get-listed/creator' : '/get-listed/business'} className="px-4 py-2 rounded-xl border text-sm">Edit listing</Link>
                    {(listing.status === 'DRAFT' || listing.status === 'REJECTED') && (
                      <button
                        type="button"
                        disabled={saving}
                        className="px-4 py-2 rounded-xl border text-sm"
                        onClick={() => {
                          setSaving(true);
                          publishListing(listing.id)
                            .then(() => reload())
                            .catch((err) => setError(err instanceof Error ? err.message : 'Submit failed'))
                            .finally(() => setSaving(false));
                        }}
                      >
                        Submit for review
                      </button>
                    )}
                    <button type="button" disabled={saving} onClick={() => void toggleVisible(listing)} className="px-4 py-2 rounded-xl border text-sm">
                      {listing.is_visible ? 'Hide from Discover' : 'Show on Discover'}
                    </button>
                  </div>
                </div>
                {mine.accountType === 'FREE_LISTING' && (
                  <div className="sm:col-span-3 bg-[#F8F7FC] border border-[#E5E7EB] rounded-2xl p-5">
                    <h3 className="font-semibold">Want campaigns, payments, and team tools?</h3>
                    <p className="text-sm text-[#6B6B8A] mt-1">Upgrade keeps this listing and public URL. It does not create a second account.</p>
                    <div className="mt-3 flex gap-2">
                    <a href={`${adminBase}/my-listing`} className="btn-primary text-sm px-4 py-2">Explore Brand / Creator</a>
                      <button
                        type="button"
                        className="px-4 py-2 rounded-xl border text-sm"
                        onClick={() => upgradeListing(listing.id).then(() => reload()).catch((err) => setError(err instanceof Error ? err.message : 'Upgrade link failed'))}
                      >
                        Connect existing account
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {section === 'enquiries' && (
              <div className="mt-6 bg-white border rounded-2xl overflow-hidden">
                {enquiries.length === 0 ? (
                  <p className="p-6 text-sm text-[#6B6B8A]">No enquiries yet.</p>
                ) : (
                  <ul>
                    {enquiries.map((item) => (
                      <li key={item.id} className="border-t first:border-t-0 p-4">
                        <p className="font-medium">{item.name} · {item.email}</p>
                        <p className="text-sm text-[#6B6B8A] mt-1 whitespace-pre-wrap">{item.message.replace(/\n\n\[ip:.*\]$/, '')}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {section === 'settings' && (
              <div className="mt-6 bg-white border rounded-2xl p-5 space-y-3 text-sm">
                <p>Account type: <strong>{mine.accountType}</strong></p>
                <p>Verified: {listing.verified ? 'Yes' : 'No (admin only)'}</p>
                <p>Public path: {listing.publicPath}</p>
                <p className="text-[#6B6B8A]">Free listings cannot create campaigns, manage teams, or access payments.</p>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
