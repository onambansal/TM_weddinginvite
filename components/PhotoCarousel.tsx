"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
    caption: "A love story written in the stars",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    caption: "Every moment with you is a treasure",
  },
  {
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
    caption: "Together is our favourite place to be",
  },
  {
    src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80",
    caption: "You are my today and all of my tomorrows",
  },
  {
    src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80",
    caption: "In your arms I have found my home",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    caption: "You complete me",
  },
];

export default function PhotoCarousel() {
  return (
    <section
      id="photos"
      className="relative py-20 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F5EDE0 0%, #FFF8F0 100%)" }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 30%, #C9A84C 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Section heading */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-poppins mb-3">
            ✦ A Glimpse of Our Journey ✦
          </p>
          <h2
            className="text-4xl md:text-5xl text-maroon mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Our Beautiful Moments
          </h2>
          <div className="gold-divider my-4" />
          <p className="text-maroon/60 text-sm font-poppins italic">
            Cherished memories that led us to this beautiful day
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Decorative frame corners */}
          <div
            className="absolute -top-2 -left-2 w-8 h-8 z-10 pointer-events-none"
            style={{ borderTop: "2px solid #C9A84C", borderLeft: "2px solid #C9A84C" }}
          />
          <div
            className="absolute -top-2 -right-2 w-8 h-8 z-10 pointer-events-none"
            style={{ borderTop: "2px solid #C9A84C", borderRight: "2px solid #C9A84C" }}
          />
          <div
            className="absolute -bottom-2 -left-2 w-8 h-8 z-10 pointer-events-none"
            style={{ borderBottom: "2px solid #C9A84C", borderLeft: "2px solid #C9A84C" }}
          />
          <div
            className="absolute -bottom-2 -right-2 w-8 h-8 z-10 pointer-events-none"
            style={{ borderBottom: "2px solid #C9A84C", borderRight: "2px solid #C9A84C" }}
          />

          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            effect="fade"
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            loop
            className="rounded-2xl overflow-hidden shadow-luxury"
            style={{ border: "1px solid rgba(201, 168, 76, 0.3)" }}
          >
            {photos.map((photo, i) => (
              <SwiperSlide key={i}>
                <div className="relative" style={{ aspectRatio: "16/9" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(74, 10, 18, 0.7) 100%)" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <p
                      className="text-cream text-sm md:text-base italic"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {photo.caption}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Footer note */}
        <motion.p
          className="text-center text-maroon/50 text-sm font-poppins italic mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          ❧ Mansi &amp; Tanuj ❧
        </motion.p>
      </div>

      {/* Swiper custom styles */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #C9A84C !important;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #C9A84C !important;
        }
      `}</style>
    </section>
  );
}
