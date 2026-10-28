"use client";

import { motion } from "framer-motion";

/**
 * Persistent 1px gold frame with small corner flourishes fixed to the screen
 * edges — the content scrolls *inside* a framed object. Sits below the music
 * button and lotus rail, above the petals. Very low opacity so it never
 * competes with the cards.
 */
export default function ViewportFrame() {
  const corner = (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" aria-hidden="true">
      <path d="M1 33 C1 16, 8 6, 24 2 C27 1.5, 30 1.5, 33 1" />
      <path d="M6 33 C7 20, 13 11, 26 7" opacity="0.6" />
      <circle cx="2" cy="30" r="1" fill="#C9A84C" />
      <circle cx="30" cy="2" r="1" fill="#C9A84C" />
    </svg>
  );

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, delay: 0.6 }}
      aria-hidden="true"
    >
      {/* hairline frame */}
      <div className="absolute inset-2.5 md:inset-4 rounded-[18px]" style={{ boxShadow: "0 0 0 1px rgba(201,168,76,0.22), 0 0 6px 1px rgba(201,168,76,0.08)" }} />
      {/* corners */}
      <div className="absolute" style={{ top: 10, left: 10, opacity: 0.45 }}>{corner}</div>
      <div className="absolute" style={{ top: 10, right: 10, opacity: 0.45, transform: "scaleX(-1)" }}>{corner}</div>
      <div className="absolute" style={{ bottom: 10, left: 10, opacity: 0.45, transform: "scaleY(-1)" }}>{corner}</div>
      <div className="absolute" style={{ bottom: 10, right: 10, opacity: 0.45, transform: "scale(-1)" }}>{corner}</div>
    </motion.div>
  );
}
