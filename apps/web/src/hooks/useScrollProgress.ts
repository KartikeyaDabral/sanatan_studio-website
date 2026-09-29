import { useState, useEffect } from 'react';

/**
 * Returns a 0-1 value representing how far the page has scrolled.
 * Useful for scroll-based animations, parallax, and progress bars.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(scrollTop / docHeight, 1));
      }
    };

    window.addEventListener('scroll', handler, { passive: true });
    handler();

    return () => window.removeEventListener('scroll', handler);
  }, []);

  return progress;
}
