'use client';

import React from 'react';
import FadeIn from './animations/FadeIn';

type HeadingTag = 'h1' | 'h2';

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  accent?: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  as?: HeadingTag;
  size?: 'lg' | 'md';
  tone?: 'dark' | 'light';
  className?: string;
  descriptionClassName?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = 'center',
  as: Tag = 'h2',
  size = 'md',
  tone = 'dark',
  className = '',
  descriptionClassName = '',
}: SectionHeadingProps) {
  const light = tone === 'light';

  return (
    <div className={`${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      {eyebrow ? (
        <FadeIn inView>
          <p className={`vb-eyebrow ${light ? 'text-violet-200' : ''}`}>{eyebrow}</p>
        </FadeIn>
      ) : null}
      <FadeIn inView delay={0.08}>
        <Tag
          className={`vb-heading ${size === 'lg' ? 'vb-heading-lg' : 'vb-heading-md'} ${
            light ? 'text-white' : ''
          }`}
        >
          {title}
          {accent ? (
            <>
              <br />
              <span className={light ? 'text-white' : ''}>{accent}</span>
            </>
          ) : null}
        </Tag>
      </FadeIn>
      {description ? (
        <FadeIn inView delay={0.16}>
          <p className={`vb-lede mt-4 ${align === 'center' ? 'mx-auto' : ''} ${descriptionClassName || (light ? 'text-violet-100' : '')}`}>
            {description}
          </p>
        </FadeIn>
      ) : null}
    </div>
  );
}
