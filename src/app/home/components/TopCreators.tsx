'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/src/components/ui/AppImage';
import { ArrowRight, TrendingUp, Star } from 'lucide-react';
import { fetchPublicCreators } from '@/src/lib/api/public';
import type { PublicCreator } from '@/src/lib/api/types';
import Reveal from '@/src/components/animations/Reveal';
import { StaggerItem } from '@/src/components/animations/Stagger';

const FALLBACK_CREATORS = [
  {
    id: 'top-creator-001',
    name: 'Sofia Chen',
    username: 'sofiabeauty',
    handle: '@sofiabeauty',
    niche: 'Beauty',
    followersDisplay: '284K',
    engagementDisplay: '6.8%',
    avgRateDisplay: '₹1,800/post',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1556335466-0adf089ac4ef',
    alt: 'Young Asian woman with long dark hair smiling against neutral background',
    verified: true,
    nicheBg: '#FFF0F6',
    nicheColor: '#F357A8',
  },
  {
    id: 'top-creator-002',
    name: 'Marcus Reid',
    username: 'marcusfitness',
    handle: '@marcusfitness',
    niche: 'Fitness',
    followersDisplay: '512K',
    engagementDisplay: '4.2%',
    avgRateDisplay: '₹3,200/video',
    rating: 4.8,
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_13145da71-1773203122086.png',
    alt: 'Athletic Black man with short hair wearing white t-shirt against light background',
    verified: true,
    nicheBg: '#EFEAFF',
    nicheColor: '#7B2FF7',
  },
  {
    id: 'top-creator-003',
    name: 'Priya Sharma',
    username: 'priyacooks',
    handle: '@priyacooks',
    niche: 'Food',
    followersDisplay: '198K',
    engagementDisplay: '8.1%',
    avgRateDisplay: '₹1,200/post',
    rating: 5.0,
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_12ea42ac5-1772258592389.png',
    alt: 'Indian woman with bright smile and curly hair in warm-toned kitchen setting',
    verified: true,
    nicheBg: '#FFF8EC',
    nicheColor: '#F9A826',
  },
  {
    id: 'top-creator-004',
    name: 'Liam Torres',
    username: 'liamtechreviews',
    handle: '@liamtechreviews',
    niche: 'Tech',
    followersDisplay: '841K',
    engagementDisplay: '3.6%',
    avgRateDisplay: '₹4,500/video',
    rating: 4.7,
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_14e5f043b-1763293600409.png',
    alt: 'Hispanic man with glasses and friendly smile in casual office setting',
    verified: true,
    nicheBg: '#F0F8FF',
    nicheColor: '#1DA1F2',
  },
  {
    id: 'top-creator-005',
    name: 'Aisha Okonkwo',
    username: 'aishalifestyle',
    handle: '@aishalifestyle',
    niche: 'Lifestyle',
    followersDisplay: '376K',
    engagementDisplay: '5.9%',
    avgRateDisplay: '₹2,400/post',
    rating: 4.9,
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1703231c0-1765278179841.png',
    alt: 'Nigerian woman with natural hair and warm smile wearing colorful outfit',
    verified: true,
    nicheBg: '#F0FFF4',
    nicheColor: '#22C55E',
  },
  {
    id: 'top-creator-006',
    name: 'Jake Nguyen',
    username: 'jakegames',
    handle: '@jakegames',
    niche: 'Gaming',
    followersDisplay: '1.2M',
    engagementDisplay: '7.4%',
    avgRateDisplay: '₹5,800/post',
    rating: 4.6,
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1882b194b-1763293730336.png',
    alt: 'Young Vietnamese man with headphones around neck smiling in gaming setup',
    verified: true,
    nicheBg: '#EFEAFF',
    nicheColor: '#7B2FF7',
  },
] as const;

type HomeCreator = {
  id: string;
  name: string;
  username: string;
  handle: string;
  niche: string;
  followersDisplay: string;
  engagementDisplay: string;
  avgRateDisplay: string;
  rating: number;
  avatar: string;
  alt: string;
  verified: boolean;
  nicheBg: string;
  nicheColor: string;
};

