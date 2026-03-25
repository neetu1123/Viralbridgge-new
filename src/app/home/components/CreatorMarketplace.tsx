'use client';
import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/src/components/ui/AppIcon';
import AppImage from '@/src/components/ui/AppImage';

type FilterKey = 'platform' | 'niche' | 'budget';

const filters: Record<FilterKey, string[]> = {
  platform: ['All', 'Instagram', 'YouTube', 'Reels'],
  niche: ['All', 'Fashion', 'Fitness', 'Tech', 'Lifestyle', 'Food'],
  budget: ['All', 'Under ₹2K', '₹2K–5K', '₹5K+'],
};

const creators = [
  {
    name: 'Riya Sharma',
    handle: '@riya.lifestyle',
    niche: 'Lifestyle',
    platform: 'Instagram',
    followers: '120K',
    engagement: '6.8%',
    rate: '₹2,500 / post',
    viralScore: 87,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&w=200&h=200&fit=crop',
    verified: true,
    budget: '₹2K–5K',
  },
  {
    name: 'Arjun Mehta',
    handle: '@arjuntech',
    niche: 'Tech',
    platform: 'YouTube',
    followers: '280K',
    engagement: '5.2%',
    rate: '₹6,000 / video',
    viralScore: 92,
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&w=200&h=200&fit=crop',
    verified: true,
    budget: '₹5K+',
  },
  {
    name: 'Priya Nair',
    handle: '@priyafitness',
    niche: 'Fitness',
    platform: 'Instagram',
    followers: '85K',
    engagement: '8.1%',
    rate: '₹1,800 / post',
    viralScore: 79,
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&w=200&h=200&fit=crop',
    verified: false,
    budget: 'Under ₹2K',
  },
  {
    name: 'Kabir Sinha',
    handle: '@kabirstyle',
    niche: 'Fashion',
    platform: 'Reels',
    followers: '195K',
    engagement: '7.4%',
    rate: '₹4,000 / reel',
    viralScore: 94,
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&w=200&h=200&fit=crop',
    verified: true,
    budget: '₹2K–5K',
  },
  {
    name: 'Sneha Kapoor',
    handle: '@snehaeats',
    niche: 'Food',
    platform: 'Instagram',
    followers: '62K',
    engagement: '9.3%',
    rate: '₹1,200 / post',
    viralScore: 76,
    image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&w=200&h=200&fit=crop',
    verified: false,
    budget: 'Under ₹2K',
  },
  {
    name: 'Dev Sharma',
    handle: '@devreviews',
    niche: 'Tech',
    platform: 'YouTube',
    followers: '410K',
    engagement: '4.8%',
    rate: '₹9,000 / video',
    viralScore: 96,
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&w=200&h=200&fit=crop',
    verified: true,
    budget: '₹5K+',
  },
];

export default function CreatorMarketplace() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilters, setActiveFilters] = useState<Record<FilterKey, string>>({
    platform: 'All',
    niche: 'All',
    budget: 'All',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.scroll-reveal-hidden').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 80);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredCreators = creators.filter(c => {
    const pMatch = activeFilters.platform === 'All' || c.platform === activeFilters.platform;
    const nMatch = activeFilters.niche === 'All' || c.niche === activeFilters.niche;
    const bMatch = activeFilters.budget === 'All' || c.budget === activeFilters.budget;
    return pMatch && nMatch && bMatch;
  });

  const setFilter = (key: FilterKey, val: string) => {
    setActiveFilters(prev => ({ ...prev, [key]: val }));
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#22C55E';
    if (score >= 75) return '#F97316';
    return '#94A3B8';
  };

  return (
    <section id="creators" ref={sectionRef} className="py-28 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 scroll-reveal-hidden">
          <div>
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border outline-primary mb-8 ">
          <span className="w-2 h-2 rounded-full bg-vb-green pulse-dot" />
          <span className="text-xs font-display font-600 text-primary-light uppercase tracking-widest">
   Creator Network
          </span>
        </div>
            
            <h2 className="font-display font-800 text-fg"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Discover High-Performing{' '}
              <span className="gradient-text">Creators</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-fg-muted">
            <span className="w-2 h-2 rounded-full bg-vb-green pulse-dot" />
            <span>85,000+ verified creators</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-6 mb-10 scroll-reveal-hidden">
          {(Object.keys(filters) as FilterKey[]).map(filterKey => (
            <div key={filterKey} className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-fg-dim font-display font-600 uppercase tracking-wider">
                {filterKey === 'platform' ? 'Platform' : filterKey === 'niche' ? 'Niche' : 'Budget'}:
              </span>
              {filters[filterKey].map(val => (
                <button
                  key={val}
                  onClick={() => setFilter(filterKey, val)}
                  className={`text-xs font-display font-600 px-3 py-1.5 rounded-full transition-all ${
                    activeFilters[filterKey] === val
                      ? 'btn-primary text-white' :'border border-primary/20 text-fg-muted hover:border-accent hover:text-accent transition-all'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Creator grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCreators.map((creator, i) => (
            <div
              key={creator.handle}
              className="scroll-reveal-hidden card-hover bg-surface border rounded-2xl p-6 relative overflow-hidden"
              style={{ transitionDelay: `${i * 0.08}s`, border: '1px solid rgba(124,58,237,0.25)' }}
            >
              {/* Viral score badge */}
              <div
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center border-2 text-xs font-display font-800"
                style={{
                  borderColor: getScoreColor(creator.viralScore),
                  color: getScoreColor(creator.viralScore),
                  background: `${getScoreColor(creator.viralScore)}15`,
                }}
              >
                {creator.viralScore}
              </div>

              {/* Creator info */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0">
                  <AppImage
                    src={creator.image}
                    alt={`${creator.name} - ${creator.niche} creator with ${creator.followers} followers`}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-700 text-fg">{creator.name}</span>
                    {creator.verified && (
                      <Icon name="CheckBadgeIcon" size={14} className="text-primary-light" variant="solid" />
                    )}
                  </div>
                  <div className="text-xs text-fg-dim">{creator.handle}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-display font-600 text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                      {creator.platform}
                    </span>
                    <span className="text-[10px] text-fg-dim">{creator.niche}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-surface-2 rounded-xl p-3">
                  <div className="text-[10px] text-fg-dim mb-0.5">Followers</div>
                  <div className="font-display font-800 text-base text-fg">{creator.followers}</div>
                </div>
                <div className="bg-surface-2 rounded-xl p-3">
                  <div className="text-[10px] text-fg-dim mb-0.5">Engagement</div>
                  <div className="font-display font-800 text-base text-vb-green">{creator.engagement}</div>
                </div>
              </div>

              {/* Rate + Viral Score label */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-[10px] text-fg-dim mb-0.5">Rate</div>
                  <div className="font-display font-700 text-sm text-fg">{creator.rate}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-fg-dim mb-0.5">Viral Score</div>
                  <div className="font-display font-700 text-sm" style={{ color: getScoreColor(creator.viralScore) }}>
                    ⚡ {creator.viralScore}/100
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button className="w-full py-3 rounded-xl font-display font-700 text-sm btn-primary text-white flex items-center justify-center gap-2 group shadow-lg transition-all duration-300 hover:scale-105">
                Invite to Campaign
                <Icon name="PaperAirplaneIcon" size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {filteredCreators.length === 0 && (
          <div className="text-center py-20 text-fg-muted">
            <Icon name="MagnifyingGlassIcon" size={40} className="mx-auto mb-4 opacity-30" />
            <p>No creators match your filters. Try adjusting them.</p>
          </div>
        )}
      </div>
    </section>
  );
}