"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { gallery } from "@/config/weddingConfig";
import SectionDivider from "./SectionDivider";
import CornerOrnament from "./CornerOrnament";
import Heading from "./Heading";
import Mandala from "./Mandala";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const serif = "var(--font-cormorant), var(--font-playfair), Georgia, serif";

/**
 * Single gallery section: a slow fade carousel of featured moments,
 * followed by a tappable masonry grid with lightbox.
 */
export default function PhotoMemories() {
  const [selected, setSelected] = useState<number | null>(null);
  const photos = gallery.map((p, i) => ({ id: i + 1, ...p }));
  const selectedPhoto = selected !== null ? photos.find((p) => p.id === selected) : undefined;

  return (
    <section
      id="memories"
      className="relative py-24 px-4 overflow-hidden paper-grain vignette"
      style={{ background: "linear-gradient(180deg, #FFF8F0 0%, #F5EDE0 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 30% 30%, #C9A84C 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      <Mandala size={1100} opacity={0.09} spin={170} />
      <CornerOrnament color="#C9A84C" opacity={0.35} />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold text-[0.7rem] tracking-[0.4em] uppercase font-poppins mb-3">✦ A Glimpse of Our Journey ✦</p>
          <Heading>Our Beautiful Moments</Heading>
          <SectionDivider color="#C9A84C" width={200} className="my-5" />
          <p className="text-maroon/60 italic" style={{ fontFamily: serif, fontSize: "1.05rem" }}>
            Cherished memories that led us to this beautiful day
          </p>
        </motion.div>

        {/* Featured carousel */}
        <motion.div
          className="relative mb-12"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {["-top-2 -left-2 border-t border-l", "-top-2 -right-2 border-t border-r", "-bottom-2 -left-2 border-b border-l", "-bottom-2 -right-2 border-b border-r"].map((c) => (
            <div key={c} className={`absolute ${c} w-8 h-8 z-10 pointer-events-none border-gold`} />
          ))}
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            speed={1400}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="rounded-2xl overflow-hidden shadow-luxury"
            style={{ border: "1px solid rgba(201,168,76,0.35)" }}
          >
            {photos.slice(0, 5).map((photo, i, arr) => (
              <SwiperSlide key={photo.id}>
                <div className="relative" style={{ aspectRatio: "16/10" }}>
                  <Image src={photo.src} alt={photo.caption} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(42,6,8,0.8) 100%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 pt-3 text-center">
                    {/* Editorial hairline + index */}
                    <div className="mx-auto mb-2 h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />
                    <p className="text-[0.6rem] font-poppins tracking-[0.35em] uppercase mb-1 nums-oldstyle" style={{ color: "rgba(232,201,122,0.8)" }}>
                      {String(i + 1).padStart(2, "0")} / {String(arr.length).padStart(2, "0")}
                    </p>
                    <p className="text-cream italic" style={{ fontFamily: serif, fontSize: "1.15rem" }}>
                      {photo.caption}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Masonry grid */}
        <p className="text-center text-maroon/50 text-xs font-poppins tracking-[0.3em] uppercase mb-5">Tap any photo to view</p>
        <div className="columns-2 md:columns-3 gap-4">
          {photos.map((photo, i) => (
            <motion.button
              type="button"
              key={photo.id}
              className="relative group overflow-hidden rounded-2xl border border-gold/30 cursor-pointer break-inside-avoid mb-4 w-full text-left"
              style={{ boxShadow: "0 10px 30px rgba(201,168,76,0.18)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -3 }}
              onClick={() => setSelected(photo.id)}
              aria-label={`View photo: ${photo.caption}`}
            >
              <div className="relative w-full" style={{ aspectRatio: i % 3 === 0 ? "3/4" : "4/3" }}>
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  sizes="(max-width: 768px) 50vw, 256px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                <div className="flex items-center gap-2 text-cream text-xs font-poppins">
                  <ZoomIn className="w-4 h-4" />
                  <span>{photo.caption}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <p className="text-center text-gold text-xl tracking-widest mt-8">✦ ❧ ✦</p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{ background: "rgba(20,4,6,0.92)", backdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-w-lg w-full"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "4/5", boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.6)" }}>
                <Image src={selectedPhoto.src} alt={selectedPhoto.caption} fill sizes="512px" className="object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-cream text-center italic" style={{ fontFamily: serif, fontSize: "1.1rem" }}>
                    {selectedPhoto.caption}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-maroon text-gold rounded-full flex items-center justify-center border border-gold/50"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .swiper-pagination-bullet { background: #C9A84C !important; opacity: 0.4; }
        .swiper-pagination-bullet-active { opacity: 1; }
      `}</style>
    </section>
  );
}
