import React from 'react';
import { cn } from '@/utils/cn';
import type { ButtonVariant, ButtonSize } from '@/data/types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'default',
  href,
  external,
  children,
  className,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 border-2 border-blue-600',
    secondary: 'bg-transparent text-blue-600 hover:bg-blue-600 hover:text-white border-2 border-blue-600'
  };
  
  const sizeClasses = {
    default: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
    small: 'px-4 py-2 text-sm'
  };

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <a 
        href={href}
        className={classes}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
        {...(external && { 'aria-label': `${children} (opens in new window)` })}
      >
        <span>{children}</span>
        {external && <span className="ml-2" aria-hidden="true">↗</span>}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};