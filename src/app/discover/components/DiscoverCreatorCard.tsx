'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AppImage from '@/src/components/ui/AppImage';
import { BadgeCheck, Crown, MapPin, TrendingUp, ExternalLink } from 'lucide-react';
import type { DiscoverCreator } from '@/src/data/discoverCreators';
import { toast } from 'sonner';

interface DiscoverCreatorCardProps {
  creator: DiscoverCreator;
  index?: number;
  highlight?: boolean;
}

export default function DiscoverCreatorCard({ creator, index = 0, highlight = false }: DiscoverCreatorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className={`group bg-white rounded-2xl border overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover ${
        highlight
          ? 'border-[#F9A826] shadow-[0_0_0_2px_rgba(249,168,38,0.15)]'
          : 'border-[#E5E7EB] shadow-card'
      }`}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#F2F3F7] ring-2 ring-[#F8F7FC]">
              <AppImage
                src={creator.avatar}
                alt={creator.alt}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            {creator.verified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#7B2FF7] flex items-center justify-center ring-2 ring-white">
                <BadgeCheck size={10} className="text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-display font-700 text-[#1F1F2E] text-sm truncate">{creator.name}</h3>
                <p className="text-[#9AA0B4] text-xs mt-0.5 truncate">{creator.username}</p>
              </div>
              <div className="flex flex-col gap-1 items-end">
                {creator.premium && (
                  <span className="inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[#F9A826] to-[#F357A8] text-white">
                    <Crown size={8} />
                    Premium
                  </span>
                )}
                {creator.verified && (
                  <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-[#EFEAFF] text-[#7B2FF7]">
                    <BadgeCheck size={8} />
                    Verified
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 mt-1.5 text-[#9AA0B4] text-xs">
              <MapPin size={10} />
              <span>{creator.city}</span>
              <span className="mx-1">·</span>
              <span>{creator.platform}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-[#F8F7FC] rounded-xl p-2.5 text-center">
            <div className="font-display font-700 text-[#1F1F2E] text-sm tabular-nums">{creator.followersDisplay}</div>
            <div className="text-[#9AA0B4] text-[10px]">Followers</div>
          </div>
          <div className="bg-[#F8F7FC] rounded-xl p-2.5 text-center">
            <div className="font-display font-700 text-sm tabular-nums flex items-center justify-center gap-0.5" style={{ color: creator.engagement >= 6 ? '#22C55E' : '#1F1F2E' }}>
              <TrendingUp size={10} />
              {creator.engagementDisplay}
            </div>
            <div className="text-[#9AA0B4] text-[10px]">Engagement</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {creator.categories.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ color: creator.nicheColor, backgroundColor: creator.nicheBg }}
            >
              {cat}
            </span>
          ))}
          {creator.languages.slice(0, 2).map((lang) => (
            <span key={lang} className="text-[10px] font-medium text-[#9AA0B4] bg-[#F2F3F7] px-2 py-0.5 rounded-full">
              {lang}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto border-t border-[#F2F3F7] p-4 flex items-center justify-between gap-3">
        <div>
          <span className="text-[#9AA0B4] text-[10px]">Starting from</span>
          <div className="font-display font-700 text-[#1F1F2E] text-sm tabular-nums">{creator.startingPriceDisplay}</div>
        </div>
        <button
          onClick={() => toast.info(`Opening ${creator.name}'s profile...`)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-display font-700 transition-all duration-150 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: 'linear-gradient(90deg, #7B2FF7, #F357A8)' }}
        >
          <ExternalLink size={11} />
          View Profile
        </button>
      </div>
    </motion.div>
  );
}

export function CreatorCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 animate-pulse">
      <div className="flex gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#F2F3F7]" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-[#F2F3F7] rounded w-3/4" />
          <div className="h-3 bg-[#F2F3F7] rounded w-1/2" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="h-14 bg-[#F2F3F7] rounded-xl" />
        <div className="h-14 bg-[#F2F3F7] rounded-xl" />
      </div>
      <div className="flex gap-2 mt-3">
        <div className="h-5 bg-[#F2F3F7] rounded-full w-16" />
        <div className="h-5 bg-[#F2F3F7] rounded-full w-16" />
      </div>
      <div className="h-10 bg-[#F2F3F7] rounded-xl mt-4" />
    </div>
  );
}

export function CompactCreatorCard({ creator }: { creator: DiscoverCreator }) {
  return (
    <Link
      href="/discover"
      className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#7B2FF7] hover:shadow-card transition-all duration-200 group"
    >
      <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
        <AppImage src={creator.avatar} alt={creator.alt} width={40} height={40} className="object-cover w-full h-full" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-display font-700 text-[#1F1F2E] text-xs truncate group-hover:text-[#7B2FF7]">{creator.name}</p>
        <p className="text-[#9AA0B4] text-[10px]">{creator.followersDisplay} · {creator.city}</p>
      </div>
      {creator.premium && <Crown size={12} className="text-[#F9A826] flex-shrink-0" />}
    </Link>
  );
}
