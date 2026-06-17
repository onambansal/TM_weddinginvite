"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bride, groom, weddingDateDisplay } from "@/config/weddingConfig";

interface EnvelopeIntroProps {
  onComplete: () => void;
}

// Timeline (ms):
// 0        → idle: envelope shown
// click    → opening: flap rotates open (1000ms)
// 1000     → card: wedding card fades in centered (stays for 3000ms)
// 4000     → overlay fades out (800ms), main content appears

export default function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [stage, setStage] = useState<"idle" | "opening" | "card" | "done">("idle");

  const handleClick = () => {
    if (stage !== "idle") return;
    setStage("opening");
    setTimeout(() => setStage("card"), 1000);
    setTimeout(() => {
      setStage("done");
      onComplete();
    }, 4800);
  };

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center"
          style={{
            background: "linear-gradient(160deg, #3A0808 0%, #5C0F1A 50%, #3A0808 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Subtle gold particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 2 + (i % 3),
                  height: 2 + (i % 3),
                  background: "#C9A84C",
                  left: `${(i * 6.5) % 100}%`,
                  top: `${(i * 7.8) % 100}%`,
                }}
                animate={{ opacity: [0.15, 0.5, 0.15], scale: [1, 1.5, 1] }}
                transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>

          {/* ── ENVELOPE STAGE ── */}
          <AnimatePresence mode="wait">
            {(stage === "idle" || stage === "opening") && (
              <motion.div
                key="envelope-scene"
                className="flex flex-col items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                onClick={handleClick}
                style={{ cursor: stage === "idle" ? "pointer" : "default" }}
              >
                {/* Envelope */}
                <div
                  className="relative"
                  style={{ width: 300, height: 200, perspective: "1000px" }}
                >
                  {/* Body */}
                  <div
                    className="absolute inset-0 rounded-md"
                    style={{
                      background: "linear-gradient(160deg, #FFF8F0, #EDD9B8)",
                      border: "1.5px solid rgba(201,168,76,0.6)",
                      boxShadow: "0 16px 50px rgba(0,0,0,0.5)",
                    }}
                  />

                  {/* Bottom triangle fold */}
                  <div
                    className="absolute bottom-0 left-0 w-full overflow-hidden rounded-b-md"
                    style={{ height: "52%" }}
                  >
                    <div style={{
                      position: "absolute", bottom: 0, left: 0,
                      width: 0, height: 0,
                      borderLeft: "150px solid transparent",
                      borderRight: "150px solid transparent",
                      borderBottom: "104px solid #E2C898",
                    }} />
                  </div>

                  {/* Left triangle fold */}
                  <div
                    className="absolute top-0 left-0 h-full overflow-hidden"
                    style={{ width: "50%" }}
                  >
                    <div style={{
                      position: "absolute", top: 0, left: 0,
                      width: 0, height: 0,
                      borderTop: "100px solid transparent",
                      borderBottom: "100px solid transparent",
                      borderLeft: "150px solid #EDD9BC",
                    }} />
                  </div>

                  {/* Right triangle fold */}
                  <div
                    className="absolute top-0 right-0 h-full overflow-hidden"
                    style={{ width: "50%" }}
                  >
                    <div style={{
                      position: "absolute", top: 0, right: 0,
                      width: 0, height: 0,
                      borderTop: "100px solid transparent",
                      borderBottom: "100px solid transparent",
                      borderRight: "150px solid #E5CFA8",
                    }} />
                  </div>

                  {/* Top flap — flips open */}
                  <motion.div
                    className="absolute top-0 left-0 w-full overflow-hidden"
                    style={{
                      height: "52%",
                      transformOrigin: "top center",
                      transformStyle: "preserve-3d",
                      zIndex: 10,
                    }}
                    animate={stage === "opening" ? { rotateX: -180 } : { rotateX: 0 }}
                    transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div style={{
                      position: "absolute", top: 0, left: 0,
                      width: 0, height: 0,
                      borderLeft: "150px solid transparent",
                      borderRight: "150px solid transparent",
                      borderTop: "104px solid #D4B896",
                    }} />
                  </motion.div>

                  {/* Wax seal */}
                  <motion.div
                    className="absolute flex items-center justify-center rounded-full"
                    style={{
                      top: "50%", left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 48, height: 48,
                      background: "radial-gradient(circle at 35% 35%, #A00020, #6B0F1A)",
                      border: "2px solid #C9A84C",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
                      zIndex: 8,
                    }}
                    animate={stage === "opening" ? { opacity: 0, scale: 0.3 } : { opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, delay: 0.15 }}
                  >
                    <span style={{ color: "#C9A84C", fontSize: "1.2rem" }}>✦</span>
                  </motion.div>
                </div>

                {/* Tap prompt */}
                <AnimatePresence>
                  {stage === "idle" && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "0.9rem",
                        color: "rgba(201,168,76,0.9)",
                        letterSpacing: "0.15rem",
                        fontStyle: "italic",
                      }}
                    >
                      ✦ Tap to Open Your Invitation ✦
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── CARD STAGE ── */}
            {stage === "card" && (
              <motion.div
                key="card-scene"
                className="relative mx-6"
                style={{ maxWidth: 360, width: "100%" }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Outer glow */}
                <div
                  className="absolute -inset-1 rounded-2xl blur-md opacity-50"
                  style={{ background: "linear-gradient(135deg, #C9A84C, #E8C97A, #C9A84C)" }}
                />

                {/* Card */}
                <div
                  className="relative rounded-2xl text-center"
                  style={{
                    background: "linear-gradient(160deg, #FFFDF7 0%, #FFF0E0 100%)",
                    border: "1.5px solid #C9A84C",
                    padding: "2.2rem 2rem",
                    boxShadow: "0 24px 70px rgba(0,0,0,0.45)",
                  }}
                >
                  {/* Inner border */}
                  <div
                    className="absolute inset-2.5 rounded-xl pointer-events-none"
                    style={{ border: "1px solid rgba(201,168,76,0.3)" }}
                  />

                  {/* Corner stars */}
                  {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos, i) => (
                    <div key={i} className={`absolute ${pos} text-xs pointer-events-none`} style={{ color: "rgba(201,168,76,0.5)" }}>✦</div>
                  ))}

                  {/* Ganesh shloka */}
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "0.78rem", color: "#8B6355", letterSpacing: "0.18rem", marginBottom: "0.5rem" }}
                  >
                    ॥ श्री गणेशाय नमः ॥
                  </motion.p>

                  <div style={{ width: 70, height: 1, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "0 auto 0.7rem" }} />

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "0.75rem", color: "#8B6355", fontStyle: "italic", marginBottom: "0.9rem" }}
                  >
                    Together with their families
                  </motion.p>

                  {/* Bride name */}
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2.6rem", color: "#6B0F1A", fontWeight: 400, lineHeight: 1.1, marginBottom: "0.1rem" }}
                  >
                    {bride.fullName}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.55, duration: 0.4 }}
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.2rem", color: "#C9A84C", fontStyle: "italic", margin: "0.15rem 0" }}
                  >
                    &amp;
                  </motion.p>

                  {/* Groom name */}
                  <motion.h1
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.65, duration: 0.6 }}
                    style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2.6rem", color: "#6B0F1A", fontWeight: 400, lineHeight: 1.1, marginBottom: "0.9rem" }}
                  >
                    {groom.fullName}
                  </motion.h1>

                  <div style={{ width: 70, height: 1, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "0 auto 0.6rem" }} />

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "0.85rem", color: "#6B0F1A", letterSpacing: "0.3rem", fontWeight: 600, textTransform: "uppercase", marginBottom: "0.4rem" }}
                  >
                    Wedding
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1rem", color: "#5C3D2E", letterSpacing: "0.05rem" }}
                  >
                    {weddingDateDisplay}
                  </motion.p>

                  <div style={{ width: 70, height: 1, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "0.6rem auto 0.4rem" }} />

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    style={{ color: "#C9A84C", fontSize: "0.8rem", letterSpacing: "0.3rem" }}
                  >
                    ✦ ❧ ✦
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
