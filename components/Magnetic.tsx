"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  /** Max pull toward the pointer in px */
  strength?: number;
  /** How far outside the element the pull begins (px) */
  radius?: number;
  className?: string;
}

/**
 * Wraps a button/link so it nudges toward the pointer as it approaches and
 * springs back when it leaves. Also exposes a `--magnet` CSS var (0‒1) the
 * child can use to brighten its glow.
 */
export default function Magnetic({ children, strength = 6, radius = 60, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 180, damping: 16, mass: 0.5 };
  const x = useSpring(mx, spring);
  const y = useSpring(my, spring);
  const glow = useMotionValue(0);
  const glowS = useSpring(glow, spring);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const reach = Math.max(r.width, r.height) / 2 + radius;
    const t = Math.max(0, 1 - dist / reach); // 1 at centre → 0 at reach
    mx.set((dx / reach) * strength * 2 * t);
    my.set((dy / reach) * strength * 2 * t);
    glow.set(t);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
    glow.set(0);
  };

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x, y, // @ts-expect-error custom property on style via motion value
        "--magnet": glowS }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerUp={reset}
    >
      {children}
    </motion.div>
  );
}
