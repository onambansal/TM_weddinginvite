"use client";

import { motion, useReducedMotion } from "framer-motion";

interface MandalaProps {
  /** Diameter in px (will be clamped by the parent's overflow) */
  size?: number;
  color?: string;
  opacity?: number;
  /** Seconds per full rotation (0 = static) */
  spin?: number;
  className?: string;
}

const RING_COUNTS = [8, 12, 16, 24];

/**
 * Large, faint line-art mandala for dark section backdrops.
 * 1px gold strokes at ~5% opacity, rotating very slowly — classic
 * Indian-luxury depth without competing with the card in front.
 * Geometry is deterministic (no Math.random) so SSR == CSR.
 */
export default function Mandala({ size = 900, color = "#C9A84C", opacity = 0.06, spin = 120, className = "" }: MandalaProps) {
  const reduceMotion = useReducedMotion();
  const c = 500; // viewBox centre

  return (
    <motion.div
      className={`absolute left-1/2 top-1/2 pointer-events-none ${className}`}
      style={{ width: size, height: size, x: "-50%", y: "-50%", opacity }}
      animate={spin && !reduceMotion ? { rotate: 360 } : undefined}
      transition={{ duration: spin, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1000 1000" width="100%" height="100%" fill="none" stroke={color} strokeWidth="1">
        {/* Concentric rings */}
        {[120, 190, 260, 330, 400, 470].map((r) => (
          <circle key={r} cx={c} cy={c} r={r} />
        ))}
        {/* Petal rings — ellipses rotated around the centre */}
        {RING_COUNTS.map((n, ringIdx) => {
          const r = 160 + ringIdx * 80;
          const rx = 22 + ringIdx * 4;
          const ry = 46 + ringIdx * 10;
          return Array.from({ length: n }).map((_, i) => (
            <ellipse
              key={`${ringIdx}-${i}`}
              cx={c}
              cy={c - r}
              rx={rx}
              ry={ry}
              transform={`rotate(${(360 / n) * i} ${c} ${c})`}
              strokeWidth={ringIdx === 0 ? 1.2 : 0.9}
            />
          ));
        })}
        {/* Radial spokes */}
        {Array.from({ length: 36 }).map((_, i) => (
          <line
            key={`spoke-${i}`}
            x1={c}
            y1={c - 120}
            x2={c}
            y2={c - 470}
            transform={`rotate(${10 * i} ${c} ${c})`}
            strokeWidth="0.5"
            opacity="0.6"
          />
        ))}
        {/* Centre lotus */}
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={`lotus-${i}`}
            d={`M${c} ${c - 110} C${c + 40} ${c - 70}, ${c + 40} ${c - 20}, ${c} ${c} C${c - 40} ${c - 20}, ${c - 40} ${c - 70}, ${c} ${c - 110} Z`}
            transform={`rotate(${45 * i} ${c} ${c})`}
            strokeWidth="1.1"
          />
        ))}
        <circle cx={c} cy={c} r="14" strokeWidth="1.2" />
      </svg>
    </motion.div>
  );
}
