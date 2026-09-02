'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ANIMATION, viewportOnce } from './config';

type RevealTag = 'div' | 'section' | 'footer' | 'article';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: RevealTag;
  scale?: boolean;
}

export default function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
  scale = false,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={
        scale
          ? { opacity: 0, y: ANIMATION.distance, scale: ANIMATION.scaleFrom }
          : { opacity: 0, y: ANIMATION.distance }
      }
      whileInView={scale ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: ANIMATION.duration, delay, ease: ANIMATION.ease }}
    >
      {children}
    </MotionTag>
  );
}
