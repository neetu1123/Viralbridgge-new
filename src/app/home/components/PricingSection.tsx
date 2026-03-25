'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/src/components/ui/AppIcon';

const walletTiers = [
  {
    amount: '₹2,000',
    label: 'Starter',
    reach: '~200K reach',
    perks: ['5 creator invites', 'Basic analytics', 'Instagram + YouTube'],
    highlight: false,
  },
  {
    amount: '₹5,000',
    label: 'Growth',
    reach: '~600K reach',
    perks: ['15 creator invites', 'Real-time dashboard', 'All platforms', 'Priority support'],
    highlight: true,
  },
  {
    amount: '₹15,000',
    label: 'Scale',
    reach: '~2M reach',
    perks: ['Unlimited invites', 'Advanced ROI tracking', 'Dedicated manager', 'Custom reports'],
    highlight: false,
  },
];

const highlights = [
  { icon: 'WalletIcon' as const, title: 'Wallet-Based', desc: 'Top up anytime. Spend only when creators deliver.' },
  { icon: 'BoltIcon' as const, title: 'No Minimum', desc: 'Start with ₹500. Scale when you see results.' },
  { icon: 'ChartBarIcon' as const, title: 'Pay Per Performance', desc: 'Only pay when campaign goals are met.' },
];

export default function PricingSection() {
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
    <section id="pricing" ref={sectionRef} className="py-28 px-6 relative">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(124,58,237,0.08) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16 scroll-reveal-hidden">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border outline-primary mb-8 ">
          <span className="w-2 h-2 rounded-full bg-vb-green pulse-dot" />
          <span className="text-xs font-display font-600 text-primary-light uppercase tracking-widest">
 Transparent Pricing
          </span>
        </div>
        
          <h2 className="font-display font-800 text-fg mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Simple, Transparent Pricing
          </h2>
          <p className="text-fg-muted text-lg max-w-xl mx-auto">
            Recharge ₹5,000 → Launch instantly. No contracts. No hidden fees. No agency markups.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {highlights.map((h, i) => (
            <div
              key={i}
              className="scroll-reveal-hidden bg-surface border border-primary/10 rounded-2xl p-6 flex items-start gap-4 card-hover hover:border-accent hover:shadow-lg transition-all"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)' }}>
                <Icon name={h.icon} size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-display font-700 text-fg mb-1">{h.title}</div>
                <div className="text-sm text-fg-muted">{h.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Wallet tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {walletTiers.map((tier, i) => (
            <div
              key={i}
              className={`scroll-reveal-hidden card-hover rounded-2xl p-8 relative overflow-hidden hover:border-accent/60 hover:shadow-lg transition-all ${
                tier.highlight
                  ? 'glow-violet'
                  : 'bg-surface border border-white/6'
              }`}
              style={{
                transitionDelay: `${i * 0.12}s`,
                ...(tier.highlight ? {
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(124,58,237,0.08) 100%)',
                  border: '1px solid rgba(124,58,237,0.4)',
                } : { border: '1px solid rgba(124,58,237,0.4)'}),
              }}
            >
              {tier.highlight && (
                <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-display font-700 uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <div className="text-xs font-display font-700 uppercase tracking-widest text-fg-dim mb-2">{tier.label}</div>
                <div className="font-display font-800 text-4xl text-fg mb-1">{tier.amount}</div>
                <div className="text-sm text-vb-green font-display font-600">{tier.reach}</div>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.perks.map(perk => (
                  <li key={perk} className="flex items-center gap-3 text-sm text-fg-muted">
                    <Icon name="CheckCircleIcon" size={16} className="text-vb-green flex-shrink-0" variant="solid" />
                    {perk}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3.5 rounded-full font-display font-700 text-sm transition-all ${
                  tier.highlight
                    ? 'btn-primary text-white' :'border outline-primary text-fg hover:border-accent hover:bg-accent/10 transition-all'
                }`}
              >
                Recharge Wallet
              </button>
            </div>
          ))}
        </div>

        {/* Fine print */}
        <p className="text-center text-xs text-fg-dim mt-8 scroll-reveal-hidden">
          Unused wallet balance never expires · GST included · Refunds available within 7 days
        </p>
      </div>
    </section>
  );
}