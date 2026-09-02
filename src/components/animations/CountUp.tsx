'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface CountUpProps {
  value: string;
  className?: string;
}

function parseDisplayValue(value: string) {
  const hasCommas = value.includes(',');
  const match = value.replace(/,/g, '').match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return { prefix: '', end: 0, suffix: value, decimals: 0, hasCommas: false, raw: true };
  }

  const numeric = match[2];
  return {
    prefix: match[1],
    end: parseFloat(numeric),
    suffix: match[3],
    decimals: numeric.includes('.') ? numeric.split('.')[1].length : 0,
    hasCommas,
    raw: false,
  };
}

function formatCount(n: number, decimals: number, hasCommas: boolean) {
  if (decimals > 0) return n.toFixed(decimals);
  const rounded = Math.round(n);
  return hasCommas ? rounded.toLocaleString('en-IN') : String(rounded);
}

export default function CountUp({ value, className }: CountUpProps) {
  const reduce = useReducedMotion();
  const parsed = parseDisplayValue(value);
  const [display, setDisplay] = useState(reduce || parsed.raw ? value : `${parsed.prefix}0${parsed.decimals ? (0).toFixed(parsed.decimals).slice(1) : ''}${parsed.suffix}`);
  const ref = useRef<HTMLSpanElement>(null);
  const ran = useRef(false);

  useEffect(() => {
    if (reduce || parsed.raw || ran.current) {
      setDisplay(value);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const duration = 900;
    let frame = 0;

    const start = () => {
      if (ran.current) return;
      ran.current = true;
      const t0 = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = parsed.end * eased;
        setDisplay(`${parsed.prefix}${formatCount(current, parsed.decimals, parsed.hasCommas)}${parsed.suffix}`);
        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          setDisplay(value);
        }
      };

      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [parsed.decimals, parsed.end, parsed.hasCommas, parsed.prefix, parsed.raw, parsed.suffix, reduce, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
