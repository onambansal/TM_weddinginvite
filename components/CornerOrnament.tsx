"use client";

import { motion } from "framer-motion";
import { drawPath, enter } from "@/lib/motion";

/**
 * Four gold paisley/filigree flourishes anchored to the corners of a section.
 * Each flourish draws itself (SVG pathLength) as the section scrolls into view.
 */
interface CornerOrnamentProps {
  color?: string;
  opacity?: number;
  size?: number;
  /** Inset from the section edge (px) */
  inset?: number;
}

const dot = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number = 0) => ({ opacity: 1, scale: 1, transition: enter(0.6 + i * 0.08, 0.4) }),
};

function Flourish({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Outer sweeping curve */}
      <motion.path d="M4 96 C4 50, 20 20, 60 8 C72 5, 84 6, 96 4" stroke={color} strokeWidth="1.4" strokeLinecap="round" variants={drawPath} custom={0} />
      {/* Inner curve */}
      <motion.path d="M12 96 C14 58, 30 30, 62 18 C72 15, 82 14, 90 12" stroke={color} strokeWidth="0.9" strokeLinecap="round" opacity="0.7" variants={drawPath} custom={1} />
      {/* Paisley teardrop */}
      <motion.path d="M34 40 C26 32, 30 18, 42 16 C54 14, 60 26, 54 36 C48 46, 38 48, 34 40 Z" stroke={color} strokeWidth="1.2" fill="none" variants={drawPath} custom={2} />
      <motion.path d="M38 36 C34 30, 38 22, 44 22 C50 22, 52 30, 48 34" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.8" variants={drawPath} custom={3} />
      {/* Small leaves along the curve */}
      <motion.path d="M18 70 C22 62, 30 62, 30 70 C26 74, 20 74, 18 70 Z" stroke={color} strokeWidth="1" fill="none" variants={drawPath} custom={3} />
      <motion.path d="M70 18 C72 12, 80 10, 82 16 C80 20, 74 22, 70 18 Z" stroke={color} strokeWidth="1" fill="none" variants={drawPath} custom={3} />
      {/* Dots */}
      {[
        [8, 88, 1.6, 1],
        [88, 8, 1.6, 1],
        [46, 30, 1.6, 1],
        [24, 54, 1.2, 0.8],
        [58, 22, 1.2, 0.8],
      ].map(([cx, cy, r, o], i) => (
        <motion.circle key={i} cx={cx} cy={cy} r={r} fill={color} opacity={o} variants={dot} custom={i} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      ))}
    </svg>
  );
}

export default function CornerOrnament({ color = "#C9A84C", opacity = 0.45, size = 84, inset = 14 }: CornerOrnamentProps) {
  const base: React.CSSProperties = { position: "absolute", opacity, pointerEvents: "none", lineHeight: 0 };
  const corners: Array<[React.CSSProperties, string]> = [
    [{ top: inset, left: inset }, "none"],
    [{ top: inset, right: inset }, "scaleX(-1)"],
    [{ bottom: inset, left: inset }, "scaleY(-1)"],
    [{ bottom: inset, right: inset }, "scale(-1)"],
  ];
  return (
    <>
      {corners.map(([pos, transform], i) => (
        <motion.div
          key={i}
          style={{ ...base, ...pos, transform }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Flourish color={color} size={size} />
        </motion.div>
      ))}
    </>
  );
}
