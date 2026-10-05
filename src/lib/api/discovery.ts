import { apiFetch, buildQuery } from './client';
import type {
  DiscoveryCategory,
  DiscoveryLocation,
  DiscoveryProfile,
  DiscoverySearchResponse,
} from './types';

export interface DiscoverySearchQuery {
  q?: string;
  search?: string;
  category?: string;
  subcategory?: string;
  city?: string;
  area?: string;
  type?: 'all' | 'business' | 'creator';
  verified?: string;
  rating?: number;
  sort?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export function fetchDiscoveryCategories(type?: string) {
  return apiFetch<DiscoveryCategory[]>(`/business/categories${buildQuery({ type })}`);
}

export function fetchDiscoveryLocations() {
  return apiFetch<DiscoveryLocation[]>('/business/locations');
}

export function fetchDiscoverySearch(query: DiscoverySearchQuery = {}) {
  return apiFetch<DiscoverySearchResponse>(
    `/business/search${buildQuery(query as Record<string, string | number | undefined>)}`,
  );
}

export function fetchDiscoveryProfile(slug: string) {
  return apiFetch<DiscoveryProfile>(`/business/${encodeURIComponent(slug)}`);
}

export function sendDiscoveryEnquiry(
  slug: string,
  body: { name: string; email: string; phone?: string; message: string; website_url?: string },
) {
  return apiFetch<{ success: boolean; id?: string }>(`/business/${encodeURIComponent(slug)}/enquiry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export function trackDiscoveryEvent(body: {
  event_type: string;
  listing_type?: string;
  listing_id?: string;
  category?: string;
  city?: string;
  query?: string;
}) {
  return apiFetch('/business/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).catch(() => undefined);
}
