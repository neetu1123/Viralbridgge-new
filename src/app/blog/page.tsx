'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { ArrowRight, Clock, TrendingUp, BookOpen } from 'lucide-react';

const featured = {
  slug: 'ai-matching-creator-economy',
  category: 'Product',
  categoryColor: 'bg-violet-100 text-violet-700',
  title: 'How ViralBridge\'s AI Matching Engine Achieves 94% Campaign Success',
  excerpt: 'We trained our matching model on 3,400+ campaigns and 12,000+ creator profiles. Here\'s what we learned about what actually drives ROI — and why follower count is the worst predictor.',
  author: 'Priya Nair',
  authorInitials: 'PN',
  authorGradient: 'from-rose-400 to-pink-600',
  date: 'July 10, 2026',
  readTime: '8 min read',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_128fd8bea-1769057432011.png",
  imageAlt: 'Abstract AI neural network visualization representing intelligent creator-brand matching algorithms'
};

const posts = [
{
  slug: 'escrow-protection-guide',
  category: 'Creators',
  categoryColor: 'bg-rose-100 text-rose-700',
  title: 'The Creator\'s Guide to Escrow: Never Chase a Payment Again',
  excerpt: 'How escrow-protected campaigns changed the payment dynamic for 8,000+ creators on our platform.',
  author: 'Rohan Kapoor',
  authorInitials: 'RK',
  date: 'July 5, 2026',
  readTime: '5 min read',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_159899371-1767210685952.png",
  imageAlt: 'Creator holding smartphone showing payment confirmation with a satisfied expression'
},
{
  slug: 'micro-vs-macro-creators',
  category: 'Brands',
  categoryColor: 'bg-amber-100 text-amber-700',
  title: 'Micro vs Macro: The Data on Which Creators Actually Convert',
  excerpt: 'We analyzed 1,200 campaigns. The results will surprise you — and change how you allocate budget.',
  author: 'Sneha Iyer',
  authorInitials: 'SI',
  date: 'June 28, 2026',
  readTime: '6 min read',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_138bce382-1772889146953.png",
  imageAlt: 'Influencer creator filming a product review video for a brand campaign on social media'
},
{
  slug: 'engagement-rate-myth',
  category: 'Insights',
  categoryColor: 'bg-teal-100 text-teal-700',
  title: 'Why Engagement Rate is a Lie (And What to Track Instead)',
  excerpt: 'Engagement rate is gamed, inflated, and misunderstood. Here\'s the metric stack we actually use.',
  author: 'Priya Nair',
  authorInitials: 'PN',
  date: 'June 20, 2026',
  readTime: '7 min read',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_194f37308-1772248086109.png",
  imageAlt: 'Analytics dashboard showing social media engagement metrics and performance charts'
},
{
  slug: 'brand-safety-score',
  category: 'Product',
  categoryColor: 'bg-violet-100 text-violet-700',
  title: 'Introducing Brand Safety Score: AI-Powered Creator Vetting',
  excerpt: 'Our new Brand Safety Score analyzes 40+ signals to flag risky creator partnerships before they happen.',
  author: 'Arjun Mehta',
  authorInitials: 'AM',
  date: 'June 12, 2026',
  readTime: '4 min read',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ff004a58-1784218481769.png",
  imageAlt: 'Digital security shield icon representing brand safety and creator vetting technology'
},
{
  slug: 'creator-pricing-guide',
  category: 'Creators',
  categoryColor: 'bg-rose-100 text-rose-700',
  title: 'How to Price Your Creator Packages in 2026',
  excerpt: 'Data from 12,000+ creators on what rates actually get accepted — broken down by niche, platform, and follower tier.',
  author: 'Rohan Kapoor',
  authorInitials: 'RK',
  date: 'June 5, 2026',
  readTime: '9 min read',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_10d17cc31-1784218483360.png",
  imageAlt: 'Creator reviewing pricing strategy on laptop with financial charts and social media analytics'
}];


const categories = ['All', 'Product', 'Creators', 'Brands', 'Insights'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? posts : posts?.filter((p) => p?.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <main className="pt-16">
      {/* Hero Banner */}
      <section className="relative bg-slate-900 overflow-hidden">
        {/* <Image
          src="https://img.rocket.new/generatedImages/rocket_gen_img_1a0e02f6f-1772204729669.png"
          alt="Person writing in a notebook next to a laptop in a creative workspace, representing content creation and blogging"
          fill
          className="object-cover opacity-20"
          priority /> */}
        
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900/95" />
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-violet-400" />
            <span className="text-violet-400 font-semibold text-sm uppercase tracking-wider">ViralBridge Blog</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Insights for the creator economy</h1>
          <p className="text-xl text-slate-400 max-w-2xl">Data, strategies, and stories from the intersection of creators, brands, and AI.</p>
        </div>
      </section>
      {/* Featured */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Link href={`/blog/${featured?.slug}`} className="block group">
            <div className="rounded-3xl overflow-hidden relative shadow-xl shadow-violet-100/50">
              <Image
                src={featured?.image}
                alt={featured?.imageAlt}
                width={1200}
                height={480}
                className="w-full h-[380px] object-cover group-hover:scale-[1.02] transition-transform duration-500" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4 w-fit">{featured?.category}</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 max-w-2xl leading-tight group-hover:text-violet-200 transition-colors">{featured?.title}</h2>
                <p className="text-white/75 text-base mb-6 max-w-2xl">{featured?.excerpt}</p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${featured?.authorGradient} flex items-center justify-center text-white text-sm font-bold`}>{featured?.authorInitials}</div>
                    <div>
                      <div className="font-semibold text-sm text-white">{featured?.author}</div>
                      <div className="text-white/60 text-xs flex items-center gap-2">
                        <Clock className="w-3 h-3" />{featured?.date} · {featured?.readTime}
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 bg-white text-violet-700 px-5 py-2.5 rounded-xl font-semibold text-sm">
                    Read article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
      {/* Filter + Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            {categories?.map((cat) =>
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-violet-700 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-violet-300'}`}>
              
                {cat}
              </button>
            )}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered?.map((post) =>
            <Link key={post?.slug} href={`/blog/${post?.slug}`} className="block">
                <article className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 overflow-hidden group cursor-pointer h-full">
                  <div className="relative overflow-hidden">
                    <Image
                    src={post?.image}
                    alt={post?.imageAlt}
                    width={600}
                    height={240}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                    <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${post?.categoryColor}`}>{post?.category}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 text-lg leading-snug mb-3 group-hover:text-violet-700 transition-colors">{post?.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-5">{post?.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 text-xs font-bold">{post?.authorInitials}</div>
                        <span className="text-xs text-slate-500">{post?.author}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="w-3 h-3" />{post?.readTime}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            )}
          </div>
        </div>
      </section>
      {/* Newsletter */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-xl mx-auto px-6 text-center">
          <TrendingUp className="w-10 h-10 text-violet-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Stay ahead of the curve</h2>
          <p className="text-slate-500 mb-6">Weekly insights on creator economy trends, platform updates, and data-backed strategies.</p>
          <div className="flex gap-3">
            <input type="email" placeholder="your@email.com" className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300" />
            <button className="bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-violet-800 transition-colors">Subscribe</button>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>);

}