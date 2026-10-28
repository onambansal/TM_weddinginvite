"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { drawPath, enter } from "@/lib/motion";

interface SectionDividerProps {
  color?: string;
  /** Width of the whole ornament in px */
  width?: number;
  className?: string;
  /** Animate on scroll into view (default true) */
  animate?: boolean;
}

/**
 * Thin gold ornamental rule with a central lotus/diamond motif.
 * When animated, the rules draw outward from the centre and the
 * diamond blooms in — like a pen finishing the flourish.
 */
export default function SectionDivider({
  color = "#C9A84C",
  width = 180,
  className = "",
  animate = true,
}: SectionDividerProps) {
  const uid = useId().replace(/:/g, "");
  const leftId = `sd-left-${uid}`;
  const rightId = `sd-right-${uid}`;

  const Path = animate ? motion.path : "path";
  const Line = animate ? motion.line : "line";
  const Circle = animate ? motion.circle : "circle";
  /** Stroke draw-in, driven by the parent's hidden/visible variant */
  const anim = (i: number) => (animate ? { variants: drawPath, custom: i } : {});
  /** Filled shapes simply fade in after the strokes have drawn */
  const pop = (delay: number) =>
    animate
      ? {
          variants: {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: enter(delay, 0.5) },
          },
        }
      : {};

  const svg = (
    <svg
      width={width}
      height="18"
      viewBox="0 0 180 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: "block", overflow: "visible" }}
    >
      <defs>
        <linearGradient id={leftId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={color} stopOpacity="0" />
          <stop offset="1" stopColor={color} stopOpacity="1" />
        </linearGradient>
        <linearGradient id={rightId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={color} stopOpacity="1" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Rules draw outward from centre (x drawn from 68→0 and 112→180) */}
      <Line x1="68" y1="9" x2="0" y2="9" stroke={`url(#${leftId})`} strokeWidth="1" {...anim(1)} />
      <Line x1="112" y1="9" x2="180" y2="9" stroke={`url(#${rightId})`} strokeWidth="1" {...anim(1)} />
      {/* Diamond */}
      <Path d="M90 2 L97 9 L90 16 L83 9 Z" stroke={color} strokeWidth="1" fill="none" {...anim(0)} />
      <motion.path d="M90 5.5 L93.5 9 L90 12.5 L86.5 9 Z" fill={color} {...pop(0.5)} />
      {/* Side petals */}
      <Path d="M72 9 C75 5, 79 5, 81 9 C79 13, 75 13, 72 9 Z" stroke={color} strokeWidth="0.9" fill="none" {...anim(1)} />
      <Path d="M99 9 C101 5, 105 5, 108 9 C105 13, 101 13, 99 9 Z" stroke={color} strokeWidth="0.9" fill="none" {...anim(1)} />
      <Circle cx="68" cy="9" r="1.2" fill={color} {...pop(0.7)} />
      <Circle cx="112" cy="9" r="1.2" fill={color} {...pop(0.7)} />
    </svg>
  );

  if (!animate) return <div className={`mx-auto ${className}`} style={{ width }}>{svg}</div>;

  return (
    <motion.div
      className={`mx-auto ${className}`}
      style={{ width }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
    >
      {svg}
    </motion.div>
  );
}
