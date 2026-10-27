# Tanuj & Mansi — Wedding Invite

Next.js 15 · Tailwind · framer-motion. Everything guest-facing is driven by
**`config/weddingConfig.ts`** — you should rarely need to touch a component.

## Editing content

| What | Where |
|---|---|
| Names, parents, grandparents | `bride` / `groom` |
| Wedding date (countdown + display) | `weddingDate`, `weddingDateDisplay`, `weddingDay` |
| Each ceremony — date, time, venue, map link | `ceremonies.<name>` |
| **Dress code** (Mehendi & Haldi only) | `ceremonies.<name>.theme`, `themeNote`, `themeSwatch` — one CSS colour/gradient rendered as a single fabric swatch. Omit all three for ceremonies with no theme. |
| Hero photo (first screen after the envelope — intentionally shows no date; Save-the-Date reveals it) | `couplePhoto` → put the file in `/public` |
| Gallery (carousel + grid) | `gallery[]` → `{ src, caption }` — drop real photos in `/public` and use `"/photo1.jpg"` |
| Venue cards + "Celebration Timeline" | `venues[]` (timeline is derived automatically from `ceremonies`) |
| RSVP WhatsApp number / message | `rsvp` |
| Background music | `music.src`, `music.volume` → file in `/public` |

Each ceremony card also gets a **Directions** link (from `mapUrl`) and an
**Add to Calendar** link generated from its date/time (`lib/calendar.ts`).

## Design system

- Palette: maroon `#6B0F1A` / antique gold `#C9A84C` / ivory `#FFFDF7`. Ceremony
  screens express their dress code in the *backdrop* (rose-gold for Haldi,
  jewel-toned multicolour for Mehendi) while the card itself stays ivory/gold.
- Fonts are self-hosted in `app/fonts` via `next/font/local`
  (Cormorant Garamond for headings, Playfair, Poppins, Great Vibes).
- Shared building blocks: `CeremonyCard`, `CeremonyDetails`, `DressCode`,
  `CornerOrnament`, `SectionDivider`, `Motif` (line-art SVG icons — no emoji).
- OG share image & favicon are generated at build time
  (`app/opengraph-image.tsx`, `app/icon.tsx`). Set `NEXT_PUBLIC_SITE_URL`
  in production so WhatsApp previews resolve the absolute image URL.

## Still to do

- [ ] Replace Unsplash placeholders in `gallery[]` and `couplePhoto` with real photos
- [ ] Fill in the bride's family names (`Shri ABC Gupta` placeholders)

## Scripts

```bash
npm run dev     # local dev
npm run lint
npm run build   # production build (also type-checks)
```
