"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface FlipDigitProps {
  /** Two-character value, e.g. "07" */
  value: string;
  className?: string;
}

const serif = "var(--font-cormorant), var(--font-playfair), Georgia, serif";

/**
 * Split-flap display cell. When `value` changes, the top half of the old
 * number folds down over the bottom half of the new one — like an airport
 * departures board — with a thin gold hinge line across the middle.
 */
export default function FlipDigit({ value, className = "" }: FlipDigitProps) {
  const reduceMotion = useReducedMotion();
  const [prev, setPrev] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const lastValue = useRef(value);

  useEffect(() => {
    if (value === lastValue.current) return;
    if (reduceMotion) {
      setPrev(value);
      lastValue.current = value;
      return;
    }
    setFlipping(true);
    const t = setTimeout(() => {
      setPrev(value);
      lastValue.current = value;
      setFlipping(false);
    }, 520);
    return () => clearTimeout(t);
  }, [value, reduceMotion]);

  const numStyle: React.CSSProperties = {
    fontFamily: serif,
    fontWeight: 600,
    fontVariantNumeric: "tabular-nums",
    lineHeight: 1,
  };

  const Half = ({ text, top }: { text: string; top: boolean }) => (
    <div
      className="absolute inset-x-0 overflow-hidden flex justify-center"
      style={{
        top: top ? 0 : "50%",
        height: "50%",
        alignItems: top ? "flex-end" : "flex-start",
        background: top ? "linear-gradient(180deg, #3A0A10, #4A0A12)" : "linear-gradient(180deg, #4A0A12, #2A0608)",
        borderRadius: top ? "0.9rem 0.9rem 0 0" : "0 0 0.9rem 0.9rem",
        boxShadow: top ? "inset 0 -1px 0 rgba(0,0,0,0.35)" : "inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <span
        className="block text-4xl md:text-5xl text-gold-foil"
        style={{ ...numStyle, transform: top ? "translateY(50%)" : "translateY(-50%)" }}
      >
        {text}
      </span>
    </div>
  );

  return (
    <div
      className={`relative w-full rounded-2xl ${className}`}
      style={{
        aspectRatio: "1 / 1.18",
        perspective: 600,
        boxShadow: "0 12px 30px rgba(74,10,18,0.35), 0 0 0 1px rgba(201,168,76,0.6), 0 0 8px 1px rgba(201,168,76,0.25), inset 0 0 0 1px rgba(201,168,76,0.25)",
      }}
    >
      {/* Static halves — bottom shows OLD until flip finishes, top shows NEW */}
      <Half text={value} top />
      <Half text={prev} top={false} />

      {/* Flipping leaves */}
      <AnimatePresence>
        {flipping && (
          <>
            {/* Old top folds down */}
            <motion.div
              key={`top-${prev}`}
              className="absolute inset-x-0 top-0 overflow-hidden flex items-end justify-center"
              style={{
                height: "50%",
                transformOrigin: "bottom center",
                background: "linear-gradient(180deg, #3A0A10, #4A0A12)",
                borderRadius: "0.9rem 0.9rem 0 0",
                backfaceVisibility: "hidden",
                zIndex: 3,
              }}
              initial={{ rotateX: 0 }}
              animate={{ rotateX: -90 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.26, ease: "easeIn" }}
            >
              <span className="block text-4xl md:text-5xl text-gold-foil" style={{ ...numStyle, transform: "translateY(50%)" }}>{prev}</span>
              {/* shading as it folds */}
              <motion.div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.26 }} />
            </motion.div>

            {/* New bottom unfolds up */}
            <motion.div
              key={`bottom-${value}`}
              className="absolute inset-x-0 overflow-hidden flex items-start justify-center"
              style={{
                top: "50%",
                height: "50%",
                transformOrigin: "top center",
                background: "linear-gradient(180deg, #4A0A12, #2A0608)",
                borderRadius: "0 0 0.9rem 0.9rem",
                backfaceVisibility: "hidden",
                zIndex: 3,
              }}
              initial={{ rotateX: 90 }}
              animate={{ rotateX: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.26, delay: 0.26, ease: "easeOut" }}
            >
              <span className="block text-4xl md:text-5xl text-gold-foil" style={{ ...numStyle, transform: "translateY(-50%)" }}>{value}</span>
              <motion.div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)" }} initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.26, delay: 0.26 }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hinge — a dark crease between the two leaves (not a bright line, so it never reads as a strike-through) */}
      <div
        className="absolute inset-x-0 top-1/2 z-[4] pointer-events-none"
        style={{ height: 2, marginTop: -1, background: "linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.25))" }}
      />
      {/* Hairline highlight on the lower leaf's top edge, like a paper edge catching light */}
      <div
        className="absolute inset-x-2 top-1/2 z-[4] pointer-events-none"
        style={{ height: 1, marginTop: 1, background: "linear-gradient(90deg, transparent, rgba(255,243,196,0.14), transparent)" }}
      />
      {/* Gold side pins */}
      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-3.5 rounded-r-sm z-[4]" style={{ background: "linear-gradient(180deg, #E8C97A, #A07830)", boxShadow: "0 0 4px rgba(201,168,76,0.5)" }} />
      <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-3.5 rounded-l-sm z-[4]" style={{ background: "linear-gradient(180deg, #E8C97A, #A07830)", boxShadow: "0 0 4px rgba(201,168,76,0.5)" }} />
    </div>
  );
}
