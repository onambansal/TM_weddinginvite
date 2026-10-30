"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Heart } from "lucide-react";
import { rsvp, bride, groom } from "@/config/weddingConfig";
import CornerOrnament from "./CornerOrnament";
import SectionDivider from "./SectionDivider";
import Motif from "./Motif";
import Mandala from "./Mandala";
import Heading from "./Heading";
import Magnetic from "./Magnetic";
import LightBeam from "./LightBeam";
import ShareKeepsake from "./ShareKeepsake";
import { tap, HAPTIC } from "@/lib/haptics";
import { useNearViewport } from "@/lib/useNearViewport";

const serif = "var(--font-cormorant), var(--font-playfair), Georgia, serif";

export default function RSVPSection() {
  const reduceMotion = useReducedMotion();
  const { ref: sectionRef, near } = useNearViewport<HTMLElement>();
  const ambient = near && !reduceMotion;
  // wa.me expects digits only
  const whatsappUrl = `https://wa.me/${rsvp.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(rsvp.message)}`;

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4 paper-grain vignette-dark"
      style={{
        background: "linear-gradient(160deg, #2A0608 0%, #4A0A12 35%, #6B0F1A 65%, #2A0608 100%)",
      }}
    >
      <Mandala size={1000} opacity={0.07} spin={ambient ? 140 : 0} />
      <LightBeam intensity={0.2} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 50% 40%, rgba(201,168,76,0.22) 0%, transparent 50%)" }}
      />

      {/* Golden particles */}
      {ambient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gold/30"
              style={{
                width: 3 + (i % 4),
                height: 3 + (i % 4),
                left: `${(i * 5.3) % 100}%`,
                top: `${(i * 6.7) % 100}%`,
              }}
              animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
              transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-4 md:inset-6 rounded-3xl pointer-events-none hairline-glow-soft" />
      <CornerOrnament color="#C9A84C" opacity={0.5} />

      <div className="relative z-10 text-center max-w-md mx-auto">
        {/* Pre-title */}
        <motion.p
          className="text-gold/70 text-xs tracking-[0.4em] uppercase font-poppins mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          ✦ Join Our Celebration ✦
        </motion.p>

        {/* Main title */}
        <Heading foil className="mb-3" delay={0.1}>We Await Your Blessings</Heading>

        <SectionDivider color="#C9A84C" width={200} className="my-6" />

        {/* Kalash motif */}
        <motion.div
          className="flex justify-center mb-6"
          style={{ filter: "drop-shadow(0 2px 12px rgba(201,168,76,0.45))" }}
          animate={ambient ? { y: [0, -5, 0] } : undefined}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Motif name="kalash" size={64} color="#E8C97A" />
        </motion.div>

        {/* Message */}
        <motion.p
          className="text-cream/75 leading-relaxed mb-8 italic"
          style={{ fontFamily: serif, fontSize: "1.15rem" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Your presence will make our special day even more memorable.
          Kindly confirm your attendance so we may welcome you with open hearts.
        </motion.p>

        {/* RSVP button — gold, on-palette, magnetic */}
        <Magnetic strength={7} radius={70}>
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full font-poppins text-sm tracking-[0.2em] uppercase overflow-hidden bg-gold-foil foil-sheen"
          style={{
            color: "#2A0608",
            // glow brightens as the pointer approaches (--magnet 0‒1 from <Magnetic/>)
            boxShadow:
              "0 10px 40px rgba(201,168,76,calc(0.35 + var(--magnet, 0) * 0.3)), 0 0 calc(14px + var(--magnet, 0) * 18px) 2px rgba(201,168,76,calc(0.3 + var(--magnet, 0) * 0.4)), inset 0 0 0 1px rgba(255,255,255,0.35)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => tap(HAPTIC.confirm)}
        >
          {/* shimmer sweep */}
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.55) 50%, transparent 65%)",
              backgroundSize: "250% 100%",
              animation: "shimmer 3.5s linear infinite",
            }}
          />
          <MessageCircle className="w-4 h-4 relative" />
          <span className="relative font-semibold">Confirm Attendance</span>
        </motion.a>
        </Magnetic>

        <motion.p
          className="text-gold/50 text-xs font-poppins mt-5 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Opens a WhatsApp message to the family
        </motion.p>

        {/* Shareable keepsake — story-size image guests can post or forward */}
        <div className="mt-6">
          <ShareKeepsake />
        </div>

        <SectionDivider color="#C9A84C" width={160} className="mt-8" />

        {/* Couple names */}
        <motion.p
          className="text-gold/70 mt-5 flex items-center justify-center gap-3"
          style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "1.6rem" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          {groom.firstName} <Heart className="w-4 h-4 text-gold fill-gold" /> {bride.firstName}
        </motion.p>
      </div>
    </section>
  );
}
