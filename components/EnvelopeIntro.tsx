"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { EASE_LUX } from "@/lib/motion";
import WaxSeal from "./WaxSeal";
import TiltCard from "./TiltCard";
import Sparkles from "./Sparkles";
import GoldDust from "./GoldDust";
import { tap, HAPTIC } from "@/lib/haptics";

interface EnvelopeIntroProps {
  onComplete: () => void;
  onStart?: () => void;
}

/**
 * One continuous opening sequence:
 *   idle → (tap) → flap opens + light leak → card rises out of the envelope
 *   → envelope sinks & fades → card settles centre with tilt, sparkles, gold dust.
 */
type Stage = "idle" | "opening" | "rising" | "card" | "done";

const T = {
  flap: 0.9,        // flap rotation
  leak: 0.35,       // light bloom after flap passes 90°
  riseDelay: 0.55,  // card starts rising before flap fully finishes
  rise: 1.4,        // card travel out of envelope
  sink: 0.9,        // envelope sinks away
  autoFinish: 7.2,  // auto-continue if guest doesn't tap
};

// ── Petals (deterministic) ───────────────────────────────────
const PETAL_COLORS = ["#E8A0A0", "#D98C8C", "#E8C97A", "#C9A84C", "#F0B86E"];
const PETALS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  color: PETAL_COLORS[i % PETAL_COLORS.length],
  left: `${(i * 7.3 + 3) % 100}%`,
  delay: (i * 0.7) % 8,
  duration: 9 + (i % 4) * 2,
  size: 12 + (i % 3) * 5,
  rose: i % 2 === 0,
}));

function Petal({ size, color, rose }: { size: number; color: string; rose: boolean }) {
  return rose ? (
    <svg width={size} height={size * 1.25} viewBox="0 0 20 25" fill="none" aria-hidden="true">
      <path d="M10 1 C16 6, 20 12, 16 20 C13 24, 7 24, 4 20 C0 12, 4 6, 10 1 Z" fill={color} />
      <path d="M10 4 C10 10, 10 15, 10 21" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 18 C4 14, 2 8, 5 3 C7 5, 8 5, 10 2 C12 5, 13 5, 15 3 C18 8, 16 14, 10 18 Z" fill={color} />
    </svg>
  );
}

// ── Envelope geometry ────────────────────────────────────────
const ENV_W = 300;
const ENV_H = 200;
const CARD_W = 250;
const CARD_H = Math.round(CARD_W * (480 / 340)); // keep the card image ratio

