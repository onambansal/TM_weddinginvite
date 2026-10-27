"use client";

import { ceremonies, bride, groom } from "@/config/weddingConfig";
import CeremonyCard from "./CeremonyCard";

/** The climax — full maroon & gold. */
export default function WeddingCeremony() {
  return (
    <CeremonyCard
      id="wedding"
      ceremony={ceremonies.wedding}
      pretitle="✦ The Grand Celebration ✦"
      motif="mandap"
      description="Seven sacred vows around the holy fire — as two souls become one."
      note="Join us as we begin our forever"
      sectionBackground="linear-gradient(160deg, #1A0507 0%, #4A0A12 35%, #6B0F1A 65%, #1A0507 100%)"
      headerBackground="linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)"
      headerTitleColor="#4A0A12"
      headerPretitleColor="rgba(74,10,18,0.8)"
      accent="#C9A84C"
      dark
      particleColors={["#C9A84C", "#E8C97A", "#FFFDF7"]}
      particleCount={28}
      ornamentColor="#C9A84C"
      ornamentOpacity={0.5}
      backdrop={
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 10%, rgba(201,168,76,0.25) 0%, transparent 50%),
              radial-gradient(circle at 50% 100%, rgba(201,168,76,0.12) 0%, transparent 45%)
            `,
          }}
        />
      }
    >
      <div className="flex items-center justify-center gap-3">
        <p className="text-gold" style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "2.1rem", lineHeight: 1.1 }}>
          {groom.firstName}
        </p>
        <span
          className="text-gold/60 italic"
          style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif", fontSize: "1.5rem" }}
        >
          &amp;
        </span>
        <p className="text-gold" style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "2.1rem", lineHeight: 1.1 }}>
          {bride.firstName}
        </p>
      </div>
    </CeremonyCard>
  );
}
