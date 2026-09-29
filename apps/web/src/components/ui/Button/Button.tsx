import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cn';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'accent';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'btn',
          `btn--${variant}`,
          `btn--${size}`,
          fullWidth && 'btn--full',
          loading && 'btn--loading',
          className,
        )}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && (
          <span className="btn__spinner" aria-hidden="true" />
        )}
        <span className={cn('btn__content', loading && 'btn__content--hidden')}>
          {children}
        </span>
      </button>
    );
  },
);

Button.displayName = 'Button';
