"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Envelope intro — loaded dynamically (client-only)
const EnvelopeIntro = dynamic(() => import("@/components/EnvelopeIntro"), { ssr: false });

import FloatingPetals from "@/components/FloatingPetals";
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

            {/* 1 · The couple — names, photo, date */}
            <CoupleHero />

            {/* 2 · Family Introduction with Ganesh invocation */}
            <FamilyIntro />

            {/* 3 · Save The Date */}
            <SaveTheDate />

            {/* 4 · Countdown timer */}
            <CountdownSection />

            {/* 5 · Sacred Ceremonies in order */}
            <EngagementSection />
            <MehendiSangeet />
            <HaldiSection />
            <GhurChariSection />
            <WeddingCeremony />

            {/* 6 · Venue Details with Google Maps */}
            <VenueDetails />

            {/* 7 · Photo gallery (carousel + grid) */}
            <PhotoMemories />

            {/* 8 · RSVP */}
            <RSVPSection />

            {/* 9 · Thank You */}
            <ThankYouSection />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
