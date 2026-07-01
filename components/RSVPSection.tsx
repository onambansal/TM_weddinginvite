"use client";

import { motion } from "framer-motion";
import { MessageCircle, Heart } from "lucide-react";
import { rsvp, bride, groom } from "@/config/weddingConfig";

export default function RSVPSection() {
  const whatsappUrl = `https://wa.me/${rsvp.whatsappNumber}?text=${encodeURIComponent(rsvp.message)}`;

  return (
    <section
      id="rsvp"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4"
      style={{
        background: "linear-gradient(160deg, #4A0A12 0%, #6B0F1A 50%, #4A0A12 100%)",
      }}
    >
      {/* Golden particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gold/20"
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

      {/* Decorative border */}
      <div className="absolute inset-4 border border-gold/20 rounded-3xl pointer-events-none" />

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
        <motion.h2
          className="text-4xl md:text-5xl text-gold mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          We Await Your Blessings
        </motion.h2>

        <div
          className="w-32 h-px mx-auto my-6"
          style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
        />

        {/* Animated heart */}
        <motion.div
          className="text-5xl mb-6"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ❤️
        </motion.div>

        {/* Message */}
        <motion.p
          className="text-cream/70 text-sm md:text-base font-poppins leading-relaxed mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Your presence will make our special day even more memorable.
          Please confirm your attendance by clicking the button below.
        </motion.p>

        {/* WhatsApp RSVP button */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-poppins font-semibold text-base shadow-lg transition-all duration-200"
          style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(37, 211, 102, 0.4)" }}
          whileTap={{ scale: 0.97 }}
        >
          <MessageCircle className="w-5 h-5" />
          Confirm Attendance
        </motion.a>

        {/* Sub-text */}
        <motion.p
          className="text-gold/40 text-xs font-poppins mt-6 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Click to send us a WhatsApp message
        </motion.p>

        <div
          className="w-32 h-px mx-auto mt-8"
          style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
        />

        {/* Couple names */}
        <motion.p
          className="text-gold/60 text-sm font-poppins mt-6 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          {groom.firstName} <Heart className="w-3 h-3 text-rose fill-rose" /> {bride.firstName}
        </motion.p>
      </div>
    </section>
  );
}
