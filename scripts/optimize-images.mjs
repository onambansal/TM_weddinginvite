/**
 * One-off image optimiser for /public.
 *
 * Resizes the gallery photos and the hero couple photo down to the largest
 * size they can ever be rendered at (next/image never requests wider), strips
 * EXIF, and re-encodes as progressive JPEG. Originals are moved to
 * /public/_originals (git-ignored) so nothing is lost.
 *
 * Usage:  node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const ORIGINALS = path.join(PUBLIC, "_originals");

/**
 * Longest edge per file. Carousel renders at ≤768 CSS px (×2 DPR = 1536),
 * grid thumbs ≤ 50vw, lightbox ≤ 512 px → 1600 covers everything pixel-for-pixel.
 * Hero oval is 220×290 CSS px (sizes="220px" → Next serves ≤ 640 px) → 800.
 */
/** Anything already at or under this size is treated as optimised and left alone. */
const ALREADY_SMALL = 400 * 1024;

const kb = (n) => `${Math.round(n / 1024).toLocaleString()} KB`;

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

/** a.jpg + every photo*.jpg currently in /public (so new gallery photos are picked up automatically) */
async function discoverTargets() {
  const names = await fs.readdir(PUBLIC);
  const photos = names
    .filter((n) => /^photo\d+\.(jpe?g|png|webp)$/i.test(n))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  return [
    { file: "a.jpg", maxEdge: 800 },
    ...photos.map((file) => ({ file, maxEdge: 1600 })),
  ];
}

async function main() {
  await fs.mkdir(ORIGINALS, { recursive: true });
  let before = 0;
  let after = 0;

  for (const { file, maxEdge } of await discoverTargets()) {
    const src = path.join(PUBLIC, file);
    if (!(await exists(src))) { console.log(`skip  ${file} (not found)`); continue; }

    const srcStat = await fs.stat(src);
    const backup = path.join(ORIGINALS, file);
    const hasBackup = await exists(backup);

    if (srcStat.size <= ALREADY_SMALL) {
      console.log(`${file.padEnd(10)} already optimised (${kb(srcStat.size)}) — skipped`);
      continue;
    }
    // A large file in /public is a fresh original: back it up (overwriting any
    // older original of the same name, since the photo itself was replaced).
    if (!hasBackup || (await fs.stat(backup)).size !== srcStat.size) {
      await fs.copyFile(src, backup);
    }

    const input = await fs.readFile(backup);
    const meta = await sharp(input).metadata();
    before += input.length;

    const out = await sharp(input)
      .rotate() // bake EXIF orientation in, then strip metadata
      .resize({ width: maxEdge, height: maxEdge, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true, chromaSubsampling: "4:2:0" })
      .toBuffer();

    await fs.writeFile(src, out);
    after += out.length;
    const outMeta = await sharp(out).metadata();
    console.log(
      `${file.padEnd(10)} ${String(meta.width + "×" + meta.height).padEnd(11)} ${kb(input.length).padStart(10)}  →  ` +
      `${String(outMeta.width + "×" + outMeta.height).padEnd(11)} ${kb(out.length).padStart(8)}`
    );
  }

  if (before > 0) {
    console.log(`\nTotal ${kb(before)} → ${kb(after)}  (${Math.round((1 - after / before) * 100)}% smaller)`);
    console.log(`Originals preserved in ${path.relative(ROOT, ORIGINALS)}\\`);
  } else {
    console.log("\nNothing to optimise.");
  }

  // Next.js caches resized renders under .next/cache/images keyed by URL. When a
  // photo is replaced, renamed or removed but keeps (or frees) a filename, those
  // stale renders would still be served — so always clear the cache here.
  const imageCache = path.join(ROOT, ".next", "cache", "images");
  if (await exists(imageCache)) {
    await fs.rm(imageCache, { recursive: true, force: true });
    console.log("Cleared .next\\cache\\images (stale renders purged) — restart `npm run dev` if it is running.");
  }

  // Warn about gallery entries in weddingConfig.ts that point at files that no longer exist.
  const config = await fs.readFile(path.join(ROOT, "config", "weddingConfig.ts"), "utf8");
  const referenced = [...config.matchAll(/src:\s*"\/([^"]+\.(?:jpe?g|png|webp))"/gi)].map((m) => m[1]);
  const missing = [];
  for (const f of referenced) if (!(await exists(path.join(PUBLIC, f)))) missing.push(f);
  if (missing.length) {
    console.warn(`\n⚠  weddingConfig.ts references files not found in /public: ${missing.join(", ")}`);
    console.warn("   Remove those gallery entries (or add the files) or the slideshow will show broken images.");
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
