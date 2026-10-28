"use client";

import { ceremonies } from "@/config/weddingConfig";
import CeremonyCard from "./CeremonyCard";
import HennaBorder from "./HennaBorder";

/**
 * One continuous multicolour gradient — the way a single multicolour dupatta or
 * leheriya saree blends from one colour into the next. Used for the header strip
 * (and the dress-code swatch in the config) so "multicolor" reads as one outfit.
 */
const MULTICOLOR_SILK =
  "linear-gradient(135deg, #7C3AED 0%, #DB2777 25%, #F97316 50%, #FACC15 75%, #0D9488 100%)";

/**
 * Mehendi & Sangeet — the whole screen is the multicolour dress code,
 * softened into a deep, silky evening wash so it feels festive, not loud.
 */
export default function MehendiSangeet() {
  return (
    <CeremonyCard
      id="mehendi-sangeet"
      ceremony={ceremonies.mehendiSangeet}
      pretitle="✦ Celebration ✦"
      motif="mehendi"
      description="An evening of henna, music and dance — where every colour of joy comes alive."
      note="Wear your brightest colours & dance the night away"
      sectionBackground="linear-gradient(160deg, #4C1D95 0%, #9D174D 30%, #C2410C 55%, #A16207 75%, #0F766E 100%)"
      headerBackground={MULTICOLOR_SILK}
      headerTitleColor="#FFFDF7"
      headerPretitleColor="rgba(255,253,247,0.9)"
      accent="#C9A84C"
      particleColors={["#FFFDF7", "#E8C97A"]}
      particleCount={18}
      ornamentColor="#FFFDF7"
      ornamentOpacity={0.35}
      mandalaColor="#FFFDF7"
      mandalaOpacity={0.12}
      cardOverlay={<HennaBorder color="#B8893A" />}
      backdrop={
        <>
          {/* Deepen the wash so the ivory card and gold frame stay the focus */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(20,4,24,0.42)" }} />
          {/* Silk sheen sweeping across the fabric */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(115deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.10) 48%, rgba(255,255,255,0) 62%)",
            }}
          />
        </>
      }
    />
  );
}
