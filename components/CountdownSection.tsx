"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const WEDDING_DATE = new Date("2026-12-05T00:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  const isCompleted = mounted && timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <section
      id="countdown"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4"
      style={{ background: "linear-gradient(180deg, #FFF8F0 0%, #F5EDE0 100%)" }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #C9A84C 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #6B0F1A 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 text-3xl opacity-20" style={{ color: "#C9A84C" }}>✦</div>
      <div className="absolute top-4 right-4 text-3xl opacity-20" style={{ color: "#C9A84C" }}>✦</div>
      <div className="absolute bottom-4 left-4 text-3xl opacity-20" style={{ color: "#C9A84C" }}>✦</div>
      <div className="absolute bottom-4 right-4 text-3xl opacity-20" style={{ color: "#C9A84C" }}>✦</div>

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto w-full">
        {/* Pre-title */}
        <motion.p
          className="text-gold text-xs tracking-[0.4em] uppercase font-poppins mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          ✦ The Most Awaited Day ✦
        </motion.p>

        {/* Main title */}
        <motion.h2
          className="text-4xl md:text-5xl text-maroon mb-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Is Almost Here
        </motion.h2>

        <div className="gold-divider my-5" />

        <motion.p
          className="text-maroon/60 text-sm font-poppins italic mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Join us as we begin our forever together
        </motion.p>

        {/* Countdown timer */}
        {isCompleted ? (
          <motion.div
            className="text-3xl font-playfair text-maroon"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            🎊 The Big Day is Here! 🎊
          </motion.div>
        ) : (
          <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-lg mx-auto">
            {units.map(({ value, label }, i) => (
              <motion.div
                key={label}
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div
                  className="w-full rounded-2xl border-2 py-4 px-2 mb-2 shadow-gold"
                  style={{
                    background: "linear-gradient(135deg, #4A0A12, #6B0F1A)",
                    borderColor: "rgba(201, 168, 76, 0.4)",
                  }}
                >
                  <span
                    className="block text-3xl md:text-4xl font-bold"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      background: "linear-gradient(135deg, #C9A84C, #E8C97A, #C9A84C)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {mounted ? String(value).padStart(2, "0") : "00"}
                  </span>
                </div>
                <span className="text-xs text-maroon/60 font-poppins uppercase tracking-wider">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        <div className="gold-divider my-6" />

        {/* Date block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="text-gold text-xs tracking-[0.3em] uppercase font-poppins mb-1">Save the Date</p>
          <p
            className="text-2xl text-maroon"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            5th December 2026
          </p>
          <p className="text-maroon/50 text-sm font-poppins mt-1">Saturday</p>
        </motion.div>

        <motion.p
          className="text-maroon/50 text-sm font-poppins italic mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          &ldquo;Two souls, one heart — bound by love, blessed by the divine.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
