"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { bride, groom, weddingDateDisplay, ceremonies } from "@/config/weddingConfig";

export default function ThankYouSection() {
  return (
    <section
      id="thankyou"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4"
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

      {/* Animated diya flames */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${10 + i * 12}%`,
              bottom: "10%",
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2 + (i % 3) * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            🪔
          </motion.div>
        ))}
      </div>

      {/* Decorative border */}
      <div className="absolute inset-4 border border-gold/20 rounded-3xl pointer-events-none" />

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
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Thank You
        </motion.h2>

        <div
          className="w-32 h-px mx-auto my-6"
          style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
        />

        {/* Thank you message */}
        <motion.p
          className="text-maroon/70 text-base md:text-lg font-playfair italic leading-relaxed mb-6"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Thank you for being a part of our celebration.
        </motion.p>

        {/* Couple names */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <p
            className="text-3xl md:text-4xl text-maroon"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {groom.firstName} ❤️ {bride.firstName}
          </p>
        </motion.div>

        <div
          className="w-32 h-px mx-auto my-6"
          style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
        />

        {/* No gifts message */}
        <motion.div
          className="rounded-2xl border border-gold/30 px-6 py-5 mx-auto max-w-xs"
          style={{ background: "rgba(201, 168, 76, 0.05)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gold text-lg mb-2">🙏</p>
          <p className="text-maroon/70 text-sm font-poppins leading-relaxed">
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
          <p className="text-gold text-2xl tracking-widest mb-3">✦ ❧ ✦</p>
          <p className="text-maroon/40 text-xs font-poppins tracking-widest uppercase">
            {weddingDateDisplay} · {ceremonies.wedding.venue}, {ceremonies.wedding.address}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
