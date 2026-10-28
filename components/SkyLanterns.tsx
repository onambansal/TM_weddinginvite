"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SkyLanternsProps {
  count?: number;
}

/** Deterministic pseudo-random so SSR == CSR */
function rand(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function Lantern({ size, glow }: { size: number; glow: number }) {
  return (
    <svg width={size} height={size * 1.45} viewBox="0 0 40 58" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id={`lg-${size}`} cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#FFF1C9" />
          <stop offset="45%" stopColor="#F3C978" />
          <stop offset="100%" stopColor="#C9803A" />
        </radialGradient>
      </defs>
      {/* glow halo */}
      <ellipse cx="20" cy="26" rx="22" ry="26" fill="#F3C978" opacity={glow * 0.22} />
      {/* paper body */}
      <path d="M20 2 C31 2, 36 14, 36 28 C36 40, 30 48, 20 48 C10 48, 4 40, 4 28 C4 14, 9 2, 20 2 Z" fill={`url(#lg-${size})`} opacity="0.95" />
      {/* paper ribs */}
      <path d="M13 6 C9 18, 9 34, 13 46M27 6 C31 18, 31 34, 27 46M20 2 V48" stroke="rgba(120,60,10,0.25)" strokeWidth="0.7" />
      {/* top rim + bottom ring */}
      <path d="M14 3 H26" stroke="rgba(120,60,10,0.5)" strokeWidth="1" strokeLinecap="round" />
      <ellipse cx="20" cy="49" rx="7" ry="2" fill="none" stroke="#7A4A14" strokeWidth="1" />
      {/* flame inside */}
      <path d="M20 40 C17 36, 18 32, 20 29 C22 32, 23 36, 20 40 Z" fill="#FFF6D8" opacity="0.95" />
      {/* hanging tassel */}
      <path d="M20 51 V57" stroke="#7A4A14" strokeWidth="0.8" />
    </svg>
  );
}

/**
 * Warm paper sky-lanterns drifting slowly upward and swaying,
 * replacing the dot particles on the Wedding screen.
 */
export default function SkyLanterns({ count = 7 }: SkyLanternsProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  const lanterns = Array.from({ length: count }).map((_, i) => {
    const r1 = rand(i + 1);
    const r2 = rand(i + 11);
    const r3 = rand(i + 21);
    return {
      id: i,
      left: 6 + r1 * 88,          // %
      size: 18 + r2 * 20,         // px
      duration: 22 + r3 * 16,     // s to drift the full height
      delay: -(r1 * 30),          // negative → already mid-flight on load
      sway: 8 + r2 * 14,          // px
      swayDur: 3 + r3 * 2.5,
      glow: 0.6 + r1 * 0.4,
      blur: r2 < 0.3 ? 1.2 : 0,   // far ones slightly soft
    };
  });

  return (
    <>
      {lanterns.map((l) => (
        <motion.div
          key={l.id}
          className="absolute"
          style={{ left: `${l.left}%`, bottom: -80, filter: l.blur ? `blur(${l.blur}px)` : undefined, willChange: "transform" }}
          animate={{ y: ["0vh", "-125vh"], opacity: [0, 0.95, 0.95, 0.8, 0] }}
          transition={{ duration: l.duration, delay: l.delay, repeat: Infinity, ease: "linear", times: [0, 0.08, 0.7, 0.9, 1] }}
        >
          <motion.div
            animate={{ x: [-l.sway, l.sway, -l.sway], rotate: [-4, 4, -4] }}
            transition={{ duration: l.swayDur, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* flame flicker */}
            <motion.div
              animate={{ opacity: [0.85, 1, 0.9, 1, 0.85] }}
              transition={{ duration: 0.9 + (l.id % 3) * 0.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ filter: `drop-shadow(0 0 ${6 + l.glow * 8}px rgba(243,201,120,${0.45 * l.glow}))` }}
            >
              <Lantern size={l.size} glow={l.glow} />
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}
