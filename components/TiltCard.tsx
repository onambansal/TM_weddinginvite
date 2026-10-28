"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  /** Max tilt in degrees */
  max?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Subtle 3D tilt that follows the pointer (mouse or touch), with a moving
 * foil highlight — makes a flat image feel like a physical card being held.
 * Springs back to flat when the pointer leaves. Disabled for reduced motion.
 */
export default function TiltCard({ children, max = 6, className = "", style }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const px = useMotionValue(0.5); // 0..1 across the card
  const py = useMotionValue(0.5);
  const spring = { stiffness: 140, damping: 18, mass: 0.6 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const sheenX = useTransform(px, [0, 1], ["-40%", "140%"]);
  const sheenOpacity = useSpring(useMotionValue(0), spring);

  const update = (clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set(Math.min(1, Math.max(0, (clientX - r.left) / r.width)));
    py.set(Math.min(1, Math.max(0, (clientY - r.top) / r.height)));
    sheenOpacity.set(1);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
    sheenOpacity.set(0);
  };

  if (reduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ ...style, rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 1000 }}
      onPointerMove={(e) => update(e.clientX, e.clientY)}
      onPointerLeave={reset}
      onTouchMove={(e) => {
        const t = e.touches[0];
        if (t) update(t.clientX, t.clientY);
      }}
      onTouchEnd={reset}
    >
      {children}
      {/* Pointer-following foil highlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden"
        style={{ opacity: sheenOpacity }}
        aria-hidden="true"
      >
        <motion.div
          className="absolute inset-y-0 w-1/2"
          style={{
            left: sheenX,
            background: "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
