'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ANIMATION } from './config';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  scale?: boolean;
}

export default function FadeIn({
  children,
  className,
  delay = 0,
  scale = false,
}: FadeInProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={
        scale
          ? { opacity: 0, y: 12, scale: ANIMATION.scaleFrom }
          : { opacity: 0, y: 12 }
      }
      animate={scale ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION.durationHero, delay, ease: ANIMATION.ease }}
    >
      {children}
    </motion.div>
  );
}
