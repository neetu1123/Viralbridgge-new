'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Globe, Mail, MapPin, MessageCircle, Phone, Star } from 'lucide-react';
import { fetchDiscoveryProfile, trackDiscoveryEvent } from '@/src/lib/api/discovery';
import type { DiscoveryProfile } from '@/src/lib/api/types';
import EnquiryModal from './EnquiryModal';

export default function BusinessProfileClient({ slug }: { slug: string }) {
  const [profile, setProfile] = useState<DiscoveryProfile | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchDiscoveryProfile(slug)
      .then((data) => {
        if (!cancelled) setProfile(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Profile not found');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return <div className="max-w-5xl mx-auto px-4 py-16"><div className="h-72 rounded-3xl bg-white border animate-pulse" /></div>;
  }
  if (error || !profile) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Profile not found</h1>
        <Link href="/business" className="mt-4 inline-block text-[#7B2FF7] font-medium">Back to Discover</Link>
      </div>
    );
  }

  const whatsapp = profile.contact.whatsapp?.replace(/\D/g, '');
  const track = (event_type: string) => {
    void trackDiscoveryEvent({ event_type, listing_type: profile.type, listing_id: profile.id });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
      <div className="h-48 sm:h-64 rounded-3xl overflow-hidden bg-gradient-to-r from-[#7B2FF7] to-[#F357A8]">
          {profile.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.coverImage} alt={`${profile.name} cover`} className="w-full h-full object-cover" />
          )}
      </div>
      <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 -mt-10 relative">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#F2F3F7] border-4 border-white -mt-16 sm:-mt-12 flex items-center justify-center text-xl font-semibold text-[#7B2FF7]">
            {profile.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.logo} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              profile.name.slice(0, 2).toUpperCase()
            )}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-[#1F1F2E]">{profile.name}</h1>
              {profile.verified && <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">Verified ✓</span>}
            </div>
            <p className="text-sm text-[#7B2FF7] mt-1">{profile.type === 'CREATOR' ? 'Creator' : 'Business'} · {profile.category}</p>
            <p className="text-sm text-[#6B6B8A] mt-1 flex items-center gap-1"><MapPin size={14} /> {profile.locationLabel || 'India'}</p>
            {profile.rating > 0 && (
              <p className="text-sm text-amber-600 mt-1 flex items-center gap-1"><Star size={14} fill="currentColor" /> {profile.rating.toFixed(1)} ({profile.reviewCount})</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {profile.contact.phone && (
            <a href={`tel:${profile.contact.phone}`} onClick={() => track('contact_click')} className="px-4 py-2 rounded-xl bg-[#7B2FF7] text-white text-sm font-semibold inline-flex items-center gap-2">
              <Phone size={14} /> Call Now
            </a>
          )}
          {whatsapp && (
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" onClick={() => track('whatsapp_click')} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold inline-flex items-center gap-2">
              <MessageCircle size={14} /> WhatsApp
            </a>
          )}
          {profile.contact.website && (
            <a href={profile.contact.website} target="_blank" rel="noreferrer" onClick={() => track('website_click')} className="px-4 py-2 rounded-xl border text-sm font-semibold inline-flex items-center gap-2">
              <Globe size={14} /> Visit Website
            </a>
          )}
          {profile.contact.email && (
            <a href={`mailto:${profile.contact.email}`} onClick={() => track('contact_click')} className="px-4 py-2 rounded-xl border text-sm font-semibold inline-flex items-center gap-2">
              <Mail size={14} /> Email
            </a>
          )}
          <button type="button" onClick={() => setEnquiryOpen(true)} className="px-4 py-2 rounded-xl border text-sm font-semibold">
            Send Enquiry
          </button>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-[1fr_280px] gap-6">
        <div className="space-y-6">
          <section className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
            <h2 className="font-semibold text-[#1F1F2E] mb-2">About</h2>
            <p className="text-sm text-[#6B6B8A] leading-relaxed">{profile.description || profile.shortDescription || 'No description yet.'}</p>
          </section>
          {profile.services?.length > 0 && (
            <section className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
              <h2 className="font-semibold text-[#1F1F2E] mb-3">Services</h2>
              <div className="flex flex-wrap gap-2">
                {profile.services.map((service) => (
                  <span key={service} className="px-3 py-1.5 rounded-full bg-[#F8F7FC] text-sm text-[#7B2FF7]">{service}</span>
                ))}
              </div>
            </section>
          )}
          {profile.type === 'CREATOR' && (profile.languages?.length || profile.followers) ? (
            <section className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
              <h2 className="font-semibold text-[#1F1F2E] mb-3">Creator information</h2>
              <ul className="space-y-2 text-sm text-[#6B6B8A]">
                {profile.locationLabel && <li>Location: {profile.locationLabel}</li>}
                {profile.languages && profile.languages.length > 0 && <li>Languages: {profile.languages.join(', ')}</li>}
                {profile.category && <li>Category: {profile.category}</li>}
                {typeof profile.followers === 'number' && profile.followers > 0 && <li>Followers: {profile.followers.toLocaleString()}</li>}
                {typeof profile.engagement === 'number' && profile.engagement > 0 && <li>Engagement: {profile.engagement}%</li>}
              </ul>
            </section>
          ) : null}
          {profile.type === 'BUSINESS' && (profile.establishedYear || profile.businessHours) ? (
            <section className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
              <h2 className="font-semibold text-[#1F1F2E] mb-3">Business information</h2>
              <ul className="space-y-2 text-sm text-[#6B6B8A]">
                {profile.category && <li>Category: {profile.category}</li>}
                {profile.locationLabel && <li>Location: {profile.locationLabel}</li>}
                {profile.establishedYear && <li>Established: {profile.establishedYear}</li>}
                {profile.website && <li>Website: {profile.website}</li>}
              </ul>
            </section>
          ) : null}
          {profile.gallery?.length > 0 && (
            <section className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
              <h2 className="font-semibold text-[#1F1F2E] mb-3">Gallery</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {profile.gallery.map((src) => (
                  <button key={src} type="button" onClick={() => setLightbox(src)} className="aspect-square rounded-xl overflow-hidden bg-[#F2F3F7]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`${profile.name} gallery`} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
        <aside className="space-y-4">
          <section className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
            <h2 className="font-semibold text-[#1F1F2E] mb-3">Contact</h2>
            <ul className="space-y-2 text-sm text-[#6B6B8A]">
              {profile.contact.email && <li className="flex items-center gap-2"><Mail size={14} /> {profile.contact.email}</li>}
              {profile.contact.phone && <li className="flex items-center gap-2"><Phone size={14} /> {profile.contact.phone}</li>}
              {profile.contact.address && <li className="flex items-start gap-2"><MapPin size={14} className="mt-0.5" /> {profile.contact.address}</li>}
              {!profile.contact.email && !profile.contact.phone && !profile.contact.address && (
                <li>Public contact details are hidden. Send an enquiry instead.</li>
              )}
            </ul>
          </section>
          {Object.keys(profile.socialLinks || {}).length > 0 && (
            <section className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
              <h2 className="font-semibold text-[#1F1F2E] mb-3">Social</h2>
              <div className="space-y-2">
                {Object.entries(profile.socialLinks).map(([key, url]) => (
                  <a key={key} href={url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#7B2FF7] capitalize">
                    <ExternalLink size={14} /> {key}
                  </a>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>

      {enquiryOpen && <EnquiryModal slug={profile.slug || profile.id} name={profile.name} onClose={() => setEnquiryOpen(false)} />}
      {lightbox && (
        <button type="button" className="fixed inset-0 z-[90] bg-black/80 flex items-center justify-center p-6" onClick={() => setLightbox(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox} alt="" className="max-h-full max-w-full rounded-xl" />
        </button>
      )}
    </div>
  );
}
