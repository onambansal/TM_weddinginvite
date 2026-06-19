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
              🎵 Tap to play wedding music
            </motion.div>
          )}
        </AnimatePresence>

        {/* Music button */}
        <motion.button
          onClick={toggleMusic}
          className="w-14 h-14 rounded-full bg-maroon text-gold flex items-center justify-center border-2 border-gold/40"
          style={{ boxShadow: "0 4px 20px rgba(107,15,26,0.5)" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={
            isPlaying
              ? {
                  boxShadow: [
                    "0 0 10px rgba(201,168,76,0.4)",
                    "0 0 25px rgba(201,168,76,0.8)",
                    "0 0 10px rgba(201,168,76,0.4)",
                  ],
                }
              : {}
          }
          transition={isPlaying ? { duration: 2, repeat: Infinity } : {}}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Volume2 className="w-6 h-6" />
          ) : (
            <VolumeX className="w-6 h-6" />
          )}
        </motion.button>

        {/* Animated equalizer bars when playing */}
        {isPlaying && (
          <motion.div
            className="flex gap-1 items-end h-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-gold rounded-full"
                animate={{ height: ["4px", "16px", "4px"] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
});

MusicPlayer.displayName = "MusicPlayer";
export default MusicPlayer;
