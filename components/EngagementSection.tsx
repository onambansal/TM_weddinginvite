"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ceremonies } from "@/config/weddingConfig";
import CeremonyCard from "./CeremonyCard";

/** A single bright star-flash on the ring's stone every ~4s — a diamond catching light */
function DiamondFlash() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;
  return (
    <motion.svg
      className="absolute pointer-events-none"
      style={{ width: 22, height: 22, left: "50%", top: 0, marginLeft: -11, marginTop: 6 }}
      viewBox="0 0 24 24"
      initial={{ opacity: 0, scale: 0.2, rotate: 0 }}
      animate={{ opacity: [0, 1, 0.6, 0], scale: [0.2, 1.3, 0.9, 0.2], rotate: [0, 20, 40, 60] }}
      transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 3.2, ease: "easeOut", times: [0, 0.15, 0.4, 1] }}
      aria-hidden="true"
    >
      <path d="M12 0 C12.6 8, 16 11.4, 24 12 C16 12.6, 12.6 16, 12 24 C11.4 16, 8 12.6, 0 12 C8 11.4, 11.4 8, 12 0 Z" fill="#FFFFFF" />
      <path d="M12 3 C12.4 8.5, 15.5 11.6, 21 12 C15.5 12.4, 12.4 15.5, 12 21 C11.6 15.5, 8.5 12.4, 3 12 C8.5 11.6, 11.6 8.5, 12 3 Z" fill="#F3E2A0" />
    </motion.svg>
  );
}

export default function EngagementSection() {
  return (
    <CeremonyCard
      id="engagement"
      ceremony={ceremonies.engagement}
      pretitle="✦ First Ceremony ✦"
      motif="ring"
      description="The sacred beginning of our journey together — as we exchange rings and pledge our hearts to one another."
      note="Join us as we begin our forever"
      sectionBackground="linear-gradient(160deg, #FFFDF7 0%, #FFF4E0 45%, #F5E6CC 100%)"
      headerBackground="foil"
      headerTitleColor="#6B0F1A"
      headerPretitleColor="rgba(107,15,26,0.75)"
      accent="#C9A84C"
      particleColors={["#C9A84C", "#E8C97A"]}
      ornamentColor="#C9A84C"
      ornamentOpacity={0.45}
      cardOverlay={
        /* positioned over the ring motif's stone (header ≈ 118px + motif top offset) */
        <div className="absolute inset-x-0 pointer-events-none" style={{ top: 142 }}>
          <DiamondFlash />
        </div>
      }
      backdrop={
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(201,168,76,0.12) 0%, transparent 45%),
              radial-gradient(circle at 80% 80%, rgba(107,15,26,0.06) 0%, transparent 45%)
            `,
          }}
        />
      }
    />
  );
}
