'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, Tag, Monitor, Crown, Sparkles } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

interface SelectionCardsProps {
  items: string[];
  selected: string[];
  onSelect: (item: string) => void;
  type: 'city' | 'language' | 'category' | 'platform';
}

const ICONS = {
  city: MapPin,
  language: Globe,
  category: Tag,
  platform: Monitor,
};

const COLORS: Record<string, { bg: string; color: string; border: string }> = {
  Delhi: { bg: '#EFEAFF', color: '#7B2FF7', border: '#7B2FF7' },
  Mumbai: { bg: '#FFF0F6', color: '#F357A8', border: '#F357A8' },
  Bangalore: { bg: '#F0F8FF', color: '#1DA1F2', border: '#1DA1F2' },
  Hyderabad: { bg: '#FFF8EC', color: '#F9A826', border: '#F9A826' },
  Pune: { bg: '#F0FFF4', color: '#22C55E', border: '#22C55E' },
  Instagram: { bg: '#FFF0F6', color: '#E1306C', border: '#E1306C' },
  YouTube: { bg: '#FFF5F5', color: '#FF0000', border: '#FF0000' },
  TikTok: { bg: '#F2F3F7', color: '#1F1F2E', border: '#1F1F2E' },
  LinkedIn: { bg: '#F0F8FF', color: '#0A66C2', border: '#0A66C2' },
  default: { bg: '#F2F3F7', color: '#7B2FF7', border: '#7B2FF7' },
};

function getColors(item: string) {
  return COLORS[item] || COLORS.default;
}

export default function SelectionCards({ items, selected, onSelect, type }: SelectionCardsProps) {
  const Icon = ICONS[type];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 mb-8">
      {items.map((item, i) => {
        const isSelected = selected.includes(item);
        const colors = getColors(item);

        return (
          <motion.button
            key={item}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            onClick={() => onSelect(item)}
            className={`group relative p-4 rounded-2xl border-2 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover ${
              isSelected
                ? 'border-[#7B2FF7] bg-[#EFEAFF] shadow-[0_0_0_3px_rgba(123,47,247,0.12)]'
                : 'border-[#E5E7EB] bg-white hover:border-[#7B2FF7]/40'
            }`}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
              style={{ backgroundColor: colors.bg, color: colors.color }}
            >
              <Icon size={16} />
            </div>
            <span className={`font-display font-700 text-sm block ${isSelected ? 'text-[#7B2FF7]' : 'text-[#1F1F2E]'}`}>
              {item}
            </span>
            {isSelected && (
              <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#7B2FF7] flex items-center justify-center">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

export function DiscoverHero({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7B2FF7] via-[#9B4FF7] to-[#F357A8] px-8 py-12 md:py-16 mb-8"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#F9A826] blur-3xl" />
      </div>
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {badge && (
          <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {badge === 'Premium' ? <Crown size={12} /> : <Sparkles size={12} />}
            {badge}
          </span>
        )}
        <h1 className="font-display font-800 text-3xl md:text-4xl lg:text-5xl text-white tracking-tight mb-3">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/80 text-base md:text-lg">{subtitle}</p>
        )}
      </div>
    </motion.section>
  );
}
