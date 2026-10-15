'use client';

import React from 'react';
import {
  BarChart3,
  Clock,
  Gift,
  IndianRupee,
  Link2,
  Search,
  Shield,
  Store,
  UserRound,
  Users,
} from 'lucide-react';
import FadeIn from '@/src/components/animations/FadeIn';

const BUSINESS_POINTS = [
  {
    icon: Search,
    title: 'Difficult to discover relevant local creators',
    body: 'Finding creators who match your brand, location and audience takes time.',
  },
  {
    icon: Clock,
    title: 'Lengthy agency coordination and added costs',
    body: 'Multiple discussions, quotations and management fees.',
  },
  {
    icon: IndianRupee,
    title: 'Unclear pricing and deliverables',
    body: "Not always clear what you're paying for and what you'll get.",
  },
  {
    icon: BarChart3,
    title: 'Limited visibility into campaign outcomes',
    body: 'Hard to track real results and ROI.',
  },
];

const CREATOR_POINTS = [
  {
    icon: Users,
    title: 'Small and mid-sized creators struggle to find paid deals',
    body: 'Great content, but limited earning opportunities beyond top influencers.',
  },
  {
    icon: Gift,
    title: 'Too many opportunities are barter-only',
    body: 'Often asked to work for free products, meals or services.',
  },
  {
    icon: Shield,
    title: 'Payment delays and disputes',
    body: "Creators sometimes don't receive the committed amount after completing campaigns.",
  },
  {
    icon: Link2,
    title: 'Limited direct access to genuine businesses',
    body: 'Hard to find and connect with real brands without middlemen.',
  },
];

const BUSINESS_PHOTO =
  'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80';
const CREATOR_PHOTO =
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80';

function BrokenChain() {
  return (
    <svg viewBox="0 0 150 86" className="h-20 w-32 drop-shadow-[0_0_18px_rgba(232,121,249,0.95)]" aria-hidden="true">
      <g fill="none" stroke="#f5d0fe" strokeWidth="8" strokeLinecap="round">
        <rect x="8" y="24" width="58" height="38" rx="19" transform="rotate(-28 37 43)" />
        <path d="M86 18c18-8 40 0 46 16" />
        <path d="M132 52c-6 18-30 26-46 16" />
      </g>
    </svg>
  );
}

function PainList({
  items,
}: {
  items: { icon: React.ComponentType<{ className?: string }>; title: string; body: string }[];
}) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.title} className="flex gap-3 rounded-2xl bg-black/30 px-3 py-2.5 ring-1 ring-white/10">
            <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-fuchsia-500/20 text-fuchsia-200">
              <Icon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-semibold leading-snug text-white">{item.title}</span>
              <span className="mt-0.5 block text-xs leading-relaxed text-violet-100/75">{item.body}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function SideCard({
  icon: Icon,
  title,
  subtitle,
  points,
  photo,
  photoAlt,
  thought,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  points: { icon: React.ComponentType<{ className?: string }>; title: string; body: string }[];
  photo: string;
  photoAlt: string;
  thought: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-[28px] border border-fuchsia-400/45 bg-[linear-gradient(180deg,rgba(76,29,149,0.55),rgba(24,8,40,0.88))] p-4 shadow-[0_0_48px_rgba(192,38,211,0.28)] sm:p-5">
      <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="relative mb-4 flex items-start gap-3">
        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-700/40">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-sm text-violet-100/80">{subtitle}</p>
        </div>
      </div>

      <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(150px,0.85fr)] lg:items-stretch">
        <PainList items={points} />
        <div className="relative min-h-[210px] overflow-hidden rounded-2xl">
          <img src={photo} alt={photoAlt} className="absolute inset-0 h-full w-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b2e] via-[#1a0b2e]/25 to-transparent lg:bg-gradient-to-r lg:from-[#2a1244] lg:via-[#2a1244]/55 lg:to-transparent" />
          <p
            className="relative max-w-[180px] px-3 pt-3 text-[15px] leading-snug text-white"
            style={{ fontFamily: '"Segoe Script", "Bradley Hand", "Comic Sans MS", cursive' }}
          >
            {thought}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function ProblemSection() {
  return (
    <section className="relative overflow-hidden bg-[#100818] py-16 sm:py-20" aria-labelledby="problem-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.38),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(ellipse_at_bottom,rgba(192,38,211,0.22),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <FadeIn inView className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-4 flex items-center justify-center gap-3 text-[11px] font-bold tracking-[0.22em] text-fuchsia-200/90">
            <span className="h-px w-10 bg-fuchsia-400/70" />
            THE PROBLEM WE&apos;RE SOLVING
            <span className="h-px w-10 bg-fuchsia-400/70" />
          </p>
          <h2 id="problem-heading" className="vb-heading vb-heading-md !text-white">
            Great Businesses. Talented Creators.
            <br />
            <span className="vb-heading-highlight">A Broken Connection.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-violet-100/80 sm:text-base">
            India has amazing businesses and incredibly talented creators, but connecting them for fair, transparent and
            successful collaborations is still harder than it should be.
          </p>
        </FadeIn>

        <div className="relative">
          <div className="grid items-stretch gap-4 lg:grid-cols-2 lg:gap-8">
            <SideCard
              icon={Store}
              title="For Businesses"
              subtitle="Finding the right creators shouldn't be complicated."
              points={BUSINESS_POINTS}
              photo={BUSINESS_PHOTO}
              photoAlt="Business owner working on a laptop"
              thought="I want to grow my business, but finding creators is so complicated..."
            />
            <div className="flex justify-center lg:hidden" aria-hidden="true">
              <BrokenChain />
            </div>
            <SideCard
              icon={UserRound}
              title="For Creators"
              subtitle="Your creativity deserves more than likes."
              points={CREATOR_POINTS}
              photo={CREATOR_PHOTO}
              photoAlt="Creator looking for paid opportunities"
              thought="I create content every day, but where are the paid opportunities?"
            />
          </div>
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <BrokenChain />
          </div>
        </div>

        <FadeIn inView delay={0.08} className="relative mt-6 overflow-hidden rounded-[28px] border border-fuchsia-400/40 bg-[linear-gradient(90deg,rgba(46,16,84,0.95),rgba(88,28,135,0.72),rgba(46,16,84,0.95))] px-6 py-8 text-center shadow-[0_0_40px_rgba(192,38,211,0.25)] sm:mt-8">
          <span className="pointer-events-none absolute -left-6 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-fuchsia-500/50 blur-2xl" />
          <span className="pointer-events-none absolute -right-6 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-violet-500/50 blur-2xl" />
          <p className="text-[11px] font-bold tracking-[0.22em] text-fuchsia-100/80">THAT&apos;S WHY WE&apos;RE BUILDING</p>
          <p className="vb-heading mt-2 text-3xl text-white sm:text-4xl">
            Viral<span className="vb-heading-highlight">Bridge</span>
            <sup className="ml-0.5 text-xs font-semibold text-fuchsia-200">TM</sup>
          </p>
          <p className="mt-2 text-sm text-violet-100/85 sm:text-base">
            One platform. Better connections. Clearer collaborations. More opportunities.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
