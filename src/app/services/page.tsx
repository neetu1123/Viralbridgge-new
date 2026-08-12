'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { ArrowRight, ChevronRight, Users, Film, Smartphone, Shield, Repeat, Share2, TrendingUp, Settings, CheckCircle, Zap, Star } from 'lucide-react';

// ─── 01 Product Launch ───────────────────────────────────────────────────────
const launchSteps = [
  {
    id: 'creators',
    label: 'Creators',
    icon: Users,
    color: 'bg-violet-600',
    detail: {
      title: 'Campaign Creator Network',
      items: ['50 Fitness Creators', '25 Nutrition Creators', '10 YouTubers'],
      desc: 'A coordinated network of niche creators hand-picked for maximum audience alignment.',
    },
  },
  {
    id: 'content',
    label: 'Content',
    icon: Film,
    color: 'bg-rose-500',
    detail: {
      title: 'Content Distribution',
      items: ['200 Reels produced', 'Coordinated creator content', 'Multi-channel distribution'],
      desc: 'Synchronized content drops across platforms for maximum algorithmic amplification.',
    },
  },
  {
    id: 'distribution',
    label: 'Distribution',
    icon: Share2,
    color: 'bg-amber-500',
    detail: {
      title: 'Multi-Channel Distribution',
      items: ['Instagram Reels', 'YouTube Shorts', 'Twitter / X threads', 'Story reposts'],
      desc: 'Every piece of content is cross-distributed to multiply organic reach.',
    },
  },
  {
    id: 'reach',
    label: 'Reach',
    icon: TrendingUp,
    color: 'bg-teal-500',
    detail: {
      title: 'Campaign Outcome',
      items: ['Expected Reach: 5 Million', 'Coordinated launch window', 'Measurable brand lift'],
      desc: 'Packaged campaigns deliver predictable, measurable reach — not guesswork.',
    },
  },
];

// ─── 02 Movie Promotion ───────────────────────────────────────────────────────
const movieStages = [
  {
    id: 'pre',
    label: 'Pre-Release',
    desc: 'Seed awareness with teaser content and creator previews.',
    network: ['20 Entertainment Influencers', '50 Movie Pages', 'Exclusive preview clips'],
  },
  {
    id: 'trailer',
    label: 'Trailer Blast',
    desc: '500 creators coordinate to review and share the trailer simultaneously.',
    network: ['500 Creators activated', 'Trailer Reviews & Shares', 'Trending hashtag push'],
  },
  {
    id: 'buzz',
    label: 'Public Buzz',
    desc: 'Meme pages and discussion creators amplify public conversation.',
    network: ['200 Meme Pages', '100 Discussion Creators', 'Sentiment monitoring'],
  },
  {
    id: 'release',
    label: 'Release Week',
    desc: 'Full activation to drive opening weekend occupancy.',
    network: ['Review Creators', 'Entertainment Influencers', 'Movie Pages', 'Meme Ecosystem'],
  },
];

// ─── 03 Political ────────────────────────────────────────────────────────────
const politicalLevels = {
  district: {
    label: 'District Level',
    network: ['100 Local Influencers', 'Regional Language Content', 'Meme Pages', 'Micro Creators'],
    focus: 'Hyper-local narrative control and voter awareness in targeted districts.',
    reach: '500K–2M',
  },
  state: {
    label: 'State Level',
    network: ['1,000+ Creators', 'Regional YouTubers', 'Instagram Influencers', 'Meme Ecosystem'],
    focus: 'State-wide sentiment management, visibility, and voter mobilization.',
    reach: '10M–50M',
  },
};

// ─── 06 Brand Reputation ─────────────────────────────────────────────────────
const reputationMetrics = [
  {
    id: 'positive',
    label: 'Positive Mentions',
    value: '12,480',
    change: '+18%',
    color: 'text-teal-600',
    bg: 'bg-teal-50 border-teal-200',
    detail: 'Creators generating positive brand sentiment across Instagram, YouTube, and Twitter.',
  },
  {
    id: 'negative',
    label: 'Negative Mentions',
    value: '342',
    change: '-64%',
    color: 'text-rose-600',
    bg: 'bg-rose-50 border-rose-200',
    detail: 'Negative content identified and counter-narrative campaigns deployed within 24 hours.',
  },
  {
    id: 'reach',
    label: 'Reach Generated',
    value: '48.2M',
    change: '+31%',
    color: 'text-violet-600',
    bg: 'bg-violet-50 border-violet-200',
    detail: 'Total audience reach from all creator content in the reputation campaign.',
  },
  {
    id: 'demographics',
    label: 'Audience Demographics',
    value: '18–34',
    change: 'Primary',
    color: 'text-amber-600',
    bg: 'bg-amber-50 border-amber-200',
    detail: 'Primary audience segment: 18–34 urban professionals. 62% female, 38% male.',
  },
];

