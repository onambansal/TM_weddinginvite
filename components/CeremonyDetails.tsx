"use client";

import { Calendar, Clock, MapPin, CalendarPlus, Navigation } from "lucide-react";
import type { Ceremony } from "@/config/weddingConfig";
import { buildGoogleCalendarUrl } from "@/lib/calendar";
import DressCode from "./DressCode";

interface CeremonyDetailsProps {
  ceremony: Ceremony;
  /** Accent colour for icons / links (defaults to gold) */
  accent?: string;
  /** Light text for dark cards */
  dark?: boolean;
}

/**
 * Date · Time · Venue · Dress code · action links — shared by every ceremony card
 * so the information hierarchy is identical across the invite.
 */
export default function CeremonyDetails({ ceremony, accent = "#C9A84C", dark = false }: CeremonyDetailsProps) {
  const label = dark ? "rgba(201,168,76,0.55)" : "#8B7355";
  const value = dark ? "#FFF8F0" : "#2C1810";
  const sub = dark ? "rgba(255,248,240,0.55)" : "#8B6355";
  const serif = { fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" };
  const calendarUrl = buildGoogleCalendarUrl(ceremony);

  const Row = ({
    icon,
    title,
    children,
    alignTop = false,
  }: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    alignTop?: boolean;
  }) => (
    <div className={`flex ${alignTop ? "items-start" : "items-center"} gap-3 justify-center`}>
      <span className={`flex-shrink-0 ${alignTop ? "mt-1" : ""}`} style={{ color: accent }}>
        {icon}
      </span>
      <div className="text-left">
        <p className="text-[0.65rem] font-poppins uppercase tracking-[0.3em] mb-0.5" style={{ color: label }}>
          {title}
        </p>
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <Row icon={<Calendar className="w-4 h-4" />} title="Date">
        <p className="text-base leading-tight" style={{ ...serif, color: value, fontWeight: 600 }}>
          {ceremony.date}
        </p>
        <p className="text-xs font-poppins" style={{ color: sub }}>
          {ceremony.day}
        </p>
      </Row>

      <Row icon={<Clock className="w-4 h-4" />} title="Time">
        <p className="text-base leading-tight" style={{ ...serif, color: value, fontWeight: 600 }}>
          {ceremony.time}
        </p>
      </Row>

      <Row icon={<MapPin className="w-4 h-4" />} title="Venue" alignTop>
        <p className="text-base leading-tight" style={{ ...serif, color: value, fontWeight: 600 }}>
          {ceremony.venue}
        </p>
        <p className="text-xs font-poppins" style={{ color: sub }}>
          {ceremony.address}
        </p>
      </Row>

      {/* Only ceremonies with a colour theme (Mehendi, Haldi) show a dress code */}
      {ceremony.theme && ceremony.themeSwatch && (
        <DressCode
          label={ceremony.theme}
          note={ceremony.themeNote}
          swatch={ceremony.themeSwatch}
          accent={accent}
          dark={dark}
        />
      )}

      {/* Action links */}
      <div className="flex items-center justify-center gap-5 pt-1">
        <a
          href={ceremony.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[0.7rem] font-poppins uppercase tracking-[0.2em] transition-opacity hover:opacity-70"
          style={{ color: accent }}
        >
          <Navigation className="w-3.5 h-3.5" />
          Directions
        </a>
        {calendarUrl && (
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[0.7rem] font-poppins uppercase tracking-[0.2em] transition-opacity hover:opacity-70"
            style={{ color: accent }}
          >
            <CalendarPlus className="w-3.5 h-3.5" />
            Add to Calendar
          </a>
        )}
      </div>
    </div>
  );
}
