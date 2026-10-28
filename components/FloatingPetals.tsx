"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  kind: "rose" | "marigold";
  /** 0 = far (small, blurred, slow) · 1 = mid · 2 = near (large, sharp, fast) */
  plane: 0 | 1 | 2;
}

/** Depth-of-field planes: far petals are small, soft and slow; near ones large, sharp and quick */
const PLANES = [
  { size: [8, 12], blur: 2.4, opacity: 0.35, duration: [26, 34], drift: 14 },
  { size: [12, 18], blur: 1.0, opacity: 0.5, duration: [17, 23], drift: 22 },
  { size: [18, 26], blur: 0, opacity: 0.65, duration: [11, 15], drift: 34 },
] as const;

/** Soft rose + marigold tones that sit inside the maroon/gold palette */
const PETAL_COLORS = ["#E8A0A0", "#D98C8C", "#E8C97A", "#C9A84C", "#F0B86E"];

/** Rose petal — teardrop with a soft vein */
function RosePetal({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 20 25" fill="none" aria-hidden="true">
      <path d="M10 1 C16 6, 20 12, 16 20 C13 24, 7 24, 4 20 C0 12, 4 6, 10 1 Z" fill={color} />
      <path d="M10 4 C10 10, 10 15, 10 21" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

/** Marigold petal — small ruffled fan */
function MarigoldPetal({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 18 C4 14, 2 8, 5 3 C7 5, 8 5, 10 2 C12 5, 13 5, 15 3 C18 8, 16 14, 10 18 Z" fill={color} />
      <path d="M10 17 C9 12, 9 8, 10 4" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Slow, sparse petal drift over the whole invite.
 * Generated client-side (random) so there is no SSR/CSR mismatch,
 * and disabled entirely for users who prefer reduced motion.
 */
export default function FloatingPetals() {
  const reduceMotion = useReducedMotion();
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // 12 petals: 4 far, 5 mid, 3 near — mostly background so the effect stays subtle
    const planeFor = (i: number): 0 | 1 | 2 => (i < 4 ? 0 : i < 9 ? 1 : 2);
    const generated: Petal[] = Array.from({ length: 12 }, (_, i) => {
      const plane = planeFor(i);
      const P = PLANES[plane];
      return {
        id: i,
        plane,
        x: Math.random() * 100,
        delay: Math.random() * 10,
        duration: P.duration[0] + Math.random() * (P.duration[1] - P.duration[0]),
        size: P.size[0] + Math.random() * (P.size[1] - P.size[0]),
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        kind: Math.random() > 0.5 ? "rose" : "marigold",
      };
    });
    setPetals(generated);
  }, []);

  if (reduceMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((petal) => {
        const P = PLANES[petal.plane];
        const d = P.drift;
        return (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: 0,
            opacity: P.opacity,
            filter: `blur(${P.blur}px) drop-shadow(0 2px 3px rgba(0,0,0,0.12))`,
            willChange: "transform",
          }}
          initial={{ y: "-8vh", rotate: 0 }}
          animate={{
            y: "108vh",
            rotate: [0, 120, 240, 360],
            x: [0, d * 0.65, -d * 0.5, d * 0.8, -d * 0.25, 0],
            opacity: [0, P.opacity, P.opacity, P.opacity * 0.8, 0],
          }}
          transition={{ duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: "linear" }}
        >
          {petal.kind === "rose" ? (
            <RosePetal size={petal.size} color={petal.color} />
          ) : (
            <MarigoldPetal size={petal.size} color={petal.color} />
          )}
        </motion.div>
        );
      })}
    </div>
  );
}
