"use client";

import { motion, useReducedMotion } from "framer-motion";
import { bride, groom, weddingDateDisplay, ceremonies } from "@/config/weddingConfig";
import CornerOrnament from "./CornerOrnament";
import SectionDivider from "./SectionDivider";
import Motif from "./Motif";

const serif = "var(--font-cormorant), var(--font-playfair), Georgia, serif";

export default function ThankYouSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="thankyou"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4 paper-grain"
      style={{ background: "linear-gradient(180deg, #FFF8F0 0%, #F5EDE0 100%)" }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #C9A84C 1px, transparent 1px)`,
          backgroundSize: "25px 25px",
        }}
      />

      {/* Row of gently glowing diyas along the bottom */}
      <div className="absolute inset-x-0 bottom-[7%] flex justify-around px-6 pointer-events-none">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            style={{ filter: "drop-shadow(0 0 8px rgba(201,168,76,0.6))" }}
            animate={reduceMotion ? undefined : { y: [0, -6, 0], opacity: [0.45, 0.9, 0.45] }}
            transition={{ duration: 2.4 + (i % 3) * 0.5, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          >
            <Motif name="diya" size={i % 2 === 0 ? 30 : 24} color="#C9A84C" />
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-4 md:inset-6 border border-gold/25 rounded-3xl pointer-events-none" />
      <CornerOrnament color="#C9A84C" opacity={0.45} />

      <div className="relative z-10 text-center max-w-md mx-auto">
        {/* Pre-title */}
        <motion.p
          className="text-gold text-xs tracking-[0.4em] uppercase font-poppins mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          ✦ With Gratitude ✦
        </motion.p>

        {/* Main title */}
        <motion.h2
          className="text-4xl md:text-5xl text-maroon mb-4"
          style={{ fontFamily: serif, fontWeight: 600 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Thank You
        </motion.h2>

        <SectionDivider color="#C9A84C" width={200} className="my-6" />

        {/* Thank you message */}
        <motion.p
          className="text-maroon/70 italic leading-relaxed mb-6"
          style={{ fontFamily: serif, fontSize: "1.2rem" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Thank you for being a part of our celebration.
        </motion.p>

        {/* Couple names */}
        <motion.div
          className="mb-8 flex items-center justify-center gap-3"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <p className="text-3xl md:text-4xl text-maroon" style={{ fontFamily: "var(--font-great-vibes), cursive" }}>
            {groom.firstName}
          </p>
          <span className="text-gold italic" style={{ fontFamily: serif, fontSize: "1.6rem" }}>&amp;</span>
          <p className="text-3xl md:text-4xl text-maroon" style={{ fontFamily: "var(--font-great-vibes), cursive" }}>
            {bride.firstName}
          </p>
        </motion.div>

        <SectionDivider color="#C9A84C" width={160} className="my-6" />

        {/* No gifts message */}
        <motion.div
          className="rounded-2xl border border-gold/40 px-6 py-5 mx-auto max-w-xs gold-inset"
          style={{ background: "rgba(255,253,247,0.7)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-center mb-2">
            <Motif name="lotus" size={36} color="#C9A84C" />
          </div>
          <p className="text-maroon/70 leading-relaxed" style={{ fontFamily: serif, fontSize: "1.05rem" }}>
            Only your good wishes and blessings,
            <br />
            <span className="font-semibold text-maroon">no gifts please.</span>
          </p>
        </motion.div>

        {/* Bottom ornament */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <SectionDivider color="#C9A84C" width={140} className="mb-3" animate={false} />
          <p className="text-maroon/40 text-xs font-poppins tracking-widest uppercase">
            {weddingDateDisplay} · {ceremonies.wedding.venue}, {ceremonies.wedding.address}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
