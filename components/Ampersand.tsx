"use client";

interface AmpersandProps {
  /** Font size — defaults to 1.4× surrounding text */
  size?: string;
  color?: string;
  className?: string;
}

/**
 * Signature ampersand — Cormorant italic, gold, slightly oversized.
 * Used wherever the two names meet so it becomes a recurring mark.
 */
export default function Ampersand({ size = "1.4em", color = "#C9A84C", className = "" }: AmpersandProps) {
  return (
    <span
      className={`inline-block italic leading-none ${className}`}
      style={{
        fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif",
        fontSize: size,
        fontWeight: 400,
        color,
        letterSpacing: "-0.02em",
        transform: "translateY(0.04em)",
      }}
      aria-label="and"
    >
      &amp;
    </span>
  );
}
