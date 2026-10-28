"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface GoldFireworkProps {
  /** Fire when true; keep true for ~2.5 s then set false (or leave — it plays once) */
  active: boolean;
  /** Centre as % of the container */
  x?: number;
  y?: number;
  /** Particle count for the main burst */
  count?: number;
  className?: string;
}

function rand(seed: number) {
  const v = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return v - Math.floor(v);
}

/**
 * One restrained gold firework: a rising trail, a bloom of ~60 particles
 * that arc outward and fall under gravity with a twinkle, plus a soft
 * expanding ring. Deterministic, CSS/motion only.
 */
export default function GoldFirework({ active, x = 50, y = 42, count = 60, className = "" }: GoldFireworkProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  const RISE = 0.7;      // s for the shell to rise
  const BURST = 1.9;     // s for particles to arc & fade
  const radius = 170;    // px

  const particles = Array.from({ length: count }).map((_, i) => {
    const a = (i / count) * Math.PI * 2 + rand(i) * 0.25;
    const r = radius * (0.55 + rand(i + 50) * 0.55);
    const bright = rand(i + 90) > 0.55;
    return {
      id: i,
      // outward arc, then gravity pulls down
      tx: Math.cos(a) * r,
      ty: Math.sin(a) * r,
      fall: 40 + rand(i + 120) * 70,
      size: bright ? 3.5 : 2.4,
      color: bright ? "#FFF3C4" : "#E8C97A",
      delay: rand(i + 7) * 0.08,
      twinkle: 0.18 + rand(i + 33) * 0.2,
    };
  });

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
          style={{ zIndex: 20 }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          aria-hidden="true"
        >
          {/* Rising shell trail */}
          <motion.span
            className="absolute rounded-full"
            style={{ left: `${x}%`, bottom: "6%", width: 3, height: 14, marginLeft: -1.5, background: "linear-gradient(180deg, #FFF3C4, rgba(232,201,122,0))", boxShadow: "0 0 6px rgba(243,226,160,0.9)" }}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: `calc(-${94 - y}vh)`, opacity: [1, 1, 0] }}
            transition={{ duration: RISE, ease: [0.2, 0.8, 0.4, 1], times: [0, 0.85, 1] }}
          />

          {/* Flash at the burst point */}
          <motion.span
            className="absolute rounded-full"
            style={{ left: `${x}%`, top: `${y}%`, width: 60, height: 60, marginLeft: -30, marginTop: -30, background: "radial-gradient(circle, #FFFFFF 0%, rgba(255,243,196,0.8) 25%, rgba(232,201,122,0) 70%)" }}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: [0, 1, 0], scale: [0.2, 1.6, 2.4] }}
            transition={{ duration: 0.45, delay: RISE, ease: "easeOut" }}
          />

          {/* Soft expanding ring */}
          <motion.span
            className="absolute rounded-full"
            style={{ left: `${x}%`, top: `${y}%`, width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius, border: "1px solid rgba(243,226,160,0.9)" }}
            initial={{ opacity: 0, scale: 0.05 }}
            animate={{ opacity: [0, 0.7, 0], scale: [0.05, 1, 1.25] }}
            transition={{ duration: 1.1, delay: RISE, ease: "easeOut" }}
          />

          {/* Burst particles */}
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: p.size,
                height: p.size,
                marginLeft: -p.size / 2,
                marginTop: -p.size / 2,
                background: p.color,
                boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
              animate={{
                x: [0, p.tx * 0.75, p.tx, p.tx * 1.02],
                y: [0, p.ty * 0.75, p.ty + p.fall * 0.35, p.ty + p.fall],
                opacity: [0, 1, 0.9, 0],
                scale: [0.4, 1.2, 0.9, 0.3],
              }}
              transition={{
                duration: BURST,
                delay: RISE + p.delay,
                ease: ["easeOut", "easeOut", "easeIn"],
                times: [0, 0.35, 0.7, 1],
              }}
            >
              {/* twinkle overlay */}
              <motion.span
                className="absolute inset-0 rounded-full bg-white"
                animate={{ opacity: [0, 0.9, 0] }}
                transition={{ duration: p.twinkle, repeat: Math.floor(BURST / p.twinkle), delay: RISE + p.delay + 0.2 }}
              />
            </motion.span>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
