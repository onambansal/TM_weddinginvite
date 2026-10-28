"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SparklesProps {
  /** Number of stars */
  count?: number;
  color?: string;
  /** Size range in px */
  minSize?: number;
  maxSize?: number;
  /**
   * Where to place the stars. "edges" clusters them around the border of the
   * parent (jewellery-ad framing); "everywhere" scatters them uniformly.
   */
  distribution?: "edges" | "everywhere";
  className?: string;
  /** Seed so different instances don't twinkle in sync */
  seed?: number;
}

/** Deterministic pseudo-random (so SSR == CSR) */
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

/**
 * Four-point star sparkles that *twinkle*: a quick bright flash followed by
 * a slow decay, each on its own rhythm. Place inside a `relative` parent.
 */
export default function Sparkles({
  count = 14,
  color = "#F3E2A0",
  minSize = 6,
  maxSize = 14,
  distribution = "edges",
  className = "",
  seed = 1,
}: SparklesProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  const stars = Array.from({ length: count }).map((_, i) => {
    const r1 = rand(seed * 100 + i);
    const r2 = rand(seed * 100 + i + 0.5);
    const r3 = rand(seed * 100 + i + 0.25);
    let left: number;
    let top: number;
    if (distribution === "edges") {
      // Pick an edge, then a position along it, nudged slightly inward/outward
      const edge = i % 4;
      const along = r1 * 100;
      const off = -4 + r2 * 10;
      if (edge === 0) { left = along; top = off; }
      else if (edge === 1) { left = 100 - off; top = along; }
      else if (edge === 2) { left = along; top = 100 - off; }
      else { left = off; top = along; }
    } else {
      left = r1 * 100;
      top = r2 * 100;
    }
    return {
      id: i,
      left,
      top,
      size: minSize + r3 * (maxSize - minSize),
      delay: r1 * 4,
      period: 2.6 + r2 * 3.4,
      rotate: r3 * 90,
    };
  });

  return (
    <div className={`absolute pointer-events-none ${className || "inset-0"}`} aria-hidden="true">
      {stars.map((s) => (
        <motion.svg
          key={s.id}
          className="absolute"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, marginLeft: -s.size / 2, marginTop: -s.size / 2, rotate: s.rotate }}
          viewBox="0 0 24 24"
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{
            // quick flash → slow decay → dark
            opacity: [0, 1, 0.55, 0.15, 0],
            scale: [0.2, 1.15, 0.9, 0.6, 0.2],
          }}
          transition={{
            duration: s.period,
            times: [0, 0.08, 0.3, 0.7, 1],
            repeat: Infinity,
            delay: s.delay,
            ease: "easeOut",
          }}
        >
          <defs>
            <radialGradient id={`sp-${seed}-${s.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor={color} />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Soft glow */}
          <circle cx="12" cy="12" r="12" fill={`url(#sp-${seed}-${s.id})`} opacity="0.7" />
          {/* 4-point star */}
          <path d="M12 0 C12.6 8, 16 11.4, 24 12 C16 12.6, 12.6 16, 12 24 C11.4 16, 8 12.6, 0 12 C8 11.4, 11.4 8, 12 0 Z" fill="#FFFFFF" />
          <path d="M12 3 C12.4 8.5, 15.5 11.6, 21 12 C15.5 12.4, 12.4 15.5, 12 21 C11.6 15.5, 8.5 12.4, 3 12 C8.5 11.6, 11.6 8.5, 12 3 Z" fill={color} />
        </motion.svg>
      ))}
    </div>
  );
}
