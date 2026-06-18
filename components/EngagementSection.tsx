"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Calendar } from "lucide-react";
import { ceremonies } from "@/config/weddingConfig";

export default function EngagementSection() {
  return (
    <section
      id="engagement"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4"
      style={{
        background: "linear-gradient(160deg, #FFFDF7 0%, #FFF8E8 40%, #FFF0D0 100%)",
      }}
    >
      {/* Animated golden sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 4 + (i % 3) * 2,
              height: 4 + (i % 3) * 2,
              background: "#C9A84C",
              left: `${(i * 5.8) % 100}%`,
              top: `${(i * 7.3) % 100}%`,
              opacity: 0.3,
            }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: 2 + (i % 3),
              repeat: Infinity,
              delay: i * 0.25,
            }}
          />
        ))}
      </div>

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 text-3xl opacity-30" style={{ color: "#C9A84C" }}>💍</div>
      <div className="absolute top-6 right-6 text-3xl opacity-30" style={{ color: "#C9A84C" }}>💍</div>
      <div className="absolute bottom-6 left-6 text-3xl opacity-30" style={{ color: "#C9A84C" }}>✦</div>
      <div className="absolute bottom-6 right-6 text-3xl opacity-30" style={{ color: "#C9A84C" }}>✦</div>

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
            borderColor: "rgba(201, 168, 76, 0.5)",
            background: "rgba(255, 253, 247, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Card header */}
          <div
            className="py-6 px-6 text-center"
            style={{ background: "linear-gradient(135deg, #C9A84C, #E8C97A, #C9A84C)" }}
          >
            <p className="text-maroon text-xs tracking-[0.3em] uppercase font-poppins mb-1">
              ✦ First Ceremony ✦
            </p>
            <h2
              className="text-3xl md:text-4xl text-maroon"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Engagement
            </h2>
            <p
              className="text-maroon/70 text-sm mt-1"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}
            >
              सगाई
            </p>
          </div>

          {/* Card body */}
          <div className="py-8 px-8 text-center">
            {/* Animated emoji */}
            <motion.div
              className="text-5xl mb-6"
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              💍
            </motion.div>

            {/* Divider */}
            <div
              className="w-24 h-px mx-auto mb-6"
              style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
            />

            {/* Description */}
            <p
              className="text-sm italic mb-6 leading-relaxed"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#5C3D2E" }}
            >
              The sacred beginning of our journey together — as we exchange rings and pledge our hearts to one another.
            </p>

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 justify-center">
                <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: "#C9A84C" }} />
                <div className="text-left">
                  <p className="text-xs text-gray-500 font-poppins uppercase tracking-wider">Date</p>
                  <p className="text-gray-800 text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {ceremonies.engagement.date}
                  </p>
                  <p className="text-gray-500 text-xs font-poppins">{ceremonies.engagement.day}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center">
                <Clock className="w-4 h-4 flex-shrink-0" style={{ color: "#C9A84C" }} />
                <div className="text-left">
                  <p className="text-xs text-gray-500 font-poppins uppercase tracking-wider">Time</p>
                  <p className="text-gray-800 text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {ceremonies.engagement.time}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 justify-center">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: "#C9A84C" }} />
                <div className="text-left">
                  <p className="text-xs text-gray-500 font-poppins uppercase tracking-wider">Venue</p>
                  <p className="text-gray-800 text-base" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {ceremonies.engagement.venue}
                  </p>
                  <p className="text-gray-500 text-sm font-poppins">{ceremonies.engagement.address}</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div
              className="w-24 h-px mx-auto mt-6"
              style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
            />

            {/* Bottom note */}
            <p className="text-gray-500 text-xs font-poppins italic mt-4">
              Join us as we begin our forever 💍
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
