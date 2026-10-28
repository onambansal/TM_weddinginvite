"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { bride, groom, couplePhoto } from "@/config/weddingConfig";
import { EASE_LUX } from "@/lib/motion";
import { useWeddingDay } from "@/lib/useWeddingDay";
import CornerOrnament from "./CornerOrnament";
import SectionDivider from "./SectionDivider";
import Motif from "./Motif";
import Mandala from "./Mandala";
import Ampersand from "./Ampersand";
import HandwrittenName from "./HandwrittenName";
import Sparkles from "./Sparkles";
import Parallax from "./Parallax";
import LightBeam from "./LightBeam";

const serif = "var(--font-cormorant), var(--font-playfair), Georgia, serif";
const script = "var(--font-great-vibes), cursive";
const nameStyle: React.CSSProperties = {
  fontFamily: script,
  fontSize: "clamp(3rem, 12vw, 4.5rem)",
  color: "#E8C97A",
  textShadow: "0 4px 24px rgba(0,0,0,0.4)",
};

/**
 * First screen after the envelope: the couple and their photo.
 * Deliberately does NOT show the date — the Save-the-Date screen that follows
 * reveals it interactively, so the hero only teases it.
 */
export default function CoupleHero() {
  const reduceMotion = useReducedMotion();
  const { phase } = useWeddingDay();
  const tagline = phase === "today" ? "are getting married today" : phase === "after" ? "are married" : "are getting married";
  const hint = phase === "before" ? "Scroll to discover the day" : "Scroll to relive the celebration";

  return (
    <section
      id="couple"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 px-6 paper-grain vignette-dark"
      style={{ background: "linear-gradient(160deg, #1A0507 0%, #4A0A12 40%, #6B0F1A 70%, #2A0608 100%)" }}
    >
      <LightBeam intensity={0.18} />

      {/* Depth 1 — mandala */}
      <Parallax depth={0.35} range={160} className="absolute inset-0 pointer-events-none">
        <Mandala size={1100} opacity={0.08} spin={160} />
      </Parallax>

      {/* Soft gold glows — the main one follows the foil light source */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at calc(var(--foil-x) * 1%) calc(var(--foil-y) * 1%), rgba(201,168,76,0.22) 0%, transparent 45%),
            radial-gradient(circle at 15% 90%, rgba(201,168,76,0.10) 0%, transparent 40%),
            radial-gradient(circle at 85% 10%, rgba(201,168,76,0.10) 0%, transparent 40%)
          `,
        }}
      />

      {/* Depth 2 — ambient gold dust */}
      {!reduceMotion && (
        <Parallax depth={0.6} range={120} className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 26 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 2 + (i % 3),
                height: 2 + (i % 3),
                background: i % 4 === 0 ? "#FFFDF7" : "#C9A84C",
                left: `${(i * 5.3 + 1) % 100}%`,
                top: `${(i * 7.1 + 3) % 100}%`,
              }}
              animate={{ opacity: [0.1, 0.7, 0.1], scale: [1, 1.6, 1] }}
              transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            />
          ))}
        </Parallax>
      )}

      {/* Depth 3 — glowing frame + flourishes */}
      <Parallax depth={0.5} range={100} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-4 md:inset-6 rounded-3xl hairline-glow-soft" />
        <CornerOrnament color="#C9A84C" opacity={0.5} />
      </Parallax>

      <div className="relative z-10 w-full max-w-md mx-auto text-center">
        {/* Invocation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-center"
        >
          <Motif name="om" size={40} color="#E8C97A" />
          <p className="text-[0.7rem] tracking-[0.4em] uppercase font-poppins mt-3" style={{ color: "rgba(232,201,122,0.75)" }}>
            Together with their families
          </p>
        </motion.div>

        {/* Photo in gold oval frame */}
        <motion.div
          className="relative mx-auto mt-8 mb-8"
          style={{ width: 220, height: 290 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute -inset-3 rounded-[50%]"
            style={{ border: "1px dashed rgba(201,168,76,0.45)" }}
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          {/* Gold bezel — live foil; highlight slides with device tilt */}
          <div
            className="absolute -inset-1 rounded-[50%] bg-gold-foil foil-sheen"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 10px 1px rgba(201,168,76,0.35)" }}
          />
          {/* Specular arc — a bright sliver travels around the rim every ~8s */}
          {!reduceMotion && (
            <motion.div
              className="absolute -inset-1 rounded-[50%] pointer-events-none"
              style={{
                background: "conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(255,255,255,0.0) 318deg, rgba(255,255,255,0.85) 334deg, rgba(255,255,255,0.0) 350deg, transparent 360deg)",
                WebkitMaskImage: "radial-gradient(circle, transparent 0, transparent calc(50% - 5px), #000 calc(50% - 4px), #000 50%, transparent calc(50% + 1px))",
                maskImage: "radial-gradient(circle, transparent 0, transparent calc(50% - 5px), #000 calc(50% - 4px), #000 50%, transparent calc(50% + 1px))",
                mixBlendMode: "screen",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: [0.45, 0, 0.55, 1], repeatDelay: 1.5 }}
            />
          )}
          {/* Star sparkles catching the gold bezel */}
          <Sparkles count={10} distribution="edges" seed={5} minSize={6} maxSize={13} className="-inset-2" />
          <div className="absolute inset-0.5 rounded-[50%] overflow-hidden" style={{ background: "#2A0608" }}>
            <Image
              src={couplePhoto}
              alt={`${groom.firstName} & ${bride.firstName}`}
              fill
              sizes="220px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 40px rgba(42,6,8,0.6)" }} />
          </div>
        </motion.div>

        {/* Names — written by a gold pen, groom first */}
        <div className="relative inline-block">
          <Sparkles count={16} distribution="everywhere" seed={21} minSize={5} maxSize={12} />
          <div className="relative flex flex-col items-center">
            <HandwrittenName text={groom.firstName} duration={1.6} delay={1.0} fontSize={nameStyle.fontSize as string} />
            <motion.div
              className="my-1"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 2.5, ease: EASE_LUX }}
            >
              <Ampersand size="2rem" color="rgba(201,168,76,0.85)" />
            </motion.div>
            <HandwrittenName text={bride.firstName} duration={1.6} delay={2.9} fontSize={nameStyle.fontSize as string} />
          </div>
        </div>

        <SectionDivider color="#C9A84C" width={200} className="my-6" />

        <motion.p
          className="italic"
          style={{ fontFamily: serif, fontSize: "1.35rem", color: "#FFF8F0", lineHeight: 1.4 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.6, duration: 0.8 }}
        >
          {tagline}
        </motion.p>
        <motion.p
          className="uppercase tracking-[0.35em] text-xs font-poppins mt-4"
          style={{ color: "rgba(232,201,122,0.75)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.0, duration: 0.8 }}
        >
          {hint}
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        style={{ color: "rgba(201,168,76,0.6)" }}
        animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
