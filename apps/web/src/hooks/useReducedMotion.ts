import { useMediaQuery } from './useMediaQuery';

/**
 * Returns true if the user prefers reduced motion.
 * All animations should be disabled when this is true.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