export default function EnvelopeIntro({ onComplete, onStart }: EnvelopeIntroProps) {
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<Stage>("idle");
  const [showHint, setShowHint] = useState(false);
  const [dust, setDust] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const later = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms));

  const finish = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStage("done");
    onComplete();
  }, [onComplete]);

  const handleOpen = () => {
    if (stage !== "idle") return;
    tap(HAPTIC.open);
    onStart?.();
    if (reduceMotion) { finish(); return; }
    setStage("opening");
    later(() => setStage("rising"), T.riseDelay * 1000);
    later(() => { setStage("card"); setDust(true); }, (T.riseDelay + T.rise) * 1000);
    later(() => setDust(false), (T.riseDelay + T.rise + 3.2) * 1000);
    later(() => setShowHint(true), (T.riseDelay + T.rise + 1.6) * 1000);
    later(finish, T.autoFinish * 1000);
  };

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const envelopeVisible = stage === "idle" || stage === "opening" || stage === "rising";
  const cardFree = stage === "card";

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden"
          style={{ background: "radial-gradient(ellipse at 50% 40%, #5A0E18 0%, #3A0808 45%, #1E0405 100%)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          {/* ── Ambient gold dust (slow, always on) ── */}
          {!reduceMotion && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(22)].map((_, i) => (
                <motion.div key={i} className="absolute rounded-full"
                  style={{ width: 2 + (i % 3), height: 2 + (i % 3), background: i % 5 === 0 ? "#FFFDF7" : "#C9A84C", left: `${(i * 5.1) % 100}%`, top: `${(i * 7.3) % 100}%` }}
                  animate={{ opacity: [0.1, 0.65, 0.1], scale: [1, 1.8, 1] }}
                  transition={{ duration: 2.5 + (i % 3), repeat: Infinity, delay: i * 0.25 }}
                />
              ))}
            </div>
          )}

          {/* ── Falling petals ── */}
          {!reduceMotion && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {PETALS.map((p) => (
                <motion.span key={p.id} className="absolute select-none"
                  style={{ left: p.left, top: "-5%", lineHeight: 0, filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.3))" }}
                  animate={{ y: ["0vh", "110vh"], x: [0, 20, -15, 10, 0], rotate: [0, 180, 360], opacity: [0, 0.6, 0.6, 0] }}
                  transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
                >
                  <Petal size={p.size} color={p.color} rose={p.rose} />
                </motion.span>
              ))}
            </div>
          )}

          {/* ── Pulsing glow rings behind the envelope ── */}
          {envelopeVisible && (
            <>
              <motion.div className="absolute rounded-full pointer-events-none"
                style={{ width: 340, height: 240, border: "1px solid rgba(201,168,76,0.3)", borderRadius: "50%" }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div className="absolute rounded-full pointer-events-none"
                style={{ width: 380, height: 280, border: "1px solid rgba(201,168,76,0.15)", borderRadius: "50%" }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              />
            </>
          )}

          {/* ── Light leak from inside the envelope as the flap passes 90° ── */}
          <AnimatePresence>
            {(stage === "opening" || stage === "rising") && (
              <motion.div
                className="absolute pointer-events-none rounded-full"
                style={{ width: 520, height: 520, background: "radial-gradient(circle, rgba(255,236,180,0.75) 0%, rgba(232,201,122,0.35) 30%, rgba(201,168,76,0) 65%)", filter: "blur(10px)" }}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: [0, 1, 0.45], scale: [0.4, 1.15, 1] }}
                exit={{ opacity: 0, transition: { duration: 0.6 } }}
                transition={{ duration: T.leak + 0.5, delay: T.flap * 0.45, ease: "easeOut", times: [0, 0.4, 1] }}
              />
            )}
          </AnimatePresence>

          {/* ── Gold dust shower when the card is free ── */}
          <GoldDust active={dust} mode="shower" count={44} duration={3.2} fixed seed={3} />
          {/* ── Scene: envelope + card share one coordinate space ── */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            style={{ width: ENV_W, cursor: stage === "idle" ? "pointer" : "default" }}
            onClick={stage === "idle" ? handleOpen : undefined}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_LUX }}
            role={stage === "idle" ? "button" : undefined}
            aria-label={stage === "idle" ? "Open the invitation" : undefined}
          >
            <motion.div
              className="relative"
              style={{ width: ENV_W, height: ENV_H, perspective: 1100 }}
              animate={stage === "idle" ? { y: [0, -10, 0] } : { y: 0 }}
              transition={stage === "idle" ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4 }}
            >
              {/* ENVELOPE — sinks & fades once the card is free */}
              <motion.div
                className="absolute inset-0"
                animate={cardFree ? { y: 90, opacity: 0, scale: 0.92, filter: "blur(2px)" } : { y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: T.sink, ease: EASE_LUX }}
              >
                {/* Back panel */}
                <div className="absolute inset-0 rounded-md"
                  style={{ background: "linear-gradient(160deg, #FFF8F0, #EDD9B8)", border: "1.5px solid rgba(201,168,76,0.6)", boxShadow: "0 16px 50px rgba(0,0,0,0.5), 0 0 30px rgba(201,168,76,0.15)" }}
                />
                {/* Inside lining visible above the pocket */}
                <div className="absolute inset-x-0 top-0 overflow-hidden rounded-t-md" style={{ height: "52%" }}>
                  <div className="absolute inset-0" style={{ background: "#6B0F1A" }} />
                  <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #C9A84C 0.8px, transparent 0.8px)", backgroundSize: "14px 14px" }} />
                </div>
              </motion.div>

              {/* CARD — starts inside the pocket, rises out, then settles centre.
                  The clip wrapper hides whatever is below the envelope's bottom edge
                  until the card is free (the card is taller than the envelope). */}
              <div
                className="absolute inset-x-0"
                style={{ top: -600, bottom: 0, overflow: cardFree ? "visible" : "hidden", zIndex: 20, pointerEvents: "none" }}
              >
              <motion.div
                className="absolute left-1/2"
                style={{ width: CARD_W, height: CARD_H, top: 612, x: "-50%", cursor: cardFree ? "pointer" : "default", pointerEvents: "auto" }}
                initial={false}
                animate={
                  stage === "idle" || stage === "opening"
                    // tucked inside: top edge just below the pocket mouth
                    ? { y: ENV_H * 0.5 - 12, scale: 1, opacity: 1 }
                    : stage === "rising"
                      // slides up so ~70% of the card is above the envelope
                      ? { y: -(CARD_H * 0.62), scale: 1, opacity: 1 }
                      // settles centred over where the envelope was
                      : { y: (ENV_H - CARD_H) / 2 - 12, scale: 1.18, opacity: 1 }
                }
                transition={stage === "rising" ? { duration: T.rise, ease: [0.2, 0.9, 0.2, 1] } : { duration: T.sink, ease: EASE_LUX }}
                onClick={cardFree ? finish : undefined}
                role={cardFree ? "button" : undefined}
                aria-label={cardFree ? "Continue to the invitation" : undefined}
              >
                {/* Outer glow — only once free */}
                <motion.div className="absolute -inset-1 rounded-2xl blur-md pointer-events-none"
                  style={{ background: "linear-gradient(135deg, #C9A84C, #F3E2A0, #C9A84C)" }}
                  animate={cardFree ? { opacity: [0.45, 0.8, 0.45] } : { opacity: 0 }}
                  transition={cardFree ? { duration: 2.5, repeat: Infinity } : { duration: 0.3 }}
                />
                <TiltCard max={cardFree ? 7 : 0} className="rounded-2xl">
                  <div className="relative rounded-2xl overflow-hidden"
                    style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 2px #C9A84C, inset 0 0 0 1px rgba(255,255,255,0.25)" }}
                  >
                    <Image src="/wedding-card.jpg" alt="Wedding Invitation Card" width={340} height={480} className="w-full h-auto" style={{ display: "block" }} priority />
                    {/* Slow foil sweep */}
                    <motion.div className="absolute inset-0 pointer-events-none"
                      style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.16) 50%, transparent 70%)", backgroundSize: "200% 100%" }}
                      animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    />
                    <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.18)" }} />
                  </div>
                </TiltCard>
                {/* Twinkling star sparkles around the card edges once free */}
                {cardFree && <Sparkles count={18} distribution="edges" seed={11} minSize={7} maxSize={16} />}
              </motion.div>
              </div>

              {/* POCKET FRONT — rendered last so it sits in front of the card while it's inside */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 25 }}
                animate={cardFree ? { y: 90, opacity: 0, scale: 0.92 } : { y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: T.sink, ease: EASE_LUX }}
              >
                <div className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: "50%" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, width: 0, height: 0, borderTop: "100px solid transparent", borderBottom: "100px solid transparent", borderLeft: "150px solid #EDD9BC" }} />
                </div>
                <div className="absolute top-0 right-0 h-full overflow-hidden" style={{ width: "50%" }}>
                  <div style={{ position: "absolute", top: 0, right: 0, width: 0, height: 0, borderTop: "100px solid transparent", borderBottom: "100px solid transparent", borderRight: "150px solid #E5CFA8" }} />
                </div>
                <div className="absolute bottom-0 left-0 w-full overflow-hidden rounded-b-md" style={{ height: "52%" }}>
                  <div style={{ position: "absolute", bottom: 0, left: 0, width: 0, height: 0, borderLeft: "150px solid transparent", borderRight: "150px solid transparent", borderBottom: "104px solid #E2C898" }} />
                </div>
                <svg className="absolute inset-0" width={ENV_W} height={ENV_H} viewBox={`0 0 ${ENV_W} ${ENV_H}`} aria-hidden="true">
                  <path d={`M0 ${ENV_H} L${ENV_W / 2} ${ENV_H * 0.48} L${ENV_W} ${ENV_H}`} fill="none" stroke="rgba(201,168,76,0.55)" strokeWidth="1" />
                  <path d={`M0 0 L${ENV_W / 2} ${ENV_H * 0.5} L${ENV_W} 0`} fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="1" />
                </svg>
              </motion.div>

              {/* TOP FLAP — closes OVER the pocket (z 35). Once opened it rotates back and
                  drops to z 5 so the rising card passes in front of the lining. */}
              <motion.div
                className="absolute top-0 left-0 w-full"
                style={{ height: "52%", transformOrigin: "top center", transformStyle: "preserve-3d", zIndex: stage === "idle" ? 35 : 5 }}
                animate={
                  cardFree
                    ? { rotateX: -180, y: 90, opacity: 0, scale: 0.92 }
                    : stage === "idle"
                      ? { rotateX: 0, y: 0, opacity: 1, scale: 1 }
                      : { rotateX: -180, y: 0, opacity: 1, scale: 1 }
                }
                transition={{ rotateX: { duration: T.flap, ease: [0.4, 0, 0.2, 1] }, default: { duration: T.sink, ease: EASE_LUX } }}
              >
                {/* Front face — kraft paper with a gold edge */}
                <div className="absolute inset-0 overflow-hidden" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, width: 0, height: 0, borderLeft: "150px solid transparent", borderRight: "150px solid transparent", borderTop: "104px solid #D4B896" }} />
                  <svg className="absolute inset-0" width="300" height="104" viewBox="0 0 300 104" aria-hidden="true">
                    <path d="M0 0 L150 104 L300 0" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="1" />
                  </svg>
                </div>
                {/* Back face — maroon lining with gold paisley */}
                <div className="absolute inset-0 overflow-hidden" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateX(180deg)" }}>
                  <svg width="300" height="104" viewBox="0 0 300 104" style={{ display: "block" }} aria-hidden="true">
                    <defs>
                      <clipPath id="flap-clip"><path d="M0 0 H300 L150 104 Z" /></clipPath>
                      <pattern id="flap-paisley" width="28" height="28" patternUnits="userSpaceOnUse">
                        <path d="M14 4c-5 0-9 4-9 9 0 6 6 10 9 11 3-1 9-5 9-11 0-5-4-9-9-9z" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.55" />
                        <circle cx="14" cy="13" r="1.4" fill="#C9A84C" opacity="0.55" />
                        <circle cx="0" cy="0" r="0.9" fill="#C9A84C" opacity="0.4" />
                        <circle cx="28" cy="28" r="0.9" fill="#C9A84C" opacity="0.4" />
                      </pattern>
                    </defs>
                    <g clipPath="url(#flap-clip)">
                      <rect width="300" height="104" fill="#6B0F1A" />
                      <rect width="300" height="104" fill="url(#flap-paisley)" />
                      <path d="M0 0 H300 L150 104 Z" fill="none" stroke="#C9A84C" strokeWidth="1.2" strokeOpacity="0.7" />
                      <path d="M10 6 H290 L150 96 Z" fill="none" stroke="#C9A84C" strokeWidth="0.7" strokeOpacity="0.4" />
                    </g>
                  </svg>
                </div>
              </motion.div>

              {/* WAX SEAL — topmost while closed; lifts away on open */}
              <motion.div
                className="absolute"
                style={{ top: "50%", left: "50%", x: "-50%", y: "-50%", zIndex: 45 }}
                animate={stage === "idle" ? { rotate: [0, 2, -2, 0], scale: [1, 1.03, 1], opacity: 1 } : { opacity: 0, scale: 0.3, rotate: 90, y: "-130%" }}
                transition={stage === "idle" ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.35, delay: 0.05, ease: "easeIn" }}
              >
                <WaxSeal size={58} />
              </motion.div>
            </motion.div>

            {/* Tap prompt (idle) */}
            <AnimatePresence>
              {stage === "idle" && (
                <motion.div className="flex flex-col items-center gap-2 mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.6 }}>
                  <motion.p
                    style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif", fontSize: "1rem", color: "rgba(232,201,122,0.9)", letterSpacing: "0.25rem", fontStyle: "italic" }}
                    animate={{ opacity: [0.55, 1, 0.55] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Tap to open
                  </motion.p>
                  <motion.span className="w-px h-6" style={{ background: "linear-gradient(180deg, rgba(201,168,76,0.8), transparent)" }}
                    animate={{ scaleY: [0.6, 1, 0.6], opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Continue hint (card stage) */}
            <AnimatePresence>
              {showHint && cardFree && (
                <motion.p
                  className="mt-5"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: [0.5, 1, 0.5], y: 0 }} exit={{ opacity: 0 }}
                  transition={{ opacity: { duration: 1.8, repeat: Infinity }, y: { duration: 0.5 } }}
                  style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif", fontSize: "0.9rem", color: "rgba(201,168,76,0.85)", letterSpacing: "0.2rem", fontStyle: "italic" }}
                >
                  Tap the card to continue ↓
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
