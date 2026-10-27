'use client';

import React from 'react';
import AppImage from '@/src/components/ui/AppImage';
import Icon from '@/src/components/ui/AppIcon';
import Reveal from '@/src/components/animations/Reveal';

const BUSINESS_PAINS = [
  {
    title: 'Difficult to discover relevant local creators',
    body: 'Finding creators who match your brand, location and audience takes time.',
  },
  {
    title: 'Lengthy agency coordination and added costs',
    body: 'Multiple discussions, quotations and management fees.',
  },
  {
    title: 'Unclear pricing and deliverables',
    body: "Not always clear what you're paying for and what you'll get.",
  },
  {
    title: 'Limited visibility into campaign outcomes',
    body: 'Hard to track real results and ROI.',
  },
];

const CREATOR_PAINS = [
  {
    title: 'Small and mid-sized creators struggle to find paid deals',
    body: 'Great content, but limited earning opportunities beyond top influencers.',
  },
  {
    title: 'Too many opportunities are barter-only',
    body: 'Often asked to work for free products, meals or services.',
  },
  {
    title: 'Payment delays and disputes',
    body: "Creators sometimes don't receive the committed amount after completing campaigns.",
  },
  {
    title: 'Limited direct access to genuine businesses',
    body: 'Hard to find and connect with real brands without middlemen.',
  },
];

export default function ProblemSection() {
  return (
    <section className="relative overflow-hidden bg-[#F8F7FC] py-20 sm:py-24" aria-labelledby="problem-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-fuchsia-600">
              The Problem We&apos;re Solving
            </p>
            <h2 id="problem-heading" className="vb-heading vb-heading-md mt-3">
              Great Businesses. Talented Creators.{' '}
              <span className="vb-heading-highlight">A Broken Connection.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">
              India has amazing businesses and incredibly talented creators, but connecting them for
              fair, transparent and successful collaborations is still harder than it should be.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-14 grid items-stretch gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          <Reveal className="h-full">
            <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
              <div className="relative h-52 bg-slate-900 sm:h-60">
                <AppImage
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80"
                  alt="Business owner working on a laptop at a desk, looking for creators"
                  fill
                  quality={75}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
                <p className="absolute bottom-4 left-5 right-5 z-10 text-base font-semibold italic text-white">
                  &ldquo;I want to grow my business, but finding creators is so complicated...&rdquo;
                </p>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-violet-700">
                  <Icon name="BuildingStorefrontIcon" size={14} />
                  For Businesses
                </span>
                <h3 className="mt-3 text-2xl font-extrabold text-slate-900">
                  Finding the right creators shouldn&apos;t be complicated.
                </h3>
                <ul className="mt-6 space-y-5">
                  {BUSINESS_PAINS.map((pain, index) => (
                    <li key={pain.title} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-extrabold text-violet-700">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-bold text-slate-900">{pain.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-500">{pain.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <div className="relative hidden w-24 items-center justify-center self-stretch lg:flex" aria-hidden="true">
            <svg viewBox="0 0 80 600" className="h-full w-full" fill="none" preserveAspectRatio="none">
              <path
                d="M40 0 C 40 120, 8 160, 8 300 C 8 440, 40 480, 40 600"
                stroke="#7C3AED"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M40 0 C 40 120, 72 160, 72 300 C 72 440, 40 480, 40 600"
                stroke="#E879F9"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute top-1/2 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-amber-400 shadow-lg">
              <Icon name="LinkIcon" size={26} className="text-amber-950" />
            </div>
          </div>

          <div className="flex justify-center lg:hidden" aria-hidden="true">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 shadow-md">
              <Icon name="LinkIcon" size={24} className="text-amber-950" />
            </div>
          </div>

          <Reveal delay={0.14} className="h-full">
            <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
              <div className="relative h-52 bg-slate-900 sm:h-60">
                <AppImage
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80"
                  alt="Creator smiling in natural light, ready to create content"
                  fill
                  quality={75}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
                <p className="absolute bottom-4 left-5 right-5 z-10 text-base font-semibold italic text-white">
                  &ldquo;I create content every day, but where are the paid opportunities?&rdquo;
                </p>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-fuchsia-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-fuchsia-700">
                  <Icon name="SparklesIcon" size={14} />
                  For Creators
                </span>
                <h3 className="mt-3 text-2xl font-extrabold text-slate-900">
                  Your creativity deserves more than likes.
                </h3>
                <ul className="mt-6 space-y-5">
                  {CREATOR_PAINS.map((pain, index) => (
                    <li key={pain.title} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fuchsia-100 text-sm font-extrabold text-fuchsia-700">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-bold text-slate-900">{pain.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-500">{pain.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative mt-12 overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-12 text-center sm:px-12 sm:py-14">
            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-violet-600/40 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-3xl" aria-hidden="true" />
            <p className="relative text-sm font-bold uppercase tracking-widest text-amber-300">
              That&apos;s why we&apos;re building
            </p>
            <p className="vb-heading relative mt-3 text-4xl text-white sm:text-5xl">
              Viral<span className="vb-heading-highlight">Bridge</span>
              <sup className="ml-1 align-super text-base font-bold text-white/70">TM</sup>
            </p>
            <p className="relative mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/85">
              One platform. Better connections. Clearer collaborations. More opportunities.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
