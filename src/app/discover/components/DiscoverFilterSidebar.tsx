'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw, Search } from 'lucide-react';
import { CITIES, LANGUAGES, CATEGORIES, PLATFORMS, type DiscoverFilters } from '@/src/data/discoverCreators';

interface DiscoverFilterSidebarProps {
  filters: DiscoverFilters;
  updateFilter: <K extends keyof DiscoverFilters>(key: K, value: DiscoverFilters[K]) => void;
  onReset: () => void;
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#E5E7EB] pb-5 mb-5 last:border-0 last:mb-0 last:pb-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between mb-3 group">
        <span className="font-display font-700 text-[#1F1F2E] text-sm">{title}</span>
        {open ? (
          <ChevronUp size={15} className="text-[#9AA0B4] group-hover:text-[#6B6B8A] transition-colors" />
        ) : (
          <ChevronDown size={15} className="text-[#9AA0B4] group-hover:text-[#6B6B8A] transition-colors" />
        )}
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

function formatFollowers(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return String(n);
}

function toggleInArray(arr: string[], item: string): string[] {
  return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
}

export default function DiscoverFilterSidebar({ filters, updateFilter, onReset }: DiscoverFilterSidebarProps) {
  const activeCount =
    (filters.search ? 1 : 0) +
    filters.cities.length +
    filters.languages.length +
    filters.categories.length +
    filters.platforms.length +
    (filters.followersMin > 0 || filters.followersMax < 5000000 ? 1 : 0) +
    (filters.priceMax < 10000 ? 1 : 0) +
    (filters.verified ? 1 : 0) +
    (filters.premium ? 1 : 0) +
    (filters.available ? 1 : 0);

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-card p-5 sticky top-24">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h3 className="font-display font-700 text-[#1F1F2E] text-base">Filters</h3>
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#7B2FF7] text-white text-[10px] font-700 font-display flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button onClick={onReset} className="flex items-center gap-1.5 text-[#9AA0B4] hover:text-[#7B2FF7] text-xs font-medium transition-colors">
            <RotateCcw size={11} />
            Reset
          </button>
        )}
      </div>

      <FilterSection title="Search">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA0B4]" />
          <input
            type="text"
            placeholder="Search creators..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#1F1F2E] placeholder:text-[#9AA0B4] focus:outline-none focus:border-[#7B2FF7] focus:ring-2 focus:ring-[#7B2FF7]/10"
          />
        </div>
      </FilterSection>

      <FilterSection title="City">
        <div className="flex flex-wrap gap-1.5">
          {CITIES.map((city) => (
            <button
              key={city}
              onClick={() => updateFilter('cities', toggleInArray(filters.cities, city))}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all duration-150 ${
                filters.cities.includes(city)
                  ? 'bg-[#EFEAFF] border-[#7B2FF7] text-[#7B2FF7]'
                  : 'border-[#E5E7EB] text-[#9AA0B4] hover:border-[#7B2FF7] hover:text-[#7B2FF7]'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Language">
        <div className="flex flex-wrap gap-1.5">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => updateFilter('languages', toggleInArray(filters.languages, lang))}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all duration-150 ${
                filters.languages.includes(lang)
                  ? 'bg-[#EFEAFF] border-[#7B2FF7] text-[#7B2FF7]'
                  : 'border-[#E5E7EB] text-[#9AA0B4] hover:border-[#7B2FF7] hover:text-[#7B2FF7]'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Category">
        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
              <div
                onClick={() => updateFilter('categories', toggleInArray(filters.categories, cat))}
                className={`w-4 h-4 rounded flex items-center justify-center border transition-all duration-150 flex-shrink-0 cursor-pointer ${
                  filters.categories.includes(cat)
                    ? 'bg-[#7B2FF7] border-[#7B2FF7]'
                    : 'border-[#D1D5DB] group-hover:border-[#7B2FF7]'
                }`}
              >
                {filters.categories.includes(cat) && (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span
                onClick={() => updateFilter('categories', toggleInArray(filters.categories, cat))}
                className={`text-sm transition-colors cursor-pointer ${
                  filters.categories.includes(cat) ? 'text-[#7B2FF7] font-medium' : 'text-[#6B6B8A] group-hover:text-[#1F1F2E]'
                }`}
              >
                {cat}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Platform">
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((p) => (
            <button
              key={p}
              onClick={() => updateFilter('platforms', toggleInArray(filters.platforms, p))}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${
                filters.platforms.includes(p)
                  ? 'bg-[#7B2FF7] border-[#7B2FF7] text-white'
                  : 'border-[#E5E7EB] text-[#6B6B8A] hover:border-[#7B2FF7] hover:text-[#7B2FF7]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Followers">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-[#9AA0B4] font-medium">
            <span className="tabular-nums">{formatFollowers(filters.followersMin)}</span>
            <span className="tabular-nums">{formatFollowers(filters.followersMax)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={5000000}
            step={10000}
            value={filters.followersMin}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val < filters.followersMax) updateFilter('followersMin', val);
            }}
            className="w-full accent-[#7B2FF7] cursor-pointer"
          />
        </div>
      </FilterSection>

      <FilterSection title="Price Range" defaultOpen={false}>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-[#9AA0B4] font-medium">
            <span>₹0</span>
            <span className="tabular-nums font-semibold text-[#1F1F2E]">
              {filters.priceMax === 10000 ? 'Any' : `₹${filters.priceMax.toLocaleString()}`}
            </span>
          </div>
          <input
            type="range"
            min={500}
            max={10000}
            step={100}
            value={filters.priceMax}
            onChange={(e) => updateFilter('priceMax', Number(e.target.value))}
            className="w-full accent-[#7B2FF7] cursor-pointer"
          />
        </div>
      </FilterSection>

      <FilterSection title="Badges & Availability" defaultOpen={false}>
        <div className="space-y-2">
          {[
            { key: 'verified' as const, label: 'Verified Only' },
            { key: 'premium' as const, label: 'Premium Only' },
            { key: 'available' as const, label: 'Available Now' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => updateFilter(key, filters[key] ? null : true)}
                className={`w-4 h-4 rounded flex items-center justify-center border transition-all duration-150 cursor-pointer ${
                  filters[key] ? 'bg-[#7B2FF7] border-[#7B2FF7]' : 'border-[#D1D5DB] group-hover:border-[#7B2FF7]'
                }`}
              >
                {filters[key] && (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-[#6B6B8A] group-hover:text-[#1F1F2E]">{label}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );
}
