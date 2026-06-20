"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Envelope intro — loaded dynamically (client-only)
const EnvelopeIntro = dynamic(() => import("@/components/EnvelopeIntro"), { ssr: false });

import FloatingPetals from "@/components/FloatingPetals";
import MusicPlayer, { MusicPlayerHandle } from "@/components/MusicPlayer";
import FamilyIntro from "@/components/FamilyIntro";
import CountdownSection from "@/components/CountdownSection";
import SaveTheDate from "@/components/SaveTheDate";
import PhotoCarousel from "@/components/PhotoCarousel";
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

            {/* Page 1: Family Introduction with Ganesh idol */}
            <FamilyIntro />

            {/* Page 2: Save The Date */}
            <SaveTheDate />

            {/* Page 3: Countdown timer */}
            <CountdownSection />

            {/* Page 4: Photo Carousel — Our Beautiful Moments */}
            <PhotoCarousel />

            {/* Page 4+: Sacred Ceremonies in order */}
            <EngagementSection />
            <MehendiSangeet />
            <HaldiSection />
            <GhurChariSection />
            <WeddingCeremony />

            {/* Venue Details with Google Maps */}
            <VenueDetails />

            {/* Photo Memories gallery */}
            <PhotoMemories />

            {/* RSVP */}
            <RSVPSection />

            {/* Wedding Vows / Thank You */}
            <ThankYouSection />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
