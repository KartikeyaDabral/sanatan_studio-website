import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cn';
import './Card.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  as?: 'div' | 'article' | 'section';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      interactive = false,
      padding = 'none',
      as: Tag = 'div',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Tag
        ref={ref}
        className={cn(
          'card',
          `card--${variant}`,
          `card--pad-${padding}`,
          interactive && 'card--interactive',
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);

Card.displayName = 'Card';
