import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import './Badge.css';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'outline' | 'success' | 'warning';
}

export function Badge({
  variant = 'default',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn('badge', `badge--${variant}`, className)} {...props}>
      {children}
    </span>
  );
}
