'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ANIMATION } from './config';

export default function PageFade({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: ANIMATION.durationFast, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
