"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { venues } from "@/config/weddingConfig";

export default function VenueDetails() {
  return (
    <section
      id="venues"
      className="relative py-20 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFF8F0 0%, #F5EDE0 100%)" }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 30%, #C9A84C 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Section header */}
      <div className="text-center mb-14 relative z-10">
        <motion.p
          className="text-gold text-xs tracking-[0.4em] uppercase font-poppins mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          ✦ Find Your Way ✦
        </motion.p>
        <motion.h2
          className="text-4xl md:text-5xl text-maroon mb-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Venue Details
        </motion.h2>
        <div className="gold-divider my-4" />
        <motion.p
          className="text-maroon/60 text-sm font-poppins"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          We look forward to welcoming you
        </motion.p>
      </div>

      {/* Venue cards */}
      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        {venues.map((venue, i) => (
          <motion.div
            key={venue.id}
            className="rounded-3xl overflow-hidden shadow-luxury border border-gold/20"
            style={{ background: "rgba(255, 253, 247, 0.95)" }}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(201,168,76,0.2)" }}
          >
            {/* Card header */}
            <div
              className="py-5 px-6 flex items-center gap-4"
              style={{ background: `linear-gradient(135deg, ${venue.color}, ${venue.color}CC)` }}
            >
              <span className="text-3xl">{venue.emoji}</span>
              <div>
                <h3
                  className="text-xl text-white"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {venue.name}
                </h3>
                <p className="text-white/70 text-sm font-poppins flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" />
                  {venue.address}
                </p>
              </div>
            </div>

            {/* Card body */}
            <div className="py-5 px-6">
              {/* Events */}
              <div className="mb-4">
                <p className="text-xs text-gold font-poppins uppercase tracking-wider mb-2">Events</p>
                <div className="flex flex-wrap gap-2">
                  {venue.events.map((event) => (
                    <span
                      key={event}
                      className="text-xs font-poppins px-3 py-1 rounded-full border"
                      style={{
                        borderColor: venue.color + "40",
                        color: venue.color,
                        background: venue.color + "10",
                      }}
                    >
                      {event}
                    </span>
                  ))}
                </div>
              </div>

              {/* Date */}
              <p className="text-maroon/60 text-sm font-poppins mb-5">
                📅 {venue.dates}
              </p>

              {/* Action buttons */}
              <div className="flex gap-3">
                <a
                  href={venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-poppins font-medium transition-all duration-200 hover:opacity-90"
                  style={{ background: venue.color, color: "white" }}
                >
                  <MapPin className="w-4 h-4" />
                  Google Maps
                </a>
                <a
                  href={venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-poppins font-medium border transition-all duration-200 hover:opacity-80"
                  style={{ borderColor: venue.color + "40", color: venue.color }}
                >
                  <Navigation className="w-4 h-4" />
                  Navigate
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom ornament */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-gold text-xl tracking-widest">✦ ❧ ✦</p>
      </motion.div>
    </section>
  );
}
