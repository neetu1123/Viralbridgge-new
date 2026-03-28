'use client';
import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/src/components/ui/AppIcon';

export default function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    // Mock submit handler — connect to backend/email service here
    setSubmitted(true);
  };

  return (
    <section id="final-cta" ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
      {/* Blobs */}
      <div
        className="blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(ellipse, #7C3AED 0%, transparent 70%)' }}
      />
      <div
        className="blob absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)', animationDelay: '3s' }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border outline-primary mb-8 ">
          <span className="w-2 h-2 rounded-full bg-vb-green pulse-dot" />
          <span className="text-xs font-display font-600 text-primary-light uppercase tracking-widest">
            Join 2,400+ brands already live
          </span>
        </div>

        {/* Headline */}
        <h2
          className="font-display font-800 text-fg leading-tight mb-6 scroll-reveal-hidden"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)' }}
        >
          Start Your First Campaign{' '}
          <span className="gradient-text"><i>today</i></span>
        </h2>

        <p className="text-lg text-fg-muted mb-12 scroll-reveal-hidden">
          Launch in minutes. Scale instantly. Track everything.
        </p>

        {/* Form */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="scroll-reveal-hidden"
          >
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  placeholder="Enter your work email"
                  className="w-full bg-surface border outline-primary rounded-full px-6 py-4 text-sm text-fg placeholder:text-fg-dim focus:outline-none focus:border-primary/60 transition-colors font-body"
                  aria-label="Work email address"
                />
              </div>
              <button
                type="submit"
                className="btn-primary text-white font-display font-700 px-8 py-4 rounded-full text-sm flex items-center justify-center gap-2 group whitespace-nowrap"
              >
                Start Campaign
                <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            {error && (
              <p className="text-xs text-vb-red mt-2">{error}</p>
            )}
            <p className="text-xs text-fg-dim mt-3">
              No credit card required · Free to start · Cancel anytime
            </p>
          </form>
        ) : (
          <div className="scroll-reveal-hidden revealed bg-vb-green/10 border border-vb-green/30 rounded-2xl px-8 py-6 max-w-md mx-auto">
            <Icon name="CheckCircleIcon" size={32} className="text-vb-green mx-auto mb-3" variant="solid" />
            <h3 className="font-display font-700 text-fg text-lg mb-1">You&apos;re on the list!</h3>
            <p className="text-sm text-fg-muted">We&apos;ll reach out with your campaign setup link shortly.</p>
          </div>
        )}

        {/* Social proof row */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-14 scroll-reveal-hidden">
          {[
            { val: '85K+', label: 'Creators' },
            { val: '₹2Cr+', label: 'Campaigns Launched' },
            { val: '6.2x', label: 'Avg. ROI' },
            { val: '4.9★', label: 'Brand Rating' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display font-800 text-xl text-fg">{s.val}</div>
              <div className="text-xs text-fg-dim mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}