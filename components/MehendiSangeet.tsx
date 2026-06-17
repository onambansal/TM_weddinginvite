"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Calendar } from "lucide-react";

export default function MehendiSangeet() {
  return (
    <section
      id="mehendi-sangeet"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4"
      style={{
        background: "linear-gradient(160deg, #1B4332 0%, #2D6A4F 40%, #40916C 70%, #1B4332 100%)",
      }}
    >
      {/* Animated festive lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 6 + (i % 4) * 3,
              height: 6 + (i % 4) * 3,
              background: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A"][i % 5],
              left: `${(i * 5.5) % 100}%`,
              top: `${(i * 7) % 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 1.5 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Decorative mehendi patterns */}
      <div className="absolute top-6 left-6 text-4xl opacity-30">🌿</div>
      <div className="absolute top-6 right-6 text-4xl opacity-30">🌿</div>
      <div className="absolute bottom-6 left-6 text-3xl opacity-30">🥁</div>
      <div className="absolute bottom-6 right-6 text-3xl opacity-30">🎶</div>

      {/* Card */}
      <motion.div
        className="relative z-10 max-w-sm w-full mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div
          className="rounded-3xl overflow-hidden shadow-luxury border-2"
          style={{
            borderColor: "rgba(64, 145, 108, 0.6)",
            background: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Card header */}
          <div
            className="py-6 px-6 text-center"
            style={{ background: "linear-gradient(135deg, #2D6A4F, #40916C)" }}
          >
            <p className="text-white/70 text-xs tracking-[0.3em] uppercase font-poppins mb-1">
              ✦ Celebration ✦
            </p>
            <h2
              className="text-3xl md:text-4xl text-white"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Mehendi &amp; Sangeet
            </h2>
          </div>

          {/* Card body */}
          <div className="py-8 px-8 text-center">
            {/* Animated emoji */}
            <motion.div
              className="text-5xl mb-6"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎉
            </motion.div>

            {/* Divider */}
            <div
              className="w-24 h-px mx-auto mb-6"
              style={{ background: "linear-gradient(90deg, transparent, #2D6A4F, transparent)" }}
            />

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 justify-center">
                <Calendar className="w-4 h-4 text-green-700 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-gray-500 font-poppins uppercase tracking-wider">Date</p>
                  <p className="text-gray-800 text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    3rd December 2026
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center">
                <Clock className="w-4 h-4 text-green-700 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-gray-500 font-poppins uppercase tracking-wider">Time</p>
                  <p className="text-gray-800 text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    6:00 PM onwards
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 justify-center">
                <MapPin className="w-4 h-4 text-green-700 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="text-xs text-gray-500 font-poppins uppercase tracking-wider">Venue</p>
                  <p className="text-gray-800 text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    Vaishali Inn
                  </p>
                  <p className="text-gray-500 text-sm font-poppins">Vaishali, Ghaziabad</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div
              className="w-24 h-px mx-auto mt-6"
              style={{ background: "linear-gradient(90deg, transparent, #2D6A4F, transparent)" }}
            />

            {/* Bottom note */}
            <p className="text-gray-500 text-xs font-poppins italic mt-4">
              Dress in festive colours &amp; dance the night away! 🎶
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
