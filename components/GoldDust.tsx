"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface GoldDustProps {
  /** Render when true; unmounting fades it out */
  active: boolean;
  /** Number of specks */
  count?: number;
  /** "stream" falls from a point at the top-centre; "shower" falls across the full width */
  mode?: "stream" | "shower";
  /** Seconds the fall lasts */
  duration?: number;
  /** Extra classes on the full-cover container */
  className?: string;
  /** Use `fixed` positioning to cover the viewport (for the full-screen shower) */
  fixed?: boolean;
  seed?: number;
  /** Darker specks that read on ivory backgrounds */
  onLight?: boolean;
}

function rand(seed: number) {
  const x = Math.sin(seed * 7919 + 104729) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Slow-falling, glittering gold dust. Each speck drifts down with a little
 * sideways sway, twinkles, and fades near the bottom. Pure CSS/motion — no canvas.
 */
export default function GoldDust({
  active,
  count = 36,
  mode = "stream",
  duration = 3,
  className = "",
  fixed = false,
  seed = 7,
  onLight = false,
}: GoldDustProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  const specks = Array.from({ length: count }).map((_, i) => {
    const r1 = rand(seed * 31 + i);
    const r2 = rand(seed * 31 + i + 0.33);
    const r3 = rand(seed * 31 + i + 0.66);
    const startX = mode === "stream" ? 50 + (r1 - 0.5) * 22 : r1 * 100;
    return {
      id: i,
      startX,
      drift: (r2 - 0.5) * 60,          // px of sideways travel
      size: 2 + r3 * 4,
      delay: r2 * (duration * 0.45),
      fall: duration * (0.7 + r3 * 0.6),
      bright: r1 > 0.6,
    };
  });

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className={`${fixed ? "fixed" : "absolute"} inset-0 pointer-events-none overflow-hidden ${className}`}
          style={{ zIndex: 30 }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          aria-hidden="true"
        >
          {specks.map((s) => (
            <motion.span
              key={s.id}
              className="absolute rounded-full"
              style={{
                left: `${s.startX}%`,
                top: mode === "stream" ? "40%" : "-4%",
                width: s.size,
                height: s.size,
                background: onLight
                  ? s.bright
                    ? "radial-gradient(circle, #F3E2A0 0%, #C9A84C 45%, rgba(160,120,48,0) 100%)"
                    : "radial-gradient(circle, #C9A84C 0%, #A07830 55%, rgba(160,120,48,0) 100%)"
                  : s.bright
                    ? "radial-gradient(circle, #FFFFFF 0%, #F3E2A0 45%, rgba(201,168,76,0) 100%)"
                    : "radial-gradient(circle, #F3E2A0 0%, #C9A84C 55%, rgba(201,168,76,0) 100%)",
                boxShadow: onLight
                  ? "0 0 4px rgba(160,120,48,0.55)"
                  : s.bright ? "0 0 6px rgba(243,226,160,0.9)" : "0 0 3px rgba(201,168,76,0.6)",
              }}
              initial={{ opacity: 0, y: 0, x: 0, scale: 0.6 }}
              animate={{
                opacity: [0, 1, 0.9, 0.7, 0],
                y: mode === "stream" ? [0, 60, 160, 260, 340] : ["0vh", "30vh", "60vh", "85vh", "105vh"],
                x: [0, s.drift * 0.3, s.drift * 0.6, s.drift * 0.85, s.drift],
                scale: [0.6, 1.1, 0.9, 1, 0.5],
              }}
              transition={{ duration: s.fall, delay: s.delay, ease: "easeIn", times: [0, 0.15, 0.5, 0.8, 1] }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
