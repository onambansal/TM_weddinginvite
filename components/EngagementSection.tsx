"use client";

import { ceremonies } from "@/config/weddingConfig";
import CeremonyCard from "./CeremonyCard";

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
      headerBackground="linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)"
      headerTitleColor="#6B0F1A"
      headerPretitleColor="rgba(107,15,26,0.75)"
      accent="#C9A84C"
      particleColors={["#C9A84C", "#E8C97A"]}
      ornamentColor="#C9A84C"
      ornamentOpacity={0.45}
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
