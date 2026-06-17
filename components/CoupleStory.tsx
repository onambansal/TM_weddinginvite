"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const photos = [
  { id: 1, src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80", caption: "Our first meeting" },
  { id: 2, src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", caption: "A love story begins" },
  { id: 3, src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80", caption: "Together always" },
  { id: 4, src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80", caption: "Our favourite moments" },
  { id: 5, src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80", caption: "Forever in your arms" },
  { id: 6, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80", caption: "You complete me" },
  { id: 7, src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80", caption: "Our journey together" },
  { id: 8, src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80", caption: "Cherished memories" },
  { id: 9, src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80", caption: "Two hearts, one soul" },
  { id: 10, src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80", caption: "Our beautiful story" },
];

export default function CoupleStory() {
  return (
    <section
      id="couple-story"
      className="relative py-20 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F5EDE0 0%, #FFF8F0 100%)" }}
    >
      {/* Section header */}
      <div className="text-center mb-14">
        <motion.p
          className="text-gold text-xs tracking-[0.4em] uppercase font-poppins mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          ✦ A Glimpse of Our Journey ✦
        </motion.p>
        <motion.h2
          className="text-4xl md:text-5xl text-maroon mb-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Our Love Story
        </motion.h2>
        <div className="gold-divider my-4" />
        <motion.p
          className="text-maroon/60 text-sm font-poppins"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Moments that led us to forever
        </motion.p>
      </div>

      {/* Photo grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            className="relative group overflow-hidden rounded-2xl shadow-gold border border-gold/20"
            style={{ aspectRatio: i % 5 === 0 ? "1/1.3" : "1/1" }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.07 }}
            whileHover={{ scale: 1.03 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-maroon/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-cream text-xs font-poppins text-center">{photo.caption}</p>
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
        transition={{ delay: 0.5 }}
      >
        <p className="text-gold text-2xl tracking-widest">✦ ❧ ✦</p>
        <p className="text-maroon/50 text-sm font-poppins italic mt-2">Mansi &amp; Tanuj</p>
      </motion.div>
    </section>
  );
}
