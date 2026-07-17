'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, ArrowRight, TrendingUp } from 'lucide-react';

const articlesBySlug: Record<string, {
  slug: string;
  category: string;
  categoryColor: string;
  title: string;
  subtitle: string;
  author: string;
  authorInitials: string;
  authorGradient: string;
  authorRole: string;
  authorBio: string;
  date: string;
  readTime: string;
  heroImage: string;
  heroAlt: string;
  midImage: string;
  midAlt: string;
  content: {type: string;text?: string;items?: string[];caption?: string;}[];
  tags: string[];
}> = {
  'ai-matching-creator-economy': {
    slug: 'ai-matching-creator-economy',
    category: 'Product',
    categoryColor: 'bg-violet-100 text-violet-700',
    title: "How ViralBridge's AI Matching Engine Achieves 94% Campaign Success",
    subtitle: "We trained our matching model on 3,400+ campaigns and 12,000+ creator profiles. Here's what we learned about what actually drives ROI.",
    author: 'Priya Nair',
    authorInitials: 'PN',
    authorGradient: 'from-rose-400 to-pink-600',
    authorRole: 'Co-founder & CTO',
    authorBio: 'Ex-ML engineer. Built the AI matching engine from scratch. Writes about the intersection of machine learning and creator economics.',
    date: 'July 10, 2026',
    readTime: '8 min read',
    heroImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1f43c1ad6-1772084388388.png",
    heroAlt: 'Abstract visualization of AI neural network connections representing creator-brand matching algorithms',
    midImage: "https://img.rocket.new/generatedImages/rocket_gen_img_191da7f1a-1772725678653.png",
    midAlt: 'Data analytics dashboard showing campaign performance metrics, engagement rates, and ROI charts',
    content: [
    { type: 'p', text: "When we started building ViralBridge, the conventional wisdom in influencer marketing was simple: bigger follower count = better campaign results. We knew this was wrong. But we needed data to prove it — and to build something better." },
    { type: 'p', text: "After analyzing 3,400+ completed campaigns and 12,000+ creator profiles, we trained a matching model that now achieves 94% campaign success rate. Here's what we learned." },
    { type: 'h2', text: 'Follower count is the worst predictor of ROI' },
    { type: 'p', text: "Our data showed a near-zero correlation between follower count and campaign ROI. A creator with 8,000 followers in the right niche consistently outperformed macro-influencers with 500,000 followers on the wrong product." },
    { type: 'p', text: "The real predictors? Audience-product alignment, engagement authenticity, and creator content style. These three factors account for 71% of campaign outcome variance in our model." },
    { type: 'list', items: ['Audience-product alignment: 34% of variance', 'Engagement authenticity score: 22% of variance', 'Content style match: 15% of variance', 'Creator completion rate: 12% of variance', 'Follower count: 4% of variance'] },
    { type: 'h2', text: 'How the matching engine works' },
    { type: 'p', text: "Our model analyzes 40+ signals across three dimensions: creator quality, audience quality, and brand-creator fit. The output is a Match % score — a single number that tells a brand how likely a creator is to deliver ROI on their specific campaign." },
    { type: 'p', text: "The model is retrained weekly on new campaign outcomes. Every completed campaign — success or failure — makes the next match more accurate. This flywheel effect is why our success rate has improved from 78% in Q1 2025 to 94% today." },
    { type: 'h2', text: 'What "audience quality" actually means' },
    { type: 'p', text: "Audience quality isn't about real vs. fake followers (though we track that too). It's about whether a creator's audience is genuinely interested in the product category — and whether they have purchasing intent." },
    { type: 'p', text: "We measure this through engagement pattern analysis, comment sentiment, and cross-platform audience overlap. A creator whose audience actively discusses skincare products in comments is a fundamentally different asset for a skincare brand than one with the same follower count but generic lifestyle content." },
    { type: 'h2', text: 'The transparency layer' },
    { type: 'p', text: "One thing we're proud of: our AI explains its reasoning. Every match score comes with a breakdown — why this creator was matched, what signals drove the score, and what risks to watch for. Brands make better decisions when they understand the 'why', not just the number." }],

    tags: ['AI', 'Matching', 'Creator Economy', 'ROI', 'Product']
  },
  'escrow-protection-guide': {
    slug: 'escrow-protection-guide',
    category: 'Creators',
    categoryColor: 'bg-rose-100 text-rose-700',
    title: "The Creator's Guide to Escrow: Never Chase a Payment Again",
    subtitle: "How escrow-protected campaigns changed the payment dynamic for 8,000+ creators on our platform.",
    author: 'Rohan Kapoor',
    authorInitials: 'RK',
    authorGradient: 'from-amber-400 to-orange-500',
    authorRole: 'Head of Creator Success',
    authorBio: 'Managed 200+ creator partnerships. Knows what creators actually need to thrive. Writes about creator economics and platform design.',
    date: 'July 5, 2026',
    readTime: '5 min read',
    heroImage: "https://img.rocket.new/generatedImages/rocket_gen_img_10b3ba3b5-1772954943176.png",
    heroAlt: 'Creator holding smartphone showing payment confirmation notification with a satisfied expression',
    midImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1f0de9fdb-1775146855545.png",
    midAlt: 'Financial security concept showing a digital lock protecting money and payment transactions',
    content: [
    { type: 'p', text: "If you've been a creator for more than six months, you've probably chased a payment. Maybe a brand went quiet after you delivered. Maybe they kept asking for revisions without releasing funds. Maybe they just... disappeared." },
    { type: 'p', text: "This is the dirty secret of influencer marketing: payment insecurity is endemic. Our survey of 2,000 creators found that 67% had experienced delayed or non-payment at least once. It's not a bug — it's a structural problem with how the industry works." },
    { type: 'h2', text: 'How escrow changes the dynamic' },
    { type: 'p', text: "Escrow flips the power dynamic. Instead of a creator trusting a brand to pay after delivery, the brand locks funds before the campaign starts. The money exists. It's real. It's just waiting for you to deliver." },
    { type: 'p', text: "On ViralBridge, every campaign is escrow-protected by default. When a brand creates a campaign, the budget is locked in a third-party escrow account. You can see the funds are there before you accept. No more faith-based transactions." },
    { type: 'h2', text: 'What happens if there\'s a dispute?' },
    { type: 'p', text: "If a brand doesn't approve your deliverables within 7 days, the payment releases automatically. If they dispute the work, our team reviews the deliverables against the campaign brief and mediates a resolution." },
    { type: 'p', text: "In 94% of disputes, we find the creator delivered what was asked. In those cases, funds are released in full. The remaining 6% are genuine brief mismatches — and even then, we typically negotiate partial payment." },
    { type: 'list', items: ['Funds locked before campaign starts', 'Auto-release after 7 days of no response', 'Dispute mediation within 48 hours', 'Creator wins 94% of disputes', 'Minimum withdrawal: ₹500'] }],

    tags: ['Payments', 'Escrow', 'Creator Rights', 'Platform']
  }
};

