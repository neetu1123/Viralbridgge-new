import { apiFetch } from './client';

export interface CreateCampaignPayload {
  title: string;
  description: string;
  platform: string;
  budget: number;
  deadline: string;
  deliverables: string[];
  locality?: string;
  languages?: string[];
  status?: string;
}

export function createBrandCampaign(data: CreateCampaignPayload) {
  return apiFetch('/brand/campaigns', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export function getBrandCampaigns() {
  return apiFetch('/brand/campaigns');
}
