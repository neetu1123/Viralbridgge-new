'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/src/components/ui/AppImage';

const creatorAvatars = [
  { src: "https://images.unsplash.com/photo-1610533384348-bb69420eb838", alt: 'Creator Priya Sharma, lifestyle influencer' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1be15d8e9-1772068858387.png", alt: 'Creator Marcus Williams, fitness influencer' },
  { src: "https://images.unsplash.com/photo-1695141306855-d2fb0ade5c33", alt: 'Creator Sofia Reyes, fashion influencer' },
];

export default function HeroSection() {
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dashboardRef.current;
    if (!el) return;
    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
      el.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
    };
    const onMouseLeave = () => {
      el.style.transform = 'perspective(1000px) rotateY(-4deg) rotateX(2deg)';
    };
    document.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section
      className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden"
      style={{ background: '#F7F8FC' }}
    >
      {/* Background gradient glow — top right */}
      <div
        className="absolute top-[-120px] right-[-120px] w-[650px] h-[650px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(106,0,244,0.12) 0%, rgba(208,0,255,0.06) 50%, transparent 80%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Background gradient glow — bottom left */}
      <div
        className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,122,0,0.10) 0%, rgba(106,0,244,0.05) 60%, transparent 80%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(106,0,244,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(106,0,244,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* ── LEFT — Content ── */}
          <div className="space-y-8">

            {/* Badge */}
            <div className="animate-clip-in">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
                style={{
                  background: 'linear-gradient(135deg, rgba(106,0,244,0.10), rgba(208,0,255,0.08))',
                  border: '1px solid rgba(106,0,244,0.20)',
                  color: '#6A00F4',
                }}
              >
                {/* Live dot */}
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: '#6A00F4' }}
                />
                Live on 3,200+ active campaigns
              </span>
            </div>

            {/* Headline */}
            <div className="animate-clip-in delay-100">
              <h1
                className="font-display text-[52px] lg:text-[60px] font-bold leading-[1.08] tracking-tight"
                style={{ color: '#0B132B' }}
              >
                From Launch to
                <br />
                Viral — In{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #6A00F4, #D000FF, #FF7A00)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  <i>Minutes</i>,
                </span>
                <br />
                <span
                  className="text-[42px] lg:text-[50px] font-light"
                  style={{ color: '#6B7280' }}
                >
                  Not Weeks
                </span>
              </h1>
            </div>

            {/* Subheading */}
            <p
              className="animate-fade-up delay-200 text-[17px] leading-relaxed max-w-[520px]"
              style={{ color: '#6B7280' }}
            >
              ViralBridgge connects brands with high-performing creators and
              influencers with brand deals. Real-time ROI tracking, verified creators,
              performance-based pricing.
            </p>

            {/* CTA row */}
            <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Primary CTA — Orange */}
              <Link
                href="#"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold text-white transition-all duration-200 shadow-md"
               
                onMouseEnter={e => (e.currentTarget.style.background = 'btn-primary')}
                onMouseLeave={e => (e.currentTarget.style.background = 'btn-primary')}
              >
                Launch Your Campaign
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              {/* Secondary CTA — Purple */}
              <Link
                href="#marketplace"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold text-white transition-all duration-200"
                style={{
                  background: '#6A00F4',
                  boxShadow: '0 4px 18px rgba(106,0,244,0.25)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#5800CC')}
                onMouseLeave={e => (e.currentTarget.style.background = '#6A00F4')}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor" />
                </svg>
                Browse Creators
              </Link>
            </div>

            {/* Trust line */}
            <div className="animate-fade-up delay-400 flex items-center gap-3">
              <div className="flex -space-x-2">
                {creatorAvatars.map((av, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                    <AppImage src={av.src} alt={av.alt} width={32} height={32} className="object-cover w-full h-full" />
                  </div>
                ))}
              </div>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Trusted by{' '}
                <span className="font-semibold" style={{ color: '#0B132B' }}>500+ brands</span>{' '}
                and{' '}
                <span className="font-semibold" style={{ color: '#0B132B' }}>12K+ creators</span>
              </p>
            </div>
          </div>

          {/* ── RIGHT — Dashboard Mock UI ── */}
          <div className="relative flex justify-center lg:justify-end">
            <div
              ref={dashboardRef}
              className="relative w-full max-w-[540px]"
              style={{
                transform: 'perspective(1000px) rotateY(-4deg) rotateX(2deg)',
                transition: 'transform 0.3s ease-out',
              }}
            >
              {/* Main dashboard card */}
              <div
                className="rounded-2xl p-5 animate-clip-in delay-300"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.07)',
                }}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                      Campaign Overview
                    </p>
                    <p className="text-base font-semibold mt-0.5" style={{ color: '#0B132B' }}>
                      Q1 2026 Performance
                    </p>
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: 'rgba(106,0,244,0.08)',
                      color: '#6A00F4',
                      border: '1px solid rgba(106,0,244,0.15)',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#6A00F4' }} />
                    Live
                  </span>
                </div>

                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: 'Total Views', value: '2.4M', change: '+18%' },
                    { label: 'Engagement', value: '8.2%', change: '+2.1%' },
                    { label: 'Avg ROI', value: '3.4x', change: '+0.6x' },
                  ].map((m, i) => (
                    <div key={i} className="rounded-xl p-3" style={{ background: '#F7F8FC' }}>
                      <p className="text-xs mb-1" style={{ color: '#6B7280' }}>{m.label}</p>
                      <p className="font-bold text-xl" style={{ color: '#0B132B' }}>{m.value}</p>
                      <p className="text-xs font-semibold mt-0.5" style={{ color: '#16a34a' }}>{m.change}</p>
                    </div>
                  ))}
                </div>

                {/* SVG Chart */}
                <div className="rounded-xl p-4 mb-4" style={{ background: '#F7F8FC' }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#6B7280' }}>
                    Views over time
                  </p>
                  <svg viewBox="0 0 360 90" className="w-full h-20" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6A00F4" stopOpacity="0.20" />
                        <stop offset="100%" stopColor="#6A00F4" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#6A00F4" />
                        <stop offset="60%" stopColor="#D000FF" />
                        <stop offset="100%" stopColor="#FF7A00" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,72 L30,65 L60,58 L90,52 L120,44 L150,38 L180,30 L210,24 L240,18 L270,14 L300,10 L330,7 L360,4 L360,90 L0,90 Z"
                      fill="url(#chartGrad)"
                    />
                    <path
                      d="M0,72 L30,65 L60,58 L90,52 L120,44 L150,38 L180,30 L210,24 L240,18 L270,14 L300,10 L330,7 L360,4"
                      fill="none"
                      stroke="url(#lineGrad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {[30, 90, 150, 210, 270, 330].map((cx, i) => {
                      const cys = [65, 52, 38, 24, 14, 7];
                      return (
                        <circle key={i} cx={cx} cy={cys[i]} r="3" fill="white" stroke="#6A00F4" strokeWidth="2" />
                      );
                    })}
                  </svg>
                </div>

                {/* Creator mini cards */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                    Top Performing Creators
                  </p>
                  {[
                    {
                      name: 'Ananya Kapoor', cat: 'Fashion', followers: '420K', eng: '9.1%',
                      src: "https://images.unsplash.com/photo-1695141306855-d2fb0ade5c33",
                      alt: 'Ananya Kapoor fashion influencer profile',
                    },
                    {
                      name: 'Jordan Davis', cat: 'Fitness', followers: '310K', eng: '7.8%',
                      src: "https://img.rocket.new/generatedImages/rocket_gen_img_15893e37c-1773034293433.png",
                      alt: 'Jordan Davis fitness influencer profile',
                    },
                  ].map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl px-3 py-2"
                      style={{ background: '#F7F8FC', border: '1px solid #E5E7EB' }}
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <AppImage src={c.src} alt={c.alt} width={32} height={32} className="object-cover w-full h-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate" style={{ color: '#0B132B' }}>{c.name}</p>
                        <p className="text-xs" style={{ color: '#6B7280' }}>{c.cat}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-semibold" style={{ color: '#0B132B' }}>{c.followers}</p>
                        <p className="text-xs font-medium" style={{ color: '#16a34a' }}>{c.eng}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating ROI badge */}
              <div
                className="absolute -top-4 -right-4 px-4 py-3 rounded-xl animate-float"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(106,0,244,0.15)',
                  boxShadow: '0 8px 24px rgba(106,0,244,0.15)',
                }}
              >
                <p className="text-xs" style={{ color: '#6B7280' }}>Campaign ROI</p>
                <p
                  className="font-bold text-xl"
                  style={{
                    background: 'linear-gradient(135deg, #6A00F4, #D000FF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  3.4x
                </p>
              </div>

              {/* Floating live badge */}
              <div
                className="absolute -bottom-4 -left-4 px-4 py-3 rounded-xl animate-float"
                style={{
                  animationDelay: '1.5s',
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,122,0,0.20)',
                  boxShadow: '0 8px 24px rgba(255,122,0,0.15)',
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: '#FF7A00' }}
                  />
                  <p className="text-xs font-semibold" style={{ color: '#0B132B' }}>120K views today</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}