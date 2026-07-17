'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { ArrowRight, Zap, Shield, Globe, Heart } from 'lucide-react';

const stats = [
{ value: '12K+', label: 'Verified Creators' },
{ value: '3,400+', label: 'Brand Campaigns' },
{ value: '₹48Cr+', label: 'Creator Earnings' },
{ value: '94%', label: 'Campaign Success Rate' }];


const team = [
{ name: 'Arjun Mehta', role: 'Co-founder & CEO', initials: 'AM', gradient: 'from-violet-500 to-purple-700', bio: 'Former growth lead at a Series B D2C brand. Obsessed with creator economy infrastructure.' },
{ name: 'Priya Nair', role: 'Co-founder & CTO', initials: 'PN', gradient: 'from-rose-400 to-pink-600', bio: 'Ex-ML engineer at a major tech firm. Built the AI matching engine from scratch.' },
{ name: 'Rohan Kapoor', role: 'Head of Creator Success', initials: 'RK', gradient: 'from-amber-400 to-orange-500', bio: 'Managed 200+ creator partnerships. Knows what creators actually need to thrive.' },
{ name: 'Sneha Iyer', role: 'Head of Brand Partnerships', initials: 'SI', gradient: 'from-teal-400 to-cyan-600', bio: 'Built brand-creator programs for FMCG giants. Bridges the trust gap between both sides.' }];


const values = [
{ icon: Shield, title: 'Radical Transparency', desc: 'Escrow-protected payments, verified metrics, zero hidden fees. Every number you see is real.' },
{ icon: Zap, title: 'Intelligence First', desc: 'Our AI doesn\'t just match — it explains why. Every recommendation comes with reasoning.' },
{ icon: Heart, title: 'Creator-Centric', desc: 'Creators are the product. We build every feature asking: does this make creators\' lives better?' },
{ icon: Globe, title: 'Built for Bharat', desc: 'Designed for Indian creators and brands first, with global ambitions baked in from day one.' }];


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <main className="pt-16">
      {/* Hero Banner with Image */}
      <section className="relative overflow-hidden bg-slate-900 min-h-[500px] flex items-center">
        <Image
          src="https://img.rocket.new/generatedImages/rocket_gen_img_1ff35da37-1767973685405.png"
          alt="Diverse team of creators and brand professionals collaborating around a table with laptops and phones"
          fill
          className="object-cover opacity-25"
          priority />
        
        <div className="absolute inset-0 bg-gradient-to-r from-violet-950/90 via-slate-900/70 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6 py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-violet-500/20 text-violet-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-violet-500/30">
              <Zap className="w-3.5 h-3.5" /> Our Story
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              The infrastructure layer for the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-rose-400">creator economy</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-8">
              ViralBridge was built because we watched too many creators get underpaid and too many brands waste budget on the wrong partnerships. We decided to fix both — with AI, escrow, and radical transparency.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/sign-up-login-screen" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                Join the platform <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/press-kit" className="text-slate-300 hover:text-white font-medium transition-colors">
                Press Kit →
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Stats */}
      <section className="bg-violet-700 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats?.map((s) =>
            <div key={s?.label} className="text-center">
                <div className="text-4xl font-bold text-white mb-1">{s?.value}</div>
                <div className="text-violet-200 text-sm">{s?.label}</div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Mission with image */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Why we exist</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                The influencer marketing industry is broken. Brands overpay for vanity metrics. Creators undercharge because they lack data. Payments get delayed. Campaigns fail silently.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                We built ViralBridge to be the trust layer — AI-powered matching that explains its reasoning, escrow that protects both sides, and analytics that tell the real story.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                We're not a marketplace. We're infrastructure. The difference matters.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {values?.map((v) =>
                <div key={v?.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center mb-4">
                      <v.icon className="w-5 h-5 text-violet-700" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{v?.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{v?.desc}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-violet-100">
                <Image
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_1585a31c3-1772888679194.png"
                  alt="Creator filming a product review video with professional lighting and camera setup"
                  width={800}
                  height={600}
                  className="w-full h-[480px] object-cover" />
                
              </div>
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
                <div className="text-2xl font-bold text-violet-700">₹48Cr+</div>
                <div className="text-xs text-slate-500">Paid to creators</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Team */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">The team</h2>
              <p className="text-lg text-slate-500 max-w-xl">Operators who've been on both sides of the creator economy table.</p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1e178fe9e-1767204349878.png"
                alt="ViralBridge founding team gathered around a whiteboard planning the platform roadmap"
                width={800}
                height={300}
                className="w-full h-48 object-cover" />
              
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team?.map((member) =>
            <div key={member?.name} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member?.gradient} flex items-center justify-center text-white font-bold text-xl mb-4`}>
                  {member?.initials}
                </div>
                <h3 className="font-bold text-slate-900">{member?.name}</h3>
                <p className="text-violet-600 text-sm font-medium mb-3">{member?.role}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{member?.bio}</p>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Ready to build something real?</h2>
          <p className="text-lg text-slate-500 mb-8">Join thousands of creators and brands already on ViralBridge.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/sign-up-login-screen" className="inline-flex items-center gap-2 bg-violet-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-violet-800 transition-colors text-lg">
              Get started free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-violet-700 font-medium transition-colors">
              Talk to us →
            </Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>);

}