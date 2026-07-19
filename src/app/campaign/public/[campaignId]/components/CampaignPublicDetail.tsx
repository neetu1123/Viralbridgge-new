'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Globe,
  MapPin,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';
import { fetchPublicCampaign } from '@/src/lib/api/public';
import type { PublicCampaignDetail } from '@/src/lib/api/types';

interface CampaignPublicDetailProps {
  campaignId: string;
}

export default function CampaignPublicDetail({ campaignId }: CampaignPublicDetailProps) {
  const [campaign, setCampaign] = useState<PublicCampaignDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCampaign = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPublicCampaign(campaignId);
      setCampaign(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Campaign not found');
      setCampaign(null);
    } finally {
      setLoading(false);
    }
  }, [campaignId]);

  useEffect(() => {
    loadCampaign();
  }, [loadCampaign]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-8 animate-pulse">
        <div className="h-48 bg-[#EFEAFF] rounded-2xl mb-8" />
        <div className="h-8 bg-[#F2F3F7] rounded w-2/3 mb-4" />
        <div className="h-4 bg-[#F2F3F7] rounded w-full mb-2" />
        <div className="h-4 bg-[#F2F3F7] rounded w-3/4" />
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-24 text-center">
        <h1 className="font-display font-800 text-2xl text-[#1F1F2E] mb-3">Campaign not found</h1>
        <p className="text-[#6B6B8A] mb-6">{error}</p>
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

      <div
        className="rounded-2xl p-8 mb-8 text-white"
        style={{ background: 'linear-gradient(135deg, #7B2FF7 0%, #F357A8 100%)' }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center font-display font-700 text-lg flex-shrink-0 overflow-hidden bg-white/20"
          >
            {campaign.brandLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={campaign.brandLogo} alt={campaign.brand} className="w-full h-full object-cover" />
            ) : (
              campaign.brandInitial
            )}
          </div>
          <div>
            <p className="text-white/80 text-sm font-semibold uppercase tracking-wide">{campaign.brand}</p>
            <h1 className="font-display font-800 text-2xl lg:text-3xl mt-1">{campaign.title}</h1>
            <span
              className="inline-block mt-3 text-xs font-700 px-2.5 py-1 rounded-full"
              style={{ color: campaign.statusColor, backgroundColor: campaign.statusBg }}
            >
              {campaign.status}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="font-display font-700 text-[#1F1F2E] mb-2">Description</h2>
            <p className="text-[#6B6B8A] leading-relaxed whitespace-pre-line">{campaign.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
              <div className="flex items-center gap-2 text-[#9AA0B4] text-xs uppercase tracking-wide mb-1">
                <DollarSign size={14} /> Budget
              </div>
              <p className="font-display font-700 text-xl text-[#1F1F2E]">{campaign.budgetLabel}</p>
            </div>
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
              <div className="flex items-center gap-2 text-[#9AA0B4] text-xs uppercase tracking-wide mb-1">
                <Calendar size={14} /> Deadline
              </div>
              <p className="font-display font-700 text-xl text-[#1F1F2E]">{campaign.deadlineLabel}</p>
            </div>
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
              <div className="flex items-center gap-2 text-[#9AA0B4] text-xs uppercase tracking-wide mb-1">
                <Globe size={14} /> Platform
              </div>
              <p className="font-display font-700 text-lg text-[#1F1F2E]">{campaign.platform}</p>
            </div>
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
              <div className="flex items-center gap-2 text-[#9AA0B4] text-xs uppercase tracking-wide mb-1">
                <Users size={14} /> Applicants
              </div>
              <p className="font-display font-700 text-lg text-[#1F1F2E]">{campaign.applicants} creators</p>
            </div>
          </div>

          <div>
            <h2 className="font-display font-700 text-[#1F1F2E] mb-3">Deliverables</h2>
            <ul className="space-y-2">
              {(campaign.deliverablesList.length ? campaign.deliverablesList : [campaign.deliverables]).filter(Boolean).map((item) => (
                <li key={item} className="flex items-start gap-2 text-[#6B6B8A]">
                  <CheckCircle2 size={16} className="text-[#7B2FF7] mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {(campaign.location || campaign.languages.length > 0) && (
            <div className="flex flex-wrap gap-4 text-sm text-[#6B6B8A]">
              {campaign.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-[#9AA0B4]" />
                  {campaign.location}
                </div>
              )}
              {campaign.languages.map((lang) => (
                <span key={lang} className="bg-[#F2F3F7] px-3 py-1 rounded-full text-xs font-medium">
                  {lang}
                </span>
              ))}
            </div>
          )}

          {campaign.creatorRequirements && (
            <div>
              <h2 className="font-display font-700 text-[#1F1F2E] mb-2">Creator Requirements</h2>
              <p className="text-[#6B6B8A] leading-relaxed">{String(campaign.creatorRequirements)}</p>
            </div>
          )}
        </div>

        <div className="w-full lg:w-80">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-card sticky top-24">
            <p className="text-xs text-[#9AA0B4] uppercase tracking-wide mb-1">Category</p>
            <p className="font-display font-700 text-[#1F1F2E] mb-5">{campaign.category}</p>

            <button
              onClick={() => toast.success('Application modal will open after login integration.')}
              className="w-full py-3 rounded-xl text-white text-sm font-display font-700"
              style={{ background: 'linear-gradient(90deg, #7B2FF7, #F357A8)' }}
            >
              Apply Now
            </button>
            <p className="text-[10px] text-[#9AA0B4] text-center mt-3">
              Login required to apply — auth integration coming next
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
