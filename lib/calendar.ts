import { bride, groom, type Ceremony } from "@/config/weddingConfig";

const MONTHS: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

/** "29th November 2026" → Date (local midnight) */
function parseDisplayDate(display: string): Date | null {
  const m = display.match(/(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+)\s+(\d{4})/);
  if (!m) return null;
  const month = MONTHS[m[2].toLowerCase()];
  if (month === undefined) return null;
  return new Date(Number(m[3]), month, Number(m[1]));
}

/** "6:00 PM onwards" → { h, m } 24-hour */
function parseTime(time: string): { h: number; m: number } {
  const m = time.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
  if (!m) return { h: 18, m: 0 };
  let h = Number(m[1]) % 12;
  if (m[3].toUpperCase() === "PM") h += 12;
  return { h, m: Number(m[2] ?? 0) };
}

/** Format a Date as the compact UTC stamp Google Calendar expects */
function toGCalStamp(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/**
 * Build a Google Calendar "add event" URL for a ceremony.
 * Returns null if the date can't be parsed (so callers can hide the link).
 */
export function buildGoogleCalendarUrl(c: Ceremony, durationHours = 4): string | null {
  const day = parseDisplayDate(c.date);
  if (!day) return null;
  const { h, m } = parseTime(c.time);
  const start = new Date(day.getFullYear(), day.getMonth(), day.getDate(), h, m);
  const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${c.title} — ${groom.firstName} & ${bride.firstName}'s Wedding`,
    dates: `${toGCalStamp(start)}/${toGCalStamp(end)}`,
    details: [`${c.title} (${c.titleHindi})`, c.time, c.theme ? `Dress code: ${c.theme}` : null]
      .filter(Boolean)
      .join("\n"),
    location: `${c.venue}, ${c.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
