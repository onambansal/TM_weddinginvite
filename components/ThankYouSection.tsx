"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { bride, groom, weddingDateDisplay, ceremonies } from "@/config/weddingConfig";
import CornerOrnament from "./CornerOrnament";
import SectionDivider from "./SectionDivider";
import Motif from "./Motif";
import Heading from "./Heading";
import Ampersand from "./Ampersand";
import FormattedDate from "./FormattedDate";
import Mandala from "./Mandala";
import LitDiya from "./LitDiya";
import GoldFirework from "./GoldFirework";
import LightBeam from "./LightBeam";

const serif = "var(--font-cormorant), var(--font-playfair), Georgia, serif";

/** Deterministic per-diya flicker phase so SSR == CSR */
const FLICKER = [0.31, 0.27, 0.35, 0.29, 0.33, 0.26, 0.3];
const DIYA_COUNT = FLICKER.length;
const LIGHT_INTERVAL_MS = 420;

export default function ThankYouSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.55, once: true });
  // Ambient decoration (mandala spin, diya flicker) only while on / one screen from the viewport
  const near = useInView(sectionRef, { margin: "100% 0px 100% 0px" });

  // ── Lamp-lighting: diyas light left → right once the section is mostly in view
  const [litCount, setLitCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) { setLitCount(DIYA_COUNT); return; }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setLitCount(i);
      if (i >= DIYA_COUNT) clearInterval(id);
    }, LIGHT_INTERVAL_MS);
    return () => clearInterval(id);
  }, [inView, reduceMotion]);
  const allLit = litCount >= DIYA_COUNT;

  // ── End-of-scroll firework: once per visit, when the guest reaches the very bottom
  const [firework, setFirework] = useState(false);
  const fired = useRef(false);
  useEffect(() => {
    const onScroll = () => {
      if (fired.current) return;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24;
      if (atBottom) {
        fired.current = true;
        setFirework(true);
        setTimeout(() => setFirework(false), 3200);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="thankyou"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4 paper-grain vignette"
      style={{ background: "linear-gradient(180deg, #FFF8F0 0%, #F5EDE0 100%)" }}
    >
      {/* Screen warms by ~5% as the lamps light */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 90% 70% at 50% 85%, rgba(243,201,120,0.35), rgba(232,160,110,0.12) 45%, transparent 75%)", mixBlendMode: "multiply" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: Math.min(1, litCount / DIYA_COUNT) }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Light shaft sweeping with scroll */}
      <LightBeam intensity={0.14} />

      {/* Gold firework behind the names when the guest reaches the end */}
      <GoldFirework active={firework} x={50} y={36} count={64} />
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #C9A84C 1px, transparent 1px)`,
          backgroundSize: "25px 25px",
        }}
      />

      <Mandala size={1000} opacity={0.1} spin={near ? 150 : 0} />

      {/* Row of diyas along the bottom — unlit until the section arrives, then lit left → right */}
      <div className="absolute inset-x-0 bottom-[7%] flex justify-around items-end px-6 pointer-events-none">
        {FLICKER.map((f, i) => (
          <LitDiya key={i} lit={i < litCount} size={i % 2 === 0 ? 32 : 26} flicker={f} paused={!near} />
        ))}
      </div>
      {/* Soft "all lit" bloom across the floor once the last lamp catches */}
      <motion.div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{ height: "32%", background: "linear-gradient(180deg, transparent, rgba(243,201,120,0.22))" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: allLit ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <div className="absolute inset-4 md:inset-6 rounded-3xl pointer-events-none hairline-glow-soft" />
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
        <Heading className="mb-4" delay={0.1}>Thank You</Heading>

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
          <Ampersand size="1.7rem" />
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
            <FormattedDate value={weddingDateDisplay} /> · {ceremonies.wedding.venue}, {ceremonies.wedding.address}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
