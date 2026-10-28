"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
  /**
   * Depth 0 = pinned to the page (no parallax); 1 = moves with the scroll at full speed.
   * Background layers use small values (0.25‒0.4), mid ornaments ~0.6, foreground 1.
   * Values > 0 make the layer lag behind (feels further away).
   */
  depth?: number;
  /** Max travel in px across the section's scroll range */
  range?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Scroll-linked parallax for a layer inside a section.
 * Measures the nearest positioned ancestor's progress through the viewport
 * and offsets the layer accordingly. Three depths on one section (mandala,
 * ornaments, card) are enough to make it feel like moving through space.
 */
export default function Parallax({ children, depth = 0.4, range = 120, className = "", style }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // −range … +range as the section passes through the viewport, scaled by depth
  const y = useTransform(scrollYProgress, [0, 1], [range * depth, -range * depth]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}
