"use client";

import { ceremonies, groom } from "@/config/weddingConfig";
import CeremonyCard from "./CeremonyCard";

/** Ghur Chari — the groom's procession. Bronze-on-maroon instead of brown. */
export default function GhurChariSection() {
  return (
    <CeremonyCard
      id="ghurchari"
      ceremony={ceremonies.ghurChari}
      pretitle="✦ The Grand Procession ✦"
      motif="horse"
      description="The groom arrives in grand style — accompanied by the joyous Baraat, music and dance."
      note="Come celebrate the groom's grand arrival"
      sectionBackground="linear-gradient(160deg, #2A0608 0%, #4A0A12 40%, #6B2A14 75%, #2A0608 100%)"
      headerBackground="linear-gradient(135deg, #4A0A12 0%, #8A4B1E 50%, #4A0A12 100%)"
      headerTitleColor="#E8C97A"
      headerPretitleColor="rgba(232,201,122,0.8)"
      accent="#C9A84C"
      dark
      particleColors={["#C9A84C", "#E8C97A", "#FFB347", "#FFD700"]}
      particleCount={24}
      ornamentColor="#C9A84C"
      ornamentOpacity={0.45}
      backdrop={
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 0%, rgba(201,168,76,0.22) 0%, transparent 50%),
              radial-gradient(circle at 15% 85%, rgba(255,179,71,0.12) 0%, transparent 40%)
            `,
          }}
        />
      }
    >
      <p
        className="text-gold"
        style={{ fontFamily: "var(--font-great-vibes), cursive", fontSize: "2.1rem", lineHeight: 1.1 }}
      >
        {groom.firstName}
      </p>
    </CeremonyCard>
  );
}
