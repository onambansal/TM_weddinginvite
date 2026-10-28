"use client";

import { motion } from "framer-motion";
import { enter } from "@/lib/motion";

interface SectionEdgeProps {
  /** Background colour of the section ABOVE (the edge is drawn in this colour) */
  from: string;
  /** Background colour of the section BELOW */
  to: string;
  /** Ornament colour */
  gold?: string;
}

/**
 * Ornamental transition between two sections: a gentle scalloped edge in the
 * colour of the section above, with a thin gold rule and lotus at the centre.
 * Turns hard colour cuts into one continuous piece of stationery.
 */
export default function SectionEdge({ from, to, gold = "#C9A84C" }: SectionEdgeProps) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 64, background: to, marginTop: -1 }} aria-hidden="true">
      {/* Scalloped edge of the section above */}
      <svg
        className="absolute inset-x-0 top-0 w-full"
        height="40"
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        style={{ display: "block" }}
      >
        <path
          d="M0 0 H1200 V12 C1100 40, 1000 40, 900 12 C800 40, 700 40, 600 12 C500 40, 400 40, 300 12 C200 40, 100 40, 0 12 Z"
          fill={from}
        />
        <path
          d="M0 12 C100 40, 200 40, 300 12 C400 40, 500 40, 600 12 C700 40, 800 40, 900 12 C1000 40, 1100 40, 1200 12"
          stroke={gold}
          strokeOpacity="0.45"
          strokeWidth="1"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Central lotus medallion sitting on the seam */}
      <motion.div
        className="absolute left-1/2 top-[12px] -translate-x-1/2 flex items-center justify-center rounded-full"
        style={{
          width: 44,
          height: 44,
          background: to,
          boxShadow: `0 0 0 1px ${gold}99, 0 6px 18px rgba(0,0,0,0.18)`,
        }}
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={enter(0.1, 0.7)}
      >
        <svg width="26" height="26" viewBox="0 0 64 64" fill="none" stroke={gold} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M32 50c-6-6-8-16-4-26 4 8 4 18 4 26z" />
          <path d="M32 50c6-6 8-16 4-26-4 8-4 18-4 26z" />
          <path d="M32 50c-10-2-18-10-18-22 8 4 14 12 18 22z" />
          <path d="M32 50c10-2 18-10 18-22-8 4-14 12-18 22z" />
          <path d="M32 50c-14 0-22-6-26-14 10 0 20 4 26 14z" strokeWidth="1.1" />
          <path d="M32 50c14 0 22-6 26-14-10 0-20 4-26 14z" strokeWidth="1.1" />
        </svg>
      </motion.div>
    </div>
  );
}
