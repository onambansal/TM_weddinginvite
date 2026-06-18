"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Calendar } from "lucide-react";
import { ceremonies, groom } from "@/config/weddingConfig";

export default function GhurChariSection() {
  return (
    <section
      id="ghurchari"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4"
      style={{
        background: "linear-gradient(160deg, #2C1810 0%, #4A1A08 40%, #6B2E0A 70%, #2C1810 100%)",
      }}
    >
      {/* Animated festive lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 5 + (i % 3) * 2,
              height: 5 + (i % 3) * 2,
              background: ["#C9A84C", "#E8C97A", "#FF6B35", "#FFD700", "#FF4500"][i % 5],
              left: `${(i * 5.2) % 100}%`,
              top: `${(i * 6.8) % 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.5, 0.8],
            }}
            transition={{
              duration: 1.5 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Decorative border */}
      <div
        className="absolute inset-4 rounded-3xl pointer-events-none"
        style={{ border: "1px solid rgba(201, 168, 76, 0.2)" }}
      />

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 text-3xl opacity-40" style={{ color: "#C9A84C" }}>🐴</div>
      <div className="absolute top-6 right-6 text-3xl opacity-40" style={{ color: "#C9A84C" }}>🥁</div>
      <div className="absolute bottom-6 left-6 text-3xl opacity-40" style={{ color: "#C9A84C" }}>🎺</div>
      <div className="absolute bottom-6 right-6 text-3xl opacity-40" style={{ color: "#C9A84C" }}>✦</div>

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
          className="absolute -inset-1 rounded-3xl opacity-40 blur-sm"
          style={{ background: "linear-gradient(135deg, #C9A84C, #E8C97A, #C9A84C)" }}
        />

        <div
          className="relative rounded-3xl overflow-hidden border-2"
          style={{
            borderColor: "rgba(201, 168, 76, 0.5)",
            background: "linear-gradient(160deg, #1a0a05, #2C1810)",
          }}
        >
          {/* Card header */}
          <div
            className="py-6 px-6 text-center"
            style={{ background: "linear-gradient(135deg, #8B4513, #A0522D, #8B4513)" }}
          >
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-poppins mb-1">
              ✦ The Grand Procession ✦
            </p>
            <h2
              className="text-3xl md:text-4xl text-gold-light"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Ghur Chari
            </h2>
            <p
              className="text-gold/70 text-sm mt-1"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}
            >
              घुड़चढ़ी
            </p>
          </div>

          {/* Card body */}
          <div className="py-8 px-8 text-center">
            {/* Animated emoji */}
            <motion.div
              className="text-5xl mb-4"
              animate={{ x: [0, 10, 0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🐴
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
                {groom.firstName}
              </p>
            </motion.div>

            {/* Divider */}
            <div
              className="w-24 h-px mx-auto my-5"
              style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
            />

            {/* Description */}
            <p
              className="text-xs italic mb-5 leading-relaxed"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "rgba(201, 168, 76, 0.7)" }}
            >
              The groom arrives in grand style — accompanied by the joyous Baraat, music and dance!
            </p>

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 justify-center">
                <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-gold/50 font-poppins uppercase tracking-wider">Date</p>
                  <p className="text-cream text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {ceremonies.ghurChari.date}
                  </p>
                  <p className="text-cream/50 text-xs font-poppins">{ceremonies.ghurChari.day}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-gold/50 font-poppins uppercase tracking-wider">Time</p>
                  <p className="text-cream text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {ceremonies.ghurChari.time}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 justify-center">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="text-xs text-gold/50 font-poppins uppercase tracking-wider">Venue</p>
                  <p className="text-cream text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {ceremonies.ghurChari.venue}
                  </p>
                  <p className="text-cream/60 text-sm font-poppins">{ceremonies.ghurChari.address}</p>
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
              Come celebrate the groom&apos;s grand arrival! 🎺
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
