'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ANIMATION, viewportOnce } from './config';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  scale?: boolean;
  inView?: boolean;
}

export default function FadeIn({
  children,
  className,
  delay = 0,
  scale = false,
  inView = false,
}: FadeInProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const hidden = scale
    ? { opacity: 0, y: 12, scale: ANIMATION.scaleFrom }
    : { opacity: 0, y: 12 };
  const visible = scale ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={hidden}
      animate={inView ? undefined : visible}
      whileInView={inView ? visible : undefined}
      viewport={inView ? viewportOnce : undefined}
      transition={{ duration: ANIMATION.durationHero, delay, ease: ANIMATION.ease }}
    >
      {children}
    </motion.div>
  );
}