// ─── Enterprise Hub ───────────────────────────────────────────────────────────
const enterpriseServices = [
  {
    id: 'political',
    label: 'Political Outreach',
    angle: 270,
    color: 'bg-violet-600',
    ring: 'ring-violet-300',
    title: 'Political Outreach Campaigns',
    desc: 'Narrative control, reach, sentiment, and voter awareness at district or state scale.',
    deliverables: ['100–1,000+ Creators', 'Regional Language Content', 'Meme Ecosystem', 'Sentiment Monitoring', 'District & State Packages'],
  },
  {
    id: 'movie',
    label: 'Movie Promotion',
    angle: 210,
    color: 'bg-rose-500',
    ring: 'ring-rose-300',
    title: 'Movie Promotion Campaigns',
    desc: 'Build buzz before release, drive trailer views, and maximize opening weekend occupancy.',
    deliverables: ['500 Creator Trailer Blast', 'Pre-Release Seeding', 'Meme Page Activation', 'Release Week Surge', 'Entertainment Influencers'],
  },
  {
    id: 'product',
    label: 'Product Launch',
    angle: 330,
    color: 'bg-amber-500',
    ring: 'ring-amber-300',
    title: 'Product Launch Campaigns',
    desc: 'Coordinated launch packages with creators, content volume, and expected reach.',
    deliverables: ['85 Niche Creators', '200 Reels Produced', 'Multi-Channel Distribution', '5M Expected Reach', 'Launch Package Coordination'],
  },
  {
    id: 'app',
    label: 'App Growth',
    angle: 150,
    color: 'bg-teal-500',
    ring: 'ring-teal-300',
    title: 'App Growth Campaigns',
    desc: 'Turn creator attention into app discovery through coordinated content campaigns.',
    deliverables: ['Creator Activation', 'Content Creation', 'Audience Reach', 'App Discovery', 'Campaign Performance Tracking'],
  },
  {
    id: 'reputation',
    label: 'Brand Reputation',
    angle: 90,
    color: 'bg-blue-500',
    ring: 'ring-blue-300',
    title: 'Brand Reputation Campaigns',
    desc: 'Monitor and shape brand sentiment through creator networks and campaign monitoring.',
    deliverables: ['Sentiment Dashboard', 'Positive Mention Campaigns', 'Counter-Narrative Deployment', 'Reach Tracking', 'Audience Demographics'],
  },
  {
    id: 'election',
    label: 'Election Awareness',
    angle: 30,
    color: 'bg-indigo-500',
    ring: 'ring-indigo-300',
    title: 'Election Awareness Programs',
    desc: 'Large-scale awareness campaigns for reach, visibility, and regional communication.',
    deliverables: ['Regional Creator Networks', 'Voter Awareness Content', 'Sentiment Tracking', 'Multi-Language Distribution', 'Audience Awareness Metrics'],
  },
];

// ─── Meme Network Nodes ───────────────────────────────────────────────────────
const memeNodes = [
  { id: 'meme', label: 'Meme Pages', angle: 270, color: 'bg-violet-500', desc: 'Viral meme content reaching millions organically.' },
  { id: 'college', label: 'College Pages', angle: 330, color: 'bg-rose-500', desc: 'Hyper-engaged Gen Z audiences on campus networks.' },
  { id: 'city', label: 'City Pages', angle: 30, color: 'bg-amber-500', desc: 'Geo-targeted local community pages.' },
  { id: 'news', label: 'News Pages', angle: 90, color: 'bg-teal-500', desc: 'Credibility and reach through news-style pages.' },
];

// ─── Trend Takeover Assembly ──────────────────────────────────────────────────
const trendParts = [
  { id: 'influencers', label: '100 Influencers', count: 100, color: 'bg-violet-600', desc: 'Top-tier influencers seeding the trend.' },
  { id: 'memes', label: '200 Meme Pages', count: 200, color: 'bg-rose-500', desc: 'Meme pages amplifying at viral scale.' },
  { id: 'review', label: '50 Review Creators', count: 50, color: 'bg-amber-500', desc: 'Review creators adding credibility.' },
];

