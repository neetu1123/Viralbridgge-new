'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { fetchPublicCampaigns } from '@/src/lib/api/public';
import type { PublicCampaign } from '@/src/lib/api/types';
import Reveal from '@/src/components/animations/Reveal';
import { StaggerItem } from '@/src/components/animations/Stagger';

const FALLBACK_CAMPAIGNS = [
  {
    id: 'campaign-001',
    brand: 'Glossier',
    title: 'Summer Skin Routine Launch',
    budgetLabel: '₹2,000 – ₹5,000',
    platform: 'Instagram',
    category: 'Beauty',
    deadlineLabel: 'Apr 28, 2026',
    deliverables: '3 Reels + 5 Stories',
    applicants: 84,
    status: 'Hot',
    statusColor: '#F357A8',
    statusBg: '#FFF0F6',
    categoryColor: '#7B2FF7',
    categoryBg: '#EFEAFF',
  },
  {
    id: 'campaign-002',
    brand: 'Headspace',
    title: 'Mindfulness for Busy Professionals',
    budgetLabel: '₹1,500 – ₹3,000',
    platform: 'YouTube',
    category: 'Wellness',
    deadlineLabel: 'May 5, 2026',
    deliverables: '1 Dedicated Video',
    applicants: 41,
    status: 'Open',
    statusColor: '#7B2FF7',
    statusBg: '#EFEAFF',
    categoryColor: '#F9A826',
    categoryBg: '#FFF8EC',
  },
  {
    id: 'campaign-003',
    brand: 'Allbirds',
    title: 'Sustainable Fashion Week Content',
    budgetLabel: '₹3,500 – ₹7,000',
    platform: 'TikTok',
    category: 'Fashion',
    deadlineLabel: 'Apr 22, 2026',
    deliverables: '4 TikTok Videos',
    applicants: 127,
    status: 'Closing Soon',
    statusColor: '#F9A826',
    statusBg: '#FFF8EC',
    categoryColor: '#F357A8',
    categoryBg: '#FFF0F6',
  },
  {
    id: 'campaign-004',
    brand: 'Athletic Greens',
    title: 'Morning Routine Integration',
    budgetLabel: '₹800 – ₹2,200',
    platform: 'YouTube',
    category: 'Fitness',
    deadlineLabel: 'May 12, 2026',
    deliverables: '1 Integration + 2 Shorts',
    applicants: 63,
    status: 'Open',
    statusColor: '#7B2FF7',
    statusBg: '#EFEAFF',
    categoryColor: '#7B2FF7',
    categoryBg: '#EFEAFF',
  },
  {
    id: 'campaign-005',
    brand: 'Oatly',
    title: 'Plant-Based Lifestyle Series',
    budgetLabel: '₹1,200 – ₹2,800',
    platform: 'Instagram',
    category: 'Food',
    deadlineLabel: 'May 18, 2026',
    deliverables: '2 Reels + 1 Carousel',
    applicants: 38,
    status: 'Open',
    statusColor: '#7B2FF7',
    statusBg: '#EFEAFF',
    categoryColor: '#F9A826',
    categoryBg: '#FFF8EC',
  },
  {
    id: 'campaign-006',
    brand: 'Duolingo',
    title: 'Language Learning Challenge',
    budgetLabel: '₹500 – ₹1,500',
    platform: 'TikTok',
    category: 'Education',
    deadlineLabel: 'May 25, 2026',
    deliverables: '5 Short-form Videos',
    applicants: 209,
    status: 'Hot',
    statusColor: '#F357A8',
    statusBg: '#FFF0F6',
    categoryColor: '#7B2FF7',
    categoryBg: '#EFEAFF',
  },
] as const;

type HomeCampaign = {
  id: string;
  brand: string;
  title: string;
  budgetLabel: string;
  platform: string;
  category: string;
  deadlineLabel: string;
  deliverables: string;
  applicants: number;
  status: string;
  statusColor: string;
  statusBg: string;
  categoryColor?: string;
  categoryBg?: string;
};

