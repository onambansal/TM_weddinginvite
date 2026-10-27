"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  color?: string;
  /** Width of the whole ornament in px */
  width?: number;
  className?: string;
  /** Animate on scroll into view (default true) */
  animate?: boolean;
}

/**
 * Thin gold ornamental rule with a central lotus/diamond motif.
 * Use inside sections between heading & body, or between blocks.
 */
export default function SectionDivider({
  color = "#C9A84C",
  width = 180,
  className = "",
  animate = true,
}: SectionDividerProps) {
  const content = (
    <svg
      width={width}
      height="18"
      viewBox="0 0 180 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="sd-left" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={color} stopOpacity="0" />
          <stop offset="1" stopColor={color} stopOpacity="1" />
        </linearGradient>
        <linearGradient id="sd-right" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={color} stopOpacity="1" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1="9" x2="68" y2="9" stroke="url(#sd-left)" strokeWidth="1" />
      <line x1="112" y1="9" x2="180" y2="9" stroke="url(#sd-right)" strokeWidth="1" />
      {/* Diamond */}
      <path d="M90 2 L97 9 L90 16 L83 9 Z" stroke={color} strokeWidth="1" fill="none" />
      <path d="M90 5.5 L93.5 9 L90 12.5 L86.5 9 Z" fill={color} />
      {/* Side petals */}
      <path d="M72 9 C75 5, 79 5, 81 9 C79 13, 75 13, 72 9 Z" stroke={color} strokeWidth="0.9" fill="none" />
      <path d="M99 9 C101 5, 105 5, 108 9 C105 13, 101 13, 99 9 Z" stroke={color} strokeWidth="0.9" fill="none" />
      <circle cx="68" cy="9" r="1.2" fill={color} />
      <circle cx="112" cy="9" r="1.2" fill={color} />
    </svg>
  );

  if (!animate) return <div className={`mx-auto ${className}`} style={{ width }}>{content}</div>;

  return (
    <motion.div
      className={`mx-auto ${className}`}
      style={{ width }}
      initial={{ opacity: 0, scaleX: 0.6 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {content}
    </motion.div>
  );
}
