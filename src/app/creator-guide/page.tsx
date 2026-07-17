'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { ArrowRight, CheckCircle, Star, TrendingUp, Shield, Zap, DollarSign, Users, Camera, ChevronDown } from 'lucide-react';

const steps = [
{ num: '01', title: 'Complete your profile', desc: 'Add your bio, social links, niche, and portfolio. A complete profile gets 4x more campaign invites.', tip: 'Pro tip: Upload at least 6 portfolio pieces to unlock "Featured Creator" status.' },
{ num: '02', title: 'Verify your account', desc: 'Complete KYC with your PAN card and bank details. This unlocks payments and builds brand trust.', tip: 'Verified creators earn 2.3x more on average than unverified ones.' },
{ num: '03', title: 'Discover campaigns', desc: 'Browse campaigns matched to your niche. Your AI Match % shows how well you fit each campaign.', tip: 'Apply within 24 hours of a campaign going live — early applicants have 60% higher approval rates.' },
{ num: '04', title: 'Apply & get selected', desc: 'Submit a personalized application. Brands review your profile, metrics, and past work.', tip: 'Mention your audience demographics and past campaign results in your application.' },
{ num: '05', title: 'Create & submit', desc: 'Deliver content per the campaign brief. Submit through the platform for brand review.', tip: 'Always read the brief twice. 80% of revision requests come from missed brief details.' },
{ num: '06', title: 'Get paid via escrow', desc: 'Once the brand approves, funds release from escrow to your wallet within 3 business days.', tip: 'Set up UPI for instant withdrawals — no minimum balance required.' }];


const metrics = [
{ label: 'Engagement Rate', desc: 'Likes + comments + shares ÷ followers × 100. Aim for 3%+ on Instagram, 5%+ on TikTok.', good: '> 3%', great: '> 6%' },
{ label: 'Audience Quality Score', desc: 'Percentage of real, active followers. Calculated from engagement patterns and follower behavior.', good: '> 80%', great: '> 90%' },
{ label: 'Brand Safety Score', desc: 'AI analysis of your content history for brand-safe language, topics, and associations.', good: '> 75', great: '> 90' },
{ label: 'Completion Rate', desc: 'Percentage of accepted campaigns you\'ve successfully completed. Brands filter by this.', good: '> 85%', great: '100%' }];


const niches = [
{ name: 'Beauty & Skincare', avgRate: '₹800–₹2,500/post', demand: 'Very High' },
{ name: 'Fitness & Wellness', avgRate: '₹600–₹2,000/post', demand: 'High' },
{ name: 'Food & Lifestyle', avgRate: '₹500–₹1,800/post', demand: 'High' },
{ name: 'Tech & Gadgets', avgRate: '₹1,000–₹4,000/post', demand: 'Medium' },
{ name: 'Finance & Investing', avgRate: '₹1,500–₹5,000/post', demand: 'Medium' },
{ name: 'Travel', avgRate: '₹800–₹3,000/post', demand: 'Seasonal' }];


