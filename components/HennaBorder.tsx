"use client";

import { motion } from "framer-motion";
import { EASE_LUX } from "@/lib/motion";

interface HennaBorderProps {
  color?: string;
  /** Seconds for the full draw */
  duration?: number;
}

/**
 * Henna vine that draws itself around the inside of a card as it scrolls in,
 * then stays as a permanent inner border. Mehendi card signature.
 * Built from four symmetric corner vines + connecting stems, all stroke-only.
 */
export default function HennaBorder({ color = "#C9A84C", duration = 2.6 }: HennaBorderProps) {
  const stroke = { stroke: color, strokeWidth: 1.1, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };

  const draw = (delay: number, len = 1) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: len, opacity: 1 },
    viewport: { once: true, amount: 0.4 },
    transition: {
      pathLength: { duration: duration * len, delay, ease: EASE_LUX },
      opacity: { duration: 0.3, delay },
    },
  });
  const dot = (delay: number) => ({
    initial: { scale: 0, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.4, delay, ease: EASE_LUX },
    style: { transformBox: "fill-box" as const, transformOrigin: "center" },
  });

  /** One corner vine (top-left orientation), 0..100 coordinate space */
  const Corner = ({ transform, delay }: { transform: string; delay: number }) => (
    <g transform={transform}>
      {/* main vine */}
      <motion.path {...stroke} d="M6 40 C6 22, 14 10, 34 8 C44 7, 52 10, 60 6" {...draw(delay)} />
      {/* leaves along the vine */}
      <motion.path {...stroke} d="M14 26 C18 20, 26 20, 26 27 C22 31, 16 30, 14 26 Z" strokeWidth="0.9" {...draw(delay + 0.5, 0.5)} />
      <motion.path {...stroke} d="M28 13 C32 8, 40 9, 40 15 C36 18, 30 17, 28 13 Z" strokeWidth="0.9" {...draw(delay + 0.8, 0.5)} />
      {/* paisley at the corner */}
      <motion.path {...stroke} d="M10 10 C4 6, 6 -2, 14 0 C22 2, 22 12, 14 16 C10 15, 8 13, 10 10 Z" {...draw(delay + 0.2, 0.7)} />
      <motion.path {...stroke} d="M12 8 C10 6, 11 2, 14 3 C17 4, 17 9, 14 11" strokeWidth="0.7" {...draw(delay + 0.9, 0.4)} />
      {/* small curls */}
      <motion.path {...stroke} d="M44 9 C46 13, 50 13, 50 9" strokeWidth="0.8" {...draw(delay + 1.1, 0.35)} />
      <motion.path {...stroke} d="M7 30 C3 30, 3 34, 7 34" strokeWidth="0.8" {...draw(delay + 1.2, 0.35)} />
      {/* dots */}
      <motion.circle cx="22" cy="23" r="1.1" fill={color} {...dot(delay + 1.3)} />
      <motion.circle cx="36" cy="11" r="1.1" fill={color} {...dot(delay + 1.4)} />
      <motion.circle cx="54" cy="5" r="1" fill={color} {...dot(delay + 1.5)} />
      <motion.circle cx="5" cy="44" r="1" fill={color} {...dot(delay + 1.5)} />
      <motion.circle cx="14" cy="8" r="1.2" fill={color} {...dot(delay + 1.0)} />
    </g>
  );

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 420" preserveAspectRatio="none" style={{ opacity: 0.85 }}>
        {/* Corners (each drawn in a 100×100 space, scaled to fit) */}
        <g transform="translate(8 8) scale(0.72)">
          <Corner transform="" delay={0.1} />
        </g>
        <g transform="translate(292 8) scale(-0.72 0.72)">
          <Corner transform="" delay={0.3} />
        </g>
        <g transform="translate(8 412) scale(0.72 -0.72)">
          <Corner transform="" delay={0.5} />
        </g>
        <g transform="translate(292 412) scale(-0.72 -0.72)">
          <Corner transform="" delay={0.7} />
        </g>
      </svg>
      {/* Connecting stems — drawn in a non-stretched layer so strokes stay 1px */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 420" preserveAspectRatio="none">
        <motion.path {...stroke} d="M52 12 C110 4, 190 4, 248 12" strokeWidth="0.8" vectorEffect="non-scaling-stroke" {...draw(0.9, 0.8)} />
        <motion.path {...stroke} d="M52 408 C110 416, 190 416, 248 408" strokeWidth="0.8" vectorEffect="non-scaling-stroke" {...draw(1.1, 0.8)} />
        <motion.path {...stroke} d="M10 52 C4 150, 4 270, 10 368" strokeWidth="0.8" vectorEffect="non-scaling-stroke" {...draw(1.0, 0.8)} />
        <motion.path {...stroke} d="M290 52 C296 150, 296 270, 290 368" strokeWidth="0.8" vectorEffect="non-scaling-stroke" {...draw(1.2, 0.8)} />
        {/* tiny leaf pairs mid-way along each stem */}
        {[
          "M150 8 C146 3, 154 3, 150 8 Z",
          "M150 412 C146 417, 154 417, 150 412 Z",
          "M7 210 C2 206, 2 214, 7 210 Z",
          "M293 210 C298 206, 298 214, 293 210 Z",
        ].map((d, i) => (
          <motion.path key={i} {...stroke} d={d} strokeWidth="0.9" vectorEffect="non-scaling-stroke" {...draw(1.6 + i * 0.1, 0.3)} />
        ))}
      </svg>
    </div>
  );
}
