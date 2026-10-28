"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { bride, groom } from "@/config/weddingConfig";
import CornerOrnament from "./CornerOrnament";
import SectionDivider from "./SectionDivider";
import Motif from "./Motif";
import Ampersand from "./Ampersand";
import Mandala from "./Mandala";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function FamilyIntro() {
  return (
    <section
      id="family"
      className="relative min-h-screen flex items-center justify-center py-16 px-6 overflow-hidden paper-grain vignette"
      style={{
        background: "linear-gradient(160deg, #FFFDF7 0%, #FFF0E0 50%, #FFF8F0 100%)",
      }}
    >
      {/* Background radial glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 15%, rgba(201, 168, 76, 0.07) 0%, transparent 40%),
            radial-gradient(circle at 85% 85%, rgba(107, 15, 26, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(201, 168, 76, 0.04) 0%, transparent 60%)
          `,
        }}
      />

      <Mandala size={1000} opacity={0.1} spin={150} />

      {/* Hairline frame + corner flourishes */}
      <div className="absolute inset-4 md:inset-6 rounded-3xl pointer-events-none hairline-glow-soft" />
      <CornerOrnament color="#C9A84C" opacity={0.45} />

      <div className="relative z-10 max-w-xl w-full text-center">

        {/* Invocation */}
        <motion.div
          className="mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0}
        >
          <div
            className="flex justify-center mb-3"
            style={{ filter: "drop-shadow(0 2px 10px rgba(201, 168, 76, 0.45))" }}
          >
            <Motif name="om" size={72} color="#C9A84C" />
          </div>
          <p
            className="text-base font-semibold tracking-widest mb-1"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#6B0F1A", letterSpacing: "0.2rem" }}
          >
            Shri Ganeshaya Namah
          </p>
          <p className="text-xl font-devanagari" lang="hi" style={{ color: "#C9A84C", letterSpacing: "0.06rem" }}>
            ॐ गं गणपतये नमः
          </p>
        </motion.div>

        {/* Gold divider */}
        <SectionDivider color="#C9A84C" width={220} className="my-3" />

        {/* Groom's Side */}
        <motion.div
          className="py-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={2}
        >
          <p
            className="text-xs uppercase tracking-widest mb-1"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#C9A84C", letterSpacing: "0.3rem" }}
          >
            Groom
          </p>
          <h2
            className="mb-4"
            style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "3.2rem", color: "#6B0F1A", fontWeight: 400, lineHeight: 1.1, textShadow: "0 2px 8px rgba(107, 15, 26, 0.15)" }}
          >
            {groom.firstName}
          </h2>
          <div className="flex flex-col gap-2">
            <div
              className="flex flex-wrap items-center justify-center gap-1"
              style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif", fontSize: "1.1rem", color: "#5C3D2E" }}
            >
              <span className="italic text-sm" style={{ color: "#8B6355" }}>Son of</span>
              <span className="font-medium" style={{ color: "#2C1810" }}>{groom.father}</span>
              <Ampersand size="1.35em" />
              <span className="font-medium" style={{ color: "#2C1810" }}>{groom.mother}</span>
            </div>
            <div
              className="flex flex-wrap items-center justify-center gap-1"
              style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif", fontSize: "1.1rem", color: "#5C3D2E" }}
            >
              <span className="italic text-sm" style={{ color: "#8B6355" }}>Grandson of</span>
              <span className="font-medium" style={{ color: "#2C1810" }}>{groom.grandfather}</span>
              <Ampersand size="1.35em" />
              <span className="font-medium" style={{ color: "#2C1810" }}>{groom.grandmother}</span>
            </div>
          </div>
        </motion.div>

        {/* Ornamental Divider */}
        <motion.div
          className="flex items-center justify-center gap-4 my-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={3}
        >
          <span
            className="flex-1 h-px"
            style={{ maxWidth: 120, background: "linear-gradient(90deg, transparent, #C9A84C)" }}
          />
          <span style={{ filter: "drop-shadow(0 1px 6px rgba(201, 168, 76, 0.5))", lineHeight: 0 }}>
            <Motif name="ring" size={34} color="#C9A84C" />
          </span>
          <span
            className="flex-1 h-px"
            style={{ maxWidth: 120, background: "linear-gradient(90deg, #C9A84C, transparent)" }}
          />
        </motion.div>

        {/* Bride's Side */}
        <motion.div
          className="py-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={4}
        >
          <p
            className="text-xs uppercase tracking-widest mb-1"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#C9A84C", letterSpacing: "0.3rem" }}
          >
            Bride
          </p>
          <h2
            className="mb-4"
            style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "3.2rem", color: "#6B0F1A", fontWeight: 400, lineHeight: 1.1, textShadow: "0 2px 8px rgba(107, 15, 26, 0.15)" }}
          >
            {bride.firstName}
          </h2>
          <div className="flex flex-col gap-2">
            <div
              className="flex flex-wrap items-center justify-center gap-1"
              style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif", fontSize: "1.1rem", color: "#5C3D2E" }}
            >
              <span className="italic text-sm" style={{ color: "#8B6355" }}>Daughter of</span>
              <span className="font-medium" style={{ color: "#2C1810" }}>{bride.father}</span>
              <Ampersand size="1.35em" />
              <span className="font-medium" style={{ color: "#2C1810" }}>{bride.mother}</span>
            </div>
            <div
              className="flex flex-wrap items-center justify-center gap-1"
              style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif", fontSize: "1.1rem", color: "#5C3D2E" }}
            >
              <span className="italic text-sm" style={{ color: "#8B6355" }}>Granddaughter of</span>
              <span className="font-medium" style={{ color: "#2C1810" }}>{bride.grandfather}</span>
              <Ampersand size="1.35em" />
              <span className="font-medium" style={{ color: "#2C1810" }}>{bride.grandmother}</span>
            </div>
          </div>
        </motion.div>

        {/* Gold divider */}
        <SectionDivider color="#C9A84C" width={220} className="my-3" />

        {/* Blessings */}
        <motion.p
          className="text-sm italic mt-2"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#8B6355" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={6}
        >
          ✦ With the blessings of our elders and the grace of the Almighty ✦
        </motion.p>
      </div>
    </section>
  );
}
