"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { weddingDate, weddingDateDisplay, weddingDay } from "@/config/weddingConfig";
import CornerOrnament from "./CornerOrnament";
import SectionDivider from "./SectionDivider";
import Heading from "./Heading";
import FormattedDate from "./FormattedDate";
import Mandala from "./Mandala";
import FlipDigit from "./FlipDigit";
import GoldFirework from "./GoldFirework";
import Sparkles from "./Sparkles";
import { useWeddingDay } from "@/lib/useWeddingDay";
import { useNearViewport } from "@/lib/useNearViewport";

const serif = "var(--font-cormorant), var(--font-playfair), Georgia, serif";

const WEDDING_DATE = new Date(weddingDate);

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
  const { ref: sectionRef, near } = useNearViewport<HTMLElement>();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Tick once a second — but only while the countdown is on (or near) screen.
  // Each tick re-renders four FlipDigits; off-screen that work is invisible.
  // We re-sync immediately on return so the digits are never stale.
  useEffect(() => {
    if (!near) return;
    setTimeLeft(getTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [near]);

  const units = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  // ── Day-of mode: on the wedding date the countdown becomes a celebration
  const { phase } = useWeddingDay();
  const isToday = mounted && phase === "today";
  const isAfter = mounted && phase === "after";
  const isCompleted = isToday || isAfter;

  // Gentle looping firework on the day itself (one shell every ~6s)
  const [burst, setBurst] = useState(false);
  useEffect(() => {
    if (!isToday) return;
    let on = true;
    const fire = () => { if (!on) return; setBurst(true); setTimeout(() => setBurst(false), 3000); };
    fire();
    const id = setInterval(fire, 6500);
    return () => { on = false; clearInterval(id); };
  }, [isToday]);

  return (
    <section
      ref={sectionRef}
      id="countdown"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4 paper-grain vignette"
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

      <Mandala size={1000} opacity={0.1} spin={near ? 150 : 0} />
      <div className="absolute inset-4 md:inset-6 rounded-3xl pointer-events-none hairline-glow-soft" />
      <CornerOrnament color="#C9A84C" opacity={0.4} />

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
        <Heading className="mb-2" delay={0.1}>Is Almost Here</Heading>

        <SectionDivider color="#C9A84C" width={200} className="my-5" />

        <motion.p
          className="text-maroon/60 text-sm font-poppins italic mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Join us as we begin our forever together
        </motion.p>

        {/* Countdown timer — or the day-of celebration */}
        {isCompleted ? (
          <motion.div
            className="relative mx-auto max-w-sm rounded-3xl px-8 py-10 overflow-visible"
            style={{
              background: "linear-gradient(160deg, #2A0608, #4A0A12 60%, #6B0F1A)",
              boxShadow: "0 24px 70px rgba(74,10,18,0.35), 0 0 0 1px rgba(201,168,76,0.7), 0 0 18px 2px rgba(201,168,76,0.3), inset 0 0 0 1px rgba(201,168,76,0.25)",
            }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {isToday && <GoldFirework active={burst && near} x={50} y={30} count={48} />}
            {near && <Sparkles count={14} distribution="edges" seed={41} minSize={6} maxSize={14} className="-inset-3" />}
            <p className="text-[0.65rem] tracking-[0.4em] uppercase font-poppins mb-3" style={{ color: "rgba(232,201,122,0.8)" }}>
              {isToday ? "✦ It's Today ✦" : "✦ Just Married ✦"}
            </p>
            <p className="text-gold-foil leading-tight" style={{ fontFamily: serif, fontSize: "clamp(1.9rem, 7vw, 2.6rem)", fontWeight: 600 }}>
              {isToday ? "The Big Day is Here" : "Happily Ever After"}
            </p>
            <p className="mt-3 italic" style={{ fontFamily: serif, fontSize: "1.05rem", color: "rgba(255,248,240,0.75)" }}>
              {isToday ? "See you at the mandap" : "Thank you for celebrating with us"}
            </p>
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
                <FlipDigit value={mounted ? String(value).padStart(2, "0") : "00"} className="mb-2" />
                <span className="text-[0.65rem] text-maroon/60 font-poppins uppercase tracking-[0.3em]">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        <SectionDivider color="#C9A84C" width={200} className="my-6" />

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
            style={{ fontFamily: serif, fontWeight: 600 }}
          >
            <FormattedDate value={weddingDateDisplay} />
          </p>
          <p className="text-maroon/50 text-sm font-poppins mt-1">{weddingDay}</p>
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
