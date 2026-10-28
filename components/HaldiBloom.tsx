"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_LUX } from "@/lib/motion";

interface HaldiBloomProps {
  /** Colours of the three watercolour layers, back to front */
  colors?: [string, string, string];
}

/**
 * Soft watercolour "haldi" bloom that spreads behind the card as the
 * section scrolls in — three overlapping turbulence-displaced blobs scaling
 * from 0 with a slight rotation, like turmeric paste blooming in water.
 */
export default function HaldiBloom({ colors = ["#F3C6CF", "#E8A0B0", "#D4879A"] }: HaldiBloomProps) {
  const reduceMotion = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const filterId = `haldi-wc-${uid}`;

  const blobs = [
    { d: "M300 110 C390 100, 470 160, 480 250 C490 340, 420 420, 330 430 C240 440, 150 380, 130 290 C110 200, 210 120, 300 110 Z", c: colors[0], s: 1.0, r: 0, delay: 0 },
    { d: "M290 150 C370 130, 450 190, 450 270 C450 350, 380 400, 300 400 C220 400, 160 340, 160 270 C160 200, 210 170, 290 150 Z", c: colors[1], s: 0.86, r: -14, delay: 0.25 },
    { d: "M300 190 C350 180, 410 220, 410 275 C410 330, 360 365, 305 365 C250 365, 205 330, 205 275 C205 220, 250 200, 300 190 Z", c: colors[2], s: 0.7, r: 18, delay: 0.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 600 540" className="w-[150%] max-w-[820px] h-auto" style={{ opacity: 0.55 }}>
        <defs>
          {/* Watercolour edge: turbulence-displaced, soft-blurred */}
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="38" xChannelSelector="R" yChannelSelector="G" result="disp" />
            <feGaussianBlur in="disp" stdDeviation="6" result="soft" />
            <feComponentTransfer in="soft">
              <feFuncA type="gamma" exponent="0.75" />
            </feComponentTransfer>
          </filter>
        </defs>
        {blobs.map((b, i) => (
          <motion.path
            key={i}
            d={b.d}
            fill={b.c}
            filter={`url(#${filterId})`}
            style={{ transformBox: "fill-box", transformOrigin: "center", mixBlendMode: "multiply" }}
            initial={reduceMotion ? false : { scale: 0, rotate: 0, opacity: 0 }}
            whileInView={{ scale: b.s, rotate: b.r, opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.6, delay: b.delay, ease: EASE_LUX }}
          />
        ))}
        {/* a few flung droplets */}
        {[
          [120, 150, 7, 0.9], [500, 130, 5, 1.0], [530, 400, 9, 1.1], [90, 420, 6, 1.2], [470, 470, 4, 1.3],
        ].map(([cx, cy, r, delay], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill={colors[1]}
            filter={`url(#${filterId})`}
            style={{ transformBox: "fill-box", transformOrigin: "center", mixBlendMode: "multiply" }}
            initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.9 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, delay, ease: EASE_LUX }}
          />
        ))}
      </svg>
    </div>
  );
}
