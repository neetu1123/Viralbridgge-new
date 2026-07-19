import { apiFetch, buildQuery } from './client';
import type {
  PaginatedResponse,
  PlatformStats,
  PublicCampaign,
  PublicCampaignDetail,
  PublicCreator,
  PublicCreatorDetail,
} from './types';

export interface CreatorsQuery {
  page?: number;
  limit?: number;
  search?: string;
  categories?: string;
  platform?: string;
  locality?: string;
  language?: string;
  followersMin?: number;
  followersMax?: number;
  engagementMin?: number;
  sort?: string;
}

export interface CampaignsQuery {
  page?: number;
  limit?: number;
  search?: string;
  categories?: string;
  platform?: string;
  locality?: string;
  language?: string;
  budgetMin?: number;
  budgetMax?: number;
  deadlineDays?: number;
  sort?: string;
}

export function fetchPublicCreators(query: CreatorsQuery = {}) {
  return apiFetch<PaginatedResponse<PublicCreator>>(
    `/public/creators${buildQuery(query as Record<string, string | number | undefined>)}`,
  );
}

export function fetchPublicCreator(username: string) {
  return apiFetch<PublicCreatorDetail>(`/public/creators/${encodeURIComponent(username)}`);
}

export function fetchPublicCampaigns(query: CampaignsQuery = {}) {
  return apiFetch<PaginatedResponse<PublicCampaign>>(
    `/public/campaigns${buildQuery(query as Record<string, string | number | undefined>)}`,
  );
}

export function fetchPublicCampaign(id: string) {
  return apiFetch<PublicCampaignDetail>(`/public/campaigns/${encodeURIComponent(id)}`);
}

export function fetchPlatformStats() {
  return apiFetch<PlatformStats>('/public/stats');
}
