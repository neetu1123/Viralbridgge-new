'use client';
import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/src/components/ui/AppIcon';

const stats = [
  { label: 'Active Campaigns', value: '12,400+' },
  { label: 'Creator Network', value: '85K+' },
  { label: 'Avg. ROI', value: '6.2x' },
];

export default function HeroSection() {
  const linesRef = useRef<HTMLSpanElement[]>([]);
  const [graphProgress, setGraphProgress] = useState(0);

  useEffect(() => {
    // Line reveal with stagger
    linesRef.current.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => {
        el.parentElement?.classList.add('revealed');
      }, 300 + i * 180);
    });

    // Graph animation
    let frame = 0;
    const interval = setInterval(() => {
      frame += 2;
      setGraphProgress(Math.min(frame, 100));
      if (frame >= 100) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const addToRefs = (el: HTMLSpanElement | null, i: number) => {
    if (el) linesRef.current[i] = el;
  };

  // SVG graph path based on progress
  const graphPoints = [
    [0, 80], [15, 72], [30, 68], [45, 55], [60, 48], [75, 35], [90, 22], [100, 12]
  ];
  const pathD = graphPoints
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${(x / 100) * 220} ${y}`)
    .join(' ');

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 px-6 noise-overlay overflow-hidden">
      {/* Background blobs */}
      <div
        className="blob absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
      />
      <div
        className="blob absolute bottom-10 right-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)', animationDelay: '4s' }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT: Typography */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border outline-primary bg-primary/10 mb-8 scroll-reveal-hidden revealed">
              <span className="w-2 h-2 rounded-full bg-vb-green pulse-dot" />
              <span className="text-xs font-display font-600 text-primary-light uppercase tracking-widest">
                Live Platform · 85K+ Creators
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-800 leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}>
              <span className="line-reveal">
                <span ref={el => addToRefs(el, 0)} className="block text-fg">Launch Influencer</span>
              </span>
              <span className="line-reveal">
                <span ref={el => addToRefs(el, 1)} className="block text-fg">Campaigns in</span>
              </span>
              <span className="line-reveal">
                <span ref={el => addToRefs(el, 2)} className="block gradient-text">Minutes — Not Weeks</span>
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-fg-muted leading-relaxed max-w-xl mb-10 scroll-reveal-hidden" style={{ transitionDelay: '0.6s' }}>
              Real-time tracking. Pay-as-you-go. No agencies.
              Start, scale, and optimize campaigns instantly.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-14 scroll-reveal-hidden" style={{ transitionDelay: '0.75s' }}>
              <a
                href="#final-cta"
                className="btn-primary text-white font-display font-700 px-8 py-4 rounded-full text-base flex items-center gap-2 group"
              >
                Start Campaign
                <Icon name="ArrowRightIcon" size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#creators"
                className="border border-white/15 text-fg font-display font-600 px-8 py-4 rounded-full text-base hover:border-primary/50 hover:bg-primary/10 transition-all"
              >
                Explore Creators
              </a>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 scroll-reveal-hidden" style={{ transitionDelay: '0.9s' }}>
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="font-display font-800 text-2xl text-fg">{s.value}</div>
                  <div className="text-xs text-fg-dim font-medium mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Dashboard Mock */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm animate-float">
              {/* Main dashboard card */}
              <div className="gradient-border glow-violet rounded-2xl p-5 bg-surface">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-vb-green pulse-dot" />
                    <span className="text-xs font-display font-600 text-fg-muted">Live Dashboard</span>
                  </div>
                  <span className="text-[10px] font-mono text-primary-light bg-primary/10 px-2 py-1 rounded-full">
                    ↑ Trending Delhi
                  </span>
                </div>

                {/* Metric row */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="bg-surface-2 rounded-xl p-3">
                    <div className="text-[10px] text-fg-dim mb-1">Views</div>
                    <div className="font-display font-800 text-base text-fg">1.2M</div>
                    <div className="text-[10px] text-vb-green font-600">+18%</div>
                  </div>
                  <div className="bg-surface-2 rounded-xl p-3">
                    <div className="text-[10px] text-fg-dim mb-1">Engagement</div>
                    <div className="font-display font-800 text-base text-fg">+32%</div>
                    <div className="text-[10px] text-vb-green font-600">↑</div>
                  </div>
                  <div className="bg-surface-2 rounded-xl p-3">
                    <div className="text-[10px] text-fg-dim mb-1">Reach</div>
                    <div className="font-display font-800 text-base text-fg">3.5M</div>
                    <div className="text-[10px] text-vb-green font-600">₹12K</div>
                  </div>
                </div>

                {/* Mini graph */}
                <div className="bg-surface-2 rounded-xl p-3 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-fg-dim">Campaign Performance</span>
                    <span className="text-[10px] text-accent font-600">Last 7 days</span>
                  </div>
                  <svg viewBox="0 0 220 100" className="w-full h-20">
                    <defs>
                      <linearGradient id="graphGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                      </linearGradient>
                      <clipPath id="graphClip">
                        <rect x="0" y="0" width={`${graphProgress * 2.2}`} height="100" />
                      </clipPath>
                    </defs>
                    {/* Area fill */}
                    <path
                      d={`${pathD} L 220 100 L 0 100 Z`}
                      fill="url(#graphGrad)"
                      clipPath="url(#graphClip)"
                    />
                    {/* Line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#7C3AED"
                      strokeWidth="2"
                      strokeLinecap="round"
                      clipPath="url(#graphClip)"
                    />
                    {/* Accent line */}
                    <path
                      d="M 0 85 L 40 80 L 80 72 L 120 65 L 160 58 L 220 50"
                      fill="none"
                      stroke="#F97316"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                      strokeLinecap="round"
                      clipPath="url(#graphClip)"
                    />
                    {/* Latest dot */}
                    {graphProgress >= 98 && (
                      <circle cx="220" cy="12" r="4" fill="#7C3AED">
                        <animate attributeName="r" values="4;6;4" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    )}
                  </svg>
                </div>

                {/* Budget row */}
                <div className="flex items-center justify-between bg-accent/10 border border-accent/20 rounded-xl px-4 py-3">
                  <div>
                    <div className="text-[10px] text-fg-dim mb-0.5">Budget Spent</div>
                    <div className="font-display font-800 text-accent text-base">₹12,000</div>
                  </div>
                  <Icon name="ArrowRightIcon" size={16} className="text-accent/50" />
                  <div className="text-right">
                    <div className="text-[10px] text-fg-dim mb-0.5">Total Reach</div>
                    <div className="font-display font-800 text-vb-green text-base">3.5M</div>
                  </div>
                </div>
              </div>

              {/* Floating badge: trending */}
              <div className="absolute -top-4 -right-4 bg-accent text-white text-[11px] font-display font-700 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                🔥 Trending in Delhi
              </div>

              {/* Floating mini card: creator joined */}
              <div className="absolute -bottom-5 -left-6 bg-surface-2 border border-white/8 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm">👤</div>
                <div>
                  <div className="text-[10px] text-fg-dim">Creator joined</div>
                  <div className="text-xs font-display font-700 text-fg">Riya Sharma</div>
                </div>
                <span className="w-2 h-2 rounded-full bg-vb-green pulse-dot ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}