// ============================================================
// Utility: Framer Motion presets
// ============================================================
// Centralized motion configuration so animations feel
// consistent across the application. Editorial, slow,
// intentional — never flashy.
// ============================================================

import type { Variants, Transition } from 'framer-motion';

// ---- Transitions ----

export const editorialTransition: Transition = {
  duration: 1.2,
  ease: [0.22, 1, 0.36, 1],
};

export const smoothTransition: Transition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1],
};

export const quickTransition: Transition = {
  duration: 0.3,
  ease: [0.16, 1, 0.3, 1],
};

// ---- Fade In ----

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: editorialTransition,
  },
};

// ---- Fade Up (editorial reveal) ----

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: editorialTransition,
  },
};

// ---- Fade Up Stagger (for lists / grids) ----

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ---- Image Reveal (clip-path based) ----

export const imageReveal: Variants = {
  hidden: {
    clipPath: 'inset(100% 0% 0% 0%)',
    opacity: 0,
  },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ---- Scale Reveal ----

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: editorialTransition,
  },
};

// ---- Slide from side ----

export const slideFromLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: editorialTransition,
  },
};

export const slideFromRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: editorialTransition,
  },
};

// ---- Page Transition ----

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

// ---- Parallax helper ----

export function parallaxY(offset: number = 50) {
  return {
    y: [-offset, offset],
    transition: { ease: 'linear' },
  };
}
