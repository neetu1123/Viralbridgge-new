'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { ANIMATION } from './config';

export default function PageFade({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION.duration, ease: ANIMATION.ease }}
    >
      {children}
    </motion.div>
  );
}
