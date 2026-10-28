"use client";

import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

export interface MusicPlayerHandle {
  play: () => void;
}

const MusicPlayer = forwardRef<MusicPlayerHandle>((_, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Expose play() so parent can trigger auto-play on envelope tap
  useImperativeHandle(ref, () => ({
    play() {
      if (!audioRef.current) return;
      audioRef.current.volume = weddingConfig.music.volume;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay blocked — show tooltip prompting user to tap
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 5000);
      });
    },
  }));

  // Show tooltip hint after 2s if music hasn't started
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isPlaying) setShowTooltip(true);
    }, 2000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 7000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [isPlaying]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = weddingConfig.music.volume;
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
    setShowTooltip(false);
  };

  return (
    <>
      {/* Audio element — source from config, loops */}
      <audio ref={audioRef} loop preload="auto">
        <source src={weddingConfig.music.src} type="audio/mpeg" />
      </audio>

      {/* Floating music button — bottom right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-maroon text-cream text-xs px-3 py-2 rounded-full shadow-lg whitespace-nowrap font-poppins"
              style={{ boxShadow: "0 4px 20px rgba(107,15,26,0.5)" }}
            >
              ♪ Tap to play wedding music
            </motion.div>
          )}
        </AnimatePresence>

        {/* Music button — gold-ringed disc; the groove ring spins while playing */}
        <motion.button
          onClick={toggleMusic}
          className="relative w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle at 40% 35%, #7A1424, #4A0A12 70%)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4), 0 0 0 1.5px #C9A84C, inset 0 0 0 1px rgba(255,255,255,0.12)",
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          animate={
            isPlaying
              ? { boxShadow: ["0 8px 24px rgba(0,0,0,0.4), 0 0 0 1.5px #C9A84C, 0 0 12px rgba(201,168,76,0.35)", "0 8px 24px rgba(0,0,0,0.4), 0 0 0 1.5px #C9A84C, 0 0 26px rgba(201,168,76,0.7)", "0 8px 24px rgba(0,0,0,0.4), 0 0 0 1.5px #C9A84C, 0 0 12px rgba(201,168,76,0.35)"] }
              : undefined
          }
          transition={isPlaying ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : undefined}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          aria-pressed={isPlaying}
        >
          {/* Vinyl grooves — rotate when playing, stop when paused */}
          <motion.svg
            className="absolute inset-0"
            viewBox="0 0 56 56"
            aria-hidden="true"
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={isPlaying ? { duration: 6, repeat: Infinity, ease: "linear" } : { duration: 0.6 }}
          >
            {[22, 19, 16, 13].map((r, i) => (
              <circle key={r} cx="28" cy="28" r={r} fill="none" stroke="#C9A84C" strokeWidth="0.6" opacity={0.35 - i * 0.05} strokeDasharray={i % 2 ? "3 2" : undefined} />
            ))}
            {/* Highlight sliver that makes the rotation readable */}
            <path d="M28 6 A22 22 0 0 1 48 20" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinecap="round" />
          </motion.svg>
          <span className="relative text-gold">
            {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </span>
        </motion.button>
      </div>
    </>
  );
});

MusicPlayer.displayName = "MusicPlayer";
export default MusicPlayer;
