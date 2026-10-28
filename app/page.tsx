"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Envelope intro — loaded dynamically (client-only)
const EnvelopeIntro = dynamic(() => import("@/components/EnvelopeIntro"), { ssr: false });

import FloatingPetals from "@/components/FloatingPetals";
import FoilProvider from "@/components/FoilProvider";
import SectionEdge from "@/components/SectionEdge";
import ScrollLotus from "@/components/ScrollLotus";
import ViewportFrame from "@/components/ViewportFrame";
import MusicPlayer, { MusicPlayerHandle } from "@/components/MusicPlayer";
import CoupleHero from "@/components/CoupleHero";
import FamilyIntro from "@/components/FamilyIntro";
import CountdownSection from "@/components/CountdownSection";
import SaveTheDate from "@/components/SaveTheDate";
import EngagementSection from "@/components/EngagementSection";
import MehendiSangeet from "@/components/MehendiSangeet";
import HaldiSection from "@/components/HaldiSection";
import GhurChariSection from "@/components/GhurChariSection";
import WeddingCeremony from "@/components/WeddingCeremony";
import VenueDetails from "@/components/VenueDetails";
import PhotoMemories from "@/components/PhotoMemories";
import RSVPSection from "@/components/RSVPSection";
import ThankYouSection from "@/components/ThankYouSection";

export default function Home() {
  const [showMain, setShowMain] = useState(false);
  const musicPlayerRef = useRef<MusicPlayerHandle>(null);

  const handleEnvelopeStart = () => {
    // Start music as soon as user taps the envelope (user interaction = autoplay allowed)
    musicPlayerRef.current?.play();
  };

  const handleEnvelopeComplete = () => {
    setShowMain(true);
  };

  return (
    <>
      {/* Drives --foil-x/--foil-y from gyroscope / cursor so gold catches the light */}
      <FoilProvider />

      {/* Envelope intro overlay */}
      <EnvelopeIntro onComplete={handleEnvelopeComplete} onStart={handleEnvelopeStart} />

      {/* Music player — always mounted so audio element is ready */}
      <MusicPlayer ref={musicPlayerRef} />

      {/* Main content — fades in after envelope */}
      <AnimatePresence>
        {showMain && (
          <motion.main
            className="relative overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Global floating petals */}
            <FloatingPetals />

            {/* Gold progress rail with travelling lotus (tap to jump) */}
            <ScrollLotus />

            {/* Persistent gold frame around the viewport */}
            <ViewportFrame />

            {/*
              Ornamental edges sit between sections. `from` = bottom colour of the
              section above, `to` = top colour of the section below, so each seam
              looks like layered card stock rather than a hard cut.
            */}

            {/* 1 · The couple — names & photo (date is revealed later) */}
            <CoupleHero />
            <SectionEdge from="#2A0608" to="#FFFDF7" />

            {/* 2 · Family Introduction with Ganesh invocation */}
            <FamilyIntro />
            <SectionEdge from="#FFF8F0" to="#FFF8F0" />

            {/* 3 · Save The Date */}
            <SaveTheDate />
            <SectionEdge from="#F5EDE0" to="#FFF8F0" />

            {/* 4 · Countdown timer */}
            <CountdownSection />
            <SectionEdge from="#F5EDE0" to="#FFFDF7" />

            {/* 5 · Sacred Ceremonies in order */}
            <EngagementSection />
            <SectionEdge from="#F5E6CC" to="#4C1D95" />
            <MehendiSangeet />
            <SectionEdge from="#0F766E" to="#F9E4E9" />
            <HaldiSection />
            <SectionEdge from="#B76E79" to="#2A0608" />
            <GhurChariSection />
            <SectionEdge from="#2A0608" to="#1A0507" />
            <WeddingCeremony />
            <SectionEdge from="#1A0507" to="#FFF8F0" />

            {/* 6 · Venue Details with Google Maps */}
            <VenueDetails />
            <SectionEdge from="#F5EDE0" to="#FFF8F0" />

            {/* 7 · Photo gallery (carousel + grid) */}
            <PhotoMemories />
            <SectionEdge from="#F5EDE0" to="#2A0608" />

            {/* 8 · RSVP */}
            <RSVPSection />
            <SectionEdge from="#2A0608" to="#FFF8F0" />

            {/* 9 · Thank You */}
            <ThankYouSection />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
