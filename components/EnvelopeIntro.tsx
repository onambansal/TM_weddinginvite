"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface EnvelopeIntroProps {
  onComplete: () => void;
  onStart?: () => void;
}

// Petal config — random positions & delays
const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  emoji: ["🌸", "🌹", "🌺", "✿", "❀"][i % 5],
  left: `${(i * 5.8 + 3) % 100}%`,
  delay: (i * 0.6) % 8,
  duration: 6 + (i % 4) * 1.5,
  size: 0.7 + (i % 3) * 0.25,
}));

// Confetti particles for card reveal
const CONFETTI = Array.from({ length: 20 }, (_, i) => {
  const angle = (i / 20) * 360;
  const rad = (angle * Math.PI) / 180;
  const dist = 80 + (i % 4) * 30;
  return {
    id: i,
    tx: Math.cos(rad) * dist,
    ty: Math.sin(rad) * dist - 40,
    color: i % 3 === 0 ? "#C9A84C" : i % 3 === 1 ? "#E8C97A" : "#FF9999",
    size: 4 + (i % 3) * 2,
    delay: (i % 5) * 0.04,
  };
});

export default function EnvelopeIntro({ onComplete, onStart }: EnvelopeIntroProps) {
  const [stage, setStage] = useState<"idle" | "opening" | "card" | "done">("idle");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);

  const handleClick = () => {
    if (stage !== "idle") return;
    onStart?.();   // ← start music immediately on tap
    setStage("opening");
    setTimeout(() => {
      setStage("card");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1200);
      setTimeout(() => setShowScrollHint(true), 2500);
    }, 1000);
    setTimeout(() => {
      setStage("done");
      onComplete();
    }, 5800);
  };

  // Reset scroll hint when done
  useEffect(() => {
    if (stage === "done") setShowScrollHint(false);
  }, [stage]);

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(160deg, #2A0505 0%, #4A0A12 40%, #3A0808 100%)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          {/* ── Ambient gold particles ── */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div key={i} className="absolute rounded-full"
                style={{ width: 2 + (i % 3), height: 2 + (i % 3), background: "#C9A84C", left: `${(i * 5.1) % 100}%`, top: `${(i * 7.3) % 100}%` }}
                animate={{ opacity: [0.1, 0.6, 0.1], scale: [1, 1.8, 1] }}
                transition={{ duration: 2.5 + (i % 3), repeat: Infinity, delay: i * 0.25 }}
              />
            ))}
          </div>

          {/* ── Falling petals ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {PETALS.map((p) => (
              <motion.span key={p.id} className="absolute select-none"
                style={{ left: p.left, top: "-5%", fontSize: `${p.size}rem`, opacity: 0.55 }}
                animate={{ y: ["0vh", "110vh"], x: [0, 20, -15, 10, 0], rotate: [0, 180, 360], opacity: [0, 0.6, 0.6, 0] }}
                transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
              >
                {p.emoji}
              </motion.span>
            ))}
          </div>

          {/* ── Pulsing glow ring behind envelope ── */}
          {(stage === "idle" || stage === "opening") && (
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{ width: 340, height: 240, border: "1px solid rgba(201,168,76,0.3)", borderRadius: "50%" }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          {(stage === "idle" || stage === "opening") && (
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{ width: 380, height: 280, border: "1px solid rgba(201,168,76,0.15)", borderRadius: "50%" }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            />
          )}

          <AnimatePresence mode="wait">
            {/* ── ENVELOPE STAGE ── */}
            {(stage === "idle" || stage === "opening") && (
              <motion.div key="envelope-scene" className="flex flex-col items-center gap-6 relative z-10"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40, scale: 0.9 }} transition={{ duration: 0.6 }}
                onClick={handleClick} style={{ cursor: stage === "idle" ? "pointer" : "default" }}
              >
                {/* Floating envelope */}
                <motion.div
                  animate={stage === "idle" ? { y: [0, -10, 0] } : {}}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="relative" style={{ width: 300, height: 200, perspective: "1000px" }}>
                    {/* Envelope body */}
                    <div className="absolute inset-0 rounded-md"
                      style={{ background: "linear-gradient(160deg, #FFF8F0, #EDD9B8)", border: "1.5px solid rgba(201,168,76,0.6)", boxShadow: "0 16px 50px rgba(0,0,0,0.5), 0 0 30px rgba(201,168,76,0.15)" }}
                    />
                    {/* Bottom fold */}
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden rounded-b-md" style={{ height: "52%" }}>
                      <div style={{ position: "absolute", bottom: 0, left: 0, width: 0, height: 0, borderLeft: "150px solid transparent", borderRight: "150px solid transparent", borderBottom: "104px solid #E2C898" }} />
                    </div>
                    {/* Left fold */}
                    <div className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: "50%" }}>
                      <div style={{ position: "absolute", top: 0, left: 0, width: 0, height: 0, borderTop: "100px solid transparent", borderBottom: "100px solid transparent", borderLeft: "150px solid #EDD9BC" }} />
                    </div>
                    {/* Right fold */}
                    <div className="absolute top-0 right-0 h-full overflow-hidden" style={{ width: "50%" }}>
                      <div style={{ position: "absolute", top: 0, right: 0, width: 0, height: 0, borderTop: "100px solid transparent", borderBottom: "100px solid transparent", borderRight: "150px solid #E5CFA8" }} />
                    </div>
                    {/* Top flap — opens on click */}
                    <motion.div className="absolute top-0 left-0 w-full overflow-hidden"
                      style={{ height: "52%", transformOrigin: "top center", transformStyle: "preserve-3d", zIndex: 10 }}
                      animate={stage === "opening" ? { rotateX: -180 } : { rotateX: 0 }}
                      transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div style={{ position: "absolute", top: 0, left: 0, width: 0, height: 0, borderLeft: "150px solid transparent", borderRight: "150px solid transparent", borderTop: "104px solid #D4B896" }} />
                    </motion.div>
                    {/* Wax seal — spins and fades when opening */}
                    <motion.div className="absolute flex items-center justify-center rounded-full"
                      style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 52, height: 52, background: "radial-gradient(circle at 35% 35%, #A00020, #6B0F1A)", border: "2px solid #C9A84C", boxShadow: "0 2px 12px rgba(0,0,0,0.5), 0 0 8px rgba(201,168,76,0.4)", zIndex: 8 }}
                      animate={stage === "opening"
                        ? { opacity: 0, scale: 0.2, rotate: 180 }
                        : { rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }
                      }
                      transition={stage === "opening"
                        ? { duration: 0.3, delay: 0.1 }
                        : { duration: 3, repeat: Infinity }
                      }
                    >
                      <motion.span
                        style={{ color: "#C9A84C", fontSize: "1.3rem" }}
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >✦</motion.span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Tap prompt */}
                <AnimatePresence>
                  {stage === "idle" && (
                    <motion.div className="flex flex-col items-center gap-2"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "0.9rem", color: "rgba(201,168,76,0.9)", letterSpacing: "0.15rem", fontStyle: "italic" }}
                      >✦ Tap to Open Your Invitation ✦</motion.p>
                      {/* Bouncing arrow */}
                      <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        style={{ color: "rgba(201,168,76,0.6)", fontSize: "1.2rem" }}
                      >↓</motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── CARD STAGE ── */}
            {stage === "card" && (
              <motion.div key="card-scene" className="relative mx-3 z-10"
                style={{ maxWidth: 340, width: "100%" }}
                initial={{ opacity: 0, scale: 0.7, rotateY: -25 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Confetti burst */}
                <AnimatePresence>
                  {showConfetti && (
                    <>
                      {CONFETTI.map((c) => (
                        <motion.div key={c.id} className="absolute rounded-full pointer-events-none"
                          style={{ width: c.size, height: c.size, background: c.color, top: "50%", left: "50%", zIndex: 30 }}
                          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                          animate={{ opacity: 0, x: c.tx, y: c.ty, scale: 0 }}
                          transition={{ duration: 0.9, ease: "easeOut", delay: c.delay }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>

                {/* Outer gold glow */}
                <motion.div className="absolute -inset-1 rounded-2xl blur-md"
                  style={{ background: "linear-gradient(135deg, #C9A84C, #E8C97A, #C9A84C)" }}
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />

                {/* Card */}
                <div className="relative rounded-2xl overflow-hidden"
                  style={{ boxShadow: "0 24px 70px rgba(0,0,0,0.6)", border: "2px solid #C9A84C" }}
                >
                  <Image
                    src="/wedding-card.jpg"
                    alt="Wedding Invitation Card"
                    width={340}
                    height={480}
                    className="w-full h-auto"
                    style={{ display: "block" }}
                    priority
                  />

                  {/* Shimmer sweep */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)", backgroundSize: "200% 100%" }}
                    animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
                  />

                  {/* Ambient shimmer */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(201,168,76,0.06) 100%)" }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* Corner sparkles */}
                  {[
                    { top: "6%", left: "8%", delay: 0 },
                    { top: "6%", right: "8%", delay: 0.4 },
                    { top: "48%", left: "3%", delay: 0.8 },
                    { top: "48%", right: "3%", delay: 1.2 },
                    { bottom: "6%", left: "8%", delay: 0.6 },
                    { bottom: "6%", right: "8%", delay: 1.0 },
                  ].map((pos, i) => (
                    <motion.div key={i} className="absolute pointer-events-none"
                      style={{ ...pos, color: "#C9A84C", fontSize: "1rem" }}
                      animate={{ opacity: [0, 1, 0], scale: [0.4, 1.3, 0.4], rotate: [0, 180, 360] }}
                      transition={{ duration: 2, repeat: Infinity, delay: pos.delay }}
                    >✦</motion.div>
                  ))}
                </div>

                {/* Scroll hint */}
                <AnimatePresence>
                  {showScrollHint && (
                    <motion.div className="flex flex-col items-center gap-1 mt-4"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                        style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "0.75rem", color: "rgba(201,168,76,0.8)", letterSpacing: "0.2rem", fontStyle: "italic" }}
                      >scroll to explore ↓</motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
