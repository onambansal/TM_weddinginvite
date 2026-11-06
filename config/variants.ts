// ============================================================
//  INVITE VARIANTS
//  One codebase, three invites. The variant is chosen at BUILD time from
//  NEXT_PUBLIC_INVITE_VARIANT — each Vercel project sets a different value:
//
//    full                 → every ceremony (default)
//    engagement-wedding   → Engagement + Wedding Ceremony only
//    wedding              → Wedding Ceremony only
//
//  Local testing: put NEXT_PUBLIC_INVITE_VARIANT=wedding in .env.local
// ============================================================

export type Variant = "full" | "engagement-wedding" | "wedding";

export type CeremonyKey = "engagement" | "mehendiSangeet" | "haldi" | "ghurChari" | "wedding";

const VARIANTS: readonly Variant[] = ["full", "engagement-wedding", "wedding"];

function resolveVariant(): Variant {
  const raw = (process.env.NEXT_PUBLIC_INVITE_VARIANT ?? "full").trim().toLowerCase();
  return (VARIANTS as readonly string[]).includes(raw) ? (raw as Variant) : "full";
}

/** The active variant for this build */
export const VARIANT: Variant = resolveVariant();

/** Which ceremonies this variant shows (Ghur Chari travels with the wedding in every variant) */
export const INCLUDES: Readonly<Record<CeremonyKey, boolean>> = {
  engagement: VARIANT !== "wedding",
  mehendiSangeet: VARIANT === "full",
  haldi: VARIANT === "full",
  ghurChari: true,
  wedding: true,
};

/** Ceremony keys in chronological order, filtered to this variant */
export const CEREMONY_ORDER: readonly CeremonyKey[] = (
  ["engagement", "mehendiSangeet", "haldi", "ghurChari", "wedding"] as const
).filter((k) => INCLUDES[k]);

/**
 * Display labels of each ceremony as used in weddingConfig.venues[].events,
 * so venue cards can be filtered to the events this variant includes.
 */
const EVENT_LABELS: Readonly<Record<CeremonyKey, string>> = {
  engagement: "Engagement",
  mehendiSangeet: "Mehendi & Sangeet",
  haldi: "Haldi Ceremony",
  ghurChari: "Ghur Chari",
  wedding: "Wedding Ceremony",
};

/** True if an event label (from venues[].events) belongs to this variant */
export function isEventIncluded(label: string): boolean {
  return CEREMONY_ORDER.some((k) => EVENT_LABELS[k] === label);
}

/** Human wording per variant, used in titles, share text and the RSVP message */
export const VARIANT_COPY: { title: string; occasion: string } = {
  full: { title: "Wedding Invitation", occasion: "wedding" },
  "engagement-wedding": { title: "Engagement & Wedding Invitation", occasion: "engagement and wedding" },
  wedding: { title: "Wedding Invitation", occasion: "wedding" },
}[VARIANT];
