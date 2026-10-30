/**
 * Dev-only: rasterise motif candidates so they can be eyeballed before
 * committing them to components/Motif.tsx.   node scripts/preview-motifs.mjs
 */
import sharp from "sharp";
import { promises as fs } from "node:fs";

const S = (c, w = 1.5) => `stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;

// ── Current motifs (copied from Motif.tsx) ───────────────────
const OLD = {
  mehendi: (c) => `
    <path ${S(c)} d="M22 60V36c0-8 4-14 10-14s10 6 10 14v24"/>
    <path ${S(c)} d="M22 40l-6-12c-1-2 1-4 3-3l3 5"/>
    <path ${S(c)} d="M27 24l-2-14c0-2 3-3 4-1l2 12"/>
    <path ${S(c)} d="M32 22l0-16c0-2 3-2 3 0v16"/>
    <path ${S(c)} d="M37 24l2-13c0-2 3-2 3 0l-1 14"/>
    <circle ${S(c, 1)} cx="32" cy="40" r="5"/>
    <circle cx="32" cy="40" r="1.5" fill="${c}"/>
    <path ${S(c, 1)} d="M32 47c-2 3-2 6 0 9M32 47c2 3 2 6 0 9"/>
    <path ${S(c, 1)} d="M26 34c1-2 3-3 5-3M38 34c-1-2-3-3-5-3"/>
    <circle cx="25" cy="48" r="1" fill="${c}"/><circle cx="39" cy="48" r="1" fill="${c}"/>`,
  marigold: (c) => `
    ${[0,45,90,135,180,225,270,315].map(a=>`<ellipse ${S(c, 1.1)} cx="32" cy="18" rx="5" ry="10" transform="rotate(${a} 32 32)"/>`).join("")}
    ${[22,67,112,157,202,247,292,337].map(a=>`<ellipse ${S(c, 0.9)} cx="32" cy="22" rx="3.5" ry="7" transform="rotate(${a} 32 32)" opacity="0.75"/>`).join("")}
    <circle ${S(c)} cx="32" cy="32" r="5"/><circle cx="32" cy="32" r="2" fill="${c}"/>`,
  horse: (c) => `
    <path ${S(c)} d="M18 56V40c0-10 6-18 14-20l10-8 6 4-4 6 2 6-6 2c-2 6-8 10-14 12v14"/>
    <path ${S(c)} d="M32 20c-4-2-8-2-10 2"/>
    <circle cx="40" cy="20" r="1.5" fill="${c}"/>
    <path ${S(c, 1)} d="M28 24c-2 3-2 6 0 9M24 28c-2 3-2 6 0 9M20 34c-1 3-1 6 1 8"/>
    <path ${S(c, 1)} d="M42 10c2-4 6-5 8-3"/>
    <circle cx="50" cy="7" r="1.5" fill="${c}"/>
    <path ${S(c, 1)} d="M18 44h10"/><circle cx="23" cy="48" r="1.2" fill="${c}"/>`,
};

// ── Candidates (filled in by part 2) ─────────────────────────
const NEW = {};
// Mehendi — open palm, fingers up, henna mandala on the palm + fingertip motifs + bangles
NEW.hennaHand = (c) => `
    <path ${S(c)} d="M23 31V15a2.2 2.2 0 0 1 4.4 0v14"/>
    <path ${S(c)} d="M28.2 29V10a2.2 2.2 0 0 1 4.4 0v19"/>
    <path ${S(c)} d="M33.4 29V13a2.2 2.2 0 0 1 4.4 0v16.5"/>
    <path ${S(c)} d="M38.6 31V19a2.2 2.2 0 0 1 4.4 0v13"/>
    <path ${S(c)} d="M23 31c-2 2-3 5-3 9v14h24V40c0-4-1-7-1-8"/>
    <path ${S(c)} d="M20 44l-6.5-9.5c-1.3-2 1-4.2 3-2.8l5 5"/>
    <path ${S(c, 1)} d="M18 54h28M18 58h28"/>
    <circle cx="22" cy="56" r="0.9" fill="${c}"/><circle cx="32" cy="56" r="0.9" fill="${c}"/><circle cx="42" cy="56" r="0.9" fill="${c}"/>
    <circle ${S(c, 1)} cx="32" cy="42" r="4.5"/>
    <circle cx="32" cy="42" r="1.4" fill="${c}"/>
    ${[0,45,90,135,180,225,270,315].map(a=>{const r=a*Math.PI/180;return `<circle cx="${(32+7*Math.cos(r)).toFixed(2)}" cy="${(42+7*Math.sin(r)).toFixed(2)}" r="0.9" fill="${c}"/>`;}).join("")}
    <path ${S(c, 0.9)} d="M25.2 25c1.3-2.2 1.3-5.5 0-8M30.4 21c1.3-2.2 1.3-5.5 0-8M35.6 23c1.3-2.2 1.3-5.5 0-8M40.8 27.5c1.3-2 1.3-4.5 0-6.5" opacity="0.85"/>
    <circle cx="25.2" cy="15.5" r="1" fill="${c}"/><circle cx="30.4" cy="10.5" r="1" fill="${c}"/><circle cx="35.6" cy="13.5" r="1" fill="${c}"/><circle cx="40.8" cy="19.5" r="1" fill="${c}"/>
    <path ${S(c, 0.9)} d="M23.5 50.5c0-3 2.6-4.2 4.8-2.4M40.5 50.5c0-3-2.6-4.2-4.8-2.4" opacity="0.85"/>`;

// Haldi — footed brass bowl heaped with turmeric paste, a marigold resting on the rim,
// petals drifting down. Reads as "haldi" at a glance, not just a generic flower.
NEW.haldiBowl = (c) => `
    <path ${S(c)} d="M10 34h44c0 11-9 18-22 18S10 45 10 34z"/>
    <path ${S(c, 1)} d="M14 34c4-2 11-3 18-3s14 1 18 3" opacity="0.7"/>
    <path ${S(c)} d="M24 52l-3 6h22l-3-6"/>
    <path ${S(c, 1)} d="M21 58h22"/>
    <path ${S(c)} d="M16 33c1-6 7-10 16-10s15 4 16 10"/>
    <path ${S(c, 1)} d="M24 27c2-1 5-2 8-2s6 1 8 2" opacity="0.7"/>
    <circle cx="30" cy="42" r="1" fill="${c}" opacity="0.85"/><circle cx="36" cy="44" r="1" fill="${c}" opacity="0.85"/><circle cx="24" cy="44" r="1" fill="${c}" opacity="0.85"/>
    ${[0,40,80,120,160,200,240,280,320].map(a=>`<ellipse ${S(c, 1)} cx="46" cy="14.5" rx="1.8" ry="4" transform="rotate(${a} 46 19)"/>`).join("")}
    <circle ${S(c, 1)} cx="46" cy="19" r="2.2"/>
    <circle cx="46" cy="19" r="0.9" fill="${c}"/>
    <path ${S(c, 1)} d="M41 23c-3 1-5 4-4 7 3-1 5-4 4-7z"/>
    <path ${S(c, 0.9)} d="M14 14c2 1 2 4 0 5-2-1-2-4 0-5zM22 8c2 1 2 4 0 5-2-1-2-4 0-5zM12 24c2 1 2 4 0 5-2-1-2-4 0-5z"/>
    <path ${S(c, 0.9)} d="M30 10v4M27.5 12.5h5" opacity="0.7"/>`;

// Ghur Chari — decorated horse head, facing left, in classic baraat dress:
// bridle + forehead plume (kalgi), flowing mane, neck curving down to a chest band.
NEW.horseHead = (c) => `
    <path ${S(c)} d="M29 12C23 17 15 24 11 31c-2 4-1 8 3 9l8 1c3 1 5 4 6 8v8"/>
    <path ${S(c)} d="M38 11c8 8 13 24 14 46"/>
    <path ${S(c)} d="M28 13l2-9 5 7M36 12l3-9 4 9"/>
    <path ${S(c, 1)} d="M39 14c3 5 4 12 3 20M43 18c3 6 4 14 4 22M47 26c2 6 3 13 3 20" opacity="0.85"/>
    <circle cx="23" cy="25" r="1.6" fill="${c}"/>
    <path ${S(c, 1)} d="M13 35c1-0.6 2-0.6 3 0"/>
    <path ${S(c, 1)} d="M33 16c-5 5-11 11-17 17M12 32c4-1 8 0 11 2"/>
    <path ${S(c, 1)} d="M21 19c2 1 2 4 0 5-2-1-2-4 0-5z"/>
    <path ${S(c)} d="M33 8c0-4 2-7 5-8M33 8c1-4 4-6 7-6M33 8c-1-4 0-7 2-8"/>
    <circle cx="38.5" cy="0.8" r="1.2" fill="${c}"/><circle cx="40.5" cy="2.2" r="1.2" fill="${c}"/><circle cx="35.2" cy="0.6" r="1.2" fill="${c}"/>
    <path ${S(c, 1)} d="M26 58c8-3 18-3 28 0"/>
    <circle cx="33" cy="56.6" r="1" fill="${c}"/><circle cx="40" cy="56.2" r="1" fill="${c}"/><circle cx="47" cy="56.6" r="1" fill="${c}"/>`;

// Each column renders on its own card body colour with the card's accent
const COLS = [
  { label: "Mehendi", old: "mehendi", nu: "hennaHand", bg: "#FFFDF7", color: "#C9A84C" },
  { label: "Haldi",   old: "marigold", nu: "haldiBowl", bg: "#FFFDF7", color: "#B76E79" },
  { label: "GhurChari", old: "horse", nu: "horseHead", bg: "#1A0507", color: "#C9A84C" },
];

const T = 220; // tile px
const svgTile = (body, bg, c) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${T}" height="${T}" viewBox="0 0 64 64" fill="none"><rect width="64" height="64" fill="${bg}"/>${body(c)}</svg>`);

async function main() {
  await fs.mkdir(".tmp", { recursive: true });
  const tiles = [];
  COLS.forEach((col, x) => {
    tiles.push({ input: svgTile(OLD[col.old], col.bg, col.color), left: x * T, top: 0 });
    tiles.push({ input: svgTile(NEW[col.nu], col.bg, col.color), left: x * T, top: T + 12 });
  });
  const out = ".tmp/motifs.png";
  await sharp({ create: { width: T * COLS.length, height: T * 2 + 12, channels: 4, background: "#888" } })
    .composite(tiles).png().toFile(out);
  console.log("wrote", out, "(top row = current, bottom row = proposed)");
}
main().catch((e) => { console.error(e); process.exit(1); });
