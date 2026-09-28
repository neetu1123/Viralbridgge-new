'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  Calendar,
  ExternalLink,
  MapPin,
  Megaphone,
  Users,
} from 'lucide-react';
import { fetchPublicBrand, fetchPublicCampaigns } from '@/src/lib/api/public';
import type { PublicBrandProfile, PublicCampaign } from '@/src/lib/api/types';
import { brandSlug, platformBadgeStyle } from '@/src/lib/explore-utils';
import FadeIn from '@/src/components/animations/FadeIn';
import Reveal from '@/src/components/animations/Reveal';
import { StaggerItem } from '@/src/components/animations/Stagger';

interface BrandPublicProfileProps {
  brandId: string;
}

function matchesBrand(campaign: PublicCampaign, key: string): boolean {
  const decoded = decodeURIComponent(key).trim();
  if (campaign.brandId && campaign.brandId === decoded) return true;
  return brandSlug(campaign.brand) === brandSlug(decoded);
}

async function loadBrandFromCampaigns(key: string): Promise<PublicBrandProfile | null> {
  const matched: PublicCampaign[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages && page <= 6) {
    const result = await fetchPublicCampaigns({ page, limit: 50, sort: 'newest' });
    totalPages = result.meta.totalPages || 1;
    matched.push(...result.data.filter((campaign) => matchesBrand(campaign, key)));
    page += 1;
  }

  const first = matched[0];
  if (!first) return null;

  return {
    id: first.brandId || decodeURIComponent(key),
    name: first.brand,
    slug: brandSlug(first.brand),
    initial: first.brandInitial,
    industry: first.category || 'General',
    industryColor: first.brandColor,
    industryBg: first.brandBg,
    logo: first.brandLogo,
    description: '',
    website: '',
    location: first.location || '',
    verified: false,
    memberSince: '',
    activeCampaigns: matched.length,
    completedCampaigns: 0,
    totalApplicants: matched.reduce((sum, campaign) => sum + campaign.applicants, 0),
    campaigns: matched,
  };
}

