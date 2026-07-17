'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { ArrowRight, Target, BarChart3, Shield, Zap, TrendingUp, CheckCircle, Users, DollarSign } from 'lucide-react';

const steps = [
{ num: '01', title: 'Create your brand profile', desc: 'Set up your brand page with logo, description, industry, and target audience. This is what creators see when they review your campaigns.' },
{ num: '02', title: 'Fund your wallet', desc: 'Add budget to your ViralBridge wallet. Funds are held in escrow per campaign — you\'re never charged until a creator delivers.' },
{ num: '03', title: 'Launch a campaign', desc: 'Define your brief, budget, deliverables, and timeline. Our AI immediately starts matching creators to your campaign.' },
{ num: '04', title: 'Review AI-matched creators', desc: 'Get a curated list of creators with match scores, audience analytics, trust signals, and ROI history.' },
{ num: '05', title: 'Approve deliverables', desc: 'Review submitted content. Request revisions or approve. Payment releases automatically on approval.' },
{ num: '06', title: 'Measure ROI', desc: 'Track reach, engagement, conversions, and cost-per-result in your analytics dashboard.' }];


const features = [
{ icon: Zap, title: 'AI-powered matching', desc: 'Our model analyzes 40+ signals to surface creators whose audience genuinely aligns with your target customer — not just follower count.' },
{ icon: Shield, title: 'Escrow protection', desc: 'Budget is locked until you approve deliverables. No more chasing creators or paying for undelivered work.' },
{ icon: BarChart3, title: 'Real-time analytics', desc: 'Track campaign performance as it happens. See reach, engagement, and conversion data in one dashboard.' },
{ icon: Target, title: 'Brand safety scoring', desc: 'Every creator has a Brand Safety Score based on content history. Filter out risky partnerships before they happen.' }];


const budgetTiers = [
{ tier: 'Starter', budget: '₹10,000–₹50,000', creators: '2–5 micro creators', reach: '50K–200K', best: 'Product launches, awareness' },
{ tier: 'Growth', budget: '₹50,000–₹2,00,000', creators: '5–15 mid-tier creators', reach: '500K–2M', best: 'D2C brands, seasonal campaigns' },
{ tier: 'Scale', budget: '₹2,00,000+', creators: '15+ creators, mix of tiers', reach: '5M+', best: 'Enterprise, national campaigns' }];


export default function BrandGuidePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <main className="pt-16">
      {/* Hero Banner with Image */}
      <section className="relative overflow-hidden bg-slate-900 min-h-[480px] flex items-center">
        <Image
          src="https://img.rocket.new/generatedImages/rocket_gen_img_1d62739b7-1772890793862.png"
          alt="Brand marketing team reviewing influencer campaign analytics on large screen in a modern office"
          fill
          className="object-cover opacity-20"
          priority />
        
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-violet-950/85 to-purple-900/80" />
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-violet-500/20 text-violet-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-violet-500/30">
                <Target className="w-3.5 h-3.5" /> Brand Guide
              </span>
              <h1 className="text-5xl font-bold leading-tight mb-6 text-white">
                Run creator campaigns that actually convert
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                From brief to ROI — the complete playbook for brands running influencer campaigns on ViralBridge.
              </p>
              <Link href="/sign-up-login-screen" className="inline-flex items-center gap-2 bg-violet-500 hover:bg-violet-400 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                Start your first campaign <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
              { icon: TrendingUp, label: 'Average campaign ROI', value: '3.4x', color: 'border-violet-500/30 bg-violet-500/10' },
              { icon: Users, label: 'Verified creators', value: '12K+', color: 'border-rose-500/30 bg-rose-500/10' },
              { icon: DollarSign, label: 'Cost per engagement', value: '₹0.18', color: 'border-amber-500/30 bg-amber-500/10' },
              { icon: CheckCircle, label: 'Campaign success rate', value: '94%', color: 'border-green-500/30 bg-green-500/10' }]?.
              map((s) =>
              <div key={s?.label} className={`rounded-2xl p-5 border ${s?.color}`}>
                  <s.icon className="w-6 h-6 text-white/60 mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{s?.value}</div>
                  <div className="text-xs text-slate-400">{s?.label}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">How it works for brands</h2>
          <p className="text-slate-500 mb-12">From campaign creation to ROI measurement in 6 steps.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps?.map((step, i) =>
            <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 relative overflow-hidden">
                <span className="absolute top-4 right-4 text-5xl font-bold text-slate-100 font-mono leading-none">{step?.num}</span>
                <div className="relative">
                  <h3 className="font-bold text-slate-900 mb-3">{step?.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step?.desc}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Features with supporting image */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Why brands choose ViralBridge</h2>
              <p className="text-slate-500 mb-10">The tools that separate us from every other influencer platform.</p>
              <div className="grid gap-5">
                {features?.map((f) =>
                <div key={f?.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex gap-5">
                    <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <f.icon className="w-6 h-6 text-violet-700" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-2">{f?.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{f?.desc}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="lg:col-span-2 sticky top-24">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_191da7f1a-1772725678653.png"
                  alt="Brand marketing analytics dashboard showing campaign ROI, reach metrics, and creator performance data"
                  width={700}
                  height={500}
                  className="w-full h-80 object-cover" />
                
                <div className="bg-white p-5 border border-slate-100 border-t-0 rounded-b-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">3.4x average ROI</div>
                      <div className="text-xs text-slate-500">Across 3,400+ campaigns</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Budget Tiers */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Budget planning guide</h2>
          <p className="text-slate-500 mb-12">What to expect at different investment levels.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {budgetTiers?.map((t, i) =>
            <div key={t?.tier} className={`rounded-2xl p-7 border ${i === 1 ? 'border-violet-300 bg-violet-50 shadow-lg shadow-violet-100' : 'border-slate-100 bg-slate-50'}`}>
                {i === 1 && <span className="inline-block bg-violet-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">Most Popular</span>}
                <h3 className="text-xl font-bold text-slate-900 mb-1">{t?.tier}</h3>
                <div className="text-violet-700 font-bold text-lg mb-4">{t?.budget}</div>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />{t?.creators}</div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />Est. reach: {t?.reach}</div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />Best for: {t?.best}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-20 bg-violet-700 text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Target className="w-12 h-12 mx-auto mb-4 text-violet-200" />
          <h2 className="text-4xl font-bold mb-4">Ready to launch?</h2>
          <p className="text-violet-200 text-lg mb-8">Join 3,400+ brands already running campaigns on ViralBridge.</p>
          <Link href="/sign-up-login-screen" className="inline-flex items-center gap-2 bg-white text-violet-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-violet-50 transition-colors">
            Create your brand account <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
      </main>
      <Footer />
    </div>);

}