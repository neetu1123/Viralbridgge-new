'use client';
import React, { useEffect, useRef, useState } from 'react';


const campaignCards = [
  { name: 'Summer Fashion Drop', platform: 'Instagram', reach: '1.2M', spend: '₹8,000', roi: '5.8x', status: 'live', change: '+22%' },
  { name: 'Tech Gadget Launch', platform: 'YouTube', reach: '680K', spend: '₹12,000', roi: '4.2x', status: 'live', change: '+18%' },
  { name: 'Fitness Challenge', platform: 'Reels', reach: '2.1M', spend: '₹15,000', roi: '7.1x', status: 'paused', change: '+34%' },
];

// SVG line graph data points
const lineData = [
  { x: 0, y: 80 }, { x: 1, y: 72 }, { x: 2, y: 74 }, { x: 3, y: 60 },
  { x: 4, y: 55 }, { x: 5, y: 48 }, { x: 6, y: 38 }, { x: 7, y: 30 },
  { x: 8, y: 22 }, { x: 9, y: 15 },
];

const W = 400, H = 100;
const toSVG = (pts: typeof lineData) =>
  pts.map(p => `${(p.x / 9) * W} ${p.y}`).join(' L ');

export default function DashboardPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const [activeTab, setActiveTab] = useState<'views' | 'engagement' | 'roi'>('views');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animated) {
            setAnimated(true);
            entry.target.querySelectorAll('.scroll-reveal-hidden').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animated]);

  const tabColors = { views: '#7C3AED', engagement: '#F97316', roi: '#22C55E' };

  return (
    <section id="dashboard" ref={sectionRef} className="py-28 px-6 relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16 scroll-reveal-hidden">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border outline-primary mb-8 ">
          <span className="w-2 h-2 rounded-full bg-vb-green pulse-dot" />
          <span className="text-xs font-display font-600 text-primary-light uppercase tracking-widest">
 Real-Time Intelligence
          </span>
        </div>
         
          <h2 className="font-display font-800 text-fg mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Track Everything in{' '}
            <span className="gradient-text">Real-Time</span>
          </h2>
          <p className="text-fg-muted text-lg max-w-xl mx-auto">
            Live performance graphs, engagement spikes, ROI tracking — all in one dashboard.
          </p>
        </div>

        {/* Dashboard UI mock */}
        <div className="gradient-border rounded-3xl p-1 scroll-reveal-hidden glow-violet">
          <div className="bg-surface rounded-[22px] overflow-hidden">
            {/* Dashboard topbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-vb-red" />
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <div className="w-3 h-3 rounded-full bg-vb-green" />
                </div>
                <span className="text-xs text-fg-dim font-mono">viralbridgge.app/dashboard</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-fg-dim">
                <span className="w-2 h-2 rounded-full bg-vb-green pulse-dot" />
                <span>Live · Updated just now</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
              {/* LEFT: Graph panel */}
              <div className="lg:col-span-2 p-6">
                {/* Tab selector */}
                <div className="flex items-center gap-2 mb-6">
                  {(['views', 'engagement', 'roi'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-xs font-display font-600 px-4 py-2 rounded-full transition-all capitalize ${
                        activeTab === tab
                          ? 'text-white' :'text-fg-dim hover:text-accent transition-colors'
                      }`}
                      style={activeTab === tab ? { background: tabColors[tab] } : {}}
                    >
                      {tab === 'roi' ? 'ROI' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                  <div className="ml-auto text-xs text-fg-dim">Last 10 days</div>
                </div>

                {/* Main graph */}
                <div className="relative">
                  <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full h-40" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={tabColors[activeTab]} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={tabColors[activeTab]} stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    {[20, 40, 60, 80].map(y => (
                      <line key={y} x1="0" y1={y} x2={W} y2={y}
                        stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    ))}
                    {/* Area */}
                    <path
                      d={`M 0 ${lineData[0].y} L ${toSVG(lineData)} L ${W} ${H + 20} L 0 ${H + 20} Z`}
                      fill="url(#areaGrad)"
                      className={animated ? 'opacity-100 transition-opacity duration-1000' : 'opacity-0'}
                    />
                    {/* Line */}
                    <polyline
                      points={toSVG(lineData)}
                      fill="none"
                      stroke={tabColors[activeTab]}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={animated ? 'draw-line' : ''}
                    />
                    {/* Data points */}
                    {lineData.map((pt, i) => (
                      <circle
                        key={i}
                        cx={(pt.x / 9) * W}
                        cy={pt.y}
                        r="4"
                        fill={tabColors[activeTab]}
                        className={animated ? 'opacity-100 transition-opacity duration-700' : 'opacity-0'}
                        style={{ transitionDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </svg>

                  {/* Spike annotation */}
                  <div className="absolute top-2 right-8 bg-vb-green/20 border border-vb-green/30 rounded-xl px-3 py-2 text-xs font-display font-700 text-vb-green">
                    ↑ Engagement spike +34%
                  </div>
                </div>

                {/* X axis labels */}
                <div className="flex justify-between text-[10px] text-fg-dim mt-2 px-1">
                  {['Mar 10', 'Mar 12', 'Mar 14', 'Mar 16', 'Mar 18', 'Mar 19'].map(d => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
              </div>

              {/* RIGHT: Campaign cards */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm font-display font-700 text-fg">Active Campaigns</span>
                  <span className="text-xs text-primary font-600 hover:text-accent transition-colors cursor-pointer">View All</span>
                </div>
                <div className="space-y-4">
                  {campaignCards.map((c, i) => (
                    <div
                      key={i}
                      className="bg-surface-2 rounded-xl p-4 card-hover cursor-default hover:border-accent/40 hover:shadow-lg transition-all"
                      style={{border: '1px solid var(--color-button-main)'  }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-xs font-display font-700 text-fg leading-snug">{c.name}</div>
                          <div className="text-[10px] text-fg-dim mt-0.5">{c.platform}</div>
                        </div>
                        <span
                          className={`text-[10px] font-display font-700 px-2 py-0.5 rounded-full ${
                            c.status === 'live' ?'bg-vb-green/15 text-vb-green' :'bg-accent/15 text-accent'
                          }`}
                        >
                          {c.status === 'live' ? '● Live' : '⏸ Paused'}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <div className="text-[9px] text-fg-dim">Reach</div>
                          <div className="text-xs font-display font-700 text-fg">{c.reach}</div>
                        </div>
                        <div>
                          <div className="text-[9px] text-fg-dim">Spend</div>
                          <div className="text-xs font-display font-700 text-fg">{c.spend}</div>
                        </div>
                        <div>
                          <div className="text-[9px] text-fg-dim">ROI</div>
                          <div className="text-xs font-display font-700 text-vb-green">{c.roi}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary stat */}
                <div className="mt-5 bg-primary/10 border border-primary/20 rounded-xl p-4">
                  <div className="text-[10px] text-fg-dim mb-1">Total Campaign Reach</div>
                  <div className="font-display font-800 text-2xl text-fg">4.0M</div>
                  <div className="text-xs text-vb-green font-600 mt-0.5">↑ +28% this week</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}