'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ANIMATION, viewportOnce } from './config';

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerContainer({ children, className }: StaggerContainerProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: ANIMATION.stagger },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
}

export function StaggerItem({ children, className, index = 0 }: StaggerItemProps) {
  const reduce = useReducedMotion();
  const delay = Math.min(index, ANIMATION.staggerMaxIndex) * ANIMATION.stagger;

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.45, delay, ease: ANIMATION.ease }}
    >
      {children}
    </motion.div>
  );
}
