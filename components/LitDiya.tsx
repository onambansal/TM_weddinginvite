"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_LUX } from "@/lib/motion";

interface LitDiyaProps {
  /** Whether this lamp has been lit */
  lit: boolean;
  size?: number;
  color?: string;
  /** Per-lamp flicker period so they don't sync */
  flicker?: number;
  /**
   * Freeze the infinite flicker loops (lamp stays lit, flame and glow hold
   * their resting pose). Used while the section is scrolled out of view.
   */
  paused?: boolean;
}

/**
 * A diya that starts unlit (bowl only, dim) and, when `lit` flips true,
 * sparks, grows a flame and settles into a breathing glow.
 */
export default function LitDiya({ lit, size = 28, color = "#C9A84C", flicker = 0.3, paused = false }: LitDiyaProps) {
  const reduceMotion = useReducedMotion();
  const s = { stroke: color, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
  const flickering = lit && !paused && !reduceMotion;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Warm pool of light on the "floor" */}
      <motion.span
        className="absolute left-1/2 rounded-full pointer-events-none"
        style={{ width: size * 2.6, height: size * 1.2, bottom: -size * 0.2, x: "-50%", background: "radial-gradient(ellipse, rgba(232,201,122,0.45), transparent 70%)" }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={lit ? { opacity: flickering ? [0.5, 0.85, 0.55, 0.8, 0.5] : 0.65, scale: 1 } : { opacity: 0, scale: 0.4 }}
        transition={lit ? { opacity: flickering ? { duration: flicker * 5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4 }, scale: { duration: 0.8, ease: EASE_LUX } } : { duration: 0.3 }}
      />
      {/* Halo around the flame */}
      <motion.span
        className="absolute left-1/2 rounded-full pointer-events-none"
        style={{ width: size * 1.3, height: size * 1.3, top: -size * 0.1, x: "-50%", background: "radial-gradient(circle, rgba(255,241,201,0.7), rgba(232,201,122,0.3) 45%, transparent 70%)" }}
        initial={{ opacity: 0, scale: 0 }}
        animate={lit ? (flickering ? { opacity: [0.6, 1, 0.7, 0.95, 0.6], scale: [0.95, 1.15, 1, 1.1, 0.95] } : { opacity: 0.85, scale: 1.05 }) : { opacity: 0, scale: 0 }}
        transition={lit ? (flickering ? { duration: flicker * 4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4 }) : { duration: 0.3 }}
      />

      <svg width={size} height={size} viewBox="0 0 64 64" className="relative" aria-hidden="true">
        {/* Bowl — always visible, dimmer when unlit */}
        <motion.g animate={{ opacity: lit ? 1 : 0.45 }} transition={{ duration: 0.8 }}>
          <path {...s} d="M12 36h40c0 8-8 14-20 14S12 44 12 36z" />
          <path {...s} d="M16 36c4-2 10-3 16-3s12 1 16 3" strokeWidth="1" opacity="0.7" />
          <path {...s} d="M22 50l-2 6h24l-2-6" strokeWidth="1" />
        </motion.g>
        {/* Wick */}
        <path d="M32 33v-4" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity={lit ? 1 : 0.5} />

        {/* Spark on ignition */}
        <motion.g
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          initial={{ opacity: 0, scale: 0 }}
          animate={lit && !reduceMotion ? { opacity: [0, 1, 0], scale: [0, 1.6, 0.2] } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <path d="M32 18 C32.6 24, 36 27.4, 42 28 C36 28.6, 32.6 32, 32 38 C31.4 32, 28 28.6, 22 28 C28 27.4, 31.4 24, 32 18 Z" fill="#FFFFFF" />
          <path d="M32 21 C32.4 25.5, 35.5 28.6, 40 29 C35.5 29.4, 32.4 32.5, 32 37 C31.6 32.5, 28.5 29.4, 24 29 C28.5 28.6, 31.6 25.5, 32 21 Z" fill="#F3E2A0" />
        </motion.g>

        {/* Flame — grows in (outer group), then flickers (inner group) */}
        <motion.g
          style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
          initial={{ scaleY: 0, scaleX: 0.6, opacity: 0 }}
          animate={lit ? { scaleY: 1, scaleX: 1, opacity: 1 } : { scaleY: 0, scaleX: 0.6, opacity: 0 }}
          transition={lit ? { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] } : { duration: 0.3 }}
        >
        <motion.g
          style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
          animate={flickering ? { scaleY: [1, 1.06, 0.96, 1.04, 1], scaleX: [1, 0.97, 1.03, 0.98, 1], x: [0, 0.6, -0.5, 0.4, 0] } : undefined}
          transition={{ duration: flicker, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        >
          <path d="M32 10c-4 6-6 10-6 14 0 4 3 7 6 7s6-3 6-7c0-4-2-8-6-14z" fill="rgba(255,241,201,0.25)" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M32 20c-1.5 2-2 4-2 5.5 0 1.5 1 2.5 2 2.5s2-1 2-2.5c0-1.5-.5-3.5-2-5.5z" fill="#FFF6D8" stroke={color} strokeWidth="0.8" opacity="0.95" />
        </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}
