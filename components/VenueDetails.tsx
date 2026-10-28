"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Calendar } from "lucide-react";
import { venues, ceremonies } from "@/config/weddingConfig";
import SectionDivider from "./SectionDivider";
import CornerOrnament from "./CornerOrnament";
import Heading from "./Heading";
import Mandala from "./Mandala";
import Motif, { type MotifName } from "./Motif";

const serif = "var(--font-cormorant), var(--font-playfair), Georgia, serif";

/** Chronological timeline strip derived from the ceremonies config */
const TIMELINE = [
  ceremonies.engagement,
  ceremonies.mehendiSangeet,
  ceremonies.haldi,
  ceremonies.ghurChari,
  ceremonies.wedding,
].map((c) => ({
  title: c.title,
  date: c.date.replace(/\s\d{4}$/, ""), // drop the year for compactness
  time: c.time.replace(/\s*onwards/i, ""),
  venue: c.venue,
}));

export default function VenueDetails() {
  return (
    <section
      id="venues"
      className="relative py-24 px-4 overflow-hidden paper-grain vignette"
      style={{ background: "linear-gradient(180deg, #FFF8F0 0%, #F5EDE0 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 30% 30%, #C9A84C 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      <Mandala size={1100} opacity={0.09} spin={170} />
      <CornerOrnament color="#C9A84C" opacity={0.35} />

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <motion.p
          className="text-gold text-[0.7rem] tracking-[0.4em] uppercase font-poppins mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          ✦ Find Your Way ✦
        </motion.p>
        <Heading delay={0.1}>Venue Details</Heading>
        <SectionDivider color="#C9A84C" width={200} className="my-5" />
        <motion.p
          className="text-maroon/60 italic"
          style={{ fontFamily: serif, fontSize: "1.05rem" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          We look forward to welcoming you
        </motion.p>
      </div>

      {/* Timeline strip */}
      <motion.div
        className="max-w-2xl mx-auto mb-12 relative z-10 rounded-3xl px-5 py-6 gold-inset"
        style={{ background: "rgba(255,253,247,0.85)", boxShadow: "0 16px 50px rgba(201,168,76,0.15)" }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-center text-[0.65rem] tracking-[0.35em] uppercase font-poppins text-gold mb-5">Celebration Timeline</p>
        <ol className="relative">
          <span className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: "linear-gradient(180deg, transparent, #C9A84C 15%, #C9A84C 85%, transparent)" }} />
          {TIMELINE.map((t, i) => (
            <motion.li
              key={t.title}
              className="relative pl-8 py-2.5 flex items-baseline justify-between gap-3"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
            >
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[15px] h-[15px] rounded-full" style={{ background: "#FFFDF7", boxShadow: "0 0 0 1.5px #C9A84C" }}>
                <span className="absolute inset-[4px] rounded-full" style={{ background: "#C9A84C" }} />
              </span>
              <div className="min-w-0">
                <p className="text-maroon leading-tight truncate" style={{ fontFamily: serif, fontSize: "1.1rem", fontWeight: 600 }}>{t.title}</p>
                <p className="text-xs font-poppins text-maroon/55 truncate">{t.venue}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-maroon/80 text-sm leading-tight" style={{ fontFamily: serif, fontWeight: 600 }}>{t.date}</p>
                <p className="text-[0.7rem] font-poppins text-gold-dark tracking-wide">{t.time}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </motion.div>

      {/* Venue cards */}
      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        {venues.map((venue, i) => (
          <motion.div
            key={venue.id}
            className="rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,253,247,0.95)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.10), 0 0 0 1px rgba(201,168,76,0.45), inset 0 0 0 1px rgba(201,168,76,0.2)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            whileHover={{ y: -4, boxShadow: "0 28px 70px rgba(201,168,76,0.22), 0 0 0 1px rgba(201,168,76,0.6)" }}
          >
            {/* Card header */}
            <div
              className="relative py-5 px-6 flex items-center gap-4"
              style={{ background: `linear-gradient(135deg, ${venue.color} 0%, ${venue.color}D9 100%)` }}
            >
              <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.9), transparent)" }} />
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,253,247,0.12)", boxShadow: "inset 0 0 0 1px rgba(232,201,122,0.6)" }}
              >
                <Motif name={venue.motif as MotifName} size={34} color="#E8C97A" />
              </div>
              <div className="min-w-0">
                <h3 className="text-2xl text-cream leading-tight" style={{ fontFamily: serif, fontWeight: 600 }}>
                  {venue.name}
                </h3>
                <p className="text-cream/75 text-xs font-poppins flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" />
                  {venue.address}
                </p>
              </div>
            </div>

            {/* Card body */}
            <div className="py-5 px-6">
              <p className="text-[0.65rem] text-gold font-poppins uppercase tracking-[0.3em] mb-2">Events</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {venue.events.map((event) => (
                  <span
                    key={event}
                    className="text-xs font-poppins px-3 py-1 rounded-full"
                    style={{ color: venue.color, background: `${venue.color}10`, boxShadow: `inset 0 0 0 1px ${venue.color}40` }}
                  >
                    {event}
                  </span>
                ))}
              </div>

              <p className="text-maroon/70 text-sm flex items-center gap-2 mb-5" style={{ fontFamily: serif, fontSize: "1.05rem" }}>
                <Calendar className="w-4 h-4 text-gold" />
                {venue.dates}
              </p>

              <div className="flex gap-3">
                <a
                  href={venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-poppins uppercase tracking-[0.15em] transition-opacity duration-200 hover:opacity-90"
                  style={{ background: venue.color, color: "#FFFDF7" }}
                >
                  <MapPin className="w-4 h-4" />
                  Google Maps
                </a>
                <a
                  href={venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-poppins uppercase tracking-[0.15em] transition-opacity duration-200 hover:opacity-80"
                  style={{ color: venue.color, boxShadow: `inset 0 0 0 1px ${venue.color}55` }}
                >
                  <Navigation className="w-4 h-4" />
                  Navigate
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <SectionDivider color="#C9A84C" width={160} className="mt-12 relative z-10" />
    </section>
  );
}
