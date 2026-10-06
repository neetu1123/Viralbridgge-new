import { apiFetch, buildQuery } from './client';
import type { DiscoveryCategory, DiscoveryLocation, DiscoveryProfile, DiscoverySearchResponse } from './types';

export interface ListingSearchQuery {
  q?: string;
  search?: string;
  category?: string;
  subcategory?: string;
  city?: string;
  area?: string;
  type?: 'all' | 'business' | 'creator';
  verified?: string;
  sort?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface OwnerListing {
  id: string;
  type: 'BUSINESS' | 'CREATOR';
  name: string;
  slug: string;
  logo_url: string | null;
  cover_image_url: string | null;
  short_description: string | null;
  description: string | null;
  category: string | null;
  subcategory: string | null;
  phone: string | null;
  email: string | null;
  whatsapp: string | null;
  website: string | null;
  city: string | null;
  state: string | null;
  area: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  business_hours: unknown;
  languages: string[];
  services: string[];
  social_links: Record<string, string> | null;
  gallery: string[];
  portfolio: unknown;
  status: string;
  verified: boolean;
  is_featured: boolean;
  is_visible: boolean;
  is_phone_public: boolean;
  is_email_public: boolean;
  is_whatsapp_public: boolean;
  is_address_public: boolean;
  is_website_public: boolean;
  profile_views: number;
  rejection_reason: string | null;
  publicPath: string;
  created_at: string;
  updated_at: string;
}

export interface ListingMineResponse {
  listing: OwnerListing | null;
  accountType: 'FREE_LISTING' | 'BRAND' | 'CREATOR';
  permissions: Record<string, boolean>;
  hasBrandProfile: boolean;
  hasCreatorProfile: boolean;
  upgradeUrl: string | null;
}

export interface ListingEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  created_at: string;
}

export function fetchDiscoverCategories(type?: string) {
  return apiFetch<DiscoveryCategory[]>(`/discover/categories${buildQuery({ type })}`);
}

export function fetchDiscoverLocations() {
  return apiFetch<DiscoveryLocation[]>('/discover/locations');
}

export function fetchDiscoverSearch(query: ListingSearchQuery = {}) {
  return apiFetch<DiscoverySearchResponse>(
    `/discover/search${buildQuery(query as Record<string, string | number | undefined>)}`,
  );
}

export function fetchDiscoverProfile(type: 'business' | 'creator', slug: string) {
  return apiFetch<DiscoveryProfile>(`/discover/${type}/${encodeURIComponent(slug)}`);
}

export function sendDiscoverEnquiry(
  id: string,
  body: { name: string; email: string; phone?: string; message: string; website_url?: string },
) {
  return apiFetch<{ success: boolean; id?: string }>(`/discover/${encodeURIComponent(id)}/enquiry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export function reportDiscoverListing(id: string, body: { reason: string; details?: string }) {
  return apiFetch<{ success: boolean }>(`/discover/${encodeURIComponent(id)}/report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export function trackDiscoverEvent(body: {
  event_type: string;
  listing_type?: string;
  listing_id?: string;
  category?: string;
  city?: string;
  query?: string;
}) {
  return apiFetch('/discover/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).catch(() => undefined);
}

export function fetchMyListing() {
  return apiFetch<ListingMineResponse>('/listings/me');
}

export function createListing(type: 'BUSINESS' | 'CREATOR', name?: string) {
  return apiFetch<OwnerListing>('/listings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, name }),
  });
}

export function updateListing(id: string, body: Partial<OwnerListing> & Record<string, unknown>) {
  return apiFetch<OwnerListing>(`/listings/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export function publishListing(id: string) {
  return apiFetch<OwnerListing>(`/listings/${id}/publish`, { method: 'POST' });
}

export function unpublishListing(id: string) {
  return apiFetch<OwnerListing>(`/listings/${id}/unpublish`, { method: 'POST' });
}

export function archiveListing(id: string) {
  return apiFetch<OwnerListing>(`/listings/${id}/archive`, { method: 'POST' });
}

export function upgradeListing(id: string) {
  return apiFetch<{ listing: OwnerListing; linked: boolean; message: string }>(`/listings/${id}/upgrade`, {
    method: 'POST',
  });
}

export function fetchListingEnquiries() {
  return apiFetch<ListingEnquiry[]>('/listings/me/enquiries');
}

export function fetchListingAnalytics() {
  return apiFetch<{ views: number; enquiries: number; contacts: number; searches: number }>('/listings/me/analytics');
}

export async function uploadListingImage(file: File) {
  const form = new FormData();
  form.append('image', file);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-admin-viralbridgge-new-three.vercel.app';
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const response = await fetch(`${BASE_URL.replace(/\/$/, '')}/listings/upload`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form,
  });
  const payload = (await response.json()) as { success?: boolean; data?: { url: string }; message?: string };
  if (!response.ok || !payload.success) {
    throw new Error(payload.message || 'Upload failed');
  }
  return payload.data as { url: string };
}
