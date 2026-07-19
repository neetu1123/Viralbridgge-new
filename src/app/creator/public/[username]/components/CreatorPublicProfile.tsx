'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/src/components/ui/AppImage';
import {
  ArrowLeft,
  ExternalLink,
  Globe,
  MapPin,
  Star,
  TrendingUp,
  Users,
  BadgeCheck,
  Crown,
} from 'lucide-react';
import { toast } from 'sonner';
import { fetchPublicCreator } from '@/src/lib/api/public';
import type { PublicCreatorDetail } from '@/src/lib/api/types';
import { platformBadgeStyle } from '@/src/lib/explore-utils';

interface CreatorPublicProfileProps {
  username: string;
}

export default function CreatorPublicProfile({ username }: CreatorPublicProfileProps) {
  const [creator, setCreator] = useState<PublicCreatorDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPublicCreator(username);
      setCreator(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Creator not found');
      setCreator(null);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-8 animate-pulse">
        <div className="h-40 bg-[#EFEAFF] rounded-2xl mb-16" />
        <div className="h-8 bg-[#F2F3F7] rounded w-1/3 mb-4" />
        <div className="h-4 bg-[#F2F3F7] rounded w-2/3 mb-8" />
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 bg-[#F2F3F7] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !creator) {
    return (
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-24 text-center">
        <h1 className="font-display font-800 text-2xl text-[#1F1F2E] mb-3">Creator not found</h1>
        <p className="text-[#6B6B8A] mb-6">{error}</p>
        <Link
          href="/explore/creators-v2"
          className="inline-flex items-center gap-2 text-[#7B2FF7] font-semibold hover:underline"
        >
          <ArrowLeft size={16} /> Back to Explore Creators
        </Link>
      </div>
    );
  }

  const avatarSrc = creator.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&background=7B2FF7&color=fff`;
  const platformStyle = platformBadgeStyle(creator.platform);

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-10 py-8">
      <Link
        href="/explore/creators-v2"
        className="inline-flex items-center gap-2 text-sm text-[#6B6B8A] hover:text-[#7B2FF7] mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Explore Creators
      </Link>

      <div className="relative mb-20">
        <div
          className="h-40 lg:h-48 rounded-2xl"
          style={{ background: 'linear-gradient(135deg, #7B2FF7 0%, #F357A8 100%)' }}
        />
        <div className="absolute -bottom-12 left-6 flex items-end gap-5">
          <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-white shadow-lg bg-[#F2F3F7]">
            <AppImage src={avatarSrc} alt={creator.name} width={96} height={96} className="object-cover w-full h-full" />
          </div>
          <div className="pb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display font-800 text-2xl text-[#1F1F2E]">{creator.name}</h1>
              {creator.verified && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#7B2FF7] bg-[#EFEAFF] px-2 py-0.5 rounded-full">
                  <BadgeCheck size={12} /> Verified Creator
                </span>
              )}
              {creator.premium && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#F9A826] bg-[#FFF8EC] px-2 py-0.5 rounded-full">
                  <Crown size={12} /> Premium Creator
                </span>
              )}
            </div>
            <p className="text-[#9AA0B4] text-sm mt-0.5">{creator.handle}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="font-display font-700 text-[#1F1F2E] mb-2">About</h2>
            <p className="text-[#6B6B8A] leading-relaxed">{creator.bio || 'No bio provided yet.'}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ color: creator.nicheColor, backgroundColor: creator.nicheBg }}
            >
              {creator.niche}
            </span>
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ color: platformStyle.color, backgroundColor: platformStyle.bg }}
            >
              {creator.platform}
            </span>
            {creator.languages.map((lang) => (
              <span key={lang} className="text-xs font-medium text-[#6B6B8A] bg-[#F2F3F7] px-3 py-1 rounded-full">
                {lang}
              </span>
            ))}
          </div>

          {creator.location && (
            <div className="flex items-center gap-2 text-sm text-[#6B6B8A]">
              <MapPin size={15} className="text-[#9AA0B4]" />
              {creator.location}
            </div>
          )}

          {creator.brandsWorkedWith.length > 0 && (
            <div>
              <h2 className="font-display font-700 text-[#1F1F2E] mb-3">Brands Worked With</h2>
              <div className="flex flex-wrap gap-2">
                {creator.brandsWorkedWith.map((brand) => (
                  <span key={brand} className="text-sm font-medium text-[#6B6B8A] bg-white border border-[#E5E7EB] px-3 py-1.5 rounded-xl">
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          )}

          {creator.recentCampaigns.length > 0 && (
            <div>
              <h2 className="font-display font-700 text-[#1F1F2E] mb-3">Recent Campaigns</h2>
              <div className="space-y-3">
                {creator.recentCampaigns.map((item) => (
                  <div key={item.id} className="bg-white border border-[#E5E7EB] rounded-xl p-4">
                    <p className="font-display font-700 text-sm text-[#1F1F2E]">{item.title}</p>
                    <p className="text-xs text-[#9AA0B4] mt-0.5">{item.brand}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {Object.keys(creator.socialLinks).length > 0 && (
            <div>
              <h2 className="font-display font-700 text-[#1F1F2E] mb-3">Social Links</h2>
              <div className="flex flex-wrap gap-2">
                {Object.entries(creator.socialLinks).map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-[#7B2FF7] bg-[#EFEAFF] px-3 py-1.5 rounded-xl hover:bg-[#E5DEFF] transition-colors capitalize"
                  >
                    <ExternalLink size={13} /> {key}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-80 space-y-4">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-card">
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="text-center">
                <Users size={16} className="mx-auto text-[#7B2FF7] mb-1" />
                <p className="font-display font-700 text-lg text-[#1F1F2E]">{creator.followersDisplay}</p>
                <p className="text-[10px] text-[#9AA0B4] uppercase tracking-wide">Followers</p>
              </div>
              <div className="text-center">
                <TrendingUp size={16} className="mx-auto text-[#22C55E] mb-1" />
                <p className="font-display font-700 text-lg text-[#1F1F2E]">{creator.engagementDisplay}</p>
                <p className="text-[10px] text-[#9AA0B4] uppercase tracking-wide">Engagement</p>
              </div>
              <div className="text-center">
                <Star size={16} className="mx-auto text-[#F9A826] mb-1" />
                <p className="font-display font-700 text-lg text-[#1F1F2E]">{creator.rating}</p>
                <p className="text-[10px] text-[#9AA0B4] uppercase tracking-wide">Rating</p>
              </div>
              <div className="text-center">
                <Globe size={16} className="mx-auto text-[#F357A8] mb-1" />
                <p className="font-display font-700 text-lg text-[#1F1F2E]">{creator.completedDeals}</p>
                <p className="text-[10px] text-[#9AA0B4] uppercase tracking-wide">Deals Done</p>
              </div>
            </div>

            <button
              onClick={() => toast.success(`Invite sent to ${creator.name}!`)}
              className="w-full py-3 rounded-xl text-white text-sm font-display font-700 mb-2"
              style={{ background: 'linear-gradient(90deg, #7B2FF7, #F357A8)' }}
            >
              Invite Creator
            </button>
            {creator.mediaKit && (
              <a
                href={creator.mediaKit}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl border border-[#E5E7EB] text-[#6B6B8A] text-sm font-medium hover:border-[#7B2FF7] hover:text-[#7B2FF7] transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink size={14} /> View Media Kit
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
