import { useState, type ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import './OptimizedImage.css';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
  /** Image source URL */
  src: string;
  /** Alt text (required for accessibility) */
  alt: string;
  /** Aspect ratio class (e.g., 'aspect-photo', 'aspect-arch') */
  aspectRatio?: string;
  /** Whether this is above-the-fold (disables lazy loading) */
  priority?: boolean;
  /** Optional low-res placeholder or blur color */
  placeholder?: string;
  /** Fill container (object-fit: cover) */
  fill?: boolean;
}

/**
 * Image component with lazy loading, fade-in on load,
 * error handling, and accessibility defaults.
 */
export function OptimizedImage({
  src,
  alt,
  aspectRatio,
  priority = false,
  placeholder,
  fill = false,
  className,
  ...props
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={cn('img-placeholder', 'img-placeholder--error', aspectRatio, className)}
        role="img"
        aria-label={alt}
      >
        <span className="img-placeholder__text">{alt}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'img-wrapper',
        fill && 'img-wrapper--fill',
        aspectRatio,
        className,
      )}
      style={
        placeholder && !loaded
          ? { backgroundColor: placeholder }
          : undefined
      }
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn('img', loaded && 'img--loaded', fill && 'img--fill')}
        {...props}
      />
    </div>
  );
}
