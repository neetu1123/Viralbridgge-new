'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Filter, MapPin, Search, SlidersHorizontal, Star, X } from 'lucide-react';
import {
  fetchDiscoveryCategories,
  fetchDiscoveryLocations,
  fetchDiscoverySearch,
} from '@/src/lib/api/discovery';
import {
  fetchDiscoverCategories,
  fetchDiscoverLocations,
  fetchDiscoverSearch,
} from '@/src/lib/api/listings';
import type { DiscoveryCategory, DiscoveryListing, DiscoveryLocation } from '@/src/lib/api/types';
import SearchResultCard from './SearchResultCard';

interface Props {
  initialCategory?: string;
  initialCity?: string;
  mode?: 'business' | 'discover';
}

const SORTS = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'rating', label: 'Rating' },
  { id: 'popular', label: 'Most Popular' },
  { id: 'newest', label: 'Recently Added' },
  { id: 'name', label: 'Name A-Z' },
];

export default function BusinessSearchClient({ initialCategory, initialCity, mode = 'business' }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('q') ?? '');
  const [city, setCity] = useState(searchParams.get('city') ?? initialCity ?? '');
  const [area, setArea] = useState(searchParams.get('area') ?? '');
  const [type, setType] = useState(searchParams.get('type') ?? 'all');
  const [category, setCategory] = useState(searchParams.get('category') ?? initialCategory ?? '');
  const [verified, setVerified] = useState(searchParams.get('verified') === 'true');
  const [rating, setRating] = useState(Number(searchParams.get('rating') ?? 0));
  const [sort, setSort] = useState(searchParams.get('sort') ?? 'relevance');
  const [status, setStatus] = useState(searchParams.get('status') ?? 'active');
  const [page, setPage] = useState(Number(searchParams.get('page') ?? 1));
  const [mobileFilters, setMobileFilters] = useState(false);
  const [categories, setCategories] = useState<DiscoveryCategory[]>([]);
  const [locations, setLocations] = useState<DiscoveryLocation[]>([]);
  const [results, setResults] = useState<DiscoveryListing[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMeta = mode === 'discover'
      ? Promise.all([fetchDiscoverCategories(), fetchDiscoverLocations()])
      : Promise.all([fetchDiscoveryCategories(), fetchDiscoveryLocations()]);
    loadMeta
      .then(([cats, locs]) => {
        setCategories(cats);
        setLocations(locs);
      })
      .catch(() => {
        setCategories([]);
        setLocations([]);
      });
  }, [mode]);

  const query = useMemo(
    () => ({
      q: keyword.trim() || undefined,
      city: city || undefined,
      area: area || undefined,
      category: category || undefined,
      type: type === 'all' ? undefined : (type as 'business' | 'creator'),
      verified: verified ? 'true' : undefined,
      rating: rating || undefined,
      sort: sort === 'relevance' ? undefined : sort,
      status: status === 'active' ? undefined : status,
      page,
      limit: 20,
    }),
    [keyword, city, area, category, type, verified, rating, sort, status, page],
  );

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = mode === 'discover' ? await fetchDiscoverSearch(query) : await fetchDiscoverySearch(query);
      setResults(res.data ?? []);
      setTotal(res.pagination?.total ?? res.meta?.total ?? 0);
      setTotalPages(res.pagination?.totalPages ?? res.meta?.totalPages ?? 1);
    } catch {
      setResults([]);
      setTotal(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [query, mode]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void load();
    }, 350);
    return () => window.clearTimeout(timeout);
  }, [load]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (keyword.trim()) params.set('q', keyword.trim());
    if (city) params.set('city', city);
    if (area) params.set('area', area);
    if (category) params.set('category', category);
    if (type !== 'all') params.set('type', type);
    if (verified) params.set('verified', 'true');
    if (rating) params.set('rating', String(rating));
    if (sort !== 'relevance') params.set('sort', sort);
    if (status !== 'active') params.set('status', status);
    if (page > 1) params.set('page', String(page));
    const next = params.toString();
    const current = searchParams.toString();
    if (next !== current && (pathname.startsWith('/business') || pathname === '/discover')) {
      router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
    }
  }, [keyword, city, area, category, type, verified, rating, sort, status, page, pathname, router, searchParams]);

  const runSearch = (event?: React.FormEvent) => {
    event?.preventDefault();
    setPage(1);
    void load();
  };

  const clearFilters = () => {
    setKeyword('');
    setCity(initialCity ?? '');
    setArea('');
    setCategory(initialCategory ?? '');
    setType('all');
    setVerified(false);
    setRating(0);
    setSort('relevance');
    setStatus('active');
    setPage(1);
  };

  const selectedAreas = locations.find((item) => item.name === city)?.areas ?? [];

  const filters = (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#9AA0B4] mb-2">Type</p>
        {['all', 'business', 'creator'].map((value) => (
          <label key={value} className="flex items-center gap-2 py-1.5 text-sm text-[#1F1F2E] capitalize">
            <input type="radio" name="type" checked={type === value} onChange={() => { setType(value); setPage(1); }} />
            {value === 'business' ? 'Business / Brand' : value}
          </label>
        ))}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#9AA0B4] mb-2">Category</p>
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          className="w-full rounded-xl border border-[#E5E7EB] px-3 py-2.5 text-sm bg-white"
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item.id} value={item.slug}>{item.icon} {item.name}</option>
          ))}
        </select>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#9AA0B4] mb-2">City</p>
        <select
          value={city}
          onChange={(e) => { setCity(e.target.value); setArea(''); setPage(1); }}
          className="w-full rounded-xl border border-[#E5E7EB] px-3 py-2.5 text-sm bg-white"
        >
          <option value="">All cities</option>
          {locations.map((item) => (
            <option key={item.slug} value={item.name}>{item.name}</option>
          ))}
        </select>
      </div>
      {selectedAreas.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#9AA0B4] mb-2">Area</p>
          <select
            value={area}
            onChange={(e) => { setArea(e.target.value); setPage(1); }}
            className="w-full rounded-xl border border-[#E5E7EB] px-3 py-2.5 text-sm bg-white"
          >
            <option value="">All areas</option>
            {selectedAreas.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      )}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#9AA0B4] mb-2">Availability</p>
        {['active', 'all'].map((value) => (
          <label key={value} className="flex items-center gap-2 py-1.5 text-sm text-[#1F1F2E] capitalize">
            <input type="radio" name="status" checked={status === value} onChange={() => { setStatus(value); setPage(1); }} />
            {value === 'active' ? 'Active' : 'All'}
          </label>
        ))}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#9AA0B4] mb-2">Verified</p>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={verified} onChange={(e) => { setVerified(e.target.checked); setPage(1); }} />
          Verified only
        </label>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#9AA0B4] mb-2">Rating</p>
        {[0, 3, 4].map((value) => (
          <label key={value} className="flex items-center gap-2 py-1 text-sm">
            <input type="radio" name="rating" checked={rating === value} onChange={() => { setRating(value); setPage(1); }} />
            {value === 0 ? 'All' : `${value}+`}
          </label>
        ))}
      </div>
      <button type="button" onClick={clearFilters} className="text-sm font-medium text-[#7B2FF7]">
        Clear filters
      </button>
    </div>
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 pb-16">
      <section className="pt-10 pb-8">
        <p className="text-sm font-semibold text-[#7B2FF7] mb-2">ViralBridge Discover</p>
        <h1 className="font-display text-3xl sm:text-4xl font-700 text-[#1F1F2E]">What are you looking for?</h1>
        <p className="mt-2 text-[#6B6B8A] max-w-2xl">
          Search registered businesses and creators by service and city — no login required.
        </p>

        <form onSubmit={runSearch} className="mt-6 grid gap-3 md:grid-cols-[1fr_220px_auto] bg-white border border-[#E5E7EB] rounded-2xl p-3 shadow-sm">
          <label className="flex items-center gap-2 px-3">
            <Search size={18} className="text-[#9AA0B4]" />
            <input
              value={keyword}
              onChange={(e) => { setKeyword(e.target.value); setPage(1); }}
              placeholder="Search gyms, salons, photographers..."
              className="w-full py-3 text-sm outline-none"
            />
          </label>
          <label className="flex items-center gap-2 px-3 border-t md:border-t-0 md:border-l border-[#F2F3F7]">
            <MapPin size={18} className="text-[#9AA0B4]" />
            <select value={city} onChange={(e) => { setCity(e.target.value); setArea(''); setPage(1); }} className="w-full py-3 text-sm bg-transparent outline-none">
              <option value="">Where?</option>
              {locations.map((item) => (
                <option key={item.slug} value={item.name}>{item.name}</option>
              ))}
            </select>
          </label>
          <button type="submit" className="btn-primary px-6 py-3 text-sm">Search</button>
        </form>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {categories.slice(0, 12).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => { setCategory(category === item.slug ? '' : item.slug); setPage(1); }}
              className={`shrink-0 rounded-full px-4 py-2 text-sm border ${
                category === item.slug ? 'bg-[#7B2FF7] text-white border-[#7B2FF7]' : 'bg-white border-[#E5E7EB] text-[#1F1F2E]'
              }`}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </div>
      </section>

      <div className="flex items-center justify-between gap-3 mb-5">
        <p className="text-sm text-[#6B6B8A]">{loading ? 'Searching…' : `${total} results`}</p>
        <div className="flex items-center gap-2">
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-xl border border-[#E5E7EB] px-3 py-2 text-sm bg-white">
            {SORTS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
          <button type="button" className="lg:hidden rounded-xl border border-[#E5E7EB] p-2" onClick={() => setMobileFilters(true)} aria-label="Filters">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-6">
        <aside className="hidden lg:block bg-white rounded-2xl border border-[#E5E7EB] p-5 h-fit sticky top-24">
          <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-[#1F1F2E]">
            <Filter size={16} /> Filters
          </div>
          {filters}
        </aside>

        <div>
          {loading ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-44 rounded-2xl bg-white border border-[#E5E7EB] animate-pulse" />
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-10 text-center">
              <h2 className="text-lg font-semibold text-[#1F1F2E]">No businesses or creators found.</h2>
              <p className="text-sm text-[#6B6B8A] mt-2">
                {city ? `No matches in ${city}. Try another city or clear filters.` : 'Try a broader keyword or another city.'}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Mumbai', 'Delhi', 'Noida', 'Bangalore'].map((item) => (
                  <button key={item} type="button" onClick={() => { setCity(item); setPage(1); }} className="rounded-full border border-[#E5E7EB] px-4 py-2 text-sm">
                    {item}
                  </button>
                ))}
              </div>
              <button type="button" onClick={clearFilters} className="mt-4 text-sm font-semibold text-[#7B2FF7]">Clear filters</button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {results.map((item) => <SearchResultCard key={`${item.type}-${item.id}`} item={item} />)}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-4 py-2 rounded-xl border text-sm disabled:opacity-40">Previous</button>
              <span className="px-3 py-2 text-sm text-[#6B6B8A]">{page} / {totalPages}</span>
              <button type="button" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="px-4 py-2 rounded-xl border text-sm disabled:opacity-40">Next</button>
            </div>
          )}
        </div>
      </div>

      {mobileFilters && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button type="button" className="absolute inset-0 bg-black/30" onClick={() => setMobileFilters(false)} aria-label="Close filters" />
          <div className="absolute right-0 top-0 h-full w-80 bg-white p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold">Filters</p>
              <button type="button" onClick={() => setMobileFilters(false)} aria-label="Close"><X size={18} /></button>
            </div>
            {filters}
          </div>
        </div>
      )}
    </div>
  );
}
