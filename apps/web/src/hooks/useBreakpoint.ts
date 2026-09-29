import { useMediaQuery } from './useMediaQuery';

/**
 * Semantic breakpoint hooks for responsive logic in components.
 */
export function useBreakpoint() {
  const isTablet = useMediaQuery('(min-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isWide = useMediaQuery('(min-width: 1440px)');

  return {
    isMobile: !isTablet,
    isTablet: isTablet && !isDesktop,
    isDesktop,
    isWide,
  };
}
