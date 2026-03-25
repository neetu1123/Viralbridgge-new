'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/src/components/ui/AppIcon';

const rows = [
  {
    feature: 'Campaign Setup Time',
    agency: 'Days to weeks',
    vb: 'Under 5 minutes',
    agencyBad: true,
  },
  {
    feature: 'Minimum Spend',
    agency: '₹50,000+',
    vb: 'Start with ₹500',
    agencyBad: true,
  },
  {
    feature: 'Performance Visibility',
    agency: 'Weekly PDF reports',
    vb: 'Real-time dashboard',
    agencyBad: true,
  },
  {
    feature: 'Creator Selection',
    agency: 'Agency decides',
    vb: 'You choose, AI assists',
    agencyBad: true,
  },
  {
    feature: 'Pricing Model',
    agency: 'Retainer + 20–30% markup',
    vb: 'Pay per performance',
    agencyBad: true,
  },
  {
    feature: 'Contract Required',
    agency: '3–6 month lock-in',
    vb: 'No contracts, ever',
    agencyBad: true,
  },
  {
    feature: 'Campaign Adjustments',
    agency: 'Call your account manager',
    vb: 'Instant, from dashboard',
    agencyBad: true,
  },
];

export default function AgencyComparison() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.scroll-reveal-hidden').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 60);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section id="compare" ref={sectionRef} className="py-28 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249,115,22,0.05) 0%, transparent 60%)' }} />
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16 scroll-reveal-hidden">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border outline-primary mb-8 ">
          <span className="w-2 h-2 rounded-full bg-vb-green pulse-dot" />
          <span className="text-xs font-display font-600 text-primary-light uppercase tracking-widest">
 The Honest Comparison
          </span>
        </div>
          <h2 className="font-display font-800 text-fg mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Why Brands Are Switching{' '}
            <span className="gradient-text">from Agencies</span>
          </h2>
          <p className="text-fg-muted text-lg max-w-xl mx-auto">
            Traditional agencies were built for a different era. Viralbridgge is built for speed.
          </p>
        </div>

        {/* Table */}
        <div className="gradient-border rounded-2xl overflow-hidden scroll-reveal-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/8">
                <th className="text-left px-6 py-5 text-xs font-display font-700 uppercase tracking-widest text-fg-dim w-1/3">
                  Feature
                </th>
                <th className="px-6 py-5 text-center w-1/3">
                  <div className="flex items-center justify-center gap-2">
                    <Icon name="BuildingOfficeIcon" size={16} className="text-fg-dim" />
                    <span className="text-xs font-display font-700 uppercase tracking-widest text-fg-dim">
                      Traditional Agency
                    </span>
                  </div>
                </th>
                <th className="px-6 py-5 text-center w-1/3"
                  style={{ background: 'rgba(124,58,237,0.08)' }}>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm">⚡</span>
                    <span className="text-xs font-display font-700 uppercase tracking-widest text-primary">
                      Viralbridgge
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows?.map((row, i) => (
                <tr
                  key={i}
                  className={`compare-row border-b border-white/5 last:border-0 scroll-reveal-hidden transition-colors`}
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-display font-600 text-fg-muted">{row?.feature}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Icon name="XMarkIcon" size={14} className="text-vb-red flex-shrink-0" />
                      <span className="text-sm text-fg-dim">{row?.agency}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center"
                    style={{ background: 'rgba(124,58,237,0.04)' }}>
                    <div className="flex items-center justify-center gap-2">
                      <Icon name="CheckIcon" size={14} className="text-vb-green flex-shrink-0" />
                      <span className="text-sm font-display font-600 text-fg">{row?.vb}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom CTA nudge */}
        <div className="text-center mt-12 scroll-reveal-hidden">
          <p className="text-fg-muted text-base mb-6">
            Join <span className="text-fg font-display font-700">2,400+ brands</span> who switched to Viralbridgge in 2025.
          </p>
          <a
            href="#final-cta"
            className="btn-primary text-white font-display font-700 px-8 py-4 rounded-full text-base inline-flex items-center gap-2 group shadow-lg transition-all duration-300 hover:scale-105"
          >
            Switch Today — It&apos;s Free
            <Icon name="ArrowRightIcon" size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}