'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Star,
  MapPin,
  Users,
  TrendingUp,
  Phone,
  Globe,
  CheckCircle,
  Zap,
  BarChart3,
  Target,
  Sparkles,
  Building2,
  ShoppingBag,
  Briefcase,
  Award,
} from 'lucide-react';
import { buildAdminLoginUrl, buildBrandListingLoginUrl } from '@/src/lib/auth/sso';
import SectionHeading from '@/src/components/SectionHeading';
import FadeIn from '@/src/components/animations/FadeIn';
import HeroBannerVisual from './HeroBannerVisual';
import ProblemSection from './ProblemSection';
import Reveal from '@/src/components/animations/Reveal';
import { StaggerContainer, StaggerItem } from '@/src/components/animations/Stagger';

const STATS = [
  { value: '1M+', label: 'Businesses on Platform', icon: Building2 },
  { value: '500K+', label: 'Creators & Influencers', icon: Users },
  { value: '100+', label: 'Categories', icon: Target },
  { value: 'Pan India', label: 'Growing Together', icon: Globe },
];

const SHOWCASE_CREATORS = [
  {
    name: 'Priya Sharma',
    niche: 'Food',
    location: 'Jaipur',
    followers: '198K',
    engagement: '8.1%',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Marcus Reid',
    niche: 'Fitness',
    location: 'Delhi',
    followers: '512K',
    engagement: '4.2%',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Sofia Chen',
    niche: 'Beauty',
    location: 'Mumbai',
    followers: '284K',
    engagement: '6.3%',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Rohan Mehta',
    niche: 'Travel',
    location: 'Bangalore',
    followers: '158K',
    engagement: '5.1%',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
];

const BREW_HOUSE_PHOTOS = [
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=240&q=80',
];

const PROMOTE_OPTIONS = ['More Store Visits', 'More Leads', 'More Sales', 'More Followers', 'More Reviews', 'Brand Awareness'];

const TESTIMONIALS = [
  { name: 'Ananya Verma', role: 'Restaurant Owner', location: 'Jaipur', initials: 'AV', gradient: 'from-violet-500 to-purple-700', quote: 'ViralBridge helped us get more visibility and connect with the right creators. Our footfall increased by 40% in just two months. It\'s been a game changer for our café.', rating: 5 },
  { name: 'Rohit Singh', role: 'Content Creator', location: 'Delhi', initials: 'RS', gradient: 'from-rose-400 to-pink-600', quote: 'I found my first great brand collaboration through ViralBridge. The AI matching is genuinely impressive — it connected me with brands that actually fit my audience.', rating: 5 },
  { name: 'Neha Kapoor', role: 'Boutique Owner', location: 'Mumbai', initials: 'NK', gradient: 'from-amber-400 to-orange-500', quote: 'The platform helped us reach the right audience and work with local creators. We\'ve seen a 3x increase in online inquiries since listing on ViralBridge.', rating: 5 },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'List Your Business', desc: 'Create your free profile in minutes. Add your products, services, and contact details.', icon: Building2 },
  { step: '02', title: 'Get Discovered', desc: 'Reach customers and opportunities. Your business appears in relevant searches.', icon: Globe },
  { step: '03', title: 'Find Creators', desc: 'AI matches you with the right creators based on your niche, location and goals.', icon: Sparkles },
  { step: '04', title: 'Launch Campaign', desc: 'Create and manage campaigns with ease. Set goals, budgets and timelines.', icon: Zap },
  { step: '05', title: 'Measure Results', desc: 'Track performance and ROI in real-time with our analytics dashboard.', icon: BarChart3 },
  { step: '06', title: 'Grow Your Business', desc: 'More customers. More sales. More growth. Repeat the cycle.', icon: TrendingUp },
];

