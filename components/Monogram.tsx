"use client";

import { groom, bride } from "@/config/weddingConfig";

interface MonogramProps {
  /** Overall size (px) */
  size?: number;
  color?: string;
  /** Show the thin circular frame around the letters */
  framed?: boolean;
  /** SVG filter id to apply to the letters (e.g. a deboss filter) */
  filter?: string;
  className?: string;
}

/**
 * Couple monogram — groom's initial first, then bride's ("T·M").
 * Set in Cormorant Garamond with a small diamond between the letters and
 * a hairline ring, like an engraved stationery monogram. Used on the wax
 * seal, the Save-the-Date card backs, and the favicon.
 */
export default function Monogram({ size = 48, color = "#C9A84C", framed = true, filter, className = "" }: MonogramProps) {
  const g = groom.firstName[0];
  const b = bride.firstName[0];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-label={`${g}${b} monogram`}
      role="img"
    >
      {framed && (
        <>
          <circle cx="50" cy="50" r="46" fill="none" stroke={color} strokeWidth="1.2" opacity="0.9" />
          <circle cx="50" cy="50" r="42" fill="none" stroke={color} strokeWidth="0.6" opacity="0.55" />
        </>
      )}
      <g filter={filter ? `url(#${filter})` : undefined}>
        {/* Groom initial */}
        <text
          x="34"
          y="64"
          textAnchor="middle"
          fontSize="46"
          fontWeight="500"
          fontFamily="var(--font-cormorant), var(--font-playfair), Georgia, serif"
          fill={color}
        >
          {g}
        </text>
        {/* Bride initial */}
        <text
          x="66"
          y="64"
          textAnchor="middle"
          fontSize="46"
          fontWeight="500"
          fontFamily="var(--font-cormorant), var(--font-playfair), Georgia, serif"
          fill={color}
        >
          {b}
        </text>
        {/* Small diamond divider */}
        <path d="M50 44 L53 48 L50 52 L47 48 Z" fill={color} />
        {/* Hairline flourishes top & bottom */}
        <path d="M30 26 Q50 20 70 26" fill="none" stroke={color} strokeWidth="0.9" strokeLinecap="round" opacity="0.8" />
        <path d="M30 76 Q50 82 70 76" fill="none" stroke={color} strokeWidth="0.9" strokeLinecap="round" opacity="0.8" />
      </g>
    </svg>
  );
}
