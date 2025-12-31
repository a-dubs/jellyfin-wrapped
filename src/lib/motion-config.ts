/**
 * Motion configuration respecting prefers-reduced-motion
 * Based on UI_UX_OVERHAUL.md Appendix J.10.1
 */

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Get motion configuration based on user preferences
 */
export function getMotionConfig() {
  const reduced = prefersReducedMotion();

  return {
    duration: reduced ? 0 : 0.6,
    staggerChildren: reduced ? 0 : 0.15,
    transition: {
      duration: reduced ? 0 : 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  };
}

/**
 * Get animation variants that respect reduced motion
 */
export function getAnimationVariants() {
  const reduced = prefersReducedMotion();

  return {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: reduced ? 0 : 0.6 },
    },
    slideUp: {
      initial: { opacity: 0, y: reduced ? 0 : 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: reduced ? 0 : -20 },
      transition: { duration: reduced ? 0 : 0.6 },
    },
    scale: {
      initial: { opacity: 0, scale: reduced ? 1 : 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: reduced ? 1 : 0.9 },
      transition: { duration: reduced ? 0 : 0.5 },
    },
  };
}

/**
 * Check if effects should be shown (confetti, particles, etc.)
 */
export function shouldShowEffects(): boolean {
  return !prefersReducedMotion();
}
