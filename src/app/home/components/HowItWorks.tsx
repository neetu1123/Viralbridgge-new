'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/src/components/ui/AppIcon';

const steps = [
  {
    number: '01',
    icon: 'RocketLaunchIcon' as const,
    title: 'Create Campaign',
    description: 'Set your budget, platform, and goals in minutes. No forms, no waiting. Your campaign brief is live instantly.',
    detail: 'Budget • Platform • Goals • Timeline',
    color: '#7C3AED',
    span: 'col-span-1 md:col-span-2',
    tall: false,
  },
  {
    number: '02',
    icon: 'UserGroupIcon' as const,
    title: 'Get Matched with Creators',
    description: 'Our algorithm surfaces the highest-performing creators for your niche, budget, and target audience. Invite in one click.',
    detail: '85K+ creators · AI-matched · Instant connect',
    color: '#F97316',
    span: 'col-span-1',
    tall: true,
  },
  {
    number: '03',
    icon: 'ChartBarIcon' as const,
    title: 'Track Performance Live',
    description: 'Monitor reach, engagement, and ROI in real-time. Every rupee tracked. Pause, scale, or optimize without picking up the phone.',
    detail: 'Real-time · ROI tracking · Full control',
    color: '#22C55E',
    span: 'col-span-1',
    tall: false,
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.scroll-reveal-hidden').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-28 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-16 scroll-reveal-hidden">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border outline-primary mb-8 ">
          <span className="w-2 h-2 rounded-full bg-vb-green pulse-dot" />
          <span className="text-xs font-display font-600 text-primary-light uppercase tracking-widest">
Simple by Design
          </span>
        </div>
          
          <h2 className="font-display font-800 text-fg leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Launch Campaigns in{' '}
            <span className="gradient-text">3 Simple Steps</span>
          </h2>
        </div>

        {/* Bento grid — asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Step 01 — spans 2 cols */}
          <div className="md:col-span-2 scroll-reveal-hidden">
            <div className="gradient-border card-hover h-full rounded-2xl p-8 relative overflow-hidden group hover:border-accent hover:shadow-lg transition-all">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
              <div className="flex items-start justify-between mb-6">
                <span className="font-display font-800 text-5xl text-white/5 select-none">01</span>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}>
                  <Icon name="RocketLaunchIcon" size={22} className="text-primary" />
                </div>
              </div>
              <h3 className="font-display font-800 text-2xl text-fg mb-3">Create Campaign</h3>
              <p className="text-fg-muted leading-relaxed mb-6 max-w-md">
                Set your budget, platform, and goals in minutes. No forms, no waiting. Your campaign brief is live instantly.
              </p>
              {/* Mini UI preview */}
              <div className="flex flex-wrap gap-2">
                {['₹5K Budget', 'Instagram', 'Fashion', 'Delhi NCR', '7 days'].map(tag => (
                  <span key={tag} className="text-xs font-display font-600 text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Step 02 — tall card */}
          <div className="md:row-span-2 scroll-reveal-hidden" style={{ transitionDelay: '0.15s' }}>
            <div className="gradient-border card-hover h-full rounded-2xl p-8 relative overflow-hidden group min-h-[360px] hover:border-accent hover:shadow-lg transition-all">
              <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />
              <div className="flex items-start justify-between mb-6">
                <span className="font-display font-800 text-5xl text-white/5 select-none">02</span>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)' }}>
                  <Icon name="UserGroupIcon" size={22} className="text-accent" />
                </div>
              </div>
              <h3 className="font-display font-800 text-2xl text-fg mb-3">Get Matched with Creators</h3>
              <p className="text-fg-muted leading-relaxed mb-6">
                AI surfaces the highest-performing creators for your niche, budget, and audience. Invite in one click.
              </p>
              {/* Creator mini cards */}
              <div className="space-y-3">
                {[
                  { name: 'Riya Sharma', niche: 'Lifestyle', score: 87 },
                  { name: 'Arjun Mehta', niche: 'Tech', score: 92 },
                  { name: 'Priya Nair', niche: 'Fitness', score: 79 },
                ].map(c => (
                  <div key={c.name} className="flex items-center justify-between bg-surface-2 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 text-sm flex items-center justify-center">
                        {c.name[0]}
                      </div>
                      <div>
                        <div className="text-xs font-display font-700 text-fg">{c.name}</div>
                        <div className="text-[10px] text-fg-dim">{c.niche}</div>
                      </div>
                    </div>
                    <div className="text-xs font-display font-700 text-accent">⚡ {c.score}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 03 */}
          <div className="md:col-span-2 scroll-reveal-hidden" style={{ transitionDelay: '0.3s' }}>
            <div className="gradient-border card-hover h-full rounded-2xl p-8 relative overflow-hidden group hover:border-accent hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-6">
                <span className="font-display font-800 text-5xl text-white/5 select-none">03</span>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)' }}>
                  <Icon name="ChartBarIcon" size={22} className="text-vb-green" />
                </div>
              </div>
              <h3 className="font-display font-800 text-2xl text-fg mb-3">Track Performance Live</h3>
              <p className="text-fg-muted leading-relaxed mb-6 max-w-md">
                Monitor reach, engagement, and ROI in real-time. Every rupee tracked. Pause, scale, or optimize without picking up the phone.
              </p>
              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Reach', val: '3.5M', up: true },
                  { label: 'Engagement', val: '+32%', up: true },
                  { label: 'ROI', val: '6.2x', up: true },
                ].map(s => (
                  <div key={s.label} className="bg-surface-2 rounded-xl p-3 text-center">
                    <div className="font-display font-800 text-lg text-vb-green">{s.val}</div>
                    <div className="text-[10px] text-fg-dim mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}