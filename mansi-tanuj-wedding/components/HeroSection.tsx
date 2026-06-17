"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { bride, groom } from "@/config/weddingConfig";

export default function HeroSection() {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    setTimeout(() => {
      document.getElementById("save-the-date")?.scrollIntoView({ behavior: "smooth" });
    }, 800);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-mandala"
      style={{
        background: "linear-gradient(160deg, #4A0A12 0%, #6B0F1A 40%, #8B1A2A 70%, #4A0A12 100%)",
      }}
    >
      {/* Golden particle dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gold/30"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Decorative floral border corners */}
      <div className="absolute inset-4 md:inset-8 border border-gold/30 rounded-3xl pointer-events-none" />
      <div className="absolute inset-6 md:inset-10 border border-gold/15 rounded-3xl pointer-events-none" />

      {/* Corner ornaments */}
      {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} text-gold/60 text-2xl md:text-3xl pointer-events-none`}
          style={{ transform: i === 1 ? "scaleX(-1)" : i === 2 ? "scaleY(-1)" : i === 3 ? "scale(-1)" : "none" }}
        >
          ✦
        </div>
      ))}

      {/* Main content */}
      <motion.div
        className="relative z-20 text-center px-6 max-w-lg mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Ganesh shloka */}
        <motion.p
          className="text-gold/80 text-sm md:text-base font-playfair italic mb-6 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          ॥ श्री गणेशाय नमः ॥
        </motion.p>

        {/* Gold divider */}
        <div className="gold-divider mb-6" />

        {/* Together with families */}
        <motion.p
          className="text-cream/70 text-xs md:text-sm font-poppins tracking-[0.3em] uppercase mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Together with their families
        </motion.p>

        {/* Bride name */}
        <motion.h1
          className="font-script text-5xl md:text-7xl text-gold-light mb-2"
          style={{ fontFamily: "'Great Vibes', cursive" }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {bride.fullName}
        </motion.h1>

        {/* Ampersand */}
        <motion.p
          className="text-gold text-3xl md:text-4xl font-playfair italic my-3"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          &amp;
        </motion.p>

        {/* Groom name */}
        <motion.h1
          className="font-script text-5xl md:text-7xl text-gold-light mb-6"
          style={{ fontFamily: "'Great Vibes', cursive" }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          {groom.fullName}
        </motion.h1>

        {/* Gold divider */}
        <div className="gold-divider my-6" />

        {/* Tagline */}
        <motion.p
          className="text-cream/60 text-xs md:text-sm font-poppins italic tracking-widest mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
        >
          &ldquo;Two hearts, one beautiful journey&rdquo;
        </motion.p>

        {/* Request text */}
        <motion.p
          className="text-cream/70 text-sm md:text-base font-playfair mt-4 mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Request the honor of your presence
          <br />
          at their wedding celebrations.
        </motion.p>

        {/* Open Invitation button */}
        <motion.button
          onClick={handleOpen}
          className="relative px-8 py-3 border-2 border-gold text-gold font-poppins text-sm tracking-widest uppercase rounded-full overflow-hidden group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          <span className="relative group-hover:text-maroon transition-colors duration-300">
            ✦ Open Invitation ✦
          </span>
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/50"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
