export const ANIMATION = {
  duration: 0.5,
  durationFast: 0.2,
  durationHero: 0.45,
  stagger: 0.05,
  staggerMaxIndex: 8,
  ease: [0.25, 1, 0.5, 1] as const,
  distance: 16,
  scaleFrom: 0.98,
} as const;

export const viewportOnce = {
  once: true,
  amount: 0.12,
  margin: '0px 0px -32px 0px',
} as const;
