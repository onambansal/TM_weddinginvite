"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Ceremony } from "@/config/weddingConfig";
import CeremonyDetails from "./CeremonyDetails";
import CornerOrnament from "./CornerOrnament";
import SectionDivider from "./SectionDivider";
import Motif, { type MotifName } from "./Motif";

export interface CeremonyCardProps {
  id: string;
  ceremony: Ceremony;
  /** Small uppercase line above the title, e.g. "First Ceremony" */
  pretitle: string;
  /** Optional italic description under the motif */
  description?: string;
  /** Closing italic line at the bottom of the card */
  note: string;
  motif: MotifName;
  /** Full-section background (CSS background value) */
  sectionBackground: string;
  /** Card header strip background (CSS background value) */
  headerBackground: string;
  headerTitleColor?: string;
  headerPretitleColor?: string;
  /** Accent for icons/links/motif */
  accent?: string;
  /** Dark card body (deep maroon) vs ivory */
  dark?: boolean;
  /** Ambient particle colours for the backdrop */
  particleColors?: readonly string[];
  particleCount?: number;
  ornamentColor?: string;
  ornamentOpacity?: number;
  /** Optional extra backdrop layer (e.g. pattern overlay) */
  backdrop?: React.ReactNode;
  /** Optional slot rendered between motif and details (e.g. couple names) */
  children?: React.ReactNode;
}

const serif = "var(--font-cormorant), var(--font-playfair), Georgia, serif";

export default function CeremonyCard(props: CeremonyCardProps) {
  const {
    id, ceremony, pretitle, description, note, motif,
    sectionBackground, headerBackground,
    headerTitleColor = "#6B0F1A",
    headerPretitleColor = "rgba(107,15,26,0.75)",
    accent = "#C9A84C",
    dark = false,
    particleColors = ["#C9A84C", "#E8C97A"],
    particleCount = 18,
    ornamentColor = "#C9A84C",
    ornamentOpacity = 0.4,
    backdrop,
    children,
  } = props;

  const reduceMotion = useReducedMotion();
  const count = reduceMotion ? 0 : particleCount;

  const bodyBg = dark
    ? "linear-gradient(160deg, #1A0507 0%, #2C0A0A 100%)"
    : "linear-gradient(160deg, #FFFDF7 0%, #FFF8F0 100%)";
  const noteColor = dark ? "rgba(201,168,76,0.6)" : "#8B6355";
  const descColor = dark ? "rgba(255,248,240,0.7)" : "#5C3D2E";

  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4 paper-grain"
      style={{ background: sectionBackground }}
    >
      {backdrop}

      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 3 + (i % 3) * 1.5,
              height: 3 + (i % 3) * 1.5,
              background: particleColors[i % particleColors.length],
              left: `${(i * 5.7 + 2) % 100}%`,
              top: `${(i * 7.9 + 4) % 100}%`,
            }}
            animate={{ opacity: [0.15, 0.75, 0.15], scale: [0.8, 1.4, 0.8] }}
            transition={{ duration: 2.5 + (i % 4), repeat: Infinity, delay: i * 0.22, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Hairline frame + corner flourishes */}
      <div
        className="absolute inset-4 md:inset-6 rounded-3xl pointer-events-none"
        style={{ border: `1px solid ${ornamentColor}`, opacity: ornamentOpacity * 0.55 }}
      />
      <CornerOrnament color={ornamentColor} opacity={ornamentOpacity} />

      {/* Card */}
      <motion.div
        className="relative z-10 max-w-sm w-full mx-auto"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Soft outer gold glow */}
        <div
          className="absolute -inset-[3px] rounded-[1.6rem] opacity-50 blur-md"
          style={{ background: "linear-gradient(135deg, #C9A84C, #E8C97A, #C9A84C)" }}
        />

        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: bodyBg,
            boxShadow:
              "0 24px 70px rgba(0,0,0,0.28), 0 0 0 1px rgba(201,168,76,0.65), inset 0 0 0 1px rgba(201,168,76,0.25)",
          }}
        >
          {/* Header strip */}
          <div className="relative py-6 px-6 text-center" style={{ background: headerBackground }}>
            <div
              className="absolute inset-x-0 bottom-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.9), transparent)" }}
            />
            <p
              className="text-[0.65rem] tracking-[0.4em] uppercase font-poppins mb-1.5"
              style={{ color: headerPretitleColor }}
            >
              {pretitle}
            </p>
            <h2
              className="text-3xl md:text-4xl leading-tight"
              style={{ fontFamily: serif, color: headerTitleColor, fontWeight: 600, letterSpacing: "0.01em" }}
            >
              {ceremony.title}
            </h2>
            <p className="text-base mt-1 italic" style={{ fontFamily: serif, color: headerPretitleColor }}>
              {ceremony.titleHindi}
            </p>
          </div>

          {/* Body */}
          <div className="py-8 px-7 text-center">
            <motion.div
              className="flex justify-center mb-3"
              animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ filter: `drop-shadow(0 2px 10px ${accent}66)` }}
            >
              <Motif name={motif} size={60} color={accent} />
            </motion.div>

            {children}

            {description && (
              <p
                className="italic leading-relaxed mt-2 mb-1"
                style={{ fontFamily: serif, color: descColor, fontSize: "1.02rem" }}
              >
                {description}
              </p>
            )}

            <SectionDivider color={accent} width={160} className="my-5" />

            <CeremonyDetails ceremony={ceremony} accent={accent} dark={dark} />

            <SectionDivider color={accent} width={120} className="mt-6 mb-4" />

            <p className="text-xs font-poppins italic" style={{ color: noteColor }}>
              {note}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
