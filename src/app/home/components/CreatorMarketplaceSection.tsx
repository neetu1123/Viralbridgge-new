'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/src/components/ui/AppImage';

const creators = [
  {
    name: 'Ananya Kapoor',
    category: 'Beauty & Skincare',
    followers: '420K',
    engagement: '9.1%',
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_12d00e908-1772206554742.png",
    alt: 'Ananya Kapoor beauty and skincare influencer, smiling headshot',
    tags: ['Skincare', 'Makeup'],
    verified: true,
  },
  {
    name: 'Jordan Davis',
    category: 'Fitness & Health',
    followers: '310K',
    engagement: '7.8%',
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_1aff74711-1763298873016.png",
    alt: 'Jordan Davis fitness and health influencer, professional headshot',
    tags: ['Fitness', 'Nutrition'],
    verified: true,
  },
  {
    name: 'Mei Lin Zhang',
    category: 'Tech & Gadgets',
    followers: '185K',
    engagement: '6.4%',
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_11da40f54-1763293529528.png",
    alt: 'Mei Lin Zhang tech and gadgets influencer, confident headshot',
    tags: ['Tech', 'Reviews'],
    verified: true,
  },
  {
    name: 'Marcus Okafor',
    category: 'Fashion & Style',
    followers: '560K',
    engagement: '11.3%',
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_19b695be3-1763299385413.png",
    alt: 'Marcus Okafor fashion and style influencer, stylish headshot',
    tags: ['Fashion', 'Lifestyle'],
    verified: false,
  },
  {
    name: 'Sofia Reyes',
    category: 'Lifestyle & Travel',
    followers: '230K',
    engagement: '8.7%',
    src: "https://images.unsplash.com/photo-1710969494722-0083a8c8b305",
    alt: 'Sofia Reyes lifestyle and travel influencer, outdoor headshot',
    tags: ['Travel', 'Lifestyle'],
    verified: true,
  },
  {
    name: 'Raj Mehta',
    category: 'Finance & Crypto',
    followers: '142K',
    engagement: '5.9%',
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_15f8b8568-1763295382450.png",
    alt: 'Raj Mehta finance and crypto influencer, professional headshot',
    tags: ['Finance', 'Investing'],
    verified: true,
  },
  {
    name: 'Naomi Clarke',
    category: 'Food & Recipes',
    followers: '390K',
    engagement: '10.2%',
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_1194d4361-1763294462946.png",
    alt: 'Naomi Clarke food and recipe influencer, warm headshot',
    tags: ['Food', 'Cooking'],
    verified: true,
  },
  {
    name: 'Tyler Kim',
    category: 'Gaming & Esports',
    followers: '820K',
    engagement: '13.4%',
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_143222348-1763292451066.png",
    alt: 'Tyler Kim gaming and esports influencer, casual headshot',
    tags: ['Gaming', 'Streaming'],
    verified: true,
  },
];

export default function CreatorMarketplaceSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="marketplace"
      className="section-padding relative overflow-hidden"
      style={{ background: '#0F172A' }}
    >
      {/* Background ambient glows */}
      <div
        className="absolute top-[-80px] left-[10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(106,0,244,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-[-80px] right-[5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,122,0,0.10) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            {/* Badge */}
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{
                background: 'rgba(106,0,244,0.15)',
                border: '1px solid rgba(106,0,244,0.30)',
                color: '#c084fc',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#D000FF' }}
              />
              Creator Marketplace
            </span>

            <h2
              className="font-display text-[32px] lg:text-[40px] font-bold tracking-tight leading-tight"
              style={{ color: '#FFFFFF' }}
            >
              Find creators who
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #6A00F4, #D000FF, #FF7A00)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <i>actually convert</i>
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-sm" style={{ color: '#94a3b8' }}>
              12,000+ verified creators
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200"
              style={{
                background: 'rgba(106,0,244,0.15)',
                border: '1px solid rgba(106,0,244,0.35)',
                color: '#c084fc',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#6A00F4';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(106,0,244,0.15)';
                e.currentTarget.style.color = '#c084fc';
              }}
            >
              Browse All Creators
            </a>
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {creators.map((c, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="scroll-reveal group relative rounded-2xl p-5 flex flex-col transition-all duration-300"
              style={{
                background: 'linear-gradient(145deg, #1e1b4b 0%, #0f172a 60%, #1a0a2e 100%)',
                border: '1px solid rgba(106,0,244,0.18)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.04)',
                transitionDelay: `${i * 0.07}s`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.border = '1px solid rgba(106,0,244,0.50)';
                e.currentTarget.style.boxShadow =
                  '0 8px 40px rgba(106,0,244,0.25), 0 0 0 1px rgba(106,0,244,0.20), inset 0 1px 0 rgba(255,255,255,0.06)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.border = '1px solid rgba(106,0,244,0.18)';
                e.currentTarget.style.boxShadow =
                  '0 4px 24px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.04)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Top gradient accent line */}
              <div
                className="absolute top-0 left-6 right-6 h-px rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(106,0,244,0.6), rgba(208,0,255,0.4), transparent)',
                }}
              />

              {/* Avatar + verified */}
              <div className="relative w-fit mx-auto mb-4">
                <div
                  className="w-16 h-16 rounded-full overflow-hidden"
                  style={{
                    border: '2px solid rgba(106,0,244,0.40)',
                    boxShadow: '0 0 16px rgba(106,0,244,0.25)',
                  }}
                >
                  <AppImage
                    src={c.src}
                    alt={c.alt}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                {c.verified && (
                  <div
                    className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #6A00F4, #D000FF)',
                      border: '2px solid #0F172A',
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="text-center mb-4">
                <h3 className="text-[15px] font-bold mb-0.5" style={{ color: '#FFFFFF' }}>
                  {c.name}
                </h3>
                <p className="text-xs" style={{ color: '#94a3b8' }}>
                  {c.category}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div
                  className="rounded-xl p-2 text-center"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <p className="text-xs mb-0.5" style={{ color: '#64748b' }}>Followers</p>
                  <p className="text-sm font-bold" style={{ color: '#e2e8f0' }}>{c.followers}</p>
                </div>
                <div
                  className="rounded-xl p-2 text-center"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <p className="text-xs mb-0.5" style={{ color: '#64748b' }}>Engagement</p>
                  <p className="text-sm font-bold" style={{ color: '#4ade80' }}>{c.engagement}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-medium px-2.5 py-0.5 rounded-full"
                    style={{
                      background: 'rgba(106,0,244,0.18)',
                      border: '1px solid rgba(106,0,244,0.28)',
                      color: '#c084fc',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button
                className="w-full text-center text-sm font-semibold rounded-xl py-2.5 transition-all duration-200 mt-auto"
                style={{
                  background: 'rgba(255,122,0,0.10)',
                  border: '1px solid rgba(255,122,0,0.30)',
                  color: '#FB923C',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#FF7A00';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,122,0,0.35)';
                  e.currentTarget.style.border = '1px solid #FF7A00';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,122,0,0.10)';
                  e.currentTarget.style.color = '#FB923C';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.border = '1px solid rgba(255,122,0,0.30)';
                }}
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}