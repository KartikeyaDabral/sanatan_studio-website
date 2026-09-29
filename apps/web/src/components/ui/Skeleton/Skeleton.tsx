import { cn } from '@/lib/cn';
import './Skeleton.css';

interface SkeletonProps {
  className?: string;
  /** Width (CSS value). Default: '100%' */
  width?: string;
  /** Height (CSS value). Default: '20px' */
  height?: string;
  /** Shape variant */
  variant?: 'text' | 'rectangular' | 'circular';
}

/**
 * Loading skeleton with subtle shimmer animation.
 * Use to maintain layout while content loads.
 */
export function Skeleton({
  className,
  width = '100%',
  height = '20px',
  variant = 'text',
}: SkeletonProps) {
  return (
    <div
      className={cn('skeleton', `skeleton--${variant}`, className)}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
