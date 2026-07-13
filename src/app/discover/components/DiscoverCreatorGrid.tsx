'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, SearchX } from 'lucide-react';
import DiscoverCreatorCard, { CreatorCardSkeleton } from './DiscoverCreatorCard';
import {
  DISCOVER_CREATORS,
  filterCreators,
  SORT_OPTIONS,
  type DiscoverFilters,
} from '@/src/data/discoverCreators';

interface DiscoverCreatorGridProps {
  filters: DiscoverFilters;
  onReset: () => void;
  onSortChange?: (sortBy: string) => void;
  premiumOnly?: boolean;
}

export default function DiscoverCreatorGrid({ filters, onReset, onSortChange, premiumOnly = false }: DiscoverCreatorGridProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [filters]);

  const filtered = useMemo(() => {
    const base = premiumOnly ? DISCOVER_CREATORS.filter((c) => c.premium) : DISCOVER_CREATORS;
    return filterCreators(base, filters);
  }, [filters, premiumOnly]);

  if (loading) {
    return (
      <div>
        <div className="h-5 w-32 bg-[#F2F3F7] rounded animate-pulse mb-5" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <CreatorCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-[#E5E7EB]"
      >
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#EFEAFF] to-[#FFF0F6] flex items-center justify-center mb-5">
          <SearchX size={32} className="text-[#7B2FF7]" />
        </div>
        <h3 className="font-display font-700 text-[#1F1F2E] text-lg mb-2">No creators match your filters.</h3>
        <p className="text-[#6B6B8A] text-sm max-w-xs leading-relaxed mb-6">
          Try adjusting your search, location, or category filters to discover more creators.
        </p>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#7B2FF7] text-[#7B2FF7] text-sm font-semibold hover:bg-[#EFEAFF] transition-colors"
        >
          <RotateCcw size={14} />
          Reset Filters
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-[#6B6B8A] text-sm">
          Showing <span className="font-display font-700 text-[#1F1F2E] tabular-nums">{filtered.length}</span> creators
        </p>
        <select
          value={filters.sortBy}
          onChange={(e) => onSortChange?.(e.target.value)}
          className="text-sm border border-[#E5E7EB] rounded-xl px-3 py-2 text-[#6B6B8A] bg-white focus:outline-none focus:border-[#7B2FF7] cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((creator, i) => (
          <DiscoverCreatorCard
            key={creator.id}
            creator={creator}
            index={i}
            highlight={premiumOnly && creator.premium}
          />
        ))}
      </div>
    </div>
  );
}
