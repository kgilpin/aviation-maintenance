import React from 'react';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
}

export function ExternalLink({ href, children, className = '', target = '_blank' }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={className}
    >
      {children}
    </a>
  );
}