function mapApiCreator(c: PublicCreator): HomeCreator {
  return {
    id: c.id,
    name: c.name,
    username: c.username,
    handle: c.handle,
    niche: c.niche,
    followersDisplay: c.followersDisplay,
    engagementDisplay: c.engagementDisplay,
    avgRateDisplay: c.avgRateDisplay,
    rating: c.rating,
    avatar: c.avatar,
    alt: c.alt,
    verified: c.verified,
    nicheBg: c.nicheBg,
    nicheColor: c.nicheColor,
  };
}

export default function TopCreators() {
  const [creators, setCreators] = useState<HomeCreator[]>([...FALLBACK_CREATORS]);

  const loadCreators = useCallback(async () => {
    try {
      const result = await fetchPublicCreators({ limit: 6, sort: 'followers_desc' });
      if (result.data?.length) {
        setCreators(result.data.slice(0, 6).map(mapApiCreator));
      }
    } catch {
      setCreators([...FALLBACK_CREATORS]);
    }
  }, []);

  useEffect(() => {
    loadCreators();
  }, [loadCreators]);

  return (
    <section className="py-24 bg-[#F8F7FC]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <Reveal className="flex items-end justify-between mb-12">
          <div>
            <span className="inline-block text-[#7B2FF7] font-semibold text-sm uppercase tracking-widest mb-3 font-display">
              Top Creators
            </span>
            <h2 className="font-display font-800 text-4xl text-[#1F1F2E] tracking-tight">
              Work with the best
            </h2>
          </div>
          <Link
            href="/explore/creators-v2"
            className="hidden md:flex items-center gap-2 text-[#7B2FF7] font-semibold text-sm hover:gap-3 transition-all duration-200"
          >
            Browse all creators <ArrowRight size={15} />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {creators.map((creator, index) => (
            <StaggerItem key={creator.id} index={index}>
            <div
              className="group bg-white rounded-2xl border border-[#E5E7EB] shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 p-5 flex flex-col items-center text-center gap-4"
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-[#F2F3F7] ring-4 ring-[#F8F7FC] group-hover:ring-[#EFEAFF] transition-all duration-200 vb-img-zoom">
                  <AppImage
                    src={creator.avatar}
                    alt={creator.alt}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                {creator.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#7B2FF7] flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-display font-700 text-[#1F1F2E] text-base">{creator.name}</h3>
                <p className="text-[#9AA0B4] text-xs mt-0.5">{creator.handle}</p>
              </div>

              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ color: creator.nicheColor, backgroundColor: creator.nicheBg }}
              >
                {creator.niche}
              </span>

              <div className="w-full grid grid-cols-2 gap-3">
                <div className="bg-[#F8F7FC] rounded-xl p-2.5 text-center">
                  <div className="font-display font-700 text-[#1F1F2E] text-sm tabular-nums">{creator.followersDisplay}</div>
                  <div className="text-[#9AA0B4] text-[10px] mt-0.5">Followers</div>
                </div>
                <div className="bg-[#F8F7FC] rounded-xl p-2.5 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <TrendingUp size={11} className="text-green-500" />
                    <span className="font-display font-700 text-[#1F1F2E] text-sm tabular-nums">{creator.engagementDisplay}</span>
                  </div>
                  <div className="text-[#9AA0B4] text-[10px] mt-0.5">Engagement</div>
                </div>
              </div>

              <div className="w-full flex items-center justify-between">
                <span className="text-[#1F1F2E] font-display font-700 text-sm tabular-nums">{creator.avgRateDisplay}</span>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-[#F9A826] fill-[#F9A826]" />
                  <span className="text-[#1F1F2E] font-display font-700 text-sm tabular-nums">{creator.rating}</span>
                </div>
              </div>

              <Link
                href={`/creator/public/${creator.username}`}
                className="w-full text-center py-2 rounded-xl border border-[#E5E7EB] text-[#6B6B8A] text-sm font-medium hover:border-[#7B2FF7] hover:text-[#7B2FF7] hover:bg-[#EFEAFF] transition-all duration-150"
              >
                View Profile
              </Link>
            </div>
            </StaggerItem>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/explore/creators-v2" className="btn-secondary inline-flex items-center gap-2">
            Browse all creators <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
