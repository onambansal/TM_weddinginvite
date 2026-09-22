"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Calendar, Palette } from "lucide-react";
import { ceremonies } from "@/config/weddingConfig";

/** Vibrant multicolor palette used across the Mehendi & Sangeet card */
const MULTICOLOR_GRADIENT =
  "linear-gradient(135deg, #7C3AED 0%, #EC4899 25%, #F97316 50%, #FACC15 75%, #14B8A6 100%)";

export default function MehendiSangeet() {
  return (
    <section
      id="mehendi-sangeet"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4"
      style={{
        background:
          "linear-gradient(160deg, #6D28D9 0%, #BE185D 30%, #EA580C 55%, #CA8A04 75%, #0F766E 100%)",
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
            borderColor: "rgba(255, 255, 255, 0.7)",
            background: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Card header */}
          <div
            className="py-6 px-6 text-center"
            style={{ background: MULTICOLOR_GRADIENT }}
          >
            <p className="text-white/80 text-xs tracking-[0.3em] uppercase font-poppins mb-1">
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
              className="w-24 h-0.5 mx-auto mb-6 rounded-full"
              style={{ background: MULTICOLOR_GRADIENT }}
            />

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 justify-center">
                <Calendar className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-gray-500 font-poppins uppercase tracking-wider">Date</p>
                  <p className="text-gray-800 text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {ceremonies.mehendiSangeet.date}
                  </p>
                  <p className="text-gray-500 text-xs font-poppins">{ceremonies.mehendiSangeet.day}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center">
                <Clock className="w-4 h-4 text-pink-600 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-gray-500 font-poppins uppercase tracking-wider">Time</p>
                  <p className="text-gray-800 text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {ceremonies.mehendiSangeet.time}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 justify-center">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="text-xs text-gray-500 font-poppins uppercase tracking-wider">Venue</p>
                  <p className="text-gray-800 text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {ceremonies.mehendiSangeet.venue}
                  </p>
                  <p className="text-gray-500 text-sm font-poppins">{ceremonies.mehendiSangeet.address}</p>
                </div>
              </div>

              {/* Theme / Dress code */}
              <div className="flex items-center gap-3 justify-center">
                <Palette className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-gray-500 font-poppins uppercase tracking-wider">Theme / Dress Code</p>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-4 h-4 rounded-full border border-white shadow-sm flex-shrink-0"
                      style={{ background: MULTICOLOR_GRADIENT }}
                      aria-hidden="true"
                    />
                    <p
                      className="font-semibold text-base bg-clip-text text-transparent"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        backgroundImage: MULTICOLOR_GRADIENT,
                      }}
                    >
                      {ceremonies.mehendiSangeet.theme}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div
              className="w-24 h-0.5 mx-auto mt-6 rounded-full"
              style={{ background: MULTICOLOR_GRADIENT }}
            />

            {/* Bottom note */}
            <p className="text-gray-500 text-xs font-poppins italic mt-4">
              {ceremonies.mehendiSangeet.themeNote} Dance the night away! 🎶
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
