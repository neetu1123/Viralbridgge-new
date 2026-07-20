'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { DollarSign, Calendar, Users, ArrowRight } from 'lucide-react';
import { fetchPublicCampaigns } from '@/src/lib/api/public';
import type { PublicCampaign } from '@/src/lib/api/types';
import { mapCampaignSort } from '@/src/lib/explore-utils';
import type { CampaignFilters } from './CampaignsExploreClient';

function PlatformBadge({ platform }: { platform: string }) {
  const colors: Record<string, { text: string; bg: string }> = {
    Instagram: { text: '#F357A8', bg: '#FFF0F6' },
    TikTok: { text: '#1F1F2E', bg: '#F2F3F7' },
    YouTube: { text: '#EF4444', bg: '#FEF2F2' },
    'Twitter/X': { text: '#6B6B8A', bg: '#F2F3F7' },
    Pinterest: { text: '#EF4444', bg: '#FEF2F2' },
    LinkedIn: { text: '#2563EB', bg: '#EFF6FF' },
  };
  const style = colors[platform] || { text: '#6B6B8A', bg: '#F2F3F7' };
  return (
    <span
      className="text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ color: style.text, backgroundColor: style.bg }}
    >
      {platform}
    </span>
  );
}

interface CampaignGridProps {
  filters: CampaignFilters;
  updateFilter: <K extends keyof CampaignFilters>(key: K, value: CampaignFilters[K]) => void;
}

function CampaignCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 animate-pulse">
      <div className="flex gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#F2F3F7]" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-[#F2F3F7] rounded w-1/3" />
          <div className="h-4 bg-[#F2F3F7] rounded w-2/3" />
        </div>
      </div>
      <div className="h-16 bg-[#F8F7FC] rounded-xl mb-4" />
      <div className="h-10 bg-[#F2F3F7] rounded-xl" />
    </div>
  );
}

export default function CampaignGrid({ filters, updateFilter }: CampaignGridProps) {
  const [campaigns, setCampaigns] = useState<PublicCampaign[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiQuery = useMemo(
    () => ({
      page: 1,
      limit: 50,
      search: filters.search || undefined,
      categories: filters.categories.length ? filters.categories.join(',') : undefined,
      platform: filters.platforms.length === 1 ? filters.platforms[0] : undefined,
      budgetMin: filters.budgetMin > 0 ? filters.budgetMin : undefined,
      budgetMax: filters.budgetMax < 50000 ? filters.budgetMax : undefined,
      deadlineDays: filters.deadline ? parseInt(filters.deadline, 10) : undefined,
      sort: mapCampaignSort(filters.sortBy),
    }),
    [filters],
  );

  const loadCampaigns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchPublicCampaigns(apiQuery);
      let data = result.data;

      if (filters.platforms.length > 1) {
        data = data.filter((c) => filters.platforms.includes(c.platform));
      }

      setCampaigns(data);
      setTotal(result.meta.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load campaigns');
      setCampaigns([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [apiQuery, filters.platforms]);

  useEffect(() => {
    loadCampaigns();
  }, [loadCampaigns]);

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="h-4 w-40 bg-[#F2F3F7] rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <CampaignCardSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-[#E5E7EB]">
        <h3 className="font-display font-700 text-[#1F1F2E] text-lg mb-2">Unable to load campaigns</h3>
        <p className="text-[#6B6B8A] text-sm max-w-md leading-relaxed mb-4">{error}</p>
        <button
          onClick={loadCampaigns}
          className="px-5 py-2.5 rounded-xl text-white text-sm font-display font-700"
          style={{ background: 'linear-gradient(90deg, #7B2FF7, #F357A8)' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-[#6B6B8A]">
          <span className="font-semibold text-[#1F1F2E]">{total}</span> campaigns found
        </p>
        <select
          value={filters.sortBy}
          onChange={(e) => updateFilter('sortBy', e.target.value)}
          className="text-sm border border-[#E5E7EB] rounded-xl px-3 py-2 text-[#6B6B8A] bg-white focus:outline-none focus:border-[#7B2FF7] cursor-pointer"
        >
          <option value="newest">Newest First</option>
          <option value="budget_high">Highest Budget</option>
          <option value="budget_low">Lowest Budget</option>
          <option value="deadline">Deadline Soon</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {campaigns.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#EFEAFF] flex items-center justify-center mb-4">
            <DollarSign size={28} className="text-[#7B2FF7]" />
          </div>
          <h3 className="font-display font-700 text-[#1F1F2E] text-lg mb-2">No active campaigns</h3>
          <p className="text-[#6B6B8A] text-sm max-w-xs">Try adjusting your filters to discover more brand opportunities.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="group bg-white rounded-2xl border border-[#E5E7EB] shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1 p-5 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-700 text-sm flex-shrink-0 overflow-hidden"
                    style={{ color: campaign.brandColor, backgroundColor: campaign.brandBg }}
                  >
                    {campaign.brandLogo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={campaign.brandLogo} alt={campaign.brand} className="w-full h-full object-cover" />
                    ) : (
                      campaign.brandInitial
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#9AA0B4] uppercase tracking-wide">{campaign.brand}</p>
                    <h3 className="font-display font-700 text-[#1F1F2E] text-sm leading-snug mt-0.5">{campaign.title}</h3>
                  </div>
                </div>
                <span
                  className="text-[10px] font-700 font-display px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ color: campaign.statusColor, backgroundColor: campaign.statusBg }}
                >
                  {campaign.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <PlatformBadge platform={campaign.platform} />
                <span className="text-xs font-medium text-[#6B6B8A] bg-[#F2F3F7] px-2.5 py-1 rounded-full">
                  {campaign.category}
                </span>
              </div>

              <div className="bg-[#F8F7FC] rounded-xl px-3 py-2.5">
                <p className="text-[10px] font-semibold text-[#9AA0B4] uppercase tracking-wide mb-1">Deliverables</p>
                <p className="text-sm text-[#6B6B8A]">{campaign.deliverables || 'See campaign details'}</p>
              </div>

              <div className="flex items-center gap-3 text-xs text-[#9AA0B4]">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-[#1F1F2E] tabular-nums">{campaign.budgetLabel}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  <span>{campaign.deadlineLabel}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#9AA0B4]">
                <Users size={12} />
                <span>
                  <span className="tabular-nums font-medium text-[#6B6B8A]">{campaign.applicants}</span> creators applied
                </span>
              </div>

              <Link
                href={`/campaign/public/${campaign.id}`}
                className="mt-auto w-full text-center py-2.5 rounded-xl border border-[#7B2FF7] text-[#7B2FF7] text-sm font-semibold hover:bg-[#EFEAFF] transition-colors hover:text-black duration-150 group-hover:bg-[#7B2FF7] group-hover:text-white flex items-center justify-center gap-2"
              >
                Apply Now <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
