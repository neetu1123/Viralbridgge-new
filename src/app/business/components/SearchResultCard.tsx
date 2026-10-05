'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';
import type { DiscoveryListing } from '@/src/lib/api/types';

export default function SearchResultCard({ item }: { item: DiscoveryListing }) {
  const initials = item.name.slice(0, 2).toUpperCase();
  return (
    <article className="bg-white rounded-2xl border border-[#E5E7EB] p-4 hover:border-[#7B2FF7]/40 hover:shadow-sm transition-all">
      <div className="flex gap-3">
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#F2F3F7] flex items-center justify-center text-sm font-semibold text-[#7B2FF7] flex-shrink-0">
          {item.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.logo} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            initials
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-[#1F1F2E] truncate">{item.name}</h3>
              <p className="text-xs text-[#7B2FF7] font-medium mt-0.5">
                {item.type === 'CREATOR' ? 'Creator' : 'Business'} · {item.category}
              </p>
            </div>
            {item.verified && (
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Verified ✓</span>
            )}
          </div>
          <p className="text-xs text-[#6B6B8A] mt-1 flex items-center gap-1">
            <MapPin size={12} /> {item.locationLabel || 'India'}
          </p>
          {item.rating > 0 && (
            <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
              <Star size={12} fill="currentColor" /> {item.rating.toFixed(1)}
              {item.reviewCount ? ` · ${item.reviewCount}` : ''}
            </p>
          )}
        </div>
      </div>
      {item.shortDescription && (
        <p className="text-sm text-[#6B6B8A] mt-3 line-clamp-2">{item.shortDescription}</p>
      )}
      {item.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span key={tag} className="text-[11px] bg-[#F8F7FC] text-[#7B2FF7] px-2 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      )}
      <Link
        href={`/business/${encodeURIComponent(item.slug)}`}
        className="mt-4 inline-flex text-sm font-semibold text-white px-4 py-2 rounded-xl"
        style={{ background: 'linear-gradient(90deg, #7B2FF7, #F357A8)' }}
      >
        View Profile
      </Link>
    </article>
  );
}
