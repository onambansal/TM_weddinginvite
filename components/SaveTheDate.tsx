"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Music } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";
import { enter } from "@/lib/motion";
import { useNearViewport } from "@/lib/useNearViewport";
import CornerOrnament from "./CornerOrnament";
import SectionDivider from "./SectionDivider";
import Heading from "./Heading";
import Ampersand from "./Ampersand";
import RevealCard from "./RevealCard";
import Mandala from "./Mandala";
import GoldDust from "./GoldDust";

const serif = "var(--font-cormorant), var(--font-playfair), Georgia, serif";

// Parse the wedding date for the three reveal cards
const weddingDateObj = new Date(weddingConfig.weddingDate);
const weddingDay = weddingDateObj.getDate().toString();
const weddingMonth = weddingDateObj.toLocaleString("en-US", { month: "long" });
const weddingYear = weddingDateObj.getFullYear().toString();

// ── Dhol Player — gold line-art, matches the Motif set ────────
function DholPlayer() {
  const reduceMotion = useReducedMotion();
  const gold = "#C9A84C";
  const s = { stroke: gold, strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
  const beat = { duration: 0.5, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <motion.div
      className="flex flex-col items-center gap-2 mt-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={enter(0.2, 0.8)}
    >
      {/* Floating notes */}
      <div className="relative w-32 h-10 mb-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute text-gold"
            style={{ left: `${20 + i * 30}%` }}
            animate={reduceMotion ? undefined : { y: [0, -26, 0], opacity: [0.2, 1, 0.2], rotate: [0, i % 2 ? 12 : -12, 0] }}
            transition={{ duration: 1.3, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
          >
            <Music className={i === 1 ? "w-5 h-5" : "w-4 h-4"} />
          </motion.span>
        ))}
      </div>

      <motion.svg
        width="124"
        height="150"
        viewBox="0 0 124 150"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 4px 14px rgba(201,168,76,0.35))" }}
        animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
        transition={beat}
        aria-hidden="true"
      >
        {/* Turban */}
        <path {...s} d="M44 26c2-12 34-12 36 0" />
        <path {...s} d="M46 22c4-6 28-6 32 0" strokeWidth="1.1" />
        <path {...s} d="M62 10c-4 2-6 6-4 10" strokeWidth="1.1" />
        <circle cx="62" cy="9" r="2" fill={gold} />
        {/* Head */}
        <circle {...s} cx="62" cy="34" r="10" />
        {/* Body (kurta) */}
        <path {...s} d="M46 48c0-4 32-4 32 0l4 36H42l4-36z" />
        <path {...s} d="M62 50v30" strokeWidth="1" strokeDasharray="2 3" />
        {/* Dhol strap */}
        <path {...s} d="M48 54c-10 8-14 20-10 32M76 54c10 8 14 20 10 32" strokeWidth="1.1" strokeDasharray="3 2" />
        {/* Dhol */}
        <ellipse {...s} cx="62" cy="92" rx="26" ry="9" />
        <path {...s} d="M36 92v22M88 92v22" />
        <ellipse {...s} cx="62" cy="114" rx="26" ry="9" />
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1={42 + i * 10} y1="92" x2={44 + i * 10} y2="114" stroke={gold} strokeWidth="1" opacity="0.6" />
        ))}
        {/* Left arm — beats down */}
        <motion.g style={{ transformOrigin: "46px 56px" }} animate={reduceMotion ? undefined : { rotate: [0, 32, 0] }} transition={beat}>
          <path {...s} d="M46 56L30 76" />
          <path {...s} d="M30 76l-6 12" strokeWidth="1.4" />
          <circle cx="24" cy="88" r="2" fill={gold} />
        </motion.g>
        {/* Right arm — alternates */}
        <motion.g style={{ transformOrigin: "78px 56px" }} animate={reduceMotion ? undefined : { rotate: [0, -32, 0] }} transition={{ ...beat, delay: 0.25 }}>
          <path {...s} d="M78 56l16 20" />
          <path {...s} d="M94 76l6 12" strokeWidth="1.4" />
          <circle cx="100" cy="88" r="2" fill={gold} />
        </motion.g>
        {/* Legs */}
        <path {...s} d="M52 84l-4 44M72 84l4 44" />
        <path {...s} d="M40 130h14M70 130h14" strokeWidth="1.8" />
        {/* Beat ripples */}
        {[0, 1].map((i) => (
          <motion.ellipse
            key={i}
            cx="62"
            cy="103"
            rx="30"
            ry="12"
            stroke={gold}
            strokeWidth="0.8"
            fill="none"
            initial={{ opacity: 0, scale: 1 }}
            animate={reduceMotion ? undefined : { opacity: [0.5, 0], scale: [1, 1.35] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
            style={{ transformOrigin: "62px 103px" }}
          />
        ))}
      </motion.svg>

      <motion.p
        className="text-xs italic tracking-[0.2em]"
        style={{ color: "#C9A84C", fontFamily: serif, fontSize: "0.95rem" }}
        animate={reduceMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ✦ Dhol Bajao! ✦
      </motion.p>
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────
export default function SaveTheDate() {
  const [revealCount, setRevealCount] = useState(0);
  const [shower, setShower] = useState(false);
  const allRevealed = revealCount >= 3;
  const handleReveal = () => setRevealCount((c) => c + 1);
  const { ref: sectionRef, near } = useNearViewport<HTMLElement>();

  // Full-screen gold-dust shower the moment the last card is turned
  useEffect(() => {
    if (!allRevealed) return;
    setShower(true);
    const t = setTimeout(() => setShower(false), 4200);
    return () => clearTimeout(t);
  }, [allRevealed]);

  return (
    <section
      ref={sectionRef}
      id="save-the-date"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 paper-grain vignette"
      style={{ background: "linear-gradient(180deg, #FFF8F0 0%, #F5EDE0 100%)" }}
    >
      <GoldDust active={shower} mode="shower" count={60} duration={3.6} fixed seed={13} onLight />
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #C9A84C 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #6B0F1A 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <Mandala size={1000} opacity={0.1} spin={near ? 150 : 0} />
      <div className="absolute inset-4 md:inset-6 rounded-3xl pointer-events-none hairline-glow-soft" />
      <CornerOrnament color="#C9A84C" opacity={0.4} />

      <div className="relative z-10 text-center px-6 max-w-lg mx-auto w-full">
        <motion.p
          className="text-[0.7rem] tracking-[0.4em] uppercase mb-4 text-gold font-poppins"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={enter(0, 0.7)}
        >
          ✦ Mark Your Calendar ✦
        </motion.p>

        <Heading className="mb-2" delay={0.1}>Save The Date</Heading>

        <SectionDivider color="#C9A84C" width={200} className="my-6" />

        <motion.p
          className="italic mb-8"
          style={{ color: "#8B6355", fontFamily: serif, fontSize: "1.05rem" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={enter(0.4, 0.7)}
        >
          Turn each card to reveal the date
        </motion.p>

        {/* Three flip cards */}
        <div className="flex items-stretch justify-center gap-4 mb-10" style={{ minHeight: 180 }}>
          <RevealCard value={weddingDay} label="Day" delay={0.3} onReveal={handleReveal} />
          <RevealCard value={weddingMonth} label="Month" delay={0.45} onReveal={handleReveal} />
          <RevealCard value={weddingYear} label="Year" delay={0.6} onReveal={handleReveal} />
        </div>

        {/* Dhol player — appears once all three are turned */}
        <AnimatePresence>{allRevealed && <DholPlayer />}</AnimatePresence>

        <SectionDivider color="#C9A84C" width={140} className="my-6" />

        {/* Couple names */}
        <motion.p
          className="mb-2 flex items-center justify-center gap-3"
          style={{ fontFamily: "var(--font-great-vibes), cursive", color: "#6B0F1A", fontSize: "1.9rem" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={enter(0.7, 0.7)}
        >
          {weddingConfig.groom.firstName} <Ampersand size="1.5rem" /> {weddingConfig.bride.firstName}
        </motion.p>

        <motion.p
          className="italic"
          style={{ color: "#8B6355", fontFamily: serif, fontSize: "1.05rem" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={enter(0.9, 0.7)}
        >
          We can&apos;t wait to celebrate with you!
        </motion.p>
      </div>
    </section>
  );
}
