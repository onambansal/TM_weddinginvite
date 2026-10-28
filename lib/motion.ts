import type { Transition, Variants } from "framer-motion";

/**
 * Motion grammar for the whole invite.
 * Luxury motion is slow, consistent and never bouncy — except at a few
 * deliberate moments (wax seal, date reveal). Every section should pull
 * its easing and timing from here rather than inventing its own.
 */

/** Signature ease-out — soft landing, no overshoot */
export const EASE_LUX: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.6,
  base: 0.9,
  slow: 1.2,
} as const;

/** Standard "enter on scroll" transition */
export const enter = (delay = 0, duration: number = DURATION.base): Transition => ({
  duration,
  delay,
  ease: EASE_LUX,
});

/** Shared viewport settings for whileInView */
export const VIEWPORT_ONCE = { once: true, amount: 0.25 } as const;

/** Fade + rise, with optional index-based stagger via `custom` */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: enter(i * 0.12),
  }),
};

/** Word-by-word heading reveal */
export const wordContainer: Variants = {
  hidden: {},
  visible: (delay: number = 0) => ({
    transition: { staggerChildren: 0.07, delayChildren: delay },
  }),
};
export const wordItem: Variants = {
  hidden: { opacity: 0, y: "0.45em", filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: enter(0, 0.7) },
};

/** SVG stroke "draw" (use with pathLength on a motion.path) */
export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: DURATION.slow, delay: i * 0.08, ease: EASE_LUX },
      opacity: { duration: 0.3, delay: i * 0.08 },
    },
  }),
};
