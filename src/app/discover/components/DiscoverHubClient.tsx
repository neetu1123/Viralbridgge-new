'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, MapPin, Globe, Tag, Monitor, Crown } from 'lucide-react';
import DiscoverFilterSidebar from './DiscoverFilterSidebar';
import DiscoverCreatorGrid from './DiscoverCreatorGrid';
import { CompactCreatorCard } from './DiscoverCreatorCard';
import {
  DEFAULT_DISCOVER_FILTERS,
  DISCOVER_CREATORS,
  CITIES,
  LANGUAGES,
  CATEGORIES,
  PLATFORMS,
  type DiscoverFilters,
} from '@/src/data/discoverCreators';

export default function DiscoverHubClient() {
  const [filters, setFilters] = useState<DiscoverFilters>(DEFAULT_DISCOVER_FILTERS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const updateFilter = <K extends keyof DiscoverFilters>(key: K, value: DiscoverFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_DISCOVER_FILTERS);
    setSearchQuery('');
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.cities.length) count++;
    if (filters.languages.length) count++;
    if (filters.categories.length) count++;
    if (filters.platforms.length) count++;
    if (filters.verified || filters.premium || filters.available) count++;
    return count;
  }, [filters]);

  const featuredCreators = DISCOVER_CREATORS.filter((c) => c.premium).slice(0, 4);
  const trendingCities = CITIES.slice(0, 6);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter('search', searchQuery);
    document.getElementById('creator-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-8">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7B2FF7] via-[#9B4FF7] to-[#F357A8] px-8 py-14 md:py-20 mb-12"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-[#F9A826] blur-3xl" />
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Discover Creators
          </span>
          <h1 className="font-display font-800 text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-4">
            Find Your Perfect Creator Match
          </h1>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Explore thousands of verified influencers across cities, languages, and platforms.
          </p>
          <form onSubmit={handleHeroSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9AA0B4]" />
              <input
                type="text"
                placeholder="Search by name, city, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/95 backdrop-blur-sm text-[#1F1F2E] placeholder:text-[#9AA0B4] text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <button type="submit" className="px-8 py-3.5 rounded-2xl bg-white text-[#7B2FF7] font-display font-700 text-sm hover:bg-white/90 transition-colors">
              Search
            </button>
          </form>
        </div>
      </motion.section>

      {/* Popular Categories */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-700 text-[#1F1F2E] text-xl">Popular Categories</h2>
          <Link href="/discover/category" className="text-[#7B2FF7] text-sm font-semibold hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {CATEGORIES.slice(0, 5).map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => {
                updateFilter('categories', [cat]);
                document.getElementById('creator-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-4 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#7B2FF7] hover:shadow-card transition-all duration-200 text-left group"
            >
              <Tag size={18} className="text-[#7B2FF7] mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-display font-700 text-[#1F1F2E] text-sm">{cat}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Featured Creators */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-700 text-[#1F1F2E] text-xl flex items-center gap-2">
            <Crown size={20} className="text-[#F9A826]" />
            Featured Creators
          </h2>
          <Link href="/discover/premium" className="text-[#7B2FF7] text-sm font-semibold hover:underline">
            View premium
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredCreators.map((creator) => (
            <CompactCreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </section>

      {/* Trending Cities & Languages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-700 text-[#1F1F2E] text-xl flex items-center gap-2">
              <MapPin size={18} className="text-[#7B2FF7]" />
              Trending Cities
            </h2>
            <Link href="/discover/city" className="text-[#7B2FF7] text-sm font-semibold hover:underline">
              View all
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingCities.map((city) => (
              <button
                key={city}
                onClick={() => {
                  updateFilter('cities', [city]);
                  document.getElementById('creator-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-full bg-white border border-[#E5E7EB] text-sm font-medium text-[#6B6B8A] hover:border-[#7B2FF7] hover:text-[#7B2FF7] hover:bg-[#EFEAFF] transition-all"
              >
                {city}
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-700 text-[#1F1F2E] text-xl flex items-center gap-2">
              <Globe size={18} className="text-[#7B2FF7]" />
              Popular Languages
            </h2>
            <Link href="/discover/language" className="text-[#7B2FF7] text-sm font-semibold hover:underline">
              View all
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.slice(0, 6).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  updateFilter('languages', [lang]);
                  document.getElementById('creator-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-full bg-white border border-[#E5E7EB] text-sm font-medium text-[#6B6B8A] hover:border-[#7B2FF7] hover:text-[#7B2FF7] hover:bg-[#EFEAFF] transition-all"
              >
                {lang}
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Platform Cards */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-700 text-[#1F1F2E] text-xl flex items-center gap-2">
            <Monitor size={18} className="text-[#7B2FF7]" />
            Browse by Platform
          </h2>
          <Link href="/discover/platform" className="text-[#7B2FF7] text-sm font-semibold hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {PLATFORMS.map((platform) => (
            <button
              key={platform}
              onClick={() => {
                updateFilter('platforms', [platform]);
                document.getElementById('creator-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-4 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#7B2FF7] hover:shadow-card transition-all duration-200 text-center group"
            >
              <Monitor size={20} className="text-[#7B2FF7] mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-display font-700 text-[#1F1F2E] text-xs">{platform}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Creator Grid with Filters */}
      <section id="creator-grid">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-700 text-[#1F1F2E] text-xl">All Creators</h2>
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E5E7EB] bg-white text-sm font-medium text-[#6B6B8A] hover:border-[#7B2FF7] hover:text-[#7B2FF7]"
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
                    <button onClick={() => setSidebarOpen(false)} className="text-[#9AA0B4] hover:text-[#1F1F2E]">
                      ✕
                    </button>
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
            />
          </div>
        </div>
      </section>
    </div>
  );
}
