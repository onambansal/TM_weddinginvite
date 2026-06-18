"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Calendar } from "lucide-react";
import { ceremonies } from "@/config/weddingConfig";

export default function HaldiSection() {
  return (
    <section
      id="haldi"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4"
      style={{
        background: "linear-gradient(160deg, #FFF3B0 0%, #FFE066 30%, #F5C518 60%, #E6A817 100%)",
      }}
    >
      {/* Animated turmeric background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: 150 + i * 60,
              height: 150 + i * 60,
              background: "radial-gradient(circle, #F5C518, #E6A817)",
              left: `${(i * 20) % 100}%`,
              top: `${(i * 30) % 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Decorative marigold flowers */}
      <div className="absolute top-8 left-8 text-4xl opacity-40">🌼</div>
      <div className="absolute top-8 right-8 text-4xl opacity-40">🌼</div>
      <div className="absolute bottom-8 left-8 text-4xl opacity-40">🌻</div>
      <div className="absolute bottom-8 right-8 text-4xl opacity-40">🌻</div>

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
            borderColor: "rgba(230, 168, 23, 0.6)",
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Card header */}
          <div
            className="py-6 px-6 text-center"
            style={{ background: "linear-gradient(135deg, #F5C518, #E6A817)" }}
          >
            <p className="text-white/80 text-xs tracking-[0.3em] uppercase font-poppins mb-1">
              ✦ Ceremony ✦
            </p>
            <h2
              className="text-3xl md:text-4xl text-white"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Haldi Ceremony
            </h2>
          </div>

          {/* Card body */}
          <div className="py-8 px-8 text-center">
            {/* Emoji */}
            <motion.div
              className="text-5xl mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🌿
            </motion.div>

            {/* Divider */}
            <div
              className="w-24 h-px mx-auto mb-6"
              style={{ background: "linear-gradient(90deg, transparent, #F5C518, transparent)" }}
            />

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 justify-center">
                <Calendar className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-gray-500 font-poppins uppercase tracking-wider">Date</p>
                   <p className="text-gray-800 font-playfair text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {ceremonies.haldi.date}
                  </p>
                  <p className="text-gray-500 text-xs font-poppins">{ceremonies.haldi.day}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center">
                <Clock className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-gray-500 font-poppins uppercase tracking-wider">Time</p>
                  <p className="text-gray-800 font-playfair text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {ceremonies.haldi.time}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 justify-center">
                <MapPin className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="text-xs text-gray-500 font-poppins uppercase tracking-wider">Venue</p>
                  <p className="text-gray-800 font-playfair text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {ceremonies.haldi.venue}
                  </p>
                  <p className="text-gray-500 text-sm font-poppins">{ceremonies.haldi.address}</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div
              className="w-24 h-px mx-auto mt-6"
              style={{ background: "linear-gradient(90deg, transparent, #F5C518, transparent)" }}
            />

            {/* Bottom note */}
            <p className="text-gray-500 text-xs font-poppins italic mt-4">
              Come dressed in yellow & bring your blessings 🌼
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
