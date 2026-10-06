'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  CheckCircle2,
  ChevronDown,
  Copy,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
  Share2,
  Star,
} from 'lucide-react';
import { fetchDiscoveryProfile, trackDiscoveryEvent } from '@/src/lib/api/discovery';
import { fetchDiscoverProfile, reportDiscoverListing, sendDiscoverEnquiry, trackDiscoverEvent } from '@/src/lib/api/listings';
import type { DiscoveryProfile } from '@/src/lib/api/types';
import EnquiryModal from './EnquiryModal';

type TabId = 'overview' | 'catalogue' | 'info' | 'services' | 'photos' | 'reviews';

const TABS: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'catalogue', label: 'Catalogue' },
  { id: 'info', label: 'Quick Info' },
  { id: 'services', label: 'Services' },
  { id: 'photos', label: 'Photos' },
  { id: 'reviews', label: 'Reviews' },
];

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function formatBudget(n?: number | null) {
  if (!n) return '';
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(1)}L`;
  if (n >= 1_000) return `₹${Math.round(n / 1_000)}K`;
  return `₹${Math.round(n)}`;
}

function hoursSummary(value: unknown): { label: string; rows: Array<{ day: string; hours: string }> } {
  if (!value) return { label: 'Hours not listed', rows: [] };
  if (typeof value === 'string') return { label: value, rows: [{ day: 'Hours', hours: value }] };

  const source = value as Record<string, unknown>;
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const rows = days
    .map((day) => {
      const raw = source[day.toLowerCase()] ?? source[day];
      if (!raw) return null;
      if (typeof raw === 'string') return { day, hours: raw };
      if (typeof raw === 'object' && raw) {
        const item = raw as { open?: string; close?: string; hours?: string };
        if (item.hours) return { day, hours: item.hours };
        if (item.open || item.close) return { day, hours: `${item.open ?? ''} – ${item.close ?? ''}`.trim() };
      }
      return null;
    })
    .filter((row): row is { day: string; hours: string } => Boolean(row));

  const today = rows[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  return {
    label: today?.hours ? `Opens ${today.hours}` : rows[0]?.hours || 'Hours not listed',
    rows,
  };
}

function answerFromProfile(profile: DiscoveryProfile, question: string): string {
  const q = question.toLowerCase();
  if (q.includes('phone') || q.includes('call') || q.includes('number')) {
    return profile.contact.phone ? `You can call ${profile.name} at ${profile.contact.phone}.` : 'Phone is not listed publicly. Send an enquiry instead.';
  }
  if (q.includes('whatsapp')) {
    return profile.contact.whatsapp ? `WhatsApp ${profile.name} at ${profile.contact.whatsapp}.` : 'WhatsApp is not listed publicly.';
  }
  if (q.includes('address') || q.includes('where') || q.includes('location')) {
    return profile.contact.address || profile.locationLabel || 'Location is not listed yet.';
  }
  if (q.includes('hour') || q.includes('open') || q.includes('time')) {
    return hoursSummary(profile.businessHours).label;
  }
  if (q.includes('service') || q.includes('offer')) {
    return profile.services?.length ? `${profile.name} offers: ${profile.services.join(', ')}.` : 'No services listed yet.';
  }
  if (q.includes('campaign') || q.includes('collab') || q.includes('work')) {
    return profile.campaigns?.length
      ? `Open opportunities: ${profile.campaigns.map((c) => c.title).join(', ')}.`
      : profile.description || 'Send an enquiry to collaborate.';
  }
  return profile.shortDescription || profile.description || `Ask ${profile.name} directly with an enquiry.`;
}

export default function BusinessProfileClient({
  slug,
  source = 'business',
  kind = 'business',
}: {
  slug: string;
  source?: 'business' | 'discover';
  kind?: 'business' | 'creator';
}) {
  const [profile, setProfile] = useState<DiscoveryProfile | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryPrefill, setEnquiryPrefill] = useState('');
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [tab, setTab] = useState<TabId>('overview');
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState('');
  const [hoursOpen, setHoursOpen] = useState(false);
  const [ask, setAsk] = useState('');
  const [askReply, setAskReply] = useState('');
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState('spam');
  const [reportDetails, setReportDetails] = useState('');
  const [reportDone, setReportDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = source === 'discover' ? fetchDiscoverProfile(kind, slug) : fetchDiscoveryProfile(slug);
    load
      .then((data) => {
        if (!cancelled) setProfile(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'This listing is currently unavailable.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug, source, kind]);

  useEffect(() => {
    if (!profile) return;
    try {
      const raw = localStorage.getItem('vb_saved_listings');
      const ids = raw ? (JSON.parse(raw) as string[]) : [];
      setSaved(ids.includes(profile.id));
    } catch {
      setSaved(false);
    }
  }, [profile]);

  const photos = useMemo(() => {
    if (!profile) return [];
    return Array.from(new Set([profile.coverImage, profile.logo, ...(profile.gallery || [])].filter(Boolean)));
  }, [profile]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="h-8 w-2/3 bg-white rounded-lg animate-pulse mb-4" />
        <div className="h-64 rounded-2xl bg-white border animate-pulse" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Profile not found</h1>
        <Link href="/business" className="mt-4 inline-block text-[#7B2FF7] font-medium">
          Back to Discover
        </Link>
      </div>
    );
  }

  const whatsapp = profile.contact.whatsapp?.replace(/\D/g, '');
  const hours = hoursSummary(profile.businessHours);
  const years = profile.establishedYear ? Math.max(1, new Date().getFullYear() - profile.establishedYear) : null;
  const citySlug = profile.city ? slugify(profile.city) : '';
  const categorySlug = profile.category ? slugify(profile.category) : '';
  const mapsQuery =
    profile.latitude && profile.longitude
      ? `${profile.latitude},${profile.longitude}`
      : profile.contact.address || profile.locationLabel || profile.name;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
  const catalogue = (profile.campaigns?.length ? profile.campaigns : []).map((campaign) => ({
    id: campaign.id,
    title: campaign.title,
    description: campaign.description || campaign.platform || 'Collaboration opportunity',
    href: `/campaign/public/${campaign.id}`,
    meta: [campaign.platform, formatBudget(campaign.budget)].filter(Boolean).join(' · '),
  }));
  const serviceCards = (profile.services || []).map((service, index) => ({
    id: `service-${index}`,
    title: service,
    description: `Ask ${profile.name} about ${service.toLowerCase()}.`,
    href: '',
    meta: profile.category,
  }));
  const catalogueItems = catalogue.length > 0 ? catalogue : serviceCards;
  const extraPhotos = Math.max(0, photos.length - 4);
  const heroPhotos = photos.slice(0, 4);

  const track = (event_type: string) => {
    const payload = { event_type, listing_type: profile.type, listing_id: profile.id };
    if (source === 'discover') void trackDiscoverEvent(payload);
    else void trackDiscoveryEvent(payload);
  };

  const openEnquiry = (message = '') => {
    setEnquiryPrefill(message);
    setEnquiryOpen(true);
  };

  const toggleSave = () => {
    try {
      const raw = localStorage.getItem('vb_saved_listings');
      const ids = raw ? (JSON.parse(raw) as string[]) : [];
      const next = saved ? ids.filter((id) => id !== profile.id) : [...ids, profile.id];
      localStorage.setItem('vb_saved_listings', JSON.stringify(next));
      setSaved(!saved);
    } catch {
      setSaved(!saved);
    }
  };

  const copyText = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(''), 1600);
    } catch {
      setCopied('');
    }
  };

  const shareProfile = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: profile.name, url });
      } else {
        await copyText(url, 'link');
      }
    } catch {
      await copyText(url, 'link');
    }
  };

  const submitAsk = () => {
    if (!ask.trim()) return;
    setAskReply(answerFromProfile(profile, ask.trim()));
  };

  const ratingValue = profile.rating > 0 ? profile.rating : 0;

  return (
    <div className="bg-[#F4F6F8] min-h-screen pb-16">
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 text-xs text-[#6B6B8A] flex flex-wrap gap-1">
          <Link href="/business" className="hover:text-[#7B2FF7]">Discover</Link>
          {profile.city && (
            <>
              <span>/</span>
              <Link href={`/business/city/${citySlug}`} className="hover:text-[#7B2FF7]">{profile.city}</Link>
            </>
          )}
          {profile.category && (
            <>
              <span>/</span>
              <Link
                href={citySlug ? `/business/category/${categorySlug}/${citySlug}` : `/business/category/${categorySlug}`}
                className="hover:text-[#7B2FF7]"
              >
                {profile.category}{profile.city ? ` in ${profile.city}` : ''}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-[#1F1F2E] font-medium truncate max-w-[220px]">{profile.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 h-52 sm:h-64 md:h-72">
          <button
            type="button"
            onClick={() => heroPhotos[0] && setLightbox(heroPhotos[0])}
            className="relative col-span-2 row-span-2 rounded-l-2xl overflow-hidden bg-[#E8E0FF]"
          >
            {heroPhotos[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={heroPhotos[0]} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-[#7B2FF7]">
                {profile.name.slice(0, 2).toUpperCase()}
              </div>
            )}
          </button>
          {[1, 2, 3].map((index) => (
            <button
              key={index}
              type="button"
              onClick={() => (heroPhotos[index] ? setLightbox(heroPhotos[index]) : undefined)}
              className={`relative overflow-hidden bg-[#F2F3F7] ${index === 2 ? 'rounded-tr-2xl' : ''} ${index === 3 ? 'rounded-br-2xl' : ''}`}
            >
              {heroPhotos[index] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={heroPhotos[index]} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#EFEAFF] to-[#FFF0F6]" />
              )}
              {index === 2 && extraPhotos > 0 && (
                <span className="absolute inset-0 bg-black/45 text-white font-semibold text-sm flex items-center justify-center">
                  +{extraPhotos} More
                </span>
              )}
              {index === 3 && (
                <span className="absolute inset-0 bg-black/35 text-white text-xs font-semibold flex flex-col items-center justify-center gap-1">
                  <span className="w-8 h-8 rounded-full border border-white/80 flex items-center justify-center">+</span>
                  Photos
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-b-2xl border border-t-0 border-[#E5E7EB] px-4 sm:px-6 py-5">
          <div className="flex flex-col lg:flex-row lg:items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1F1F2E]">{profile.name}</h1>
                <button
                  type="button"
                  onClick={toggleSave}
                  className={`p-2 rounded-lg border ${saved ? 'text-[#7B2FF7] border-[#7B2FF7] bg-[#F8F7FC]' : 'text-[#6B6B8A] border-[#E5E7EB]'}`}
                  aria-label={saved ? 'Remove bookmark' : 'Save listing'}
                >
                  <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
                </button>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                <span className="inline-flex items-center gap-1 bg-[#16A34A] text-white font-semibold px-2 py-0.5 rounded">
                  {ratingValue > 0 ? ratingValue.toFixed(1) : 'New'}
                  <Star size={12} fill="currentColor" />
                </span>
                <span className="text-[#2563EB] font-medium">
                  {profile.reviewCount > 0 ? `${profile.reviewCount} Ratings` : 'Be the first to rate'}
                </span>
                {(profile.verified || profile.claimed) && (
                  <span className="inline-flex items-center gap-1 text-[#2563EB] font-medium">
                    <CheckCircle2 size={14} /> Verified
                  </span>
                )}
                {profile.featured && <span className="text-emerald-700 font-medium">Claimed</span>}
              </div>

              <p className="mt-2 text-sm text-[#6B6B8A] flex flex-wrap items-center gap-x-2 gap-y-1">
                <MapPin size={14} className="text-[#7B2FF7]" />
                {profile.locationLabel || [profile.area, profile.city, profile.state].filter(Boolean).join(', ') || 'India'}
                <span className="text-[#D1D5DB]">·</span>
                <button type="button" onClick={() => setHoursOpen((open) => !open)} className="inline-flex items-center gap-1 text-[#16A34A] font-medium">
                  {hours.label}
                  <ChevronDown size={14} />
                </button>
                {years && (
                  <>
                    <span className="text-[#D1D5DB]">·</span>
                    <span>{years} {years === 1 ? 'Year' : 'Years'} in Business</span>
                  </>
                )}
              </p>
              {hoursOpen && hours.rows.length > 0 && (
                <ul className="mt-2 text-xs text-[#6B6B8A] bg-[#F8F7FC] rounded-xl p-3 w-full max-w-sm">
                  {hours.rows.map((row) => (
                    <li key={row.day} className="flex justify-between py-0.5">
                      <span>{row.day}</span>
                      <span>{row.hours}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {profile.contact.phone && (
                  <a
                    href={`tel:${profile.contact.phone}`}
                    onClick={() => track('contact_click')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0F766E] text-white text-sm font-semibold"
                  >
                    <Phone size={15} /> {profile.contact.phone}
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => openEnquiry()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2563EB] text-white text-sm font-semibold"
                >
                  Enquire Now
                </button>
                {whatsapp && (
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => track('whatsapp_click')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#16A34A] text-white text-sm font-semibold"
                  >
                    <MessageCircle size={15} /> WhatsApp
                  </a>
                )}
                <button type="button" onClick={shareProfile} className="p-2.5 rounded-lg border border-[#E5E7EB] text-[#6B6B8A]" aria-label="Share">
                  <Share2 size={16} />
                </button>
                <button type="button" onClick={() => setReportOpen(true)} className="text-xs text-[#9AA0B4] underline">
                  Report this listing
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {[profile.category, profile.subcategory, ...(profile.tags || [])]
                  .filter(Boolean)
                  .filter((value, index, arr) => arr.indexOf(value) === index)
                  .slice(0, 6)
                  .map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full border border-[#E5E7EB] text-xs text-[#4B5563] bg-white">
                      {tag}
                    </span>
                  ))}
              </div>
            </div>

            <div className="text-right hidden sm:block">
              <p className="text-xs text-[#6B6B8A] mb-1">Click to Rate</p>
              <div className="flex justify-end gap-1 text-[#D1D5DB]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={18} className={star <= Math.round(ratingValue) ? 'text-amber-400' : ''} fill={star <= Math.round(ratingValue) ? 'currentColor' : 'none'} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white rounded-2xl border border-[#E5E7EB] px-2 sm:px-4 overflow-x-auto">
          <div className="flex min-w-max">
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`px-4 py-3 text-sm font-semibold border-b-2 ${
                  tab === item.id ? 'text-[#2563EB] border-[#2563EB]' : 'text-[#6B6B8A] border-transparent'
                }`}
              >
                {item.label}
                {item.id === 'catalogue' && catalogueItems.length > 0 && (
                  <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-rose-500 align-middle" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid lg:grid-cols-[1fr_320px] gap-4 items-start">
          <div className="space-y-4">
            {(tab === 'overview' || tab === 'catalogue') && (
              <section className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-[#1F1F2E]">Catalogue</h2>
                  {tab === 'overview' && catalogueItems.length > 3 && (
                    <button type="button" onClick={() => setTab('catalogue')} className="text-sm text-[#2563EB] font-medium">
                      View all
                    </button>
                  )}
                </div>
                {catalogueItems.length === 0 ? (
                  <p className="text-sm text-[#6B6B8A]">No catalogue items yet. Send an enquiry to collaborate.</p>
                ) : (
                  <div className="grid sm:grid-cols-3 gap-3">
                    {(tab === 'overview' ? catalogueItems.slice(0, 3) : catalogueItems).map((item) => (
                      <article key={item.id} className="rounded-xl border border-[#E5E7EB] p-4">
                        <h3 className="font-semibold text-[#1F1F2E] text-sm">{item.title}</h3>
                        <p className="text-xs text-[#6B6B8A] mt-1 line-clamp-2">{item.description}</p>
                        {item.meta && <p className="text-[11px] text-[#7B2FF7] mt-2">{item.meta}</p>}
                        {item.href ? (
                          <Link href={item.href} className="mt-3 inline-block text-xs font-semibold text-[#2563EB]">
                            View Details
                          </Link>
                        ) : (
                          <button type="button" onClick={() => openEnquiry(`I want details for ${item.title}`)} className="mt-3 text-xs font-semibold text-[#2563EB]">
                            View Details
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => openEnquiry(`I would like a price for ${item.title}`)}
                          className="mt-3 w-full rounded-lg border border-[#2563EB] text-[#2563EB] text-sm font-semibold py-2"
                        >
                          Ask for price
                        </button>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            )}

            {(tab === 'overview' || tab === 'info') && (
              <section className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
                <h2 className="text-lg font-semibold text-[#1F1F2E] mb-3">{tab === 'info' ? 'Quick Info' : 'About'}</h2>
                <p className="text-sm text-[#6B6B8A] leading-relaxed">
                  {profile.description || profile.shortDescription || 'No description yet.'}
                </p>
                {profile.type === 'CREATOR' && (
                  <ul className="mt-4 space-y-1 text-sm text-[#6B6B8A]">
                    {profile.languages?.length ? <li>Languages: {profile.languages.join(', ')}</li> : null}
                    {typeof profile.followers === 'number' && profile.followers > 0 && (
                      <li>Followers: {profile.followers.toLocaleString()}</li>
                    )}
                    {typeof profile.engagement === 'number' && profile.engagement > 0 && (
                      <li>Engagement: {profile.engagement}%</li>
                    )}
                  </ul>
                )}
                {tab === 'info' && (
                  <ul className="mt-4 space-y-2 text-sm text-[#6B6B8A]">
                    <li>Type: {profile.type === 'CREATOR' ? 'Creator' : 'Business'}</li>
                    {profile.category && <li>Category: {profile.category}</li>}
                    {profile.locationLabel && <li>Location: {profile.locationLabel}</li>}
                    {profile.establishedYear && <li>Established: {profile.establishedYear}</li>}
                    {profile.website && (
                      <li>
                        Website:{' '}
                        <a href={profile.website} target="_blank" rel="noreferrer" onClick={() => track('website_click')} className="text-[#2563EB]">
                          {profile.website}
                        </a>
                      </li>
                    )}
                  </ul>
                )}
              </section>
            )}

            {(tab === 'overview' || tab === 'services') && profile.services?.length > 0 && (
              <section className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
                <h2 className="text-lg font-semibold text-[#1F1F2E] mb-3">Services</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.services.map((service) => (
                    <span key={service} className="px-3 py-1.5 rounded-full bg-[#F8F7FC] text-sm text-[#7B2FF7]">
                      {service}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {(tab === 'overview' || tab === 'photos') && (
              <section className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
                <h2 className="text-lg font-semibold text-[#1F1F2E] mb-3">Photos</h2>
                {photos.length === 0 ? (
                  <p className="text-sm text-[#6B6B8A]">No photos uploaded yet.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {(tab === 'overview' ? photos.slice(0, 6) : photos).map((src) => (
                      <button key={src} type="button" onClick={() => setLightbox(src)} className="aspect-square rounded-xl overflow-hidden bg-[#F2F3F7]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt={`${profile.name} photo`} className="w-full h-full object-cover" loading="lazy" />
                      </button>
                    ))}
                  </div>
                )}
              </section>
            )}

            {(tab === 'overview' || tab === 'reviews') && (
              <section className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
                <h2 className="text-lg font-semibold text-[#1F1F2E] mb-3">Reviews</h2>
                {profile.reviewCount > 0 ? (
                  <p className="text-sm text-[#6B6B8A]">
                    Rated {profile.rating.toFixed(1)} from {profile.reviewCount} ratings.
                  </p>
                ) : (
                  <p className="text-sm text-[#6B6B8A]">No public reviews yet.</p>
                )}
              </section>
            )}

            <section className="rounded-2xl border border-[#F59E0B]/40 bg-gradient-to-r from-white to-[#FFF8EC] p-4">
              <p className="text-sm font-semibold text-[#1F1F2E]">Ask anything about this place</p>
              <div className="mt-3 flex gap-2">
                <input
                  value={ask}
                  onChange={(e) => setAsk(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submitAsk()}
                  placeholder="Ask anything..."
                  className="flex-1 rounded-xl border border-[#E5E7EB] px-3 py-2.5 text-sm"
                />
                <button type="button" onClick={submitAsk} className="w-11 h-11 rounded-full bg-[#2563EB] text-white flex items-center justify-center" aria-label="Send question">
                  <Send size={16} />
                </button>
              </div>
              {askReply && <p className="mt-3 text-sm text-[#4B5563]">{askReply}</p>}
              <button type="button" onClick={() => openEnquiry(ask)} className="mt-2 text-xs font-semibold text-[#2563EB]">
                Still need help? Send an enquiry
              </button>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24">
            <section className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
              <h2 className="font-semibold text-[#1F1F2E] mb-3">Contact</h2>
              {profile.contact.phone ? (
                <a href={`tel:${profile.contact.phone}`} onClick={() => track('contact_click')} className="flex items-center gap-2 text-[#2563EB] font-semibold">
                  <Phone size={16} /> {profile.contact.phone}
                </a>
              ) : (
                <p className="text-sm text-[#6B6B8A]">Phone is hidden. Use Enquire Now.</p>
              )}
              {profile.contact.email && (
                <a href={`mailto:${profile.contact.email}`} className="mt-2 flex items-center gap-2 text-sm text-[#6B6B8A]">
                  <Mail size={14} /> {profile.contact.email}
                </a>
              )}
              {profile.contact.website && (
                <a href={profile.contact.website} target="_blank" rel="noreferrer" onClick={() => track('website_click')} className="mt-2 flex items-center gap-2 text-sm text-[#2563EB]">
                  <Globe size={14} /> Website
                </a>
              )}

              {(profile.contact.address || profile.locationLabel) && (
                <div className="mt-4">
                  <h3 className="font-semibold text-[#1F1F2E] mb-1">Address</h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed">{profile.contact.address || profile.locationLabel}</p>
                  <div className="mt-3 flex gap-2">
                    <a href={mapsUrl} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg border border-[#E5E7EB] py-2 text-xs font-semibold text-[#4B5563]">
                      <Navigation size={13} /> Get Directions
                    </a>
                    <button
                      type="button"
                      onClick={() => copyText(profile.contact.address || profile.locationLabel, 'address')}
                      className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg border border-[#E5E7EB] py-2 text-xs font-semibold text-[#4B5563]"
                    >
                      <Copy size={13} /> {copied === 'address' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}

              <button type="button" onClick={() => setHoursOpen((open) => !open)} className="mt-4 w-full text-left text-sm text-[#16A34A] font-medium inline-flex items-center gap-1">
                {hours.label} <ChevronDown size={14} />
              </button>
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
      </div>

      {enquiryOpen && (
        <EnquiryModal
          slug={profile.slug || profile.id}
          name={profile.name}
          initialMessage={enquiryPrefill}
          onClose={() => setEnquiryOpen(false)}
          onSubmit={
            source === 'discover'
              ? (body) => sendDiscoverEnquiry(profile.id, body)
              : undefined
          }
        />
      )}
      {reportOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <button type="button" className="absolute inset-0 bg-black/40" onClick={() => setReportOpen(false)} aria-label="Close" />
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-[#1F1F2E]">Report this listing</h2>
            {reportDone ? (
              <p className="mt-4 text-sm text-emerald-700">Thanks. Our team will review this report.</p>
            ) : (
              <form
                className="mt-4 space-y-3"
                onSubmit={async (event) => {
                  event.preventDefault();
                  try {
                    await reportDiscoverListing(profile.id, { reason: reportReason, details: reportDetails });
                    setReportDone(true);
                  } catch {
                    setReportDone(true);
                  }
                }}
              >
                <select value={reportReason} onChange={(e) => setReportReason(e.target.value)} className="w-full rounded-xl border border-[#E5E7EB] px-3 py-2.5 text-sm">
                  <option value="spam">Spam</option>
                  <option value="fake_listing">Fake listing</option>
                  <option value="incorrect_information">Incorrect information</option>
                  <option value="inappropriate_content">Inappropriate content</option>
                  <option value="impersonation">Impersonation</option>
                  <option value="other">Other</option>
                </select>
                <textarea value={reportDetails} onChange={(e) => setReportDetails(e.target.value)} rows={3} placeholder="Optional details" className="w-full rounded-xl border border-[#E5E7EB] px-3 py-2.5 text-sm" />
                <button type="submit" className="w-full btn-primary py-2.5 text-sm">Submit report</button>
              </form>
            )}
          </div>
        </div>
      )}
      {lightbox && (
        <button type="button" className="fixed inset-0 z-[90] bg-black/80 flex items-center justify-center p-6" onClick={() => setLightbox(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox} alt="" className="max-h-full max-w-full rounded-xl" />
        </button>
      )}
    </div>
  );
}
