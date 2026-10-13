'use client';

import React from 'react';
import { CheckCircle, Globe, MapPin, Phone, Star, TrendingUp, Users } from 'lucide-react';

const CAFE_COVER =
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=640&q=80';
const CAFE_THUMBS = [
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=320&q=80',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=320&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=320&q=80',
];
const PHONE_PHOTO =
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=480&q=80';

const CREATORS = [
  {
    name: 'Priya Sharma',
    niche: 'Food',
    followers: '198K',
    match: '96%',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
  },
  {
    name: 'Marcus Reid',
    niche: 'Fitness',
    followers: '512K',
    match: '92%',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80',
  },
  {
    name: 'Sofia Chen',
    niche: 'Beauty',
    followers: '284K',
    match: '91%',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=160&q=80',
  },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.5 3.5A11 11 0 0 0 2.1 17.8L1 23l5.4-1.1A11 11 0 0 0 20.5 3.5zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.2.7.7-3.1-.2-.3A9.1 9.1 0 1 1 12 20.5zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.5 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.6-.3z" />
    </svg>
  );
}

export default function HeroBannerVisual({ launchCampaignUrl }: { launchCampaignUrl: string }) {
  return (
    <div className="relative mx-auto h-[460px] w-full max-w-[640px] sm:h-[560px] lg:mx-0 lg:ml-auto lg:h-[640px]">
      <div className="absolute left-1/2 top-0 h-[640px] w-[620px] origin-top -translate-x-1/2 scale-[0.66] sm:scale-[0.82] lg:left-auto lg:right-0 lg:translate-x-0 lg:scale-100">
        <div className="pointer-events-none absolute -left-8 top-10 h-72 w-72 rounded-full bg-violet-200/70 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-24 h-64 w-64 rounded-full bg-pink-200/70 blur-3xl" />
        <div className="pointer-events-none absolute bottom-8 left-24 h-40 w-56 rounded-full bg-fuchsia-100/80 blur-2xl" />

        <div
          className="absolute right-1 top-1 z-40 w-24 text-right text-[20px] leading-none text-violet-500"
          style={{ fontFamily: '"Segoe Script", "Bradley Hand", "Comic Sans MS", cursive' }}
        >
          Real People
          <br />
          Real Impact
          <svg viewBox="0 0 36 42" className="ml-auto mt-1 h-9 w-8 text-violet-400" fill="none" aria-hidden="true">
            <path d="M18 2 C22 14, 20 24, 18 34" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M10 28 L18 38 L26 28" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <article className="absolute left-0 top-[76px] z-10 w-[348px] rounded-[28px] border border-white/80 bg-white p-4 shadow-[0_24px_60px_-20px_rgba(91,33,182,0.35)]">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-400">Business Profile</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
              <CheckCircle className="h-3 w-3" /> Verified
            </span>
          </div>

          <div className="flex gap-3">
            <img
              src={CAFE_COVER}
              alt="Sharma Café dining room in Jaipur"
              className="h-[72px] w-[92px] flex-shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <h3 className="text-[17px] font-bold leading-tight text-slate-900">Sharma Café</h3>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                <MapPin className="h-3 w-3" /> Jaipur
              </p>
              <p className="text-xs text-slate-400">Café • Restaurant</p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-4 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-800">4.7</span>
              <span className="text-slate-400">(2.3k)</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-slate-400" />
              <span className="font-medium">2.8k followers</span>
            </span>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <span className="inline-flex items-center justify-center gap-1 rounded-full border border-violet-100 bg-violet-50 py-1.5 text-[11px] font-semibold text-violet-700">
              <Phone className="h-3 w-3" /> Call
            </span>
            <span className="inline-flex items-center justify-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 py-1.5 text-[11px] font-semibold text-emerald-700">
              <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp
            </span>
            <span className="inline-flex items-center justify-center gap-1 rounded-full border border-sky-100 bg-sky-50 py-1.5 text-[11px] font-semibold text-sky-700">
              <Globe className="h-3 w-3" /> Website
            </span>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {CAFE_THUMBS.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={index === 0 ? 'Coffee at Sharma Café' : index === 1 ? 'Breakfast plate' : 'Dinner at Sharma Café'}
                className="h-[68px] w-full rounded-xl object-cover"
              />
            ))}
          </div>
        </article>

        <article className="absolute left-[328px] top-[92px] z-20 w-[250px] rounded-[26px] border border-white/80 bg-white p-4 shadow-[0_24px_50px_-18px_rgba(91,33,182,0.4)]">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className="whitespace-nowrap text-[12px] font-bold text-slate-900">Recommended Creators</h3>
            <span className="whitespace-nowrap rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600">
              AI Match 96%
            </span>
          </div>
          <ul className="space-y-2.5">
            {CREATORS.map((creator) => (
              <li key={creator.name} className="flex items-center gap-2.5">
                <img src={creator.avatar} alt="" className="h-9 w-9 flex-shrink-0 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-semibold text-slate-900">{creator.name}</div>
                  <div className="text-[11px] text-slate-400">
                    {creator.niche} <span className="text-slate-300">|</span> {creator.followers}
                  </div>
                </div>
                <span className="text-[12px] font-bold text-emerald-500">{creator.match}</span>
              </li>
            ))}
          </ul>
          <a
            href={launchCampaignUrl}
            className="mt-4 block rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-2.5 text-center text-[13px] font-bold text-white shadow-md shadow-violet-200"
          >
            Launch Campaign
          </a>
        </article>

        <div className="absolute left-[168px] top-[448px] z-30 flex items-center gap-2.5 rounded-2xl border border-white bg-white px-3.5 py-2.5 shadow-lg animate-float-fast">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <div>
            <div className="text-sm font-bold leading-none text-emerald-500">+32%</div>
            <div className="mt-0.5 text-[11px] text-slate-400">Potential Growth</div>
          </div>
        </div>

        <div className="absolute bottom-2 right-0 z-30 w-[138px] animate-float-slow">
          <div className="rounded-[28px] bg-white p-1.5 shadow-[0_20px_40px_-16px_rgba(15,23,42,0.45)]">
            <div className="relative h-[248px] overflow-hidden rounded-[22px] bg-slate-100">
              <img
                src={PHONE_PHOTO}
                alt="Creator filming a food review"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-3 right-2 flex flex-col gap-1.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-red-600 text-white shadow">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                    <path d="M23 12.2s0-3.2-.4-4.6c-.4-1.5-1.6-2.6-3.1-2.8C17.2 4.4 12 4.4 12 4.4s-5.2 0-7.5.4c-1.5.2-2.7 1.3-3.1 2.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.4 1.5 1.6 2.6 3.1 2.8 2.3.4 7.5.4 7.5.4s5.2 0 7.5-.4c1.5-.2 2.7-1.3 3.1-2.8.4-1.4.4-4.6.4-4.6zM9.8 15.5v-6.6l6.2 3.3-6.2 3.3z" />
                  </svg>
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-amber-400 via-pink-500 to-purple-600 text-white shadow">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
