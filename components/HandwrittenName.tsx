"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_LUX } from "@/lib/motion";

interface HandwrittenNameProps {
  text: string;
  /** Seconds the writing takes */
  duration?: number;
  delay?: number;
  color?: string;
  fontSize?: string;
  className?: string;
  as?: "h1" | "h2" | "p";
}

/**
 * "Writes" a script name on screen: a left-to-right mask reveals the glyphs
 * while a glowing gold pen-tip with a sparkle trail travels along the baseline
 * ahead of the ink. Uses the real Great Vibes webfont, so it renders crisply
 * at any size and needs no font-outline data.
 */
export default function HandwrittenName({
  text,
  duration = 1.8,
  delay = 0,
  color = "#E8C97A",
  fontSize = "clamp(3rem, 12vw, 4.5rem)",
  className = "",
  as = "h1",
}: HandwrittenNameProps) {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as];

  if (reduceMotion) {
    return (
      <Tag className={`leading-none ${className}`} style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize, color }}>
        {text}
      </Tag>
    );
  }

  return (
    <div className={`relative inline-block ${className}`} aria-label={text}>
      {/* Ghost of the full word — barely visible so the eye anticipates the shape */}
      <Tag
        className="leading-none select-none"
        aria-hidden="true"
        style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize, color, opacity: 0.08, padding: "0 0.15em" }}
      >
        {text}
      </Tag>

      {/* Ink — revealed left→right by an animated clip-path */}
      <Tag
        className="absolute inset-0 leading-none select-none"
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-great-vibes), cursive",
          fontSize,
          color,
          padding: "0 0.15em",
          textShadow: "0 4px 24px rgba(0,0,0,0.4), 0 0 18px rgba(232,201,122,0.35)",
        }}
        initial={{ clipPath: "inset(-20% 100% -20% 0)" }}
        animate={{ clipPath: "inset(-20% 0% -20% 0)" }}
        transition={{ duration, delay, ease: "linear" }}
      >
        {text}
      </Tag>

      {/* Pen-tip: a bright point with glow travelling along the baseline */}
      <motion.span
        className="absolute pointer-events-none"
        style={{ top: "58%", left: 0, width: 14, height: 14, marginLeft: -7, marginTop: -7 }}
        initial={{ left: "2%", opacity: 0 }}
        animate={{ left: ["2%", "98%"], opacity: [0, 1, 1, 0] }}
        transition={{ duration, delay, ease: "linear", times: [0, 0.05, 0.95, 1] }}
        aria-hidden="true"
      >
        <span className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, #FFFFFF 0%, #F3E2A0 35%, rgba(201,168,76,0) 70%)", filter: "blur(0.5px)" }} />
        <motion.span
          className="absolute inset-[-10px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(243,226,160,0.55) 0%, rgba(201,168,76,0) 70%)" }}
          animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Trailing sparkles */}
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{ width: 3 + (i % 2), height: 3 + (i % 2), left: 5, top: 5, background: i % 2 ? "#FFFFFF" : "#F3E2A0" }}
            animate={{ x: [0, -18 - i * 6], y: [0, (i % 2 ? -1 : 1) * (6 + i * 3)], opacity: [1, 0], scale: [1, 0.3] }}
            transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.12, ease: "easeOut" }}
          />
        ))}
      </motion.span>

      {/* Settle glow once written */}
      <motion.span
        className="absolute inset-0 pointer-events-none rounded-full"
        style={{ background: "radial-gradient(ellipse at center, rgba(232,201,122,0.25) 0%, rgba(232,201,122,0) 60%)", filter: "blur(8px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0] }}
        transition={{ duration: 1.2, delay: delay + duration - 0.1, ease: EASE_LUX }}
        aria-hidden="true"
      />
    </div>
  );
}
