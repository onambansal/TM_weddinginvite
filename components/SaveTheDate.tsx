"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";

// Parse the wedding date for display
const weddingDateObj = new Date(weddingConfig.weddingDate);
const weddingDay = weddingDateObj.getDate().toString();
const weddingMonth = weddingDateObj.toLocaleString("en-US", { month: "long" });
const weddingYear = weddingDateObj.getFullYear().toString();

// Particle positions for the burst effect (angle in degrees)
const PARTICLE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

// ── Dhol Player SVG Component ─────────────────────────────────
function DholPlayer() {
  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col items-center gap-2 mt-6"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.2 }}
      >
        {/* Floating musical notes */}
        <div className="relative w-32 h-10 mb-1">
          {["🎵", "🎶", "🎵"].map((note, i) => (
            <motion.span
              key={i}
              className="absolute text-lg"
              style={{ left: `${20 + i * 30}%` }}
              animate={{ y: [0, -28, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
            >
              {note}
            </motion.span>
          ))}
        </div>

        {/* The dhol player SVG */}
        <motion.svg
          width="120"
          height="160"
          viewBox="0 0 120 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Head */}
          <circle cx="60" cy="18" r="14" fill="#F5C5A3" stroke="#C9A84C" strokeWidth="1.5" />
          {/* Turban */}
          <ellipse cx="60" cy="8" rx="16" ry="7" fill="#C9A84C" />
          <rect x="44" y="5" width="32" height="5" rx="2" fill="#E8C97A" />
          {/* Turban knot */}
          <circle cx="60" cy="4" r="4" fill="#6B0F1A" />

          {/* Body */}
          <rect x="48" y="32" width="24" height="36" rx="6" fill="#6B0F1A" />
          {/* Kurta detail */}
          <line x1="60" y1="34" x2="60" y2="66" stroke="#C9A84C" strokeWidth="1" strokeDasharray="2 2" />

          {/* Dhol (drum) — centered in front of body */}
          <ellipse cx="60" cy="72" rx="20" ry="10" fill="#8B4513" stroke="#C9A84C" strokeWidth="1.5" />
          <rect x="40" y="68" width="40" height="20" rx="4" fill="#A0522D" stroke="#C9A84C" strokeWidth="1.5" />
          <ellipse cx="60" cy="88" rx="20" ry="10" fill="#8B4513" stroke="#C9A84C" strokeWidth="1.5" />
          {/* Dhol rope pattern */}
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1={44 + i * 8}
              y1="68"
              x2={46 + i * 8}
              y2="88"
              stroke="#C9A84C"
              strokeWidth="1"
              opacity="0.6"
            />
          ))}

          {/* LEFT ARM — beats down */}
          <motion.g
            style={{ transformOrigin: "48px 38px" }}
            animate={{ rotate: [0, 40, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <line x1="48" y1="38" x2="28" y2="62" stroke="#F5C5A3" strokeWidth="5" strokeLinecap="round" />
            {/* Drumstick */}
            <line x1="28" y1="62" x2="18" y2="78" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />
          </motion.g>

          {/* RIGHT ARM — beats down (offset phase) */}
          <motion.g
            style={{ transformOrigin: "72px 38px" }}
            animate={{ rotate: [0, -40, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
          >
            <line x1="72" y1="38" x2="92" y2="62" stroke="#F5C5A3" strokeWidth="5" strokeLinecap="round" />
            {/* Drumstick */}
            <line x1="92" y1="62" x2="102" y2="78" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />
          </motion.g>

          {/* Legs */}
          <line x1="54" y1="68" x2="50" y2="110" stroke="#F5C5A3" strokeWidth="5" strokeLinecap="round" />
          <line x1="66" y1="68" x2="70" y2="110" stroke="#F5C5A3" strokeWidth="5" strokeLinecap="round" />
          {/* Feet */}
          <ellipse cx="49" cy="112" rx="7" ry="4" fill="#6B0F1A" />
          <ellipse cx="71" cy="112" rx="7" ry="4" fill="#6B0F1A" />

          {/* Dhol strap */}
          <path d="M 42 68 Q 30 55 48 38" stroke="#C9A84C" strokeWidth="2" fill="none" strokeDasharray="3 2" />
          <path d="M 78 68 Q 90 55 72 38" stroke="#C9A84C" strokeWidth="2" fill="none" strokeDasharray="3 2" />
        </motion.svg>

        <motion.p
          className="text-xs italic tracking-widest"
          style={{ color: "#C9A84C", fontFamily: "'Playfair Display', Georgia, serif" }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ✦ Dhol Bajao! ✦
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Reveal Box ────────────────────────────────────────────────
interface RevealBoxProps {
  value: string;
  label: string;
  delay?: number;
  accentColor?: string;
  onReveal?: () => void;
}

function RevealBox({ value, label, delay = 0, accentColor = "#C9A84C", onReveal }: RevealBoxProps) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    if (!revealed) {
      setRevealed(true);
      onReveal?.();
    }
  };

  return (
    <motion.div
      className="relative flex-1 min-w-0 cursor-pointer select-none"
      style={{ aspectRatio: "3/4", maxWidth: "30vw" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onClick={handleReveal}
      whileTap={!revealed ? { scale: 0.96 } : {}}
      animate={revealed ? { scale: [1, 1.06, 1] } : { scale: 1 }}
    >
      {/* Card base */}
      <motion.div
        className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-2 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #1a0505, #2C0A0A)",
          border: `1.5px solid ${accentColor}55`,
        }}
        animate={
          revealed
            ? {
                boxShadow: [
                  `0 8px 32px rgba(0,0,0,0.5), 0 0 0 2px ${accentColor}`,
                  `0 8px 48px rgba(201,168,76,0.6), 0 0 20px 4px ${accentColor}`,
                  `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}44`,
                ],
              }
            : { boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}22` }
        }
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <AnimatePresence>
          {revealed && (
            <motion.p
              key="value"
              className="font-bold leading-none w-full text-center px-1"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: value.length > 6 ? "clamp(0.9rem, 4vw, 1.4rem)" : value.length > 4 ? "clamp(1.1rem, 5vw, 1.8rem)" : "clamp(1.8rem, 8vw, 3.5rem)",
                wordBreak: "break-word",
                background: `linear-gradient(135deg, ${accentColor}, #E8C97A, ${accentColor})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              initial={{ opacity: 0, y: 30, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.1 }}
            >
              {value}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {revealed && (
            <motion.p
              key="label"
              className="text-xs tracking-widest uppercase"
              style={{ color: `${accentColor}80`, fontFamily: "'Poppins', sans-serif" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {label}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Gold particle burst */}
      <AnimatePresence>
        {revealed && (
          <>
            {PARTICLE_ANGLES.map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const distance = 55 + (i % 3) * 15;
              const tx = Math.cos(rad) * distance;
              const ty = Math.sin(rad) * distance;
              return (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 4 + (i % 3) * 2,
                    height: 4 + (i % 3) * 2,
                    background: i % 2 === 0 ? accentColor : "#E8C97A",
                    top: "50%",
                    left: "50%",
                    marginTop: -3,
                    marginLeft: -3,
                    zIndex: 20,
                  }}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{ opacity: 0, x: tx, y: ty, scale: 0 }}
                  transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Veil overlay */}
      <AnimatePresence>
        {!revealed && (
          <motion.div
            className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-3"
            style={{
              background: `linear-gradient(160deg, #6B0F1A, #3A0808)`,
              border: `1.5px solid ${accentColor}55`,
            }}
            initial={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.08, rotate: 3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div
              className="absolute inset-0 rounded-2xl opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 30%, ${accentColor} 1px, transparent 1px),
                  radial-gradient(circle at 70% 70%, ${accentColor} 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              exit={{ rotate: 180, scale: 0, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: "1.8rem", color: accentColor }}
            >
              ✦
            </motion.div>
            <p
              className="text-center px-2 leading-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "0.65rem",
                color: `${accentColor}cc`,
                letterSpacing: "0.15rem",
                fontStyle: "italic",
              }}
            >
              Tap to reveal
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────
export default function SaveTheDate() {
  const [revealCount, setRevealCount] = useState(0);
  const allRevealed = revealCount >= 3;

  const handleReveal = () => setRevealCount((c) => c + 1);

  return (
    <section
      id="save-the-date"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFF8F0 0%, #F5EDE0 100%)" }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #C9A84C 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #6B0F1A 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-lg mx-auto w-full">
        {/* Pre-title */}
        <motion.p
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: "#C9A84C", fontFamily: "'Poppins', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          ✦ Mark Your Calendar ✦
        </motion.p>

        {/* Main title */}
        <motion.h2
          className="text-4xl md:text-5xl mb-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B0F1A" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Save The Date
        </motion.h2>

        {/* Gold divider */}
        <motion.div
          className="mx-auto my-6"
          style={{ width: 80, height: 1, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        {/* Instruction hint */}
        <motion.p
          className="text-xs italic mb-8"
          style={{ color: "#8B6355", fontFamily: "'Playfair Display', Georgia, serif" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Tap each card to reveal the date
        </motion.p>

        {/* Three reveal boxes */}
        <div className="flex items-stretch justify-center gap-4 mb-10" style={{ minHeight: "180px" }}>
          <RevealBox value={weddingDay}   label="Day"   delay={0.3}  accentColor="#C9A84C" onReveal={handleReveal} />
          <RevealBox value={weddingMonth} label="Month" delay={0.45} accentColor="#E8C97A" onReveal={handleReveal} />
          <RevealBox value={weddingYear}  label="Year"  delay={0.6}  accentColor="#C9A84C" onReveal={handleReveal} />
        </div>

        {/* Dhol player — appears when all 3 are revealed */}
        <AnimatePresence>
          {allRevealed && <DholPlayer />}
        </AnimatePresence>

        {/* Gold divider */}
        <div
          className="mx-auto mb-6 mt-6"
          style={{ width: 80, height: 1, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
        />

        {/* Couple names */}
        <motion.p
          className="mb-2"
          style={{ fontFamily: "'Great Vibes', cursive", color: "#6B0F1A", fontSize: "1.8rem" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          {weddingConfig.groom.firstName} &amp; {weddingConfig.bride.firstName}
        </motion.p>

        {/* Bottom text */}
        <motion.p
          className="text-sm italic"
          style={{ color: "#8B6355", fontFamily: "'Playfair Display', Georgia, serif" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
        >
          We can&apos;t wait to celebrate with you!
        </motion.p>
      </div>
    </section>
  );
}
