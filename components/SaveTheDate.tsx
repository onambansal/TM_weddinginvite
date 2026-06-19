"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

// Parse the wedding date for display
const weddingDateObj = new Date(weddingConfig.weddingDate);
const weddingDay = weddingDateObj.getDate();
const weddingMonth = weddingDateObj.toLocaleString("en-US", { month: "long" });
const weddingYear = weddingDateObj.getFullYear();
const weddingMonthYear = `${weddingMonth} ${weddingYear}`;

export default function SaveTheDate() {
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

      <div className="relative z-10 text-center px-6 max-w-md mx-auto">
        {/* Pre-title */}
        <motion.p
          className="text-gold text-xs tracking-[0.4em] uppercase font-poppins mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          ✦ Mark Your Calendar ✦
        </motion.p>

        {/* Main title */}
        <motion.h2
          className="font-playfair text-4xl md:text-5xl text-maroon mb-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Save The Date
        </motion.h2>

        <div className="gold-divider my-6" />

        {/* Animated calendar card */}
        <motion.div
          className="relative mx-auto max-w-xs"
          initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, type: "spring" }}
        >
          {/* Calendar card */}
          <div
            className="rounded-3xl overflow-hidden shadow-luxury border border-gold/30"
            style={{ background: "linear-gradient(135deg, #4A0A12, #6B0F1A)" }}
          >
            {/* Calendar header */}
            <div
              className="py-4 px-6 flex items-center justify-center gap-3"
              style={{ background: "linear-gradient(135deg, #C9A84C, #E8C97A)" }}
            >
              <Calendar className="w-5 h-5 text-maroon" />
              <span className="font-poppins text-maroon font-semibold text-sm tracking-widest uppercase">
                {weddingMonthYear}
              </span>
            </div>

            {/* Calendar body */}
            <div className="py-10 px-8 text-center">
              {/* Day of week */}
              <motion.p
                className="text-gold/70 text-xs tracking-[0.3em] uppercase font-poppins mb-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                {weddingConfig.weddingDay}
              </motion.p>

              {/* Date number */}
              <motion.div
                className="relative inline-block"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              >
                <span
                  className="font-playfair text-8xl md:text-9xl font-bold"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    background: "linear-gradient(135deg, #C9A84C, #E8C97A, #C9A84C)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {weddingDay}
                </span>
              </motion.div>

              {/* Month */}
              <motion.p
                className="text-gold text-xl md:text-2xl font-playfair mt-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                {weddingMonth}
              </motion.p>

              {/* Year */}
              <motion.p
                className="text-gold/60 text-sm font-poppins tracking-widest mt-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                {weddingYear}
              </motion.p>

              <div className="gold-divider my-5" />

              {/* Couple names */}
              <motion.p
                className="text-cream/80 text-sm font-poppins tracking-wider"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                {weddingConfig.bride.firstName} &amp; {weddingConfig.groom.firstName}
              </motion.p>
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-3xl shadow-gold-lg pointer-events-none" />
        </motion.div>

        {/* Bottom text */}
        <motion.p
          className="text-maroon/60 text-sm font-poppins mt-8 italic"
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
