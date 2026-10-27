"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { bride, groom, couplePhoto } from "@/config/weddingConfig";
import CornerOrnament from "./CornerOrnament";
import SectionDivider from "./SectionDivider";
import Motif from "./Motif";

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

  return (
    <section
      id="couple"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 px-6 paper-grain"
      style={{ background: "linear-gradient(160deg, #1A0507 0%, #4A0A12 40%, #6B0F1A 70%, #2A0608 100%)" }}
    >
      {/* Soft gold glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 30%, rgba(201,168,76,0.22) 0%, transparent 45%),
            radial-gradient(circle at 15% 90%, rgba(201,168,76,0.10) 0%, transparent 40%),
            radial-gradient(circle at 85% 10%, rgba(201,168,76,0.10) 0%, transparent 40%)
          `,
        }}
      />

      {/* Ambient gold dust */}
      {!reduceMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
        </div>
      )}

      <div className="absolute inset-4 md:inset-6 rounded-3xl pointer-events-none" style={{ border: "1px solid rgba(201,168,76,0.25)" }} />
      <CornerOrnament color="#C9A84C" opacity={0.5} />

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
          <div
            className="absolute -inset-1 rounded-[50%]"
            style={{ background: "linear-gradient(135deg, #C9A84C, #F3E2A0, #C9A84C, #A07830)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
          />
          <div className="absolute inset-0.5 rounded-[50%] overflow-hidden" style={{ background: "#2A0608" }}>
            <Image
              src={couplePhoto}
              alt={`${bride.firstName} & ${groom.firstName}`}
              fill
              sizes="220px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 40px rgba(42,6,8,0.6)" }} />
          </div>
        </motion.div>

        {/* Names */}
        <motion.h1
          className="leading-none"
          style={nameStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          {bride.firstName}
        </motion.h1>
        <motion.p
          className="italic my-1"
          style={{ fontFamily: serif, fontSize: "1.8rem", color: "rgba(201,168,76,0.8)" }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          &amp;
        </motion.p>
        <motion.h1
          className="leading-none"
          style={nameStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
        >
          {groom.firstName}
        </motion.h1>

        <SectionDivider color="#C9A84C" width={200} className="my-6" />

        <motion.p
          className="italic"
          style={{ fontFamily: serif, fontSize: "1.35rem", color: "#FFF8F0", lineHeight: 1.4 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          are getting married
        </motion.p>
        <motion.p
          className="uppercase tracking-[0.35em] text-xs font-poppins mt-4"
          style={{ color: "rgba(232,201,122,0.75)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          Scroll to discover the day
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
