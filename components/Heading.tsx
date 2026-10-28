"use client";

import { motion } from "framer-motion";
import { wordContainer, wordItem, VIEWPORT_ONCE } from "@/lib/motion";

interface HeadingProps {
  children: string;
  /** Visual size preset */
  size?: "xl" | "lg" | "md";
  color?: string;
  /** Apply the animated gold-foil fill */
  foil?: boolean;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3";
}

const SIZES = {
  xl: "text-5xl md:text-6xl",
  lg: "text-4xl md:text-5xl",
  md: "text-3xl md:text-4xl",
} as const;

/**
 * Section heading in Cormorant Garamond with a word-by-word reveal.
 * Words rise and un-blur 70 ms apart — subtle, but every section opening
 * feels considered rather than "block fades in".
 */
export default function Heading({
  children,
  size = "lg",
  color = "#6B0F1A",
  foil = false,
  className = "",
  delay = 0,
  as = "h2",
}: HeadingProps) {
  const Tag = motion[as];
  const words = children.split(" ");

  return (
    <Tag
      className={`${SIZES[size]} leading-tight ${foil ? "text-gold-foil" : ""} ${className}`}
      style={{
        fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif",
        fontWeight: 600,
        letterSpacing: "0.01em",
        color: foil ? undefined : color,
      }}
      variants={wordContainer}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      aria-label={children}
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          className="inline-block"
          variants={wordItem}
          aria-hidden="true"
          style={{ marginRight: i < words.length - 1 ? "0.28em" : 0 }}
        >
          {w}
        </motion.span>
      ))}
    </Tag>
  );
}
