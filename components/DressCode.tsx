"use client";

import { motion } from "framer-motion";
import { Shirt } from "lucide-react";

interface DressCodeProps {
  /** Short label e.g. "Pink", "Multicolor" */
  label: string;
  /** One-line guidance for guests */
  note?: string;
  /**
   * CSS background for ONE fabric swatch. A solid colour for a single-colour
   * theme, or a gradient for a multicolour theme (many colours on one outfit).
   */
  swatch: string;
  /** Accent colour for the icon & label (defaults to gold) */
  accent?: string;
  /** Use light text for dark cards */
  dark?: boolean;
}

/**
 * Dress-code block for ceremonies that have a colour theme.
 * Shows a single round "fabric" swatch with a gold ring and a soft sheen,
 * so the swatch reads like cloth rather than a colour chip.
 */
export default function DressCode({ label, note, swatch, accent = "#C9A84C", dark = false }: DressCodeProps) {
  const labelColor = dark ? "rgba(201,168,76,0.55)" : "#8B7355";
  const titleColor = dark ? "#FFF8F0" : "#2C1810";
  const noteColor = dark ? "rgba(255,248,240,0.55)" : "#8B6355";

  return (
    <div className="flex items-start gap-3 justify-center">
      <Shirt className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: accent }} />
      <div className="text-left">
        <p className="text-[0.65rem] font-poppins uppercase tracking-[0.3em] mb-1" style={{ color: labelColor }}>
          Dress Code
        </p>

        <div className="flex items-center gap-3">
          {/* Single fabric swatch */}
          <motion.span
            className="relative inline-block rounded-full flex-shrink-0 overflow-hidden"
            style={{
              width: 34,
              height: 34,
              background: swatch,
              boxShadow: "0 0 0 2px rgba(201,168,76,0.75), 0 0 0 4px rgba(201,168,76,0.18), 0 4px 10px rgba(0,0,0,0.18)",
            }}
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5, type: "spring", stiffness: 220, damping: 16 }}
          >
            {/* Silk sheen */}
            <span
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 45%, rgba(0,0,0,0.12) 100%)" }}
            />
          </motion.span>

          <div>
            <p
              className="text-base leading-tight"
              style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif", color: titleColor, fontWeight: 600 }}
            >
              {label}
            </p>
            {note && (
              <p className="text-xs font-poppins italic mt-0.5 leading-snug" style={{ color: noteColor }}>
                {note}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
