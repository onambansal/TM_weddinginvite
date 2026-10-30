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
const TARGETS = [
  { file: "a.jpg", maxEdge: 800 },
  ...Array.from({ length: 6 }, (_, i) => ({ file: `photo${i + 1}.jpg`, maxEdge: 1600 })),
];

const kb = (n) => `${Math.round(n / 1024).toLocaleString()} KB`;

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function main() {
  await fs.mkdir(ORIGINALS, { recursive: true });
  let before = 0;
  let after = 0;

  for (const { file, maxEdge } of TARGETS) {
    const src = path.join(PUBLIC, file);
    if (!(await exists(src))) { console.log(`skip  ${file} (not found)`); continue; }

    const backup = path.join(ORIGINALS, file);
    // Keep the very first original; re-runs read from the backup so quality never compounds.
    if (!(await exists(backup))) await fs.copyFile(src, backup);

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

  console.log(`\nTotal ${kb(before)} → ${kb(after)}  (${Math.round((1 - after / before) * 100)}% smaller)`);
  console.log(`Originals preserved in ${path.relative(ROOT, ORIGINALS)}\\`);
}

main().catch((e) => { console.error(e); process.exit(1); });
