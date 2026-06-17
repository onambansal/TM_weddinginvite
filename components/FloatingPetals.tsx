"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
}

const petalColors = [
  "#E8A0A0",
  "#F5C518",
  "#C9A84C",
  "#E8C97A",
  "#FF9999",
  "#FFB347",
];

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 6,
      size: 10 + Math.random() * 16,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute rounded-full opacity-70"
          style={{
            left: `${petal.x}%`,
            width: petal.size,
            height: petal.size,
            backgroundColor: petal.color,
            borderRadius: "50% 0 50% 0",
          }}
          initial={{ y: "-10vh", rotate: 0, opacity: 0.8 }}
          animate={{
            y: "110vh",
            rotate: 720,
            x: [0, 30, -20, 40, -10, 0],
            opacity: [0.8, 0.6, 0.4, 0.2, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
