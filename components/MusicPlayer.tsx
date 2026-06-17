"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, VolumeX, Volume2 } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
    setShowTooltip(false);
  };

  return (
    <>
      {/* Hidden audio element — replace src with actual music file */}
      <audio ref={audioRef} loop>
        <source src="/music/wedding-music.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating music button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-maroon text-cream text-xs px-3 py-2 rounded-full shadow-maroon whitespace-nowrap font-poppins"
            >
              🎵 Play wedding music
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggleMusic}
          className="w-14 h-14 rounded-full bg-maroon text-gold flex items-center justify-center shadow-maroon border-2 border-gold/40"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={isPlaying ? { boxShadow: ["0 0 10px rgba(201,168,76,0.4)", "0 0 25px rgba(201,168,76,0.8)", "0 0 10px rgba(201,168,76,0.4)"] } : {}}
          transition={isPlaying ? { duration: 2, repeat: Infinity } : {}}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Volume2 className="w-6 h-6" />
          ) : (
            <VolumeX className="w-6 h-6" />
          )}
        </motion.button>

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
}