function mapApiCampaign(c: PublicCampaign): HomeCampaign {
  return {
    id: c.id,
    brand: c.brand,
    title: c.title,
    budgetLabel: c.budgetLabel,
    platform: c.platform,
    category: c.category,
    deadlineLabel: c.deadlineLabel,
    deliverables: c.deliverables || 'See campaign details',
    applicants: c.applicants,
    status: c.status,
    statusColor: c.statusColor,
    statusBg: c.statusBg,
    categoryColor: '#7B2FF7',
    categoryBg: '#EFEAFF',
  };
}

function PlatformIcon({ platform }: { platform: string }) {
  const cls = 'w-3.5 h-3.5';
  if (platform === 'Instagram') {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (platform === 'YouTube') {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return <span className="text-xs">{platform[0]}</span>;
}

export default function FeaturedCampaigns() {
  const [campaigns, setCampaigns] = useState<HomeCampaign[]>([...FALLBACK_CAMPAIGNS]);

  const loadCampaigns = useCallback(async () => {
    try {
      const result = await fetchPublicCampaigns({ limit: 6, sort: 'newest' });
      if (result.data?.length) {
        setCampaigns(result.data.slice(0, 6).map(mapApiCampaign));
      }
    } catch {
      setCampaigns([...FALLBACK_CAMPAIGNS]);
    }
  }, []);

  useEffect(() => {
    loadCampaigns();
  }, [loadCampaigns]);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <Reveal className="flex items-end justify-between mb-12">
          <div>
            <span className="inline-block text-[#7B2FF7] font-semibold text-sm uppercase tracking-widest mb-3 font-display">
              Featured Campaigns
            </span>
            <h2 className="font-display font-800 text-4xl text-[#1F1F2E] tracking-tight">
              Paid deals, live right now
            </h2>
          </div>
          <Link
            href="/explore/campaigns-v2"
            className="hidden md:flex items-center gap-2 text-[#7B2FF7] font-semibold text-sm hover:gap-3 transition-all duration-200"
          >
            View all campaigns <ArrowRight size={15} />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {campaigns.map((campaign, index) => (
            <StaggerItem key={campaign.id} index={index}>
            <div
              className="group bg-white rounded-2xl border border-[#E5E7EB] shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 p-5 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[#9AA0B4] text-xs font-medium">{campaign.brand}</span>
                    <span
                      className="text-[10px] font-700 font-display px-2 py-0.5 rounded-full"
                      style={{ color: campaign.statusColor, backgroundColor: campaign.statusBg }}
                    >
                      {campaign.status}
                    </span>
                  </div>
                  <h3 className="font-display font-700 text-[#1F1F2E] text-base leading-snug">{campaign.title}</h3>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    color: campaign.categoryColor ?? '#7B2FF7',
                    backgroundColor: campaign.categoryBg ?? '#EFEAFF',
                  }}
                >
                  {campaign.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-[#6B6B8A] bg-[#F2F3F7] px-2.5 py-1 rounded-full">
                  <PlatformIcon platform={campaign.platform} />
                  {campaign.platform}
                </span>
              </div>

              <div className="text-[#6B6B8A] text-sm bg-[#F8F7FC] rounded-xl px-3 py-2">
                {campaign.deliverables}
              </div>

              <div className="flex items-center gap-4 text-xs text-[#9AA0B4]">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-[#1F1F2E] tabular-nums">{campaign.budgetLabel}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  <span>{campaign.deadlineLabel}</span>
                </div>
                <div className="ml-auto">
                  <span className="tabular-nums">{campaign.applicants}</span> applied
                </div>
              </div>

              <Link
                href={`/campaign/public/${campaign.id}`}
                className="mt-auto w-full text-center py-2.5 rounded-xl border border-[#7B2FF7] text-[#7B2FF7] text-sm font-semibold hover:bg-[#EFEAFF] transition-colors hover:text-black duration-150 group-hover:bg-[#7B2FF7] group-hover:text-white"
              >
                View Campaign
              </Link>
            </div>
            </StaggerItem>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/explore/campaigns-v2" className="btn-secondary inline-flex items-center gap-2">
            View all campaigns <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