export default function CreatorGuidePage() {
  const [openStep, setOpenStep] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <main className="pt-16">
      {/* Hero Banner with Image */}
      <section className="relative overflow-hidden bg-slate-900 min-h-[480px] flex items-center">
        <Image
          src="https://img.rocket.new/generatedImages/rocket_gen_img_165742d96-1772554686030.png"
          alt="Content creator filming a lifestyle video with professional camera and ring light in a stylish home studio"
          fill
          className="object-cover opacity-25"
          priority />
        
        <div className="absolute inset-0 bg-gradient-to-r from-rose-950/90 via-violet-950/80 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-rose-500/30">
                <Camera className="w-3.5 h-3.5" /> Creator Guide
              </span>
              <h1 className="text-5xl font-bold text-white leading-tight mb-6">
                Your complete guide to earning on ViralBridge
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                From profile setup to your first payout — everything you need to build a sustainable income as a creator.
              </p>
              <Link href="/sign-up-login-screen" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                Start your creator journey <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
              { icon: DollarSign, label: 'Avg monthly earnings', value: '₹48,200', color: 'border-green-500/30 bg-green-500/10 text-green-300' },
              { icon: Star, label: 'Campaign success rate', value: '94%', color: 'border-violet-500/30 bg-violet-500/10 text-violet-300' },
              { icon: Shield, label: 'Escrow protected', value: '100%', color: 'border-blue-500/30 bg-blue-500/10 text-blue-300' },
              { icon: TrendingUp, label: 'Creators growing YoY', value: '+340%', color: 'border-amber-500/30 bg-amber-500/10 text-amber-300' }]?.
              map((s) =>
              <div key={s?.label} className={`rounded-2xl p-5 border ${s?.color}`}>
                  <s.icon className="w-6 h-6 mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{s?.value}</div>
                  <div className="text-xs text-slate-400">{s?.label}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Steps */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">How it works</h2>
          <p className="text-slate-500 mb-10">Six steps from signup to your first payout.</p>
          <div className="space-y-3">
            {steps?.map((step, i) =>
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <button
                onClick={() => setOpenStep(openStep === i ? null : i)}
                className="w-full px-6 py-5 flex items-center gap-5 text-left hover:bg-slate-50 transition-colors">
                
                  <span className="text-2xl font-bold text-violet-200 font-mono w-10 flex-shrink-0">{step?.num}</span>
                  <span className="font-semibold text-slate-900 flex-1">{step?.title}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${openStep === i ? 'rotate-180' : ''}`} />
                </button>
                {openStep === i &&
              <div className="px-6 pb-6 border-t border-slate-100 pt-4">
                    <p className="text-slate-600 mb-4">{step?.desc}</p>
                    <div className="bg-violet-50 rounded-xl p-4 flex items-start gap-3">
                      <Zap className="w-4 h-4 text-violet-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-violet-700">{step?.tip}</p>
                    </div>
                  </div>
              }
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Metrics */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Metrics that matter</h2>
          <p className="text-slate-500 mb-10">Brands filter creators by these 4 scores. Here's what they mean and how to improve them.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {metrics?.map((m) =>
            <div key={m?.label} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2">{m?.label}</h3>
                <p className="text-sm text-slate-500 mb-4">{m?.desc}</p>
                <div className="flex gap-3">
                  <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                    <CheckCircle className="w-3 h-3" /> Good: {m?.good}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                    <Star className="w-3 h-3" /> Great: {m?.great}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Niche Rates with supporting image */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Rates by niche</h2>
              <p className="text-slate-500 mb-8">Average campaign rates on ViralBridge for mid-tier creators (10K–100K followers).</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {niches?.map((n) =>
                <div key={n?.name} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                    <h3 className="font-semibold text-slate-900 mb-1">{n?.name}</h3>
                    <div className="text-violet-700 font-bold text-lg mb-2">{n?.avgRate}</div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${n?.demand === 'Very High' ? 'bg-green-100 text-green-700' : n?.demand === 'High' ? 'bg-blue-100 text-blue-700' : n?.demand === 'Seasonal' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                      {n?.demand} demand
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="lg:col-span-1 sticky top-24">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_126166906-1764671250290.png"
                  alt="Beauty and lifestyle content creator applying makeup while filming a tutorial for brand collaboration"
                  width={600}
                  height={500}
                  className="w-full h-72 object-cover" />
                
                <div className="bg-white p-4 border border-slate-100 border-t-0 rounded-b-2xl">
                  <p className="text-sm font-semibold text-slate-900">Top earners in Beauty</p>
                  <p className="text-xs text-slate-500 mt-1">Avg ₹2,500/post · Very High demand</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-20 bg-violet-700 text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Users className="w-12 h-12 mx-auto mb-4 text-violet-200" />
          <h2 className="text-4xl font-bold mb-4">Ready to start earning?</h2>
          <p className="text-violet-200 text-lg mb-8">Join 12,000+ creators already building their income on ViralBridge.</p>
          <Link href="/sign-up-login-screen" className="inline-flex items-center gap-2 bg-white text-violet-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-violet-50 transition-colors">
            Create your free account <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
      </main>
      <Footer />
    </div>);


}