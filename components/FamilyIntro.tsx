"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { bride, groom } from "@/config/weddingConfig";

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
      className="relative min-h-screen flex items-center justify-center py-16 px-6 overflow-hidden"
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

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 text-4xl opacity-30 pointer-events-none" style={{ color: "#C9A84C" }}>❧</div>
      <div className="absolute top-4 right-4 text-4xl opacity-30 pointer-events-none" style={{ color: "#C9A84C", transform: "scaleX(-1)" }}>❧</div>
      <div className="absolute bottom-4 left-4 text-4xl opacity-30 pointer-events-none" style={{ color: "#C9A84C", transform: "scaleY(-1)" }}>❧</div>
      <div className="absolute bottom-4 right-4 text-4xl opacity-30 pointer-events-none" style={{ color: "#C9A84C", transform: "scale(-1)" }}>❧</div>

      <div className="relative z-10 max-w-xl w-full text-center">

        {/* Ganesh Idol */}
        <motion.div
          className="mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0}
        >
          <div
            className="text-7xl leading-none mb-2"
            style={{ filter: "drop-shadow(0 2px 8px rgba(201, 168, 76, 0.4))" }}
          >
            🕉️
          </div>
          <p
            className="text-base font-semibold tracking-widest mb-1"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B0F1A", letterSpacing: "0.2rem" }}
          >
            Shri Ganeshaya Namah
          </p>
          <p
            className="text-lg"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#C9A84C", letterSpacing: "0.1rem" }}
          >
            ॐ गं गणपतये नमः
          </p>
        </motion.div>

        {/* Gold divider */}
        <motion.div
          className="gold-divider-wide"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={1}
        />

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
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#C9A84C", letterSpacing: "0.3rem" }}
          >
            Groom
          </p>
          <h2
            className="mb-4"
            style={{ fontFamily: "'Great Vibes', cursive", fontSize: "3.2rem", color: "#6B0F1A", fontWeight: 400, lineHeight: 1.1, textShadow: "0 2px 8px rgba(107, 15, 26, 0.15)" }}
          >
            {groom.firstName}
          </h2>
          <div className="flex flex-col gap-2">
            <div
              className="flex flex-wrap items-center justify-center gap-1"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1rem", color: "#5C3D2E" }}
            >
              <span className="italic text-sm" style={{ color: "#8B6355" }}>Son of</span>
              <span className="font-medium" style={{ color: "#2C1810" }}>{groom.father}</span>
              <span className="italic" style={{ color: "#C9A84C" }}>&amp;</span>
              <span className="font-medium" style={{ color: "#2C1810" }}>{groom.mother}</span>
            </div>
            <div
              className="flex flex-wrap items-center justify-center gap-1"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1rem", color: "#5C3D2E" }}
            >
              <span className="italic text-sm" style={{ color: "#8B6355" }}>Grandson of</span>
              <span className="font-medium" style={{ color: "#2C1810" }}>{groom.grandfather}</span>
              <span className="italic" style={{ color: "#C9A84C" }}>&amp;</span>
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
          <span className="text-2xl" style={{ filter: "drop-shadow(0 1px 4px rgba(201, 168, 76, 0.5))" }}>💍</span>
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
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#C9A84C", letterSpacing: "0.3rem" }}
          >
            Bride
          </p>
          <h2
            className="mb-4"
            style={{ fontFamily: "'Great Vibes', cursive", fontSize: "3.2rem", color: "#6B0F1A", fontWeight: 400, lineHeight: 1.1, textShadow: "0 2px 8px rgba(107, 15, 26, 0.15)" }}
          >
            {bride.firstName}
          </h2>
          <div className="flex flex-col gap-2">
            <div
              className="flex flex-wrap items-center justify-center gap-1"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1rem", color: "#5C3D2E" }}
            >
              <span className="italic text-sm" style={{ color: "#8B6355" }}>Daughter of</span>
              <span className="font-medium" style={{ color: "#2C1810" }}>{bride.father}</span>
              <span className="italic" style={{ color: "#C9A84C" }}>&amp;</span>
              <span className="font-medium" style={{ color: "#2C1810" }}>{bride.mother}</span>
            </div>
            <div
              className="flex flex-wrap items-center justify-center gap-1"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1rem", color: "#5C3D2E" }}
            >
              <span className="italic text-sm" style={{ color: "#8B6355" }}>Granddaughter of</span>
              <span className="font-medium" style={{ color: "#2C1810" }}>{bride.grandfather}</span>
              <span className="italic" style={{ color: "#C9A84C" }}>&amp;</span>
              <span className="font-medium" style={{ color: "#2C1810" }}>{bride.grandmother}</span>
            </div>
          </div>
        </motion.div>

        {/* Gold divider */}
        <motion.div
          className="gold-divider-wide"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={5}
        />

        {/* Blessings */}
        <motion.p
          className="text-sm italic mt-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#8B6355" }}
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
