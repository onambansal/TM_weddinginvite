"use client";

import { groom, bride } from "@/config/weddingConfig";

interface WaxSealProps {
  size?: number;
}

/**
 * Wax seal with the couple's debossed monogram (groom first: "T·M").
 * Irregular blob outline, a soft rim highlight, and an inner shadow on the
 * letters so they read as pressed into the wax rather than printed on it.
 */
export default function WaxSeal({ size = 56 }: WaxSealProps) {
  const g = groom.firstName[0];
  const b = bride.firstName[0];
  const serif = "var(--font-cormorant), var(--font-playfair), Georgia, serif";
  return (
    <div className="relative" style={{ width: size, height: size }} aria-label={`Wax seal ${g}${b}`}>
      <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
        <defs>
          <radialGradient id="wax-body" cx="38%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#B8233A" />
            <stop offset="55%" stopColor="#8A1626" />
            <stop offset="100%" stopColor="#4A0A12" />
          </radialGradient>
          <radialGradient id="wax-rim" cx="50%" cy="50%" r="50%">
            <stop offset="78%" stopColor="rgba(255,255,255,0)" />
            <stop offset="92%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
          </radialGradient>
          <filter id="wax-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.45" />
          </filter>
          <filter id="deboss" x="-20%" y="-20%" width="140%" height="140%">
            <feOffset dx="0" dy="0.8" in="SourceAlpha" result="off" />
            <feGaussianBlur in="off" stdDeviation="0.6" result="blur" />
            <feComposite in="blur" in2="SourceAlpha" operator="out" result="inner" />
            <feFlood floodColor="#2A0608" floodOpacity="0.9" result="col" />
            <feComposite in="col" in2="inner" operator="in" result="shadow" />
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="shadow" />
            </feMerge>
          </filter>
        </defs>

        {/* Irregular wax blob */}
        <path
          d="M50 4c9 0 14 5 21 7 7 2 16 2 20 10 4 8-2 15 0 23s9 13 6 21-11 9-16 15-6 14-15 16-15-5-23-5-15 7-23 3-8-13-13-19S-2 64 1 56s7-14 8-22-3-16 2-23 14-6 21-9 10-2 18 2z"
          fill="url(#wax-body)"
          filter="url(#wax-shadow)"
        />
        <circle cx="50" cy="50" r="40" fill="url(#wax-rim)" />
        {/* Pressed ring */}
        <circle cx="50" cy="50" r="30" fill="none" stroke="#5A0C18" strokeWidth="1.2" opacity="0.8" />
        <circle cx="50" cy="50" r="27.5" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
        {/* Tiny gold highlight */}
        <ellipse cx="38" cy="30" rx="7" ry="3.5" fill="rgba(255,255,255,0.22)" transform="rotate(-30 38 30)" />

        {/* Debossed monogram — engraved serif, groom first */}
        <g filter="url(#deboss)">
          <text x="39" y="61" textAnchor="middle" fontSize="30" fontWeight="500" fontFamily={serif} fill="#C9A84C">
            {g}
          </text>
          <text x="61" y="61" textAnchor="middle" fontSize="30" fontWeight="500" fontFamily={serif} fill="#C9A84C">
            {b}
          </text>
          <path d="M50 47 L52.2 50 L50 53 L47.8 50 Z" fill="#C9A84C" />
          <path d="M36 36 Q50 32 64 36" fill="none" stroke="#C9A84C" strokeWidth="0.9" strokeLinecap="round" opacity="0.85" />
          <path d="M36 66 Q50 70 64 66" fill="none" stroke="#C9A84C" strokeWidth="0.9" strokeLinecap="round" opacity="0.85" />
        </g>
      </svg>
    </div>
  );
}
