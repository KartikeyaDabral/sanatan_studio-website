import { useState, useEffect, useRef, type RefObject } from 'react';

interface UseLazyLoadOptions {
  /** Distance from viewport to start loading. Default: '200px' */
  rootMargin?: string;
  /** Visibility threshold (0-1). Default: 0 */
  threshold?: number;
}

/**
 * Returns a ref and a boolean indicating whether the element
 * has entered the viewport. Once triggered, stays true (load once).
 */
export function useLazyLoad<T extends HTMLElement = HTMLDivElement>(
  options: UseLazyLoadOptions = {},
): [RefObject<T | null>, boolean] {
  const { rootMargin = '200px', threshold = 0 } = options;
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, threshold, isVisible]);

  return [ref, isVisible];
}
