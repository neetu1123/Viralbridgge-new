'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { useAuth } from '@/src/components/AuthProvider';
import { buildAdminLoginUrl } from '@/src/lib/auth/sso';
import {
  createListing,
  fetchDiscoverCategories,
  fetchMyListing,
  publishListing,
  updateListing,
  uploadListingImage,
  type OwnerListing,
} from '@/src/lib/api/listings';
import type { DiscoveryCategory } from '@/src/lib/api/types';

const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Ahmedabad', 'Chennai', 'Kolkata', 'Noida', 'Gurgaon', 'Jaipur', 'Lucknow'];

export default function ListingWizardClient({ type }: { type: 'BUSINESS' | 'CREATOR' }) {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [step, setStep] = useState(0);
  const [listing, setListing] = useState<OwnerListing | null>(null);
  const [categories, setCategories] = useState<DiscoveryCategory[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    category: '',
    subcategory: '',
    short_description: '',
    description: '',
    city: '',
    area: '',
    address: '',
    phone: '',
    email: '',
    whatsapp: '',
    website: '',
    services: '',
    languages: '',
    instagram: '',
    youtube: '',
    is_phone_public: false,
    is_email_public: false,
    is_whatsapp_public: true,
    is_website_public: true,
    is_address_public: false,
    logo_url: '',
    cover_image_url: '',
    gallery: [] as string[],
  });

  const steps = type === 'CREATOR'
    ? ['Profile', 'Location', 'Contact', 'Portfolio', 'Media', 'Publish']
    : ['Business', 'Location', 'Contact', 'Details', 'Media', 'Publish'];

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      window.location.replace(buildAdminLoginUrl(type === 'CREATOR' ? '/get-listed/creator' : '/get-listed/business'));
    }
  }, [authLoading, isAuthenticated, type]);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchDiscoverCategories(type === 'CREATOR' ? 'creator' : 'business').then(setCategories).catch(() => setCategories([]));
    fetchMyListing()
      .then(async (mine) => {
        if (mine.listing) {
          setListing(mine.listing);
          hydrate(mine.listing);
          return;
        }
        const created = await createListing(type);
        setListing(created);
        hydrate(created);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Could not start listing'));
  }, [isAuthenticated, type]);

  const hydrate = (row: OwnerListing) => {
    const social = row.social_links || {};
    setForm((prev) => ({
      ...prev,
      name: row.name || '',
      category: row.category || '',
      subcategory: row.subcategory || '',
      short_description: row.short_description || '',
      description: row.description || '',
      city: row.city || '',
      area: row.area || '',
      address: row.address || '',
      phone: row.phone || '',
      email: row.email || '',
      whatsapp: row.whatsapp || '',
      website: row.website || '',
      services: (row.services || []).join(', '),
      languages: (row.languages || []).join(', '),
      instagram: social.instagram || '',
      youtube: social.youtube || '',
      is_phone_public: row.is_phone_public,
      is_email_public: row.is_email_public,
      is_whatsapp_public: row.is_whatsapp_public,
      is_website_public: row.is_website_public,
      is_address_public: row.is_address_public,
      logo_url: row.logo_url || '',
      cover_image_url: row.cover_image_url || '',
      gallery: row.gallery || [],
    }));
  };

  const payload = useMemo(
    () => ({
      name: form.name,
      category: form.category,
      subcategory: form.subcategory,
      short_description: form.short_description,
      description: form.description,
      city: form.city,
      area: form.area,
      address: form.address,
      phone: form.phone,
      email: form.email,
      whatsapp: form.whatsapp,
      website: form.website,
      services: form.services.split(',').map((s) => s.trim()).filter(Boolean),
      languages: form.languages.split(',').map((s) => s.trim()).filter(Boolean),
      social_links: {
        ...(form.instagram ? { instagram: form.instagram } : {}),
        ...(form.youtube ? { youtube: form.youtube } : {}),
      },
      is_phone_public: form.is_phone_public,
      is_email_public: form.is_email_public,
      is_whatsapp_public: form.is_whatsapp_public,
      is_website_public: form.is_website_public,
      is_address_public: form.is_address_public,
      logo_url: form.logo_url || undefined,
      cover_image_url: form.cover_image_url || undefined,
      gallery: form.gallery,
    }),
    [form],
  );

  const save = async () => {
    if (!listing) return listing;
    setSaving(true);
    setError('');
    try {
      const updated = await updateListing(listing.id, payload);
      setListing(updated);
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save');
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const next = async () => {
    try {
      await save();
      setStep((s) => Math.min(steps.length - 1, s + 1));
    } catch {
      // error already set
    }
  };

  const publish = async () => {
    if (!listing) return;
    setSaving(true);
    setError('');
    try {
      await save();
      await publishListing(listing.id);
      router.push('/my-listing');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not publish');
    } finally {
      setSaving(false);
    }
  };

  const upload = async (file: File, field: 'logo_url' | 'cover_image_url' | 'gallery') => {
    try {
      const uploaded = await uploadListingImage(file);
      if (field === 'gallery') {
        setForm((prev) => ({ ...prev, gallery: [...prev.gallery, uploaded.url].slice(0, 5) }));
      } else {
        setForm((prev) => ({ ...prev, [field]: uploaded.url }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    }
  };

  const set = (key: keyof typeof form, value: string | boolean | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8F7FC]">
        <Header />
        <p className="pt-28 text-center text-sm text-[#6B6B8A]">Checking your account…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Header />
      <main className="pt-24 pb-16 max-w-2xl mx-auto px-6">
        <p className="text-sm font-semibold text-[#7B2FF7]">{type === 'CREATOR' ? 'Creator listing' : 'Business listing'}</p>
        <h1 className="font-display text-3xl font-700 text-[#1F1F2E] mt-1">Get listed free</h1>
        <div className="mt-6 flex gap-2 overflow-x-auto">
          {steps.map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => setStep(index)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-full border ${index === step ? 'bg-[#7B2FF7] text-white border-[#7B2FF7]' : 'bg-white border-[#E5E7EB]'}`}
            >
              {index + 1}. {label}
            </button>
          ))}
        </div>

        <div className="mt-6 bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-4">
          {step === 0 && (
            <>
              <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder={type === 'CREATOR' ? 'Your name' : 'Business name'} className="w-full rounded-xl border px-3 py-2.5 text-sm" />
              <select value={form.category} onChange={(e) => set('category', e.target.value)} className="w-full rounded-xl border px-3 py-2.5 text-sm">
                <option value="">Category</option>
                {categories.map((item) => (
                  <option key={item.id} value={item.slug}>{item.name}</option>
                ))}
              </select>
              <input value={form.subcategory} onChange={(e) => set('subcategory', e.target.value)} placeholder="Subcategory (optional)" className="w-full rounded-xl border px-3 py-2.5 text-sm" />
              <textarea value={form.short_description} onChange={(e) => set('short_description', e.target.value)} maxLength={200} rows={3} placeholder="Short description" className="w-full rounded-xl border px-3 py-2.5 text-sm" />
            </>
          )}
          {step === 1 && (
            <>
              <select value={form.city} onChange={(e) => set('city', e.target.value)} className="w-full rounded-xl border px-3 py-2.5 text-sm">
                <option value="">City</option>
                {CITIES.map((city) => <option key={city} value={city}>{city}</option>)}
              </select>
              <input value={form.area} onChange={(e) => set('area', e.target.value)} placeholder="Area / locality" className="w-full rounded-xl border px-3 py-2.5 text-sm" />
              <input value={form.address} onChange={(e) => set('address', e.target.value)} placeholder="Address (kept private unless you enable it)" className="w-full rounded-xl border px-3 py-2.5 text-sm" />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_address_public} onChange={(e) => set('is_address_public', e.target.checked)} /> Show address publicly</label>
            </>
          )}
          {step === 2 && (
            <>
              <input value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="Phone" className="w-full rounded-xl border px-3 py-2.5 text-sm" />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_phone_public} onChange={(e) => set('is_phone_public', e.target.checked)} /> Show phone publicly</label>
              <input value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} placeholder="WhatsApp" className="w-full rounded-xl border px-3 py-2.5 text-sm" />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_whatsapp_public} onChange={(e) => set('is_whatsapp_public', e.target.checked)} /> Show WhatsApp publicly</label>
              <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="Email" className="w-full rounded-xl border px-3 py-2.5 text-sm" />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_email_public} onChange={(e) => set('is_email_public', e.target.checked)} /> Show email publicly</label>
              <input value={form.website} onChange={(e) => set('website', e.target.value)} placeholder="Website https://" className="w-full rounded-xl border px-3 py-2.5 text-sm" />
            </>
          )}
          {step === 3 && (
            <>
              <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={5} placeholder="Full description" className="w-full rounded-xl border px-3 py-2.5 text-sm" />
              <input value={form.services} onChange={(e) => set('services', e.target.value)} placeholder="Services (comma separated, max 5)" className="w-full rounded-xl border px-3 py-2.5 text-sm" />
              <input value={form.languages} onChange={(e) => set('languages', e.target.value)} placeholder="Languages" className="w-full rounded-xl border px-3 py-2.5 text-sm" />
              {type === 'CREATOR' && (
                <>
                  <input value={form.instagram} onChange={(e) => set('instagram', e.target.value)} placeholder="Instagram URL" className="w-full rounded-xl border px-3 py-2.5 text-sm" />
                  <input value={form.youtube} onChange={(e) => set('youtube', e.target.value)} placeholder="YouTube URL" className="w-full rounded-xl border px-3 py-2.5 text-sm" />
                </>
              )}
            </>
          )}
          {step === 4 && (
            <>
              <label className="block text-sm">Logo<input type="file" accept="image/*" className="block mt-1 text-sm" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0], 'logo_url')} /></label>
              {form.logo_url && <p className="text-xs text-emerald-700">Logo uploaded</p>}
              <label className="block text-sm">Cover<input type="file" accept="image/*" className="block mt-1 text-sm" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0], 'cover_image_url')} /></label>
              <label className="block text-sm">Gallery (max 5)<input type="file" accept="image/*" className="block mt-1 text-sm" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0], 'gallery')} /></label>
              <p className="text-xs text-[#6B6B8A]">{form.gallery.length} / 5 photos</p>
            </>
          )}
          {step === 5 && (
            <div className="text-sm text-[#1F1F2E] space-y-2">
              <p><strong>{form.name || 'Untitled'}</strong> · {form.category || 'No category'} · {form.city || 'No city'}</p>
              <p className="text-[#6B6B8A]">{form.short_description}</p>
              <p>Public URL preview: /discover/{type === 'CREATOR' ? 'creator' : 'business'}/{listing?.slug}</p>
              <p className="text-xs text-[#9AA0B4]">Submitting sends this listing to admin review. It appears on Discover after approval.</p>
            </div>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex justify-between pt-2">
            <button type="button" disabled={step === 0} onClick={() => setStep((s) => s - 1)} className="px-4 py-2 rounded-xl border text-sm disabled:opacity-40">Back</button>
            {step < steps.length - 1 ? (
              <button type="button" onClick={() => void next()} disabled={saving} className="btn-primary text-sm px-5 py-2">{saving ? 'Saving…' : 'Save & continue'}</button>
            ) : (
              <button type="button" onClick={() => void publish()} disabled={saving} className="btn-primary text-sm px-5 py-2">{saving ? 'Submitting…' : 'Submit for review'}</button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
