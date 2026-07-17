'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { Download, ExternalLink, Image as ImageIcon, FileText, Palette, ArrowRight, Mail } from 'lucide-react';

const assets = [
{ label: 'Logo Pack (SVG + PNG)', desc: 'Full color, white, and dark variants', icon: ImageIcon, tag: 'Logos' },
{ label: 'Brand Guidelines PDF', desc: 'Colors, typography, usage rules', icon: FileText, tag: 'Guidelines' },
{ label: 'Product Screenshots', desc: 'Dashboard, creator profile, campaign views', icon: ImageIcon, tag: 'Screenshots' },
{ label: 'Founder Headshots', desc: 'High-res photos of all 4 co-founders', icon: ImageIcon, tag: 'Photos' },
{ label: 'Company Fact Sheet', desc: 'Key stats, milestones, and company overview', icon: FileText, tag: 'Docs' },
{ label: 'Color Palette', desc: 'Hex codes, Pantone, and CMYK values', icon: Palette, tag: 'Brand' }];


const coverage = [
{ outlet: 'YourStory', headline: 'ViralBridge raises ₹12Cr seed to build AI-powered creator marketplace', date: 'June 2026' },
{ outlet: 'Inc42', headline: 'How ViralBridge is solving the trust problem in influencer marketing', date: 'May 2026' },
{ outlet: 'Economic Times', headline: 'Creator economy startup ViralBridge hits ₹48Cr GMV in first year', date: 'April 2026' },
{ outlet: 'Entrackr', headline: 'ViralBridge\'s escrow model is changing how creators get paid', date: 'March 2026' }];


const facts = [
{ label: 'Founded', value: '2025' },
{ label: 'Headquarters', value: 'Bengaluru, India' },
{ label: 'Creators on platform', value: '12,000+' },
{ label: 'Brand campaigns', value: '3,400+' },
{ label: 'Total creator earnings', value: '₹48Cr+' },
{ label: 'Campaign success rate', value: '94%' },
{ label: 'Funding raised', value: '₹12Cr (Seed)' },
{ label: 'Team size', value: '28 people' }];


export default function PressKitPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <main className="pt-16">
      {/* Hero Banner with Image */}
      <section className="relative bg-slate-900 overflow-hidden min-h-[420px] flex items-center">
        <Image
          src="https://img.rocket.new/generatedImages/rocket_gen_img_1667ab0b7-1773663888245.png"
          alt="Journalist working at a desk with newspaper and laptop, representing press and media coverage"
          fill
          className="object-cover opacity-20"
          priority />
        
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-violet-950/80 to-slate-900/90" />
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <span className="inline-block bg-violet-500/20 text-violet-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-violet-500/30">Press & Media</span>
          <h1 className="text-5xl font-bold mb-6 max-w-2xl leading-tight text-white">Everything you need to cover ViralBridge</h1>
          <p className="text-xl text-slate-300 max-w-xl mb-8">Logos, screenshots, founder photos, fact sheets, and press contacts — all in one place.</p>
          <button className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
            <Download className="w-4 h-4" /> Download Full Press Kit
          </button>
        </div>
      </section>
      {/* Company Facts */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Company at a glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {facts?.map((f) =>
            <div key={f?.label} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="text-xl font-bold text-violet-700 mb-1">{f?.value}</div>
                <div className="text-sm text-slate-500">{f?.label}</div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Assets */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Brand assets</h2>
          <p className="text-slate-500 mb-8">All assets are approved for editorial use. Please do not alter logos or brand colors.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {assets?.map((a) =>
            <div key={a?.label} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-start gap-4 group hover:border-violet-200 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <a.icon className="w-5 h-5 text-violet-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-slate-900 text-sm">{a?.label}</h3>
                    <Download className="w-4 h-4 text-slate-400 group-hover:text-violet-600 transition-colors" />
                  </div>
                  <p className="text-xs text-slate-500">{a?.desc}</p>
                  <span className="inline-block mt-2 text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{a?.tag}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Coverage with supporting image */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Recent coverage</h2>
              <div className="space-y-4">
                {coverage?.map((c) =>
                <div key={c?.headline} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-violet-200 transition-colors group cursor-pointer">
                    <div>
                      <span className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-1 block">{c?.outlet}</span>
                      <p className="font-medium text-slate-900 group-hover:text-violet-700 transition-colors">{c?.headline}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                      <span className="text-xs text-slate-400">{c?.date}</span>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-violet-600 transition-colors" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="rounded-2xl overflow-hidden shadow-lg sticky top-24">
                <Image
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_134876012-1784218484368.png"
                  alt="Newspaper and magazine coverage spread showing media articles about startup funding and creator economy"
                  width={600}
                  height={400}
                  className="w-full h-56 object-cover" />
                
                <div className="bg-violet-50 p-4 border border-violet-100 border-t-0 rounded-b-2xl">
                  <p className="text-sm text-violet-700 font-medium">Featured in 20+ publications</p>
                  <p className="text-xs text-slate-500 mt-1">YourStory, Inc42, ET, Entrackr, and more</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Press Contact */}
      <section className="py-16 bg-violet-700">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <Mail className="w-10 h-10 mx-auto mb-4 text-violet-200" />
          <h2 className="text-3xl font-bold mb-3">Press inquiries</h2>
          <p className="text-violet-200 mb-6">For interviews, quotes, or additional assets, reach out to our communications team.</p>
          <a href="mailto:press@viralbridge.in" className="inline-flex items-center gap-2 bg-white text-violet-700 px-6 py-3 rounded-xl font-semibold hover:bg-violet-50 transition-colors">
            press@viralbridge.in <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
      </main>
      <Footer />
    </div>);

}