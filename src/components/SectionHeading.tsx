import React from 'react';

type HeadingTag = 'h1' | 'h2';

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  accent?: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  as?: HeadingTag;
  size?: 'lg' | 'md';
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = 'center',
  as: Tag = 'h2',
  size = 'md',
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      {eyebrow ? <p className="vb-eyebrow">{eyebrow}</p> : null}
      <Tag className={`vb-heading ${size === 'lg' ? 'vb-heading-lg' : 'vb-heading-md'}`}>
        {title}
        {accent ? (
          <>
            <br />
            <span className="vb-heading-accent">{accent}</span>
          </>
        ) : null}
      </Tag>
      {description ? (
        <p className={`vb-lede mt-4 ${align === 'center' ? 'mx-auto' : ''}`}>{description}</p>
      ) : null}
    </div>
  );
}
