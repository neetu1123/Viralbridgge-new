'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { Search, ChevronDown, ChevronRight, BookOpen, CreditCard, Shield, Users, Zap, MessageSquare, ArrowRight } from 'lucide-react';

const categories = [
{
  icon: Zap,
  color: 'bg-violet-100 text-violet-700',
  title: 'Getting Started',
  count: 8,
  articles: [
  'How to create your ViralBridge account',
  'Setting up your creator profile',
  'Connecting your social media accounts',
  'Understanding your dashboard',
  'Completing KYC verification']

},
{
  icon: Users,
  color: 'bg-rose-100 text-rose-700',
  title: 'For Creators',
  count: 12,
  articles: [
  'How to apply for campaigns',
  'Understanding match scores',
  'Submitting deliverables',
  'Getting paid — escrow explained',
  'Building your media kit']

},
{
  icon: BookOpen,
  color: 'bg-amber-100 text-amber-700',
  title: 'For Brands',
  count: 10,
  articles: [
  'Creating your first campaign',
  'Setting campaign budgets',
  'Reviewing creator applications',
  'Approving deliverables',
  'Releasing escrow payments']

},
{
  icon: CreditCard,
  color: 'bg-teal-100 text-teal-700',
  title: 'Payments & Escrow',
  count: 9,
  articles: [
  'How escrow protection works',
  'Withdrawal methods and timelines',
  'Invoice generation',
  'Dispute resolution process',
  'Tax documentation (TDS/GST)']

},
{
  icon: Shield,
  color: 'bg-blue-100 text-blue-700',
  title: 'Safety & Trust',
  count: 6,
  articles: [
  'Brand safety score explained',
  'Reporting fake followers',
  'Content policy guidelines',
  'Account security best practices',
  'Two-factor authentication']

},
{
  icon: MessageSquare,
  color: 'bg-green-100 text-green-700',
  title: 'Messaging & Collaboration',
  count: 5,
  articles: [
  'Using the messaging inbox',
  'Sharing campaign briefs',
  'File attachments in messages',
  'Notification preferences',
  'Blocking and reporting users']

}];


const faqs = [
{ q: 'How does escrow protection work?', a: 'When a brand creates a campaign, the budget is locked in escrow. Funds are only released to creators after the brand approves the submitted deliverables. This protects both parties — brands don\'t pay for undelivered work, and creators are guaranteed payment once they deliver.' },
{ q: 'How long does KYC verification take?', a: 'KYC verification typically takes 24–48 hours on business days. You\'ll receive an email notification once your account is verified. During this time, you can still browse campaigns but cannot apply or receive payments.' },
{ q: 'What is the ViralBridge platform fee?', a: 'ViralBridge charges a 10% platform fee on all completed campaigns. This fee covers escrow protection, AI matching, payment processing, and platform support. There are no hidden charges.' },
{ q: 'Can I withdraw my earnings immediately?', a: 'Earnings are available for withdrawal 3 business days after the brand approves your deliverables. You can withdraw to your bank account (NEFT/IMPS) or UPI. Minimum withdrawal amount is ₹500.' },
{ q: 'What happens if a brand doesn\'t approve my work?', a: 'If a brand doesn\'t respond within 7 days of submission, the payment is automatically released. If there\'s a dispute, our team reviews the deliverables against the campaign brief and mediates a fair resolution.' }];


export default function HelpCenterPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedCat, setExpandedCat] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <main className="pt-16">
      {/* Hero Search with background image */}
      <section className="relative overflow-hidden bg-violet-700">
        <Image
          src="https://img.rocket.new/generatedImages/rocket_gen_img_15d5af469-1772348335135.png"
          alt="Customer support team member wearing headset helping users at a modern help desk"
          fill
          className="object-cover opacity-10"
          priority />
        
        <div className="absolute inset-0 bg-gradient-to-br from-violet-700/95 to-purple-800/95" />
        <div className="relative py-20 text-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">How can we help?</h1>
            <p className="text-violet-200 mb-8">Search our knowledge base or browse by category below.</p>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles, guides, FAQs..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-violet-300 shadow-lg" />
              
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {['Escrow', 'KYC', 'Payments', 'Campaign brief', 'Deliverables']?.map((tag) =>
              <button key={tag} className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1.5 rounded-full border border-white/20 transition-colors">{tag}</button>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Categories */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Browse by topic</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories?.map((cat, i) =>
            <div key={cat?.title} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <button
                onClick={() => setExpandedCat(expandedCat === i ? null : i)}
                className="w-full p-5 flex items-center gap-4 text-left hover:bg-slate-50 transition-colors">
                
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cat?.color}`}>
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900">{cat?.title}</div>
                    <div className="text-xs text-slate-400">{cat?.count} articles</div>
                  </div>
                  {expandedCat === i ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                </button>
                {expandedCat === i &&
              <div className="border-t border-slate-100 px-5 pb-4">
                    <ul className="mt-3 space-y-2">
                      {cat?.articles?.map((a) =>
                  <li key={a}>
                          <button className="text-sm text-violet-600 hover:text-violet-800 hover:underline text-left transition-colors flex items-center gap-1.5">
                            <ChevronRight className="w-3 h-3" />{a}
                          </button>
                        </li>
                  )}
                    </ul>
                  </div>
              }
              </div>
            )}
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs?.map((faq, i) =>
            <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden">
                <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors">
                
                  <span className="font-medium text-slate-900">{faq?.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i &&
              <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                    {faq?.a}
                  </div>
              }
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Contact CTA with image */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
            <div className="p-10">
              <MessageSquare className="w-10 h-10 text-violet-600 mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Still need help?</h2>
              <p className="text-slate-500 mb-6">Our support team typically responds within 2 hours on business days.</p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-violet-800 transition-colors">
                Contact support <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="h-64 lg:h-full relative">
              <Image
                src="https://img.rocket.new/generatedImages/rocket_gen_img_10fc1941c-1763296037966.png"
                alt="Friendly support team member smiling while working on a computer helping platform users"
                fill
                className="object-cover" />
              
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>);

}