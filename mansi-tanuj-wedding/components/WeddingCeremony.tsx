"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Calendar, Star } from "lucide-react";

export default function WeddingCeremony() {
  return (
    <section
      id="wedding"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4"
      style={{
        background: "linear-gradient(160deg, #2C0A0A 0%, #4A0A12 30%, #6B0F1A 60%, #2C0A0A 100%)",
      }}
    >
      {/* Golden particle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              background: "#C9A84C",
              borderRadius: "50%",
              left: `${(i * 4.2) % 100}%`,
              top: `${(i * 5.1) % 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Decorative border */}
      <div className="absolute inset-4 border border-gold/20 rounded-3xl pointer-events-none" />

      {/* Corner stars */}
      {["top-6 left-6", "top-6 right-6", "bottom-6 left-6", "bottom-6 right-6"].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} text-gold/40 text-xl`}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          ✦
        </motion.div>
      ))}

      {/* Card */}
      <motion.div
        className="relative z-10 max-w-sm w-full mx-auto"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, type: "spring" }}
      >
        {/* Outer glow */}
        <div
          className="absolute -inset-1 rounded-3xl opacity-50 blur-sm"
          style={{ background: "linear-gradient(135deg, #C9A84C, #E8C97A, #C9A84C)" }}
        />

        <div
          className="relative rounded-3xl overflow-hidden border-2"
          style={{
            borderColor: "rgba(201, 168, 76, 0.5)",
            background: "linear-gradient(160deg, #1a0505, #2C0A0A)",
          }}
        >
          {/* Card header with gold gradient */}
          <div
            className="py-6 px-6 text-center"
            style={{ background: "linear-gradient(135deg, #C9A84C, #E8C97A, #C9A84C)" }}
          >
            <p className="text-maroon text-xs tracking-[0.3em] uppercase font-poppins mb-1">
              ✦ The Grand Celebration ✦
            </p>
            <h2
              className="text-3xl md:text-4xl text-maroon"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Wedding Ceremony
            </h2>
          </div>

          {/* Card body */}
          <div className="py-8 px-8 text-center">
            {/* Mandap illustration */}
            <motion.div
              className="text-5xl mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🛕
            </motion.div>

            {/* Couple names */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p
                className="text-2xl text-gold"
                style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2rem" }}
              >
                Mansi
              </p>
              <p className="text-gold/60 text-lg font-playfair italic my-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                &amp;
              </p>
              <p
                className="text-2xl text-gold"
                style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2rem" }}
              >
                Tanuj
              </p>
            </motion.div>

            {/* Divider */}
            <div
              className="w-24 h-px mx-auto my-6"
              style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
            />

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 justify-center">
                <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-gold/50 font-poppins uppercase tracking-wider">Date</p>
                  <p className="text-cream text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    5th December 2026
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-gold/50 font-poppins uppercase tracking-wider">Time</p>
                  <p className="text-cream text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    7:00 PM onwards
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 justify-center">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="text-xs text-gold/50 font-poppins uppercase tracking-wider">Venue</p>
                  <p className="text-cream text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    Wedding Crown
                  </p>
                  <p className="text-cream/60 text-sm font-poppins">Sector 76, Noida</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div
              className="w-24 h-px mx-auto mt-6"
              style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
            />

            {/* Bottom note */}
            <p className="text-gold/50 text-xs font-poppins italic mt-4">
              Join us as we begin our forever ✨
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
