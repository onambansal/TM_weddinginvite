"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

/** Sections in page order — ids must match the <section id=…> values */
const SECTIONS: { id: string; label: string }[] = [
  { id: "couple", label: "Tanuj & Mansi" },
  { id: "family", label: "Our Families" },
  { id: "save-the-date", label: "Save the Date" },
  { id: "countdown", label: "Countdown" },
  { id: "engagement", label: "Engagement" },
  { id: "mehendi-sangeet", label: "Mehendi & Sangeet" },
  { id: "haldi", label: "Haldi" },
  { id: "ghurchari", label: "Ghur Chari" },
  { id: "wedding", label: "Wedding" },
  { id: "venues", label: "Venues" },
  { id: "memories", label: "Moments" },
  { id: "rsvp", label: "RSVP" },
  { id: "thankyou", label: "Thank You" },
];

/**
 * Thin gold progress rail on the right edge with a lotus that travels down
 * as the guest scrolls. Tapping the rail jumps to the nearest section.
 * Hidden until the guest has scrolled a little, so the hero stays clean.
 */
export default function ScrollLotus() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const top = useTransform(p, [0, 1], ["0%", "100%"]);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 120);
      // nearest section heading to the viewport middle
      const mid = window.scrollY + window.innerHeight / 2;
      let best = SECTIONS[0];
      let bestDist = Infinity;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const d = Math.abs(el.offsetTop + el.offsetHeight / 2 - mid);
        if (d < bestDist) { bestDist = d; best = s; }
      }
      setLabel(best.label);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientY - r.top) / r.height;
    const idx = Math.min(SECTIONS.length - 1, Math.max(0, Math.round(ratio * (SECTIONS.length - 1))));
    document.getElementById(SECTIONS[idx].id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <motion.div
      className="fixed right-2 md:right-4 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center"
      style={{ height: "46vh" }}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 10 }}
      transition={{ duration: 0.5 }}
      aria-hidden={!visible}
    >
      {/* Rail */}
      <div className="relative w-6 h-full cursor-pointer group" onClick={jump} role="navigation" aria-label="Jump to a section">
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.55) 10%, rgba(201,168,76,0.55) 90%, transparent)" }} />
        {/* section ticks */}
        {SECTIONS.map((s, i) => (
          <span
            key={s.id}
            className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{ top: `${(i / (SECTIONS.length - 1)) * 100}%`, width: 3, height: 3, marginTop: -1.5, background: "rgba(201,168,76,0.6)" }}
          />
        ))}
        {/* Travelling lotus */}
        <motion.div className="absolute left-1/2 -translate-x-1/2" style={{ top, marginTop: -11 }}>
          <motion.svg
            width="22" height="22" viewBox="0 0 64 64" fill="none" stroke="#C9A84C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 6px rgba(201,168,76,0.7))" }}
            animate={reduceMotion ? undefined : { rotate: [0, 6, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx="32" cy="32" r="26" fill="#2A0608" stroke="rgba(201,168,76,0.7)" strokeWidth="1.5" />
            <path d="M32 46c-6-6-8-16-4-26 4 8 4 18 4 26z" />
            <path d="M32 46c6-6 8-16 4-26-4 8-4 18-4 26z" />
            <path d="M32 46c-10-2-18-10-18-22 8 4 14 12 18 22z" />
            <path d="M32 46c10-2 18-10 18-22-8 4-14 12-18 22z" />
          </motion.svg>
        </motion.div>
        {/* Current section label (desktop hover) */}
        <span
          className="absolute right-8 top-1/2 -translate-y-1/2 whitespace-nowrap text-[0.6rem] tracking-[0.3em] uppercase font-poppins opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded-full"
          style={{ color: "#E8C97A", background: "rgba(42,6,8,0.85)", boxShadow: "0 0 0 1px rgba(201,168,76,0.4)" }}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}
