"use client";

import { ceremonies } from "@/config/weddingConfig";
import CeremonyCard from "./CeremonyCard";
import HaldiBloom from "./HaldiBloom";

/**
 * Haldi — the dress code is PINK, so the whole screen is pink,
 * but rendered as dusty rose / rose-gold so it sits with the gold palette.
 */
export default function HaldiSection() {
  return (
    <CeremonyCard
      id="haldi"
      ceremony={ceremonies.haldi}
      pretitle="✦ Ceremony ✦"
      motif="marigold"
      description="A morning of turmeric, laughter and blessings — as family and friends shower the couple with love."
      note="Come dressed in shades of pink & bring your blessings"
      sectionBackground="linear-gradient(160deg, #F9E4E9 0%, #EFC2CC 35%, #D9919F 70%, #B76E79 100%)"
      headerBackground="linear-gradient(135deg, #B76E79 0%, #D4919B 50%, #B76E79 100%)"
      headerTitleColor="#FFFDF7"
      headerPretitleColor="rgba(255,253,247,0.85)"
      accent="#B76E79"
      particleColors={["#C9A84C", "#F9D5E0", "#E8A0B0"]}
      ornamentColor="#8E4A58"
      ornamentOpacity={0.4}
      mandalaColor="#FFFDF7"
      mandalaOpacity={0.22}
      backdrop={
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 15% 20%, rgba(255,255,255,0.35) 0%, transparent 45%),
                radial-gradient(circle at 85% 80%, rgba(201,168,76,0.18) 0%, transparent 45%)
              `,
            }}
          />
          {/* Turmeric watercolour bloom spreading behind the card */}
          <HaldiBloom colors={["#F6D0D9", "#E8A0B0", "#D98A9E"]} />
        </>
      }
    />
  );
}
