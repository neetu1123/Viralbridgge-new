'use client';

import React, { useState, useMemo } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { DiscoverHero } from './SelectionCards';
import SelectionCards from './SelectionCards';
import DiscoverFilterSidebar from './DiscoverFilterSidebar';
import DiscoverCreatorGrid from './DiscoverCreatorGrid';
import {
  DEFAULT_DISCOVER_FILTERS,
  CITIES,
  LANGUAGES,
  CATEGORIES,
  PLATFORMS,
  type DiscoverFilters,
} from '@/src/data/discoverCreators';

type PageType = 'city' | 'language' | 'category' | 'platform' | 'premium';

interface DiscoverSubPageClientProps {
  pageType: PageType;
  title: string;
  subtitle?: string;
  badge?: string;
  items?: readonly string[];
  initialFilter?: Partial<DiscoverFilters>;
}

const PAGE_CONFIG: Record<PageType, { items: readonly string[]; filterKey: keyof DiscoverFilters; selectionType: 'city' | 'language' | 'category' | 'platform' }> = {
  city: { items: CITIES, filterKey: 'cities', selectionType: 'city' },
  language: { items: LANGUAGES, filterKey: 'languages', selectionType: 'language' },
  category: { items: CATEGORIES, filterKey: 'categories', selectionType: 'category' },
  platform: { items: PLATFORMS, filterKey: 'platforms', selectionType: 'platform' },
  premium: { items: [], filterKey: 'premium', selectionType: 'category' },
};

export default function DiscoverSubPageClient({
  pageType,
  title,
  subtitle,
  badge,
  initialFilter = {},
}: DiscoverSubPageClientProps) {
  const config = PAGE_CONFIG[pageType];
  const [filters, setFilters] = useState<DiscoverFilters>({
    ...DEFAULT_DISCOVER_FILTERS,
    ...initialFilter,
    ...(pageType === 'premium' ? { premium: true } : {}),
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const updateFilter = <K extends keyof DiscoverFilters>(key: K, value: DiscoverFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      ...DEFAULT_DISCOVER_FILTERS,
      ...(pageType === 'premium' ? { premium: true } : {}),
    });
  };

  const handleSelection = (item: string) => {
    if (pageType === 'premium') return;
    const key = config.filterKey as 'cities' | 'languages' | 'categories' | 'platforms';
    const current = filters[key] as string[];
    const next = current.includes(item) ? current.filter((i) => i !== item) : [item];
    updateFilter(key, next);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.cities.length) count++;
    if (filters.languages.length) count++;
    if (filters.categories.length) count++;
    if (filters.platforms.length) count++;
    return count;
  }, [filters]);

  return (
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-8">
      <DiscoverHero title={title} subtitle={subtitle} badge={badge} />

      {pageType !== 'premium' && (
        <SelectionCards
          items={[...config.items]}
          selected={filters[config.filterKey as 'cities' | 'languages' | 'categories' | 'platforms'] as string[]}
          onSelect={handleSelection}
          type={config.selectionType}
        />
      )}

      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-700 text-[#1F1F2E] text-lg">
          {pageType === 'premium' ? 'Premium Verified Creators' : 'Matching Creators'}
        </h2>
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E5E7EB] bg-white text-sm font-medium text-[#6B6B8A]"
        >
          <SlidersHorizontal size={15} />
          Filters
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#7B2FF7] text-white text-[10px] font-700 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex gap-8">
        <div className="hidden lg:block w-72 flex-shrink-0">
          <DiscoverFilterSidebar filters={filters} updateFilter={updateFilter} onReset={resetFilters} />
        </div>

        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
              <div className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display font-700 text-[#1F1F2E] text-base">Filters</h3>
                  <button onClick={() => setSidebarOpen(false)} className="text-[#9AA0B4]">✕</button>
                </div>
                <DiscoverFilterSidebar filters={filters} updateFilter={updateFilter} onReset={resetFilters} />
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <DiscoverCreatorGrid
            filters={filters}
            onReset={resetFilters}
            onSortChange={(sortBy) => updateFilter('sortBy', sortBy)}
            premiumOnly={pageType === 'premium'}
          />
        </div>
      </div>
    </div>
  );
}