export default function BrandPublicProfile({ brandId }: BrandPublicProfileProps) {
  const [brand, setBrand] = useState<PublicBrandProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      try {
        const data = await fetchPublicBrand(brandId);
        setBrand(data);
      } catch {
        const fallback = await loadBrandFromCampaigns(brandId);
        if (!fallback) {
          setError('Brand not found');
          setBrand(null);
        } else {
          setBrand(fallback);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Brand not found');
      setBrand(null);
    } finally {
      setLoading(false);
    }
  }, [brandId]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-8 animate-pulse">
        <div className="h-40 bg-[#EFEAFF] rounded-2xl mb-16 skeleton-shimmer" />
        <div className="h-8 bg-[#F2F3F7] rounded w-1/3 mb-4 skeleton-shimmer" />
        <div className="h-4 bg-[#F2F3F7] rounded w-2/3 mb-8 skeleton-shimmer" />
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 bg-[#F2F3F7] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !brand) {
    return (
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-24 text-center">
        <h1 className="font-display font-800 text-2xl text-[#1F1F2E] mb-3">Brand not found</h1>
        <p className="text-[#6B6B8A] mb-6">{error || 'This brand profile is not available.'}</p>
        <Link
          href="/explore/campaigns-v2"
          className="inline-flex items-center gap-2 text-[#7B2FF7] font-semibold hover:underline"
        >
          <ArrowLeft size={16} /> Back to Explore Campaigns
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-10 py-8">
      <Link
        href="/explore/campaigns-v2"
        className="inline-flex items-center gap-2 text-sm text-[#6B6B8A] hover:text-[#7B2FF7] mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Explore Campaigns
      </Link>

      <FadeIn>
        <div className="relative mb-20">
          <div
            className="h-40 lg:h-48 rounded-2xl"
            style={{ background: 'linear-gradient(135deg, #7B2FF7 0%, #F357A8 100%)' }}
          />
          <div className="absolute -bottom-12 left-6 flex items-end gap-5">
            <div
              className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-white shadow-lg flex items-center justify-center font-display font-800 text-2xl"
              style={{ color: brand.industryColor, backgroundColor: brand.industryBg }}
            >
              {brand.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
              ) : (
                brand.initial
              )}
            </div>
            <div className="pb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display font-800 text-2xl text-[#1F1F2E]">{brand.name}</h1>
                {brand.verified && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#7B2FF7] bg-[#EFEAFF] px-2 py-0.5 rounded-full">
                    <BadgeCheck size={12} /> Verified Brand
                  </span>
                )}
              </div>
              <p className="text-[#9AA0B4] text-sm mt-0.5">Brand owner</p>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="flex flex-col lg:flex-row gap-8">
        <Reveal className="flex-1 space-y-6">
          <div>
            <h2 className="font-display font-700 text-[#1F1F2E] mb-2">About</h2>
            <p className="text-[#6B6B8A] leading-relaxed whitespace-pre-line">
              {brand.description || 'This brand has not added a description yet.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ color: brand.industryColor, backgroundColor: brand.industryBg }}
            >
              {brand.industry}
            </span>
          </div>

          {brand.location && (
            <div className="flex items-center gap-2 text-sm text-[#6B6B8A]">
              <MapPin size={15} className="text-[#9AA0B4]" />
              {brand.location}
            </div>
          )}

          {brand.website && (
            <a
              href={brand.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[#7B2FF7] font-medium hover:underline"
            >
              <ExternalLink size={14} /> Visit website
            </a>
          )}

          <div>
            <h2 className="font-display font-700 text-[#1F1F2E] mb-3">Campaigns</h2>
            {brand.campaigns.length === 0 ? (
              <p className="text-sm text-[#6B6B8A]">No public campaigns yet.</p>
            ) : (
              <div className="space-y-3">
                {brand.campaigns.map((campaign, index) => {
                  const platform = platformBadgeStyle(campaign.platform);
                  return (
                    <StaggerItem key={campaign.id} index={index}>
                      <Link
                        href={`/campaign/public/${campaign.id}`}
                        className="block bg-white border border-[#E5E7EB] rounded-xl p-4 hover:border-[#7B2FF7] transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-display font-700 text-sm text-[#1F1F2E]">{campaign.title}</p>
                            <p className="text-xs text-[#9AA0B4] mt-0.5">{campaign.deliverables || campaign.category}</p>
                          </div>
                          <span
                            className="text-[10px] font-700 px-2 py-0.5 rounded-full flex-shrink-0"
                            style={{ color: campaign.statusColor, backgroundColor: campaign.statusBg }}
                          >
                            {campaign.status}
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#6B6B8A]">
                          <span
                            className="font-semibold px-2 py-0.5 rounded-full"
                            style={{ color: platform.color, backgroundColor: platform.bg }}
                          >
                            {campaign.platform}
                          </span>
                          <span className="tabular-nums font-medium text-[#1F1F2E]">{campaign.budgetLabel}</span>
                          <span className="inline-flex items-center gap-1">
                            <Calendar size={12} /> {campaign.deadlineLabel}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Users size={12} /> {campaign.applicants} applied
                          </span>
                          <span className="ml-auto inline-flex items-center gap-1 text-[#7B2FF7] font-semibold">
                            View <ArrowRight size={12} />
                          </span>
                        </div>
                      </Link>
                    </StaggerItem>
                  );
                })}
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="w-full lg:w-80 space-y-4">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-card">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <Megaphone size={16} className="mx-auto text-[#7B2FF7] mb-1" />
                <p className="font-display font-700 text-lg text-[#1F1F2E] tabular-nums">{brand.activeCampaigns}</p>
                <p className="text-[10px] text-[#9AA0B4] uppercase tracking-wide">Active</p>
              </div>
              {brand.memberSince ? (
                <div className="text-center">
                  <Building2 size={16} className="mx-auto text-[#22C55E] mb-1" />
                  <p className="font-display font-700 text-lg text-[#1F1F2E] tabular-nums">{brand.completedCampaigns}</p>
                  <p className="text-[10px] text-[#9AA0B4] uppercase tracking-wide">Completed</p>
                </div>
              ) : null}
              <div className="text-center">
                <Users size={16} className="mx-auto text-[#F357A8] mb-1" />
                <p className="font-display font-700 text-lg text-[#1F1F2E] tabular-nums">{brand.totalApplicants}</p>
                <p className="text-[10px] text-[#9AA0B4] uppercase tracking-wide">Applicants</p>
              </div>
              {brand.memberSince ? (
                <div className="text-center">
                  <Calendar size={16} className="mx-auto text-[#F9A826] mb-1" />
                  <p className="font-display font-700 text-sm text-[#1F1F2E]">{brand.memberSince}</p>
                  <p className="text-[10px] text-[#9AA0B4] uppercase tracking-wide">Joined</p>
                </div>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
