'use client';

import React from 'react';
import Link from 'next/link';
import {
  BedDouble,
  Car,
  Dumbbell,
  GraduationCap,
  HardHat,
  Heart,
  Home,
  Hospital,
  Hotel,
  KeyRound,
  Lamp,
  Landmark,
  LayoutGrid,
  PartyPopper,
  PawPrint,
  Smile,
  Sparkles,
  Truck,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';

type CategoryTile = {
  label: string;
  slug: string;
  icon: LucideIcon;
  color: string;
  popular?: boolean;
};

const CATEGORY_TILES: CategoryTile[] = [
  { label: 'Restaurants', slug: 'restaurants', icon: UtensilsCrossed, color: '#F59E0B' },
  { label: 'Hotels', slug: 'hotels', icon: Hotel, color: '#2563EB' },
  { label: 'Beauty Spa', slug: 'beauty-spa', icon: Sparkles, color: '#DB2777' },
  { label: 'Home Decor', slug: 'home-decor', icon: Lamp, color: '#0D9488' },
  { label: 'Wedding Planning', slug: 'wedding-planning', icon: Heart, color: '#C026D3' },
  { label: 'Education', slug: 'education', icon: GraduationCap, color: '#16A34A' },
  { label: 'Rent & Hire', slug: 'rent-hire', icon: KeyRound, color: '#EA580C' },
  { label: 'Hospitals', slug: 'hospitals', icon: Hospital, color: '#DC2626' },
  { label: 'Contractors', slug: 'contractors', icon: HardHat, color: '#CA8A04' },
  { label: 'Pet Shops', slug: 'pet-shops', icon: PawPrint, color: '#B45309' },
  { label: 'PG/Hostels', slug: 'pg-hostels', icon: BedDouble, color: '#4F46E5' },
  { label: 'Estate Agent', slug: 'estate-agent', icon: Home, color: '#059669' },
  { label: 'Dentists', slug: 'dentists', icon: Smile, color: '#0891B2' },
  { label: 'Gym', slug: 'gym', icon: Dumbbell, color: '#EA580C' },
  { label: 'Loans', slug: 'loans', icon: Landmark, color: '#15803D' },
  { label: 'Event Organisers', slug: 'event-organisers', icon: PartyPopper, color: '#DB2777' },
  { label: 'Driving Schools', slug: 'driving-schools', icon: Car, color: '#2563EB' },
  { label: 'Packers & Movers', slug: 'packers-movers', icon: Truck, color: '#D97706' },
  { label: 'Popular Categories', slug: '', icon: LayoutGrid, color: '#1D4ED8', popular: true },
];

function categoryHref(tile: CategoryTile) {
  if (tile.popular) return '/business?type=business';
  return `/business/category/${tile.slug}?type=business`;
}

export default function BusinessCategoryGrid() {
  return (
    <div className="grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10">
      {CATEGORY_TILES.map((tile) => {
        const TileIcon = tile.icon;
        return (
          <Link
            key={tile.label}
            href={categoryHref(tile)}
            className="group flex flex-col items-center text-center"
          >
            <span
              className={`relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[1.15rem] border bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md sm:h-20 sm:w-20 ${
                tile.popular
                  ? 'border-2 border-[#1D4ED8] group-hover:border-[#1D4ED8]'
                  : 'border-slate-200 group-hover:border-violet-300'
              }`}
            >
              <TileIcon className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1.75} style={{ color: tile.color }} />
            </span>
            <span className="mt-2 max-w-[6.5rem] text-[13px] font-medium leading-tight text-slate-700 group-hover:text-violet-700">
              {tile.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
