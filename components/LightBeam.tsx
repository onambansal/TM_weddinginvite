"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface LightBeamProps {
  /** Beam brightness (0‒1). Use lower on ivory sections. */
  intensity?: number;
  /** Beam colour */
  color?: string;
  className?: string;
}

/**
 * A soft diagonal shaft of light — like sun through a tall window — that
 * sweeps across a section as it scrolls through the viewport, then rests.
 * Purely scroll-driven, so it feels tied to the guest's hand.
 */
export default function LightBeam({ intensity = 0.18, color = "255, 243, 196", className = "" }: LightBeamProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Sweep from left (−60%) to right (+60%) as the section passes through
  const x = useTransform(scrollYProgress, [0.1, 0.9], ["-70%", "70%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  if (reduceMotion) return <div ref={ref} className="absolute inset-0 pointer-events-none" />;

  return (
    <div ref={ref} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        className="absolute inset-y-[-20%] left-1/2 w-[55%]"
        style={{
          x,
          opacity,
          marginLeft: "-27.5%",
          transform: "skewX(-18deg)",
          background: `linear-gradient(90deg, rgba(${color},0) 0%, rgba(${color},${intensity * 0.55}) 35%, rgba(${color},${intensity}) 50%, rgba(${color},${intensity * 0.55}) 65%, rgba(${color},0) 100%)`,
          filter: "blur(18px)",
          mixBlendMode: "screen",
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
}