function useCounter(target: string, duration = 1800) {
  const [count, setCount] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const numericMatch = target.match(/[\d.]+/);
    if (!numericMatch) {
      setCount(target);
      return;
    }
    const numeric = parseFloat(numericMatch[0]);
    const suffix = target.replace(numericMatch[0], '');
    const isFloat = target.includes('.');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * numeric;
            setCount((isFloat ? current.toFixed(1) : Math.floor(current).toString()) + suffix);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatItem({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  const { count, ref } = useCounter(value);
  return (
    <div ref={ref} className="flex flex-col items-center text-center px-6 py-6">
      <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center mb-3">
        {Icon && <Icon className="w-5 h-5 text-violet-600" />}
      </div>
      <div className="text-3xl font-bold text-slate-900 tabular-nums">{count}</div>
      <div className="text-sm text-slate-500 mt-1 font-medium">{label}</div>
    </div>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.5 3.5A11 11 0 0 0 2.1 17.8L1 23l5.4-1.1A11 11 0 0 0 20.5 3.5zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.2.7.7-3.1-.2-.3A9.1 9.1 0 1 1 12 20.5zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.5 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.6-.3z" />
    </svg>
  );
}

export default function HomePageClient() {
  const [promoOption, setPromoOption] = useState<string | null>(null);

  const listUrl = buildBrandListingLoginUrl();
  const creatorJoinUrl = buildAdminLoginUrl('/explore/creators-v2');
  const launchCampaignUrl = buildAdminLoginUrl('/brand-campaign-management');
  const growBusinessUrl = buildAdminLoginUrl('/grow-business');

  return (
    <div className="bg-white font-sans overflow-x-hidden">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-violet-50/40 to-white pt-12 pb-0 lg:pt-16">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl pointer-events-none animate-float-slow" />
        <div className="absolute top-1/2 -left-20 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none animate-float-delay" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10 pb-12 lg:pb-20">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 border border-violet-200 mb-6">
                  <Sparkles className="w-4 h-4 text-violet-600" />
                  <span className="text-sm font-semibold text-violet-700">India&apos;s #1 Business + Creator Platform</span>
                </div>
              </FadeIn>

              <FadeIn delay={0.08}>
                <h1 className="vb-heading vb-heading-lg mb-6">
                  <span>Get Discovered.</span>
                  <br />
                  <span className="vb-heading-accent">Grow Your Business.</span>
                  <br />
                  <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent">
                    Go Viral.
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.16}>
                <p className="vb-lede mb-3">
                  ViralBridge connects businesses with customers, creators and growth opportunities — all in one platform.
                </p>
                <p className="vb-lede mb-8">
                  List your business for free, get discovered by customers, and when you&apos;re ready to grow, launch campaigns
                  with relevant creators.
                </p>
              </FadeIn>

              <FadeIn delay={0.24}>
                <div className="flex flex-wrap gap-3 mb-8">
                  <a
                    href={listUrl}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Get Listed Free <ArrowRight className="w-4 h-4" />
                  </a>
                  <Link
                    href="/explore/creators-v2"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-violet-200 text-violet-700 font-semibold hover:bg-violet-50 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Find Creators
                  </Link>
                </div>

                <div className="flex flex-wrap gap-3">
                  {['Free business listing', 'AI-powered creator matching', 'Campaign analytics'].map((t) => (
                    <div key={t} className="flex items-center gap-1.5 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-violet-500 flex-shrink-0" />
                      {t}
                    </div>
                  ))}
                </div>
              </FadeIn>

            </div>

            <FadeIn delay={0.18} scale className="relative">
              <HeroBannerVisual launchCampaignUrl={launchCampaignUrl} />
            </FadeIn>
          </div>
        </div>
      </section>

      <Reveal as="section" className="bg-gradient-to-r from-violet-50 via-purple-50 to-violet-50 border-y border-violet-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-violet-100">
            {STATS.map((s, i) => (
              <StaggerItem key={s.label} index={i}>
                <StatItem {...s} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Reveal>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            className="mb-12"
            eyebrow="One Platform. Two Powerful Networks."
            title="Businesses & Creators."
            accent={
              <>
                Built for <span className="vb-heading-highlight">Growth.</span>
              </>
            }
            description="Whether you're a business looking for more customers or a creator looking for opportunities — ViralBridge is your growth partner."
          />

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            <StaggerItem>
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 p-8 text-white hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Business Network</h3>
                <p className="text-violet-200 mb-6">List your business. Get discovered. Grow.</p>
                <ul className="space-y-2.5 mb-8">
                  {['Free business listing', 'Get found by customers & creators', 'Showcase your products/services', 'Launch creator campaigns'].map(
                    (b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-violet-100">
                        <CheckCircle className="w-4 h-4 text-violet-300 flex-shrink-0" /> {b}
                      </li>
                    ),
                  )}
                </ul>
                <a
                  href={listUrl}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-violet-700 font-bold text-sm hover:bg-violet-50 transition-colors"
                >
                  List Your Business Free <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            </StaggerItem>

            <StaggerItem index={1}>
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-fuchsia-500 via-pink-600 to-rose-600 p-8 text-white hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Creator Network</h3>
                <p className="text-pink-100 mb-6">Showcase your skills. Find campaigns. Earn.</p>
                <ul className="space-y-2.5 mb-8">
                  {['Create your profile', 'Discover brand opportunities', 'Work with verified businesses', 'Get paid for your content'].map(
                    (b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-pink-100">
                        <CheckCircle className="w-4 h-4 text-pink-200 flex-shrink-0" /> {b}
                      </li>
                    ),
                  )}
                </ul>
                <a
                  href={creatorJoinUrl}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-pink-600 font-bold text-sm hover:bg-pink-50 transition-colors"
                >
                  Join as Creator <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-50 to-violet-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                align="left"
                className="mb-8"
                eyebrow="Free Business Listing"
                title="Your business deserves"
                accent={
                  <>
                    to be <span className="vb-heading-highlight">discovered.</span>
                  </>
                }
                description="Create your free ViralBridge business profile and put your business in front of customers, creators and potential opportunities."
              />
              <a
                href={listUrl}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-bold shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:-translate-y-0.5 transition-all"
              >
                Get Listed Free <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-xs text-slate-400 mt-3">No credit card required.</p>
            </div>

            <FadeIn delay={0.12} scale className="relative">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
                <article className="min-w-0 flex-1 rounded-[28px] border border-white bg-white p-4 shadow-[0_24px_50px_-28px_rgba(91,33,182,0.55)]">
                  <div className="mb-2 flex justify-end">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-600">
                      <CheckCircle className="h-3.5 w-3.5" /> Verified Business
                    </span>
                  </div>
                  <div className="mb-3 flex min-w-0 gap-3">
                    <img
                      src={BREW_HOUSE_PHOTOS[0]}
                      alt="Coffee at The Brew House Café"
                      className="h-16 w-16 flex-shrink-0 rounded-2xl object-cover"
                    />
                    <div className="min-w-0">
                      <h3 className="truncate text-[15px] font-bold text-slate-900">The Brew House Café</h3>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="h-3 w-3" /> Jaipur • Café &amp; Restaurant
                      </p>
                      <p className="mt-1 flex flex-wrap items-center gap-1 text-xs text-slate-600">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-slate-800">4.7</span>
                        <span className="text-slate-400">(2.2k)</span>
                        <span className="text-slate-400">• Café &amp; Restaurant</span>
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 grid grid-cols-3 gap-2">
                    <span className="inline-flex items-center justify-center gap-1 rounded-full bg-violet-50 py-1.5 text-[11px] font-semibold text-violet-700">
                      <Phone className="h-3.5 w-3.5" /> Call
                    </span>
                    <span className="inline-flex items-center justify-center gap-1 rounded-full bg-emerald-50 py-1.5 text-[11px] font-semibold text-emerald-600">
                      <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp
                    </span>
                    <span className="inline-flex items-center justify-center gap-1 rounded-full bg-slate-50 py-1.5 text-[11px] font-semibold text-slate-500">
                      <Globe className="h-3.5 w-3.5" /> Website
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {BREW_HOUSE_PHOTOS.map((src, index) => (
                      <img
                        key={src}
                        src={src}
                        alt={index === 0 ? 'Brew House coffee' : index === 1 ? 'Brew House breakfast' : 'Brew House dinner'}
                        className="h-[72px] w-full rounded-xl object-cover"
                      />
                    ))}
                  </div>
                </article>

                <article className="w-full flex-shrink-0 rounded-[28px] border border-violet-100 bg-[#F6F3FF] p-4 sm:w-[240px]">
                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-violet-500" />
                    <h3 className="text-sm font-bold text-slate-900">Promote My Business</h3>
                  </div>
                  <p className="mb-3 text-xs text-slate-500">What do you want to achieve?</p>
                  <div className="space-y-2">
                    {PROMOTE_OPTIONS.map((opt) => {
                      const selected = promoOption === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setPromoOption(opt)}
                          className="flex w-full items-center gap-2 text-left text-[13px] text-slate-700"
                        >
                          <span
                            className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border ${
                              selected ? 'border-violet-600 bg-violet-600' : 'border-violet-300 bg-white'
                            }`}
                          >
                            {selected ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  <a
                    href={growBusinessUrl}
                    className="mt-4 block rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-2.5 text-center text-sm font-bold text-white"
                  >
                    Get AI Recommendation
                  </a>
                </article>

                <div
                  className="hidden w-[92px] flex-shrink-0 flex-col justify-center text-[18px] leading-tight text-violet-500 xl:flex"
                  style={{ fontFamily: '"Segoe Script", "Bradley Hand", "Comic Sans MS", cursive' }}
                >
                  Turn Visitors into Customers
                  <svg viewBox="0 0 48 36" className="mt-1 h-8 w-10 text-violet-400" fill="none" aria-hidden="true">
                    <path d="M40 6 C28 8, 16 16, 10 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M4 22 L10 30 L18 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <p
                className="mt-3 text-right text-lg leading-tight text-violet-500 xl:hidden"
                style={{ fontFamily: '"Segoe Script", "Bradley Hand", "Comic Sans MS", cursive' }}
              >
                Turn Visitors into Customers
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <ProblemSection />

      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            className="mb-12"
            eyebrow="Simple. Smart. Effective."
            title="How ViralBridge"
            accent={<span className="vb-heading-highlight">works.</span>}
            description="From listing to measurable growth — in just a few steps."
          />

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HOW_IT_WORKS.map((step, i) => (
              <StaggerItem key={step.step} index={i}>
                <article className="group h-full bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 border border-violet-200 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-violet-600" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-violet-600 bg-violet-50 border border-violet-100 px-2.5 py-1 rounded-full">
                      Step {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-50 to-violet-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <SectionHeading
              align="left"
              className="min-w-0 flex-1"
              eyebrow="Thousands of Creators. Endless Possibilities."
              title="Find the Perfect Creators"
              accent={
                <>
                  for Your <span className="vb-heading-highlight">Business</span>
                </>
              }
              description="Access verified creators across categories, locations and audience types."
            />
            <Link
              href="/explore/creators-v2"
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl border-2 border-violet-200 text-violet-700 font-semibold hover:bg-violet-50 transition-colors shrink-0 self-start sm:self-end"
            >
              Browse Creators <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> Top Creators
            </span>
            <span className="text-sm text-slate-500">Highest-performing creators on ViralBridge</span>
          </div>

          <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SHOWCASE_CREATORS.map((creator, i) => (
              <StaggerItem key={creator.name} index={i}>
                <Link
                  href="/explore/creators-v2"
                  className="flex h-full items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <img
                    src={creator.avatar}
                    alt=""
                    className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-slate-900">{creator.name}</div>
                    <div className="text-xs font-medium text-violet-500">
                      {creator.niche} <span className="text-violet-300">|</span> {creator.location}
                    </div>
                    <div className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-slate-700">
                      <InstagramIcon className="h-3.5 w-3.5 text-pink-500" />
                      {creator.followers}
                    </div>
                    <div className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400">
                      <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-slate-300">
                        <span className="h-1 w-1 rounded-full bg-slate-400" />
                      </span>
                      {creator.engagement} engagement
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <SectionHeading
              align="left"
              className="min-w-0 flex-1"
              eyebrow="Built for every kind of business"
              title="Explore Businesses"
              accent={
                <>
                  Across <span className="vb-heading-highlight">Categories</span>
                </>
              }
            />
            <Link
              href="/discover/category"
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl border-2 border-violet-200 text-violet-700 font-semibold hover:bg-violet-50 transition-colors shrink-0 self-start sm:self-end"
            >
              View All Categories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            <StaggerItem>
            <Link
              href="/discover"
              className="group rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 block h-full"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-5">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Local Businesses</h3>
              <p className="text-sm text-slate-500 mb-5">Discover and connect with local businesses in your city.</p>
              <ul className="space-y-2">
                {['Restaurants & Cafes', 'Retailers & Boutiques', 'Salons & Gyms', 'Real Estate & More', 'Clinics & Hospitals', 'Hotels & Travel'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" /> {item}
                    </li>
                  ),
                )}
              </ul>
            </Link>
            </StaggerItem>

            <StaggerItem index={1}>
            <Link
              href="/business"
              className="group rounded-3xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 block h-full"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center mb-5">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">D2C / Brands &amp; Startups</h3>
              <p className="text-sm text-slate-500 mb-5">Fast-growing brands and startups looking for creator partnerships.</p>
              <ul className="space-y-2">
                {['D2C Brands', 'Consumer Brands', 'E-commerce', 'SaaS & Apps', 'Startups', 'And More'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </Link>
            </StaggerItem>

            <StaggerItem index={2}>
            <Link
              href="/pricing"
              className="group rounded-3xl bg-gradient-to-br from-slate-50 to-indigo-50 border border-slate-200 p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 block h-full"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-indigo-800 flex items-center justify-center mb-5">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Enterprise</h3>
              <p className="text-sm text-slate-500 mb-5">Large-scale campaigns for enterprise brands and organizations.</p>
              <ul className="space-y-2">
                {['Large Brands', 'Agencies', 'Media & Entertainment', 'Education', 'Government / Public Awareness', 'And More'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" /> {item}
                    </li>
                  ),
                )}
              </ul>
            </Link>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-violet-50/50 to-pink-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            className="mb-12"
            title="Loved by"
            accent={
              <>
                Businesses & <span className="vb-heading-highlight">Creators</span>
              </>
            }
            description="Real people. Real success stories."
          />

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <StaggerItem key={t.name} index={i}>
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 h-full">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                    <div className="text-xs text-slate-500">
                      {t.role} • {t.location}
                    </div>
                  </div>
                </div>
              </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-700 to-pink-600" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-300 rounded-full blur-3xl animate-float" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn inView>
            <img
              src="/viralbridge_logo_footer.png"
              alt="ViralBridge"
              className="mx-auto mb-6 h-24 w-auto sm:h-28"
            />
          </FadeIn>
          <SectionHeading
            className="mb-10"
            tone="light"
            title="Your next customer could be"
            accent={<span className="vb-heading-highlight">one click away.</span>}
            description="Get your business discovered, connect with the right creators, and grow with ViralBridge."
            descriptionClassName="!text-black"
          />
          <FadeIn inView delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={listUrl}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-violet-700 font-bold text-base hover:bg-violet-50 hover:-translate-y-0.5 transition-all shadow-xl"
            >
              Get Listed Free <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href={creatorJoinUrl}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/40 text-white font-bold text-base hover:bg-white/10 hover:-translate-y-0.5 transition-all"
            >
              Join as Creator
            </a>
          </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
