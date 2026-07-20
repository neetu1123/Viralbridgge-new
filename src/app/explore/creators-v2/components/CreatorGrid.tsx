'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/src/components/ui/AppImage';
import { TrendingUp, Star, MessageCircle, Heart, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { handleInviteCreator } from '@/src/lib/auth/actions';
import { toast } from 'sonner';
import { fetchPublicCreators } from '@/src/lib/api/public';
import type { PublicCreator } from '@/src/lib/api/types';
import { mapCreatorSort, platformBadgeStyle } from '@/src/lib/explore-utils';
import type { CreatorFilters } from './CreatorsExploreClient';

const ITEMS_PER_PAGE = 9;

interface CreatorGridProps {
  filters: CreatorFilters;
}

function CreatorCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden animate-pulse">
      <div className="p-5 pb-4">
        <div className="flex gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#F2F3F7]" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-[#F2F3F7] rounded w-2/3" />
            <div className="h-3 bg-[#F2F3F7] rounded w-1/2" />
          </div>
        </div>
        <div className="h-3 bg-[#F2F3F7] rounded mt-4" />
      </div>
      <div className="h-16 bg-[#F8F7FC]" />
      <div className="p-4 h-24 bg-white" />
    </div>
  );
}

export default function CreatorGrid({ filters }: CreatorGridProps) {
  const [page, setPage] = useState(1);
  const [savedCreators, setSavedCreators] = useState<Set<string>>(new Set());
  const [creators, setCreators] = useState<PublicCreator[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiQuery = useMemo(
    () => ({
      page,
      limit: ITEMS_PER_PAGE,
      search: filters.search || undefined,
      categories: filters.categories.length ? filters.categories.join(',') : undefined,
      platform: filters.platforms.length === 1 ? filters.platforms[0] : undefined,
      followersMin: filters.followersMin > 0 ? filters.followersMin : undefined,
      followersMax: filters.followersMax < 5000000 ? filters.followersMax : undefined,
      engagementMin: filters.engagementMin > 0 ? filters.engagementMin : undefined,
      sort: mapCreatorSort(filters.sortBy),
    }),
    [filters, page],
  );

  const loadCreators = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchPublicCreators(apiQuery);
      let data = result.data;

      if (filters.platforms.length > 1) {
        data = data.filter((c) => filters.platforms.includes(c.platform));
      }

      setCreators(data);
      setTotal(result.meta.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load creators');
      setCreators([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [apiQuery, filters.platforms]);

  useEffect(() => {
    setPage(1);
  }, [filters.search, filters.categories, filters.platforms, filters.followersMin, filters.followersMax, filters.engagementMin, filters.sortBy]);

  useEffect(() => {
    loadCreators();
  }, [loadCreators]);

  const toggleSave = (creatorId: string, name: string) => {
    setSavedCreators((prev) => {
      const next = new Set(prev);
      if (next.has(creatorId)) {
        next.delete(creatorId);
        toast.success(`Removed ${name} from saved creators`);
      } else {
        next.add(creatorId);
        toast.success(`Saved ${name} to your list`);
      }
      return next;
    });
  };

  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));

  const handlePageChange = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="h-4 w-40 bg-[#F2F3F7] rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <CreatorCardSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-[#E5E7EB]">
        <h3 className="font-display font-700 text-[#1F1F2E] text-lg mb-2">Unable to load creators</h3>
        <p className="text-[#6B6B8A] text-sm max-w-md leading-relaxed mb-4">{error}</p>
        <button
          onClick={loadCreators}
          className="px-5 py-2.5 rounded-xl text-white text-sm font-display font-700"
          style={{ background: 'linear-gradient(90deg, #7B2FF7, #F357A8)' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (creators.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-[#E5E7EB]">
        <div className="w-16 h-16 rounded-2xl bg-[#F2F3F7] flex items-center justify-center mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9AA0B4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <h3 className="font-display font-700 text-[#1F1F2E] text-lg mb-2">No creators available</h3>
        <p className="text-[#6B6B8A] text-sm max-w-xs leading-relaxed">
          Try adjusting your category, platform, or follower range to find more creators.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-[#6B6B8A] text-sm">
          Showing <span className="font-display font-700 text-[#1F1F2E] tabular-nums">{total}</span> creators
        </p>
        <p className="text-[#9AA0B4] text-xs">
          Page {page} of {totalPages}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {creators.map((creator) => {
          const platformStyle = platformBadgeStyle(creator.platform);
          const isSaved = savedCreators.has(creator.id);
          const avatarSrc = creator.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&background=7B2FF7&color=fff`;

          return (
            <div
              key={creator.id}
              className="group bg-white rounded-2xl border border-[#E5E7EB] shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1 overflow-hidden flex flex-col"
            >
              <div className="p-5 pb-4">
                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#F2F3F7] ring-2 ring-[#F8F7FC]">
                      <AppImage
                        src={avatarSrc}
                        alt={creator.alt}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {creator.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#7B2FF7] flex items-center justify-center ring-2 ring-white">
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-display font-700 text-[#1F1F2E] text-sm truncate">{creator.name}</h3>
                        <p className="text-[#9AA0B4] text-xs mt-0.5 truncate">{creator.handle}</p>
                      </div>
                      <button
                        onClick={() => toggleSave(creator.id, creator.name)}
                        className={`flex-shrink-0 p-1.5 rounded-lg transition-all duration-150 ${
                          isSaved
                            ? 'bg-[#FFF0F6] text-[#F357A8]'
                            : 'text-[#9AA0B4] hover:bg-[#F2F3F7] hover:text-[#6B6B8A]'
                        }`}
                        aria-label={isSaved ? 'Remove from saved' : 'Save creator'}
                      >
                        <Heart size={14} className={isSaved ? 'fill-[#F357A8]' : ''} />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ color: creator.nicheColor, backgroundColor: creator.nicheBg }}
                      >
                        {creator.niche}
                      </span>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ color: platformStyle.color, backgroundColor: platformStyle.bg }}
                      >
                        {creator.platform}
                      </span>
                      {creator.premium && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FFF8EC] text-[#F9A826]">
                          Premium
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-[#6B6B8A] text-xs leading-relaxed mt-3 line-clamp-2">{creator.bio}</p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {creator.tags.map((tag) => (
                    <span
                      key={`tag-${creator.id}-${tag}`}
                      className="text-[10px] font-medium text-[#9AA0B4] bg-[#F2F3F7] px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-0 border-t border-[#F2F3F7]">
                {[
                  { label: 'Followers', value: creator.followersDisplay, icon: null, color: '#1F1F2E' },
                  {
                    label: 'Engagement',
                    value: creator.engagementDisplay,
                    icon: TrendingUp,
                    color: creator.engagement >= 6 ? '#22C55E' : creator.engagement >= 3 ? '#F9A826' : '#9AA0B4',
                  },
                  { label: 'Response', value: `${creator.responseRate}%`, icon: MessageCircle, color: '#7B2FF7' },
                  { label: 'Deals', value: String(creator.completedDeals), icon: null, color: '#1F1F2E' },
                ].map((stat, idx) => (
                  <div
                    key={`stat-${creator.id}-${idx}`}
                    className="flex flex-col items-center justify-center py-3 px-1 border-r border-[#F2F3F7] last:border-r-0"
                  >
                    {stat.icon && <stat.icon size={11} style={{ color: stat.color }} className="mb-0.5" />}
                    <div className="font-display font-700 text-xs tabular-nums" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="text-[#9AA0B4] text-[9px] mt-0.5 text-center leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="p-4 pt-3 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[#1F1F2E] font-display font-700 text-sm tabular-nums">{creator.avgRateDisplay}</span>
                    <span className="text-[#9AA0B4] text-xs ml-1">avg.</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-[#F9A826] fill-[#F9A826]" />
                    <span className="font-display font-700 text-sm text-[#1F1F2E] tabular-nums">{creator.rating}</span>
                    <span className="text-[#9AA0B4] text-xs">({creator.completedDeals})</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleInviteCreator(creator.id, (msg) => toast.error(msg))}
                    className="py-2 rounded-xl text-white text-xs font-display font-700 transition-all duration-150 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                    style={{ background: 'linear-gradient(90deg, #7B2FF7, #F357A8)' }}
                  >
                    Invite to Campaign
                  </button>
                  <Link
                    href={`/creator/public/${creator.username}`}
                    className="py-2 rounded-xl border border-[#E5E7EB] text-[#6B6B8A] text-xs font-medium hover:border-[#7B2FF7] hover:text-[#7B2FF7] hover:bg-[#EFEAFF] transition-all duration-150 flex items-center justify-center gap-1"
                  >
                    <ExternalLink size={11} />
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-between">
          <p className="text-[#9AA0B4] text-sm tabular-nums">
            {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, total)} of {total} creators
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="w-9 h-9 rounded-xl border border-[#E5E7EB] flex items-center justify-center text-[#6B6B8A] hover:border-[#7B2FF7] hover:text-[#7B2FF7] hover:bg-[#EFEAFF] transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={15} />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              const isActive = pageNum === page;
              const isNearby = Math.abs(pageNum - page) <= 1 || pageNum === 1 || pageNum === totalPages;

              if (!isNearby) {
                if (pageNum === 2 && page > 3) return <span key="page-ellipsis-start" className="text-[#9AA0B4] text-sm px-1">…</span>;
                if (pageNum === totalPages - 1 && page < totalPages - 2) return <span key="page-ellipsis-end" className="text-[#9AA0B4] text-sm px-1">…</span>;
                return null;
              }

              return (
                <button
                  key={`page-btn-${pageNum}`}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-9 h-9 rounded-xl text-sm font-display font-600 transition-all duration-150 ${
                    isActive
                      ? 'text-white shadow-sm'
                      : 'border border-[#E5E7EB] text-[#6B6B8A] hover:border-[#7B2FF7] hover:text-[#7B2FF7] hover:bg-[#EFEAFF]'
                  }`}
                  style={isActive ? { background: 'linear-gradient(90deg, #7B2FF7, #F357A8)' } : {}}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="w-9 h-9 rounded-xl border border-[#E5E7EB] flex items-center justify-center text-[#6B6B8A] hover:border-[#7B2FF7] hover:text-[#7B2FF7] hover:bg-[#EFEAFF] transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
