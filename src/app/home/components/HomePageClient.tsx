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
  MessageCircle,
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
  ChevronRight,
} from 'lucide-react';
import { buildAdminLoginUrl, buildBrandListingLoginUrl } from '@/src/lib/auth/sso';

const STATS = [
  { value: '1M+', label: 'Businesses on Platform', icon: Building2 },
  { value: '500K+', label: 'Creators & Influencers', icon: Users },
  { value: '100+', label: 'Categories', icon: Target },
  { value: 'Pan India', label: 'Growing Together', icon: Globe },
];

const CREATORS = [
  { id: 'cr-001', name: 'Priya Sharma', niche: 'Food', location: 'Jaipur', followers: '198K', engagement: '8.1%', platform: 'instagram', initials: 'PS', gradient: 'from-rose-400 to-pink-600', verified: true },
  { id: 'cr-002', name: 'Marcus Reid', niche: 'Fitness', location: 'Delhi', followers: '512K', engagement: '4.2%', platform: 'youtube', initials: 'MR', gradient: 'from-violet-500 to-purple-700', verified: true },
  { id: 'cr-003', name: 'Sofia Chen', niche: 'Beauty', location: 'Mumbai', followers: '284K', engagement: '6.1%', platform: 'instagram', initials: 'SC', gradient: 'from-amber-400 to-orange-500', verified: true },
  { id: 'cr-004', name: 'Rohan Mehta', niche: 'Travel', location: 'Bangalore', followers: '143K', engagement: '5.7%', platform: 'youtube', initials: 'RM', gradient: 'from-teal-400 to-cyan-600', verified: false },
  { id: 'cr-005', name: 'Ananya Kapoor', niche: 'Fashion', location: 'Hyderabad', followers: '321K', engagement: '7.3%', platform: 'instagram', initials: 'AK', gradient: 'from-fuchsia-500 to-pink-600', verified: true },
  { id: 'cr-006', name: 'Vikram Nair', niche: 'Tech', location: 'Pune', followers: '89K', engagement: '9.2%', platform: 'youtube', initials: 'VN', gradient: 'from-blue-500 to-indigo-600', verified: false },
];

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

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
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
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-20 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10 pb-12 lg:pb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 border border-violet-200 mb-6">
                <Sparkles className="w-4 h-4 text-violet-600" />
                <span className="text-sm font-semibold text-violet-700">India&apos;s #1 Business + Creator Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
                <span className="text-slate-900">Get Discovered.</span>
                <br />
                <span className="text-violet-700">Grow Your Business.</span>
                <br />
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent">
                  Go Viral.
                </span>
              </h1>

              <p className="text-lg text-slate-600 mb-3 leading-relaxed max-w-lg">
                ViralBridge connects businesses with customers, creators and growth opportunities — all in one platform.
              </p>
              <p className="text-base text-slate-500 mb-8 leading-relaxed max-w-lg">
                List your business for free, get discovered by customers, and when you&apos;re ready to grow, launch campaigns
                with relevant creators.
              </p>

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

              <div className="hidden lg:flex items-center gap-2 mt-10 text-slate-400">
                <svg width="40" height="30" viewBox="0 0 40 30" fill="none" className="text-violet-300">
                  <path d="M2 28 C10 10, 30 5, 38 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M34 2 L38 2 L38 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <div className="text-xs font-medium text-slate-400 leading-tight">
                  Real People
                  <br />
                  Real Impact
                </div>
              </div>
            </div>

            <div className="relative lg:h-[580px] flex items-end justify-center pb-0">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-100/60 via-transparent to-pink-100/40 rounded-3xl" />

              <div className="absolute top-4 left-0 lg:left-4 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-20 animate-float">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    SC
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-slate-900 text-sm">Sharma Café</span>
                      <CheckCircle className="w-3.5 h-3.5 text-violet-500 flex-shrink-0" />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="w-3 h-3" /> Jaipur
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-semibold text-slate-700">4.7</span>
                      <span className="text-xs text-slate-400">• Café & Restaurant</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {['#cafe1', '#cafe2', '#cafe3'].map((k, i) => (
                    <div
                      key={k}
                      className={`flex-1 h-14 rounded-lg bg-gradient-to-br ${
                        i === 0 ? 'from-amber-200 to-orange-300' : i === 1 ? 'from-rose-200 to-pink-300' : 'from-violet-200 to-purple-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-1.5">
                  <span className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-violet-50 text-violet-700 text-xs font-medium border border-violet-100">
                    <Phone className="w-3 h-3" /> Call
                  </span>
                  <span className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-medium border border-green-100">
                    <MessageCircle className="w-3 h-3" /> WhatsApp
                  </span>
                  <span className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-xs font-medium border border-slate-100">
                    <Globe className="w-3 h-3" /> Web
                  </span>
                </div>
                <div className="mt-2 text-center">
                  <span className="text-xs text-slate-400">2.8k followers</span>
                </div>
              </div>

              <div className="absolute top-8 right-0 lg:right-0 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-20 animate-float-delay">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800">Recommended Creators</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 font-semibold">AI Match 96%</span>
                </div>
                {[
                  { name: 'Priya Sharma', niche: 'Food', followers: '198K', match: '96%', initials: 'PS', g: 'from-rose-400 to-pink-600' },
                  { name: 'Marcus Reid', niche: 'Fitness', followers: '512K', match: '92%', initials: 'MR', g: 'from-violet-500 to-purple-700' },
                  { name: 'Sofia Chen', niche: 'Beauty', followers: '284K', match: '91%', initials: 'SC', g: 'from-amber-400 to-orange-500' },
                ].map((c) => (
                  <div key={c.name} className="flex items-center gap-2 py-1.5 border-b border-slate-50 last:border-0">
                    <div
                      className={`w-7 h-7 rounded-full bg-gradient-to-br ${c.g} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                    >
                      {c.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-800 truncate">{c.name}</div>
                      <div className="text-xs text-slate-400">
                        {c.niche} • {c.followers}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-violet-600">{c.match}</span>
                  </div>
                ))}
                <a
                  href={launchCampaignUrl}
                  className="w-full mt-3 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-700 text-white text-xs font-bold block text-center"
                >
                  Launch Campaign
                </a>
              </div>

              <div className="absolute bottom-24 left-8 lg:left-12 bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-3 z-30 flex items-center gap-3 animate-float-fast">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Potential Growth</div>
                  <div className="text-sm font-bold text-emerald-600">+32% This Month</div>
                </div>
              </div>

              <div className="absolute bottom-16 right-4 lg:right-8 bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-3 z-30 flex items-center gap-3 animate-float-slow">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
                  AK
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Ananya Kapoor</div>
                  <div className="text-xs text-slate-400">321K • Fashion</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <InstagramIcon className="w-3 h-3 text-pink-500" />
                    <span className="text-xs text-slate-400">7.3% engagement</span>
                  </div>
                </div>
              </div>

              <div className="w-full h-[340px] lg:h-[480px] rounded-3xl bg-gradient-to-br from-violet-100 via-purple-50 to-pink-50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-violet-400 rounded-full blur-2xl" />
                  <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-pink-400 rounded-full blur-2xl" />
                </div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-violet-800">ViralBridge</div>
                  <div className="text-sm text-violet-500 mt-1">Business + Creator Network</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-violet-50 via-purple-50 to-violet-50 border-y border-violet-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-violet-100">
            {STATS.map((s) => (
              <StatItem key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-block text-xs font-bold tracking-widest text-violet-500 uppercase mb-3">
              One Platform. Two Powerful Networks.
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Businesses &amp; Creators.
              <br />
              <span className="text-violet-700">Built for Growth.</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Whether you&apos;re a business looking for more customers or a creator looking for opportunities — ViralBridge is
              your growth partner.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 p-8 text-white">
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

            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-fuchsia-500 via-pink-600 to-rose-600 p-8 text-white">
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
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-50 to-violet-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block text-xs font-bold tracking-widest text-violet-500 uppercase mb-4">
                Free Business Listing
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-5">
                Your business deserves
                <br />
                <span className="text-violet-700">to be discovered.</span>
              </h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Create your free ViralBridge business profile and put your business in front of customers, creators and
                potential opportunities.
              </p>
              <a
                href={listUrl}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-bold shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:-translate-y-0.5 transition-all"
              >
                Get Listed Free <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-xs text-slate-400 mt-3">No credit card required.</p>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5">
                <div className="h-32 rounded-xl bg-gradient-to-br from-amber-200 via-orange-200 to-rose-200 mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-800">The Brew House</div>
                    <div className="text-sm text-amber-600">Café & Restaurant</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-bold text-slate-900">The Brew House Café</div>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <MapPin className="w-3.5 h-3.5" /> Jaipur • Café &amp; Restaurant
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-bold text-amber-700">4.7</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {['from-amber-200 to-orange-300', 'from-rose-200 to-pink-300', 'from-violet-200 to-purple-300'].map((g) => (
                    <div key={g} className={`h-16 rounded-lg bg-gradient-to-br ${g}`} />
                  ))}
                </div>
                <div className="flex gap-2">
                  <span className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-violet-50 text-violet-700 text-sm font-medium border border-violet-100">
                    <Phone className="w-3.5 h-3.5" /> Call
                  </span>
                  <span className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-green-50 text-green-700 text-sm font-medium border border-green-100">
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </span>
                  <span className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-50 text-slate-600 text-sm font-medium border border-slate-100">
                    <Globe className="w-3.5 h-3.5" /> Website
                  </span>
                </div>
              </div>

              <div className="absolute -right-4 top-8 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-10">
                <div className="text-xs font-bold text-slate-800 mb-1">Promote My Business</div>
                <div className="text-xs text-slate-400 mb-3">What do you want to achieve?</div>
                <div className="grid grid-cols-2 gap-1.5 mb-3">
                  {['More Store Visits', 'More Leads', 'More Sales', 'More Followers', 'More Reviews', 'Brand Awareness'].map(
                    (opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setPromoOption(opt)}
                        className={`text-xs py-1.5 px-2 rounded-lg border transition-colors text-left ${
                          promoOption === opt
                            ? 'bg-violet-600 text-white border-violet-600'
                            : 'border-slate-200 text-slate-600 hover:border-violet-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ),
                  )}
                </div>
                <a
                  href={growBusinessUrl}
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-700 text-white text-xs font-bold block text-center"
                >
                  Get AI Recommendation
                </a>
              </div>

              <div className="absolute -bottom-4 left-4 flex items-center gap-2 bg-white rounded-xl shadow-md border border-slate-100 px-3 py-2">
                <TrendingUp className="w-4 h-4 text-violet-600" />
                <div className="text-xs font-semibold text-slate-700">Turn Visitors into Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-block text-xs font-bold tracking-widest text-violet-500 uppercase mb-3">
              Simple. Smart. Effective.
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">How it works</h2>
            <p className="text-slate-500 max-w-lg mx-auto">From listing to measurable growth — in just a few steps.</p>
          </div>

          <div className="hidden lg:grid grid-cols-6 gap-0 relative">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="relative flex flex-col items-center text-center px-3">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="absolute top-7 left-[calc(50%+28px)] right-0 h-px bg-gradient-to-r from-violet-200 to-violet-100 z-0">
                    <ChevronRight className="absolute -right-2 -top-2 w-4 h-4 text-violet-300" />
                  </div>
                )}
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 border border-violet-200 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-violet-600" />
                </div>
                <div className="text-xs font-bold text-violet-400 mb-1">{step.step}</div>
                <div className="text-sm font-bold text-slate-800 mb-1">{step.title}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{step.desc}</div>
              </div>
            ))}
          </div>

          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="flex gap-4 p-4 rounded-2xl bg-violet-50 border border-violet-100">
                <div className="w-12 h-12 rounded-xl bg-white border border-violet-200 flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-violet-400 mb-0.5">{step.step}</div>
                  <div className="text-sm font-bold text-slate-800 mb-1">{step.title}</div>
                  <div className="text-xs text-slate-500">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-50 to-violet-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-bold tracking-widest text-violet-500 uppercase mb-3">
                Thousands of Creators. Endless Possibilities.
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Find the Perfect Creators
                <br />
                for Your Business
              </h2>
              <p className="text-slate-500 mt-3 max-w-lg">Access verified creators across categories, locations and audience types.</p>
            </div>
            <Link
              href="/explore/creators-v2"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-violet-200 text-violet-700 font-semibold hover:bg-violet-50 transition-colors flex-shrink-0"
            >
              Browse Creators <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CREATORS.map((c) => (
              <Link
                key={c.id}
                href="/explore/creators-v2"
                className="group bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-white font-bold text-base flex-shrink-0`}
                  >
                    {c.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-sm">{c.name}</span>
                      {c.verified && <CheckCircle className="w-3.5 h-3.5 text-violet-500 flex-shrink-0" />}
                    </div>
                    <div className="text-xs text-slate-500">
                      {c.niche} • {c.location}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {c.platform === 'instagram' ? (
                      <InstagramIcon className="w-4 h-4 text-pink-500" />
                    ) : (
                      <YoutubeIcon className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <div className="text-base font-bold text-slate-900">{c.followers}</div>
                    <div className="text-xs text-slate-400">Followers</div>
                  </div>
                  <div className="bg-violet-50 rounded-xl p-3 text-center">
                    <div className="text-base font-bold text-violet-700">{c.engagement}</div>
                    <div className="text-xs text-slate-400">Engagement</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Explore Businesses
              <br />
              Across Categories
            </h2>
            <Link
              href="/discover/category"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-violet-200 text-violet-700 font-semibold hover:bg-violet-50 transition-colors flex-shrink-0"
            >
              View All Categories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/discover"
              className="group rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-7 hover:shadow-lg transition-all duration-200"
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

            <Link
              href="/business"
              className="group rounded-3xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 p-7 hover:shadow-lg transition-all duration-200"
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

            <Link
              href="/pricing"
              className="group rounded-3xl bg-gradient-to-br from-slate-50 to-indigo-50 border border-slate-200 p-7 hover:shadow-lg transition-all duration-200"
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
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-violet-50/50 to-pink-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Loved by Businesses &amp; Creators</h2>
            <p className="text-slate-500">Real people. Real success stories.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
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
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-700 to-pink-600" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-300 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-white/80 font-semibold">ViralBridge</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Your next customer could be
            <br />
            one click away.
          </h2>
          <p className="text-violet-200 text-lg mb-10 max-w-xl mx-auto">
            Get your business discovered, connect with the right creators, and grow with ViralBridge.
          </p>
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
        </div>
      </section>
    </div>
  );
}