const relatedPosts = [
{ slug: 'micro-vs-macro-creators', category: 'Brands', categoryColor: 'bg-amber-100 text-amber-700', title: 'Micro vs Macro: The Data on Which Creators Actually Convert', readTime: '6 min read', authorInitials: 'SI' },
{ slug: 'engagement-rate-myth', category: 'Insights', categoryColor: 'bg-teal-100 text-teal-700', title: 'Why Engagement Rate is a Lie (And What to Track Instead)', readTime: '7 min read', authorInitials: 'PN' },
{ slug: 'creator-pricing-guide', category: 'Creators', categoryColor: 'bg-rose-100 text-rose-700', title: 'How to Price Your Creator Packages in 2026', readTime: '9 min read', authorInitials: 'RK' }];


// Default article for unknown slugs
const defaultArticle = articlesBySlug['ai-matching-creator-economy'];

export default function BlogDetailPage({ params }: {params: {slug: string;};}) {
  const article = articlesBySlug[params?.slug] || defaultArticle;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <main className="pt-16">
      {/* Hero Banner */}
      <section className="relative bg-slate-900 overflow-hidden">
        <Image
          src={article.heroImage}
          alt={article.heroAlt}
          width={1400}
          height={600}
          className="w-full h-[480px] object-cover opacity-40"
          priority />
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-6 pb-12 w-full">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-5 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-4 ${article.categoryColor}`}>{article.category}</span>
            <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4 max-w-3xl">{article.title}</h1>
            <p className="text-slate-300 text-lg mb-6 max-w-2xl">{article.subtitle}</p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${article.authorGradient} flex items-center justify-center text-white text-sm font-bold`}>{article.authorInitials}</div>
                <div>
                  <div className="text-white font-semibold text-sm">{article.author}</div>
                  <div className="text-slate-400 text-xs flex items-center gap-2">
                    <Calendar className="w-3 h-3" />{article.date}
                    <span>·</span>
                    <Clock className="w-3 h-3" />{article.readTime}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors">
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors">
                  <Bookmark className="w-4 h-4" /> Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 lg:p-10">
              <div className="prose prose-slate max-w-none">
                {article.content.map((block, i) => {
                  if (block.type === 'h2') {
                    return <h2 key={i} className="text-2xl font-bold text-slate-900 mt-8 mb-4">{block.text}</h2>;
                  }
                  if (block.type === 'p') {
                    return <p key={i} className="text-slate-600 leading-relaxed mb-4">{block.text}</p>;
                  }
                  if (block.type === 'list') {
                    return (
                      <ul key={i} className="space-y-2 mb-6 bg-slate-50 rounded-xl p-5 border border-slate-100">
                        {block.items?.map((item, j) =>
                        <li key={j} className="flex items-start gap-2 text-slate-600 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0 mt-2" />
                            {item}
                          </li>
                        )}
                      </ul>);

                  }
                  return null;
                })}

                {/* Mid-article image */}
                <div className="my-8 rounded-2xl overflow-hidden">
                  <Image
                    src={article.midImage}
                    alt={article.midAlt}
                    width={1000}
                    height={500}
                    className="w-full h-64 object-cover" />
                  
                  <p className="text-xs text-slate-400 text-center mt-2 italic">Data-driven insights powering ViralBridge's matching engine</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-slate-100">
                {article.tags.map((tag) =>
                <span key={tag} className="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-full font-medium">{tag}</span>
                )}
              </div>
            </div>

            {/* Author Bio */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mt-6 flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${article.authorGradient} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>{article.authorInitials}</div>
              <div>
                <div className="font-bold text-slate-900">{article.author}</div>
                <div className="text-violet-600 text-sm font-medium mb-2">{article.authorRole}</div>
                <p className="text-sm text-slate-500 leading-relaxed">{article.authorBio}</p>
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-5">
            <div className="sticky top-24">
              {/* Newsletter */}
              <div className="bg-violet-50 rounded-2xl border border-violet-100 p-5 mb-5">
                <TrendingUp className="w-8 h-8 text-violet-600 mb-3" />
                <h3 className="font-bold text-slate-900 mb-1 text-sm">Weekly insights</h3>
                <p className="text-xs text-slate-500 mb-3">Creator economy trends, platform updates, and data-backed strategies.</p>
                <input type="email" placeholder="your@email.com" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-violet-300 mb-2" />
                <button className="w-full bg-violet-700 text-white py-2 rounded-lg text-xs font-semibold hover:bg-violet-800 transition-colors">Subscribe</button>
              </div>
              {/* Share */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5">
                <h3 className="font-semibold text-slate-900 text-sm mb-3">Share this article</h3>
                <div className="space-y-2">
                  {['Twitter / X', 'LinkedIn', 'Copy link'].map((s) =>
                  <button key={s} className="w-full text-left text-sm text-slate-600 hover:text-violet-700 py-1.5 border-b border-slate-50 last:border-0 transition-colors">{s}</button>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Posts */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">More from the blog</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {relatedPosts.map((post) =>
            <Link key={post.slug} href={`/blog/${post.slug}`} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 overflow-hidden group">
                <div className="h-1.5 bg-gradient-to-r from-violet-500 to-rose-400" />
                <div className="p-5">
                  <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${post.categoryColor}`}>{post.category}</span>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug mb-3 group-hover:text-violet-700 transition-colors">{post.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 text-xs font-bold">{post.authorInitials}</div>
                    <div className="flex items-center gap-1 text-xs text-slate-400"><Clock className="w-3 h-3" />{post.readTime}</div>
                  </div>
                </div>
              </Link>
            )}
          </div>
          <div className="text-center mt-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-800 font-semibold transition-colors">
              View all articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </div>);

}