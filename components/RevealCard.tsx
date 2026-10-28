"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EASE_LUX, enter } from "@/lib/motion";
import Monogram from "./Monogram";
import GoldDust from "./GoldDust";
import Sparkles from "./Sparkles";
import { tap, HAPTIC } from "@/lib/haptics";

interface RevealCardProps {
  value: string;
  label: string;
  delay?: number;
  onReveal?: () => void;
}

const PARTICLE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
const serif = "var(--font-cormorant), var(--font-playfair), Georgia, serif";
const face: React.CSSProperties = { backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" };

/**
 * Save-the-Date reveal card. The BACK is a maroon card with the couple's
 * monogram; tapping flips it (3D rotateY) to show the value on the FRONT —
 * exactly like turning over a printed card. Gold leaf bursts on the flip.
 */
export default function RevealCard({ value, label, delay = 0, onReveal }: RevealCardProps) {
  const [revealed, setRevealed] = useState(false);
  const [dust, setDust] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleReveal = () => {
    if (revealed) return;
    tap(HAPTIC.flip);
    setRevealed(true);
    setDust(true);
    setTimeout(() => setDust(false), 3200);
    onReveal?.();
  };

  const valueSize =
    value.length > 6 ? "clamp(0.95rem, 4.2vw, 1.5rem)" : value.length > 4 ? "clamp(1.1rem, 5vw, 1.9rem)" : "clamp(2rem, 9vw, 3.8rem)";

  return (
    <motion.button
      type="button"
      className="relative flex-1 min-w-0 select-none"
      style={{ aspectRatio: "3/4", maxWidth: "30vw", perspective: 900 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={enter(delay, 0.7)}
      onClick={handleReveal}
      whileTap={!revealed ? { scale: 0.96 } : undefined}
      aria-label={revealed ? `${label}: ${value}` : `Tap to reveal the ${label.toLowerCase()}`}
      aria-pressed={revealed}
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: revealed ? 180 : 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.9, ease: EASE_LUX }}
      >
        {/* BACK — monogram (visible before reveal) */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-2 overflow-hidden"
          style={{
            ...face,
            background: "linear-gradient(160deg, #6B0F1A, #3A0808)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35), 0 0 0 1px rgba(201,168,76,0.55), inset 0 0 0 1px rgba(201,168,76,0.25)",
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 30%, #C9A84C 1px, transparent 1px), radial-gradient(circle at 70% 70%, #C9A84C 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="absolute inset-2 rounded-xl" style={{ border: "1px solid rgba(201,168,76,0.35)" }} />
          <motion.div
            className="relative"
            style={{ width: "58%", maxWidth: 72, filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))" }}
            animate={reduceMotion ? undefined : { opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Monogram size={72} color="#E8C97A" className="w-full h-auto" />
          </motion.div>
          <p
            className="relative text-center px-1 leading-tight italic"
            style={{ fontFamily: serif, fontSize: "0.7rem", color: "rgba(232,201,122,0.8)", letterSpacing: "0.12rem" }}
          >
            Tap to reveal
          </p>
        </div>

        {/* FRONT — value (visible after flip) */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-1 overflow-hidden"
          style={{
            ...face,
            transform: "rotateY(180deg)",
            background: "linear-gradient(160deg, #FFFDF7, #FFF4E0)",
            boxShadow: "0 14px 40px rgba(201,168,76,0.3), 0 0 0 1.5px #C9A84C, inset 0 0 0 1px rgba(201,168,76,0.3)",
          }}
        >
          <div className="absolute inset-2 rounded-xl" style={{ border: "1px solid rgba(201,168,76,0.4)" }} />
          <p
            className="relative font-semibold leading-none w-full text-center px-1 nums-oldstyle text-gold-foil"
            style={{ fontFamily: serif, fontSize: valueSize, wordBreak: "break-word" }}
          >
            {value}
          </p>
          <p className="relative text-[0.6rem] tracking-[0.3em] uppercase font-poppins" style={{ color: "#8B6355" }}>
            {label}
          </p>
        </div>
      </motion.div>

      {/* Slow-falling gold dust stream from the card after the flip */}
      <GoldDust active={dust} mode="stream" count={28} duration={2.6} seed={label.length * 3} onLight />

      {/* Persistent star sparkles on the revealed face */}
      {revealed && <Sparkles count={8} distribution="edges" seed={label.length * 7} minSize={5} maxSize={11} />}

      {/* Gold-leaf burst on reveal */}
      <AnimatePresence>
        {revealed && !reduceMotion && (
          <>
            {PARTICLE_ANGLES.map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const distance = 55 + (i % 3) * 15;
              return (
                <motion.span
                  key={`p-${i}`}
                  className="absolute pointer-events-none"
                  style={{
                    width: 5 + (i % 3) * 2,
                    height: 8 + (i % 3) * 3,
                    borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                    background: i % 2 === 0 ? "#C9A84C" : "#E8C97A",
                    top: "50%",
                    left: "50%",
                    marginTop: -4,
                    marginLeft: -3,
                    zIndex: 20,
                  }}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
                  animate={{ opacity: 0, x: Math.cos(rad) * distance, y: Math.sin(rad) * distance, scale: 0.4, rotate: 180 + i * 40 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.35 }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
