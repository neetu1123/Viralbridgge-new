'use client';

import React from 'react';
import PageFade from '@/src/components/animations/PageFade';

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageFade>{children}</PageFade>;
}
