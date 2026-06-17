"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const photos = [
  { id: 1, src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80", caption: "Our first meeting" },
  { id: 2, src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", caption: "A love story begins" },
  { id: 3, src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80", caption: "Together always" },
  { id: 4, src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80", caption: "Our favourite moments" },
  { id: 5, src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80", caption: "Forever in your arms" },
  { id: 6, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", caption: "You complete me" },
  { id: 7, src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80", caption: "Our journey together" },
  { id: 8, src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80", caption: "Cherished memories" },
  { id: 9, src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80", caption: "Two hearts, one soul" },
  { id: 10, src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80", caption: "Our beautiful story" },
];

export default function PhotoMemories() {
  const [selected, setSelected] = useState<number | null>(null);

  const selectedPhoto = photos.find((p) => p.id === selected);

  return (
    <section
      id="memories"
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
          ✦ Photo Memories ✦
        </motion.p>
        <motion.h2
          className="text-4xl md:text-5xl text-maroon mb-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Beautiful Moments
        </motion.h2>
        <div className="gold-divider my-4" />
        <motion.p
          className="text-maroon/60 text-sm font-poppins"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Tap any photo to view it
        </motion.p>
      </div>

      {/* Masonry-style grid */}
      <div className="max-w-4xl mx-auto columns-2 md:columns-3 gap-4 space-y-4">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            className="relative group overflow-hidden rounded-2xl shadow-gold border border-gold/20 cursor-pointer break-inside-avoid mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelected(photo.id)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
              style={{ aspectRatio: i % 3 === 0 ? "3/4" : "4/3" }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-maroon/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
              <div className="flex items-center gap-2 text-cream text-xs font-poppins">
                <ZoomIn className="w-4 h-4" />
                <span>{photo.caption}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-w-lg w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.caption}
                className="w-full rounded-2xl shadow-luxury"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl">
                <p className="text-cream text-sm font-poppins text-center">{selectedPhoto.caption}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-maroon text-gold rounded-full flex items-center justify-center shadow-maroon border border-gold/30"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