// ─── App Growth Flow ──────────────────────────────────────────────────────────
const appFlowSteps = [
  { label: 'Creator Activation', icon: Users, color: 'bg-violet-600' },
  { label: 'Content Creation', icon: Film, color: 'bg-rose-500' },
  { label: 'Audience Reach', icon: Share2, color: 'bg-amber-500' },
  { label: 'App Discovery', icon: Smartphone, color: 'bg-teal-500' },
  { label: 'Campaign Performance', icon: TrendingUp, color: 'bg-blue-500' },
];

// ─── Managed Campaign Flow ────────────────────────────────────────────────────
const managedSteps = [
  { label: 'Campaign Strategy', icon: Star },
  { label: 'Creator Selection', icon: Users },
  { label: 'Campaign Coordination', icon: Settings },
  { label: 'Creator Delivery', icon: Film },
  { label: 'Brand Approval', icon: CheckCircle },
  { label: 'Campaign Completion', icon: Zap },
];

export default function ServicesPage() {
  const [launchStep, setLaunchStep] = useState('creators');
  const [movieStage, setMovieStage] = useState('pre');
  const [politicalLevel, setPoliticalLevel] = useState<'district' | 'state'>('district');
  const [reputationMetric, setReputationMetric] = useState('positive');
  const [hoveredMemeNode, setHoveredMemeNode] = useState<string | null>(null);
  const [trendAssembled, setTrendAssembled] = useState<string[]>([]);
  const [enterpriseSelected, setEnterpriseSelected] = useState('political');
  const [managedStep, setManagedStep] = useState(0);

  const activeLaunch = launchSteps.find((s) => s.id === launchStep)!;
  const activeMovie = movieStages.find((s) => s.id === movieStage)!;
  const activePolitical = politicalLevels[politicalLevel];
  const activeReputation = reputationMetrics.find((m) => m.id === reputationMetric)!;
  const activeEnterprise = enterpriseServices.find((s) => s.id === enterpriseSelected)!;

  const toggleTrend = (id: string) => {
    setTrendAssembled((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Nav */}
     <Header />

      {/* Hero */}
      <section className="relative bg-slate-900 overflow-hidden min-h-[560px] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-violet-900/60 via-slate-900 to-slate-900" />
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-violet-500/10 animate-pulse"
              style={{
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 4 + 3}s`,
              }}
            />
          ))}
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-violet-500/20 text-violet-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-violet-500/30">
              <Zap className="w-3.5 h-3.5" /> Enterprise Creator Campaigns
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Enterprise Creator Campaigns,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-rose-400">Built for Scale</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
              ViralBridge helps brands and organizations execute creator-powered campaigns across influencers, YouTubers, meme pages, regional creators, review creators, and other distribution networks.
            </p>
            <Link href="/sign-up-login-screen" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-xl font-semibold transition-colors text-lg">
              Plan Your Campaign <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Index */}
      <section className="bg-white border-b border-slate-100 py-4 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide text-sm">
            {['Product Launch', 'Movie Promotion', 'Political Outreach', 'Election Awareness', 'App Growth', 'Brand Reputation', 'Creator Whitelisting', 'Meme Network', 'Trend Takeover', 'Managed Service'].map((s, i) => (
              <a key={s} href={`#service-${i + 1}`} className="whitespace-nowrap text-slate-500 hover:text-violet-700 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-violet-50">
                <span className="text-violet-400 font-bold mr-1">{String(i + 1).padStart(2, '0')}</span>{s}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 01 Product Launch ─────────────────────────────────────────────── */}
      <section id="service-1" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-start gap-4 mb-12">
            <span className="text-5xl font-black text-violet-100 leading-none select-none">01</span>
            <div>
              <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider">Product Launch Campaigns</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-1">Launch Package</h2>
              <p className="text-slate-500 mt-2 max-w-xl">Instead of simply hiring influencers, ViralBridge creates a coordinated Launch Package around the product.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Interactive Steps */}
            <div>
              <p className="text-sm text-slate-400 mb-5 font-medium">Click each stage to explore the campaign structure</p>
              <div className="flex gap-3 mb-8 flex-wrap">
                {launchSteps.map((step, i) => (
                  <button
                    key={step.id}
                    onClick={() => setLaunchStep(step.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      launchStep === step.id
                        ? `${step.color} text-white shadow-lg scale-105`
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <step.icon className="w-4 h-4" />
                    {step.label}
                    {i < launchSteps.length - 1 && launchStep !== step.id && (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>
                ))}
              </div>

              <div className={`rounded-2xl p-8 border-2 transition-all duration-300 ${
                launchStep === 'creators' ? 'bg-violet-50 border-violet-200' :
                launchStep === 'content' ? 'bg-rose-50 border-rose-200' :
                launchStep === 'distribution'? 'bg-amber-50 border-amber-200' : 'bg-teal-50 border-teal-200'
              }`}>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{activeLaunch.detail.title}</h3>
                <p className="text-slate-600 mb-5 text-sm leading-relaxed">{activeLaunch.detail.desc}</p>
                <ul className="space-y-2">
                  {activeLaunch.detail.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-700 font-medium">
                      <CheckCircle className="w-4 h-4 text-violet-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Campaign Summary */}
            <div className="bg-slate-900 rounded-2xl p-8 text-white">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">Example: New Product Launch</div>
              <div className="space-y-5">
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <div className="text-xs text-slate-400 mb-2">Campaign Network</div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-violet-400" />50 Fitness Creators / Any Niche</div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-rose-400" />25 Nutrition Creators / Any Niche</div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-400" />10 YouTubers</div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <div className="text-xs text-slate-400 mb-2">Content Distribution</div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-teal-400" />200 Reels</div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-400" />Coordinated creator content</div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-400" />Multi-channel distribution</div>
                  </div>
                </div>
                <div className="bg-violet-600/20 rounded-xl p-5 border border-violet-500/30">
                  <div className="text-xs text-violet-300 mb-1">Campaign Outcome</div>
                  <div className="text-3xl font-black text-white">5 Million</div>
                  <div className="text-slate-400 text-sm">Expected Reach</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 02 Movie Promotion ────────────────────────────────────────────── */}
      <section id="service-2" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-start gap-4 mb-12">
            <span className="text-5xl font-black text-slate-200 leading-none select-none">02</span>
            <div>
              <span className="text-rose-600 font-semibold text-sm uppercase tracking-wider">Movie Promotion Campaigns</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-1">Build Buzz Before Release</h2>
              <p className="text-slate-500 mt-2 max-w-xl">Drive trailer views, public discussion, and opening weekend occupancy through coordinated creator campaigns.</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-8">
            <div className="flex items-center gap-0 overflow-x-auto">
              {movieStages.map((stage, i) => (
                <React.Fragment key={stage.id}>
                  <button
                    onClick={() => setMovieStage(stage.id)}
                    className={`flex-shrink-0 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                      movieStage === stage.id
                        ? 'bg-rose-600 text-white shadow-lg'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-rose-300'
                    }`}
                  >
                    {stage.label}
                  </button>
                  {i < movieStages.length - 1 && (
                    <div className={`flex-shrink-0 h-0.5 w-8 mx-1 ${movieStage === stage.id ? 'bg-rose-400' : 'bg-slate-200'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">{activeMovie.label}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">{activeMovie.desc}</p>
              <div className="space-y-3">
                {activeMovie.network.map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-rose-50 rounded-xl px-4 py-3 border border-rose-100">
                    <div className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
                    <span className="text-slate-700 font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 rounded-2xl p-8 text-white">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-6">Campaign Timeline</div>
              <div className="space-y-4">
                {movieStages.map((stage, i) => (
                  <div key={stage.id} className={`flex items-center gap-4 p-4 rounded-xl transition-all ${movieStage === stage.id ? 'bg-rose-600/20 border border-rose-500/30' : 'bg-white/5'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${movieStage === stage.id ? 'bg-rose-500 text-white' : 'bg-white/10 text-slate-400'}`}>{i + 1}</div>
                    <div>
                      <div className={`font-semibold text-sm ${movieStage === stage.id ? 'text-white' : 'text-slate-400'}`}>{stage.label}</div>
                      {movieStage === stage.id && <div className="text-rose-300 text-xs mt-0.5">{stage.desc}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 03 Political Outreach ─────────────────────────────────────────── */}
      <section id="service-3" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-start gap-4 mb-12">
            <span className="text-5xl font-black text-violet-100 leading-none select-none">03</span>
            <div>
              <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider">Political Outreach Campaigns</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-1">Political Campaign Influence Management</h2>
              <p className="text-slate-500 mt-2 max-w-xl">Narrative control, reach, sentiment, visibility, and voter awareness at any scale.</p>
            </div>
          </div>

          {/* Level Selector */}
          <div className="flex gap-3 mb-8">
            {(['district', 'state'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setPoliticalLevel(level)}
                className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${
                  politicalLevel === level
                    ? 'bg-violet-700 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {level === 'district' ? 'District Level' : 'State Level'}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 border-2 border-violet-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">{activePolitical.label} Campaign</h3>
                <span className="bg-violet-100 text-violet-700 text-xs font-bold px-3 py-1.5 rounded-full">Expected Reach: {activePolitical.reach}</span>
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed">{activePolitical.focus}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {activePolitical.network.map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-violet-50 rounded-xl px-4 py-3 border border-violet-100">
                    <CheckCircle className="w-4 h-4 text-violet-600 flex-shrink-0" />
                    <span className="text-slate-700 font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 rounded-2xl p-6 text-white">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-5">Campaign Focus</div>
              {['Narrative Control', 'Reach', 'Sentiment', 'Visibility', 'Voter Awareness'].map((focus) => (
                <div key={focus} className="flex items-center gap-3 py-3 border-b border-white/10 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
                  <span className="text-slate-300 text-sm font-medium">{focus}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 04 Election Awareness ─────────────────────────────────────────── */}
      <section id="service-4" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-start gap-4 mb-12">
            <span className="text-5xl font-black text-slate-200 leading-none select-none">04</span>
            <div>
              <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Election Awareness Programs</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-1">Large-Scale Awareness Campaigns</h2>
              <p className="text-slate-500 mt-2 max-w-xl">Coordinated creator infrastructure for reach, visibility, regional communication, and voter awareness.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: 'Reach', icon: TrendingUp, color: 'bg-indigo-600', desc: 'Millions of voters reached through coordinated creator content.' },
              { label: 'Visibility', icon: Star, color: 'bg-violet-600', desc: 'Consistent presence across social platforms and regions.' },
              { label: 'Regional Communication', icon: Share2, color: 'bg-rose-500', desc: 'Content in regional languages for local voter resonance.' },
              { label: 'Audience Awareness', icon: Users, color: 'bg-amber-500', desc: 'Targeted awareness campaigns for specific voter demographics.' },
              { label: 'Sentiment', icon: Zap, color: 'bg-teal-500', desc: 'Real-time sentiment monitoring and narrative adjustment.' },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.label}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-indigo-900 rounded-2xl p-8 text-white">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold mb-3">Same infrastructure. Awareness-first mission.</h3>
                <p className="text-indigo-200 leading-relaxed">Election Awareness Programs use the same creator and distribution infrastructure as political outreach — but with a focus on civic participation, voter education, and democratic awareness rather than candidate promotion.</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black text-white mb-1">1,000+</div>
                <div className="text-indigo-300">Creators available for awareness campaigns</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 05 App Growth ─────────────────────────────────────────────────── */}
      <section id="service-5" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-start gap-4 mb-12">
            <span className="text-5xl font-black text-violet-100 leading-none select-none">05</span>
            <div>
              <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">App Growth Campaigns</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-1">Turn Creator Attention Into App Growth</h2>
              <p className="text-slate-500 mt-2 max-w-xl">A campaign service that drives app discovery through coordinated creator content — not generic influencer posts.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Flow */}
            <div>
              <p className="text-sm text-slate-400 mb-6 font-medium">Campaign Flow</p>
              <div className="space-y-3">
                {appFlowSteps.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${step.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 bg-slate-50 rounded-xl px-5 py-3 border border-slate-100">
                      <span className="font-semibold text-slate-900">{step.label}</span>
                    </div>
                    {i < appFlowSteps.length - 1 && (
                      <div className="absolute ml-5 mt-12 w-0.5 h-3 bg-slate-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 text-white">
              <Smartphone className="w-10 h-10 text-teal-400 mb-5" />
              <h3 className="text-2xl font-bold mb-4">Campaign-Driven App Discovery</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                App Growth Campaigns coordinate creators to generate authentic content that drives audience curiosity and app discovery — without relying on paid ads alone.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Creator Activation', value: 'Day 1' },
                  { label: 'Content Live', value: 'Day 3–5' },
                  { label: 'Peak Reach', value: 'Day 7' },
                  { label: 'Performance Report', value: 'Day 14' },
                ].map((item) => (
                  <div key={item.label} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-teal-400 font-bold text-lg">{item.value}</div>
                    <div className="text-slate-400 text-xs mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 06 Brand Reputation ───────────────────────────────────────────── */}
      <section id="service-6" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-start gap-4 mb-12">
            <span className="text-5xl font-black text-slate-200 leading-none select-none">06</span>
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Brand Reputation Campaigns</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-1">Know What People Are Saying</h2>
              <p className="text-slate-500 mt-2 max-w-xl">Monitor and shape brand sentiment through creator networks and real-time campaign monitoring.</p>
            </div>
          </div>

          <p className="text-sm text-slate-400 mb-6 font-medium">Click each metric to see campaign details</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {reputationMetrics.map((metric) => (
              <button
                key={metric.id}
                onClick={() => setReputationMetric(metric.id)}
                className={`text-left p-6 rounded-2xl border-2 transition-all ${
                  reputationMetric === metric.id
                    ? `${metric.bg} border-current shadow-lg scale-105`
                    : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'
                }`}
              >
                <div className={`text-2xl font-black mb-1 ${reputationMetric === metric.id ? metric.color : 'text-slate-900'}`}>{metric.value}</div>
                <div className="text-slate-600 text-sm font-medium mb-1">{metric.label}</div>
                <div className={`text-xs font-bold ${metric.color}`}>{metric.change}</div>
              </button>
            ))}
          </div>

          <div className={`rounded-2xl p-8 border-2 transition-all duration-300 ${activeReputation.bg}`}>
            <h3 className={`text-xl font-bold mb-3 ${activeReputation.color}`}>{activeReputation.label}</h3>
            <p className="text-slate-700 leading-relaxed">{activeReputation.detail}</p>
          </div>
        </div>
      </section>

      {/* ─── 07 Creator Whitelisting ────────────────────────────────────────── */}
      <section id="service-7" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-start gap-4 mb-12">
            <span className="text-5xl font-black text-violet-100 leading-none select-none">07</span>
            <div>
              <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider">Creator Whitelisting</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-1">Extend Creator Content</h2>
              <p className="text-slate-500 mt-2 max-w-xl">A premium campaign capability that extends creator content through brand approval and amplification.</p>
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center gap-0 overflow-x-auto pb-4">
              {[
                { label: 'Creator Content', icon: Film, color: 'bg-violet-600', desc: 'Creator produces authentic content for the brand campaign.' },
                { label: 'Brand Approval', icon: CheckCircle, color: 'bg-rose-500', desc: 'Brand reviews and approves content for whitelisting.' },
                { label: 'Whitelisted Content', icon: Shield, color: 'bg-amber-500', desc: 'Approved content is whitelisted under the brand\'s ad account.' },
                { label: 'Extended Distribution', icon: Share2, color: 'bg-teal-500', desc: 'Content reaches far beyond the creator\'s organic audience.' },
              ].map((step, i) => (
                <React.Fragment key={step.label}>
                  <div className="flex-shrink-0 w-56 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className={`w-12 h-12 ${step.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-2">{step.label}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                  {i < 3 && (
                    <div className="flex-shrink-0 flex items-center px-3">
                      <ArrowRight className="w-5 h-5 text-slate-300" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-violet-900 rounded-2xl p-8 text-white grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <Repeat className="w-8 h-8 text-violet-300 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Why Whitelisting Matters</h3>
              <p className="text-violet-200 leading-relaxed">Whitelisted content combines the authenticity of creator content with the targeting precision of paid advertising. Brands can run creator content as ads — reaching audiences far beyond the creator's followers while maintaining the trust of organic content.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Higher CTR', value: '3–5×', sub: 'vs brand ads' },
                { label: 'Lower CPM', value: '40%', sub: 'cost reduction' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 rounded-xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-black text-white">{stat.value}</div>
                  <div className="text-violet-300 text-xs mt-1">{stat.label}</div>
                  <div className="text-violet-400 text-xs">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 08 Meme Network ───────────────────────────────────────────────── */}
      <section id="service-8" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-start gap-4 mb-12">
            <span className="text-5xl font-black text-slate-200 leading-none select-none">08</span>
            <div>
              <span className="text-rose-600 font-semibold text-sm uppercase tracking-wider">Meme Network Distribution</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-1">Go Beyond Influencers</h2>
              <p className="text-slate-500 mt-2 max-w-xl">ViralBridge builds distribution networks beyond traditional creators — reaching audiences through meme pages, college networks, and city communities.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Node Network Visual */}
            <div className="relative h-80 flex items-center justify-center">
              {/* Center */}
              <div className="absolute w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center z-10 shadow-2xl">
                <span className="text-white font-black text-xs text-center leading-tight">CAMPAIGN</span>
              </div>
              {/* Nodes */}
              {memeNodes.map((node) => {
                const rad = (node.angle * Math.PI) / 180;
                const r = 120;
                const x = Math.cos(rad) * r;
                const y = Math.sin(rad) * r;
                const isHovered = hoveredMemeNode === node.id;
                return (
                  <div
                    key={node.id}
                    className="absolute"
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                  >
                    {/* Line to center */}
                    <div
                      className={`absolute w-px transition-all duration-300 origin-bottom ${isHovered ? 'bg-violet-400' : 'bg-slate-300'}`}
                      style={{
                        height: `${r - 48}px`,
                        left: '50%',
                        bottom: '50%',
                        transform: `rotate(${node.angle + 90}deg) translateX(-50%)`,
                      }}
                    />
                    <button
                      onMouseEnter={() => setHoveredMemeNode(node.id)}
                      onMouseLeave={() => setHoveredMemeNode(null)}
                      className={`relative w-20 h-20 rounded-full flex items-center justify-center text-white text-xs font-bold text-center leading-tight transition-all duration-300 shadow-lg ${node.color} ${isHovered ? 'scale-125 shadow-xl' : 'scale-100'}`}
                    >
                      {node.label}
                    </button>
                  </div>
                );
              })}
            </div>

            <div>
              {hoveredMemeNode ? (
                <div className="bg-white rounded-2xl p-8 border-2 border-violet-200 shadow-lg transition-all">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {memeNodes.find((n) => n.id === hoveredMemeNode)?.label}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {memeNodes.find((n) => n.id === hoveredMemeNode)?.desc}
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Distribution Network</h3>
                  <p className="text-slate-500 mb-6 text-sm">Hover over each node to explore the distribution channel.</p>
                  <div className="space-y-3">
                    {memeNodes.map((node) => (
                      <div key={node.id} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                        <div className={`w-3 h-3 rounded-full ${node.color}`} />
                        <span className="font-medium text-slate-700 text-sm">{node.label}</span>
                        <span className="text-slate-400 text-xs ml-auto">{node.desc.split('.')[0]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 09 Trend Takeover ─────────────────────────────────────────────── */}
      <section id="service-9" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-start gap-4 mb-12">
            <span className="text-5xl font-black text-violet-100 leading-none select-none">09</span>
            <div>
              <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Trend Takeover</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-1">Take Over the Conversation</h2>
              <p className="text-slate-500 mt-2 max-w-xl">A rapid campaign structure executed within 48 hours — 100 influencers, 200 meme pages, 50 review creators.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-sm text-slate-400 mb-6 font-medium">Click each component to assemble the campaign</p>
              <div className="space-y-4 mb-8">
                {trendParts.map((part) => (
                  <button
                    key={part.id}
                    onClick={() => toggleTrend(part.id)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                      trendAssembled.includes(part.id)
                        ? `${part.color} border-transparent text-white shadow-lg`
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`font-bold text-lg ${trendAssembled.includes(part.id) ? 'text-white' : 'text-slate-900'}`}>{part.label}</div>
                        <div className={`text-sm mt-0.5 ${trendAssembled.includes(part.id) ? 'text-white/80' : 'text-slate-500'}`}>{part.desc}</div>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${trendAssembled.includes(part.id) ? 'bg-white/20' : 'bg-slate-100'}`}>
                        {trendAssembled.includes(part.id) ? <CheckCircle className="w-5 h-5 text-white" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 text-white">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-6">Campaign Assembly</div>
              <div className="space-y-4 mb-8">
                {trendParts.map((part) => (
                  <div key={part.id} className={`flex items-center gap-4 p-4 rounded-xl transition-all ${trendAssembled.includes(part.id) ? 'bg-white/10 border border-white/20' : 'bg-white/5 opacity-40'}`}>
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${part.color}`} />
                    <span className="font-semibold text-sm">{part.label}</span>
                    {trendAssembled.includes(part.id) && <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />}
                  </div>
                ))}
              </div>
              {trendAssembled.length === 3 ? (
                <div className="bg-amber-500/20 border border-amber-500/40 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-black text-amber-400 mb-1">TREND TAKEOVER</div>
                  <div className="text-slate-300 text-sm">Campaign assembled. Ready to launch in 48 hours.</div>
                </div>
              ) : (
                <div className="bg-white/5 rounded-2xl p-6 text-center border border-white/10">
                  <div className="text-slate-400 text-sm">{3 - trendAssembled.length} component{3 - trendAssembled.length !== 1 ? 's' : ''} remaining</div>
                  <div className="text-slate-500 text-xs mt-1">Select all to assemble the campaign</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 10 Managed Campaign ───────────────────────────────────────────── */}
      <section id="service-10" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-start gap-4 mb-12">
            <span className="text-5xl font-black text-slate-200 leading-none select-none">10</span>
            <div>
              <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Managed Campaign Service</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-1">Done For You Campaign Management</h2>
              <p className="text-slate-500 mt-2 max-w-xl">Many brands don't want to manage creators themselves. ViralBridge handles the entire campaign execution.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-sm text-slate-400 mb-6 font-medium">Click each step to explore the execution process</p>
              <div className="space-y-3">
                {managedSteps.map((step, i) => (
                  <button
                    key={step.label}
                    onClick={() => setManagedStep(i)}
                    className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      managedStep === i
                        ? 'bg-teal-600 border-teal-600 text-white shadow-lg'
                        : 'bg-white border-slate-100 hover:border-teal-200 text-slate-700'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${managedStep === i ? 'bg-white/20' : 'bg-teal-50'}`}>
                      <step.icon className={`w-5 h-5 ${managedStep === i ? 'text-white' : 'text-teal-600'}`} />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-sm">{step.label}</span>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${managedStep === i ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>{i + 1}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 text-white">
              <Settings className="w-10 h-10 text-teal-400 mb-5" />
              <h3 className="text-2xl font-bold mb-4">Full Campaign Execution</h3>
              <p className="text-slate-300 leading-relaxed mb-8">
                The ViralBridge managed service handles everything from strategy to completion. Brands create the campaign brief — we handle the rest.
              </p>
              <div className="space-y-3">
                {managedSteps.map((step, i) => (
                  <div key={step.label} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${managedStep === i ? 'bg-teal-600/20 border border-teal-500/30' : 'bg-white/5'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${managedStep === i ? 'bg-teal-500 text-white' : 'bg-white/10 text-slate-400'}`}>{i + 1}</div>
                    <span className={`text-sm font-medium ${managedStep === i ? 'text-white' : 'text-slate-400'}`}>{step.label}</span>
                    {i < managedStep && <CheckCircle className="w-4 h-4 text-teal-400 ml-auto" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Enterprise Services Hub ────────────────────────────────────────── */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-violet-500/20 text-violet-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-violet-500/30">
              <Star className="w-3.5 h-3.5" /> Enterprise Services
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">ViralBridge Enterprise Services</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Click any service to see its campaign structure and deliverables.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Hub-and-Spoke */}
            <div className="relative h-96 flex items-center justify-center">
              {/* Center Hub */}
              <div className="absolute w-28 h-28 bg-gradient-to-br from-violet-600 to-violet-800 rounded-full flex flex-col items-center justify-center z-10 shadow-2xl shadow-violet-900/50 border-4 border-violet-400/30">
                <Zap className="w-6 h-6 text-violet-200 mb-1" />
                <span className="text-white font-black text-xs text-center leading-tight">VIRAL&lt;br/&gt;BRIDGE</span>
              </div>

              {/* Service Nodes */}
              {enterpriseServices.map((service) => {
                const rad = (service.angle * Math.PI) / 180;
                const r = 150;
                const x = Math.cos(rad) * r;
                const y = Math.sin(rad) * r;
                const isActive = enterpriseSelected === service.id;
                return (
                  <div
                    key={service.id}
                    className="absolute"
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                  >
                    {/* Connector line */}
                    <div
                      className={`absolute w-px transition-all duration-300 origin-bottom ${isActive ? 'bg-violet-400' : 'bg-white/10'}`}
                      style={{
                        height: `${r - 56}px`,
                        left: '50%',
                        bottom: '50%',
                        transform: `rotate(${service.angle + 90}deg) translateX(-50%)`,
                      }}
                    />
                    <button
                      onClick={() => setEnterpriseSelected(service.id)}
                      className={`relative w-20 h-20 rounded-full flex items-center justify-center text-white text-xs font-bold text-center leading-tight transition-all duration-300 shadow-lg ${service.color} ${isActive ? `scale-125 shadow-xl ring-4 ${service.ring}` : 'scale-100 opacity-70 hover:opacity-100 hover:scale-110'}`}
                    >
                      {service.label}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Detail Panel */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur">
              <div className={`w-12 h-12 ${activeEnterprise.color} rounded-2xl flex items-center justify-center mb-5`}>
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{activeEnterprise.title}</h3>
              <p className="text-slate-300 leading-relaxed mb-6">{activeEnterprise.desc}</p>
              <div className="space-y-2">
                {activeEnterprise.deliverables.map((d) => (
                  <div key={d} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                    <CheckCircle className="w-4 h-4 text-violet-400 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{d}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/sign-up-login-screen"
                className="inline-flex items-center gap-2 mt-6 bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors text-sm"
              >
                Plan this campaign <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Ready to run your campaign?</h2>
          <p className="text-lg text-slate-500 mb-8">Tell us your goal. We'll build the creator network around it.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/sign-up-login-screen" className="inline-flex items-center gap-2 bg-violet-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-violet-800 transition-colors text-lg">
              Plan Your Campaign <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-violet-700 font-medium transition-colors">
              Talk to our team →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
