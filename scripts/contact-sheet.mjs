/** Dev-only: tile the current gallery photos so you can confirm what is on disk. */
import sharp from "sharp";
import { promises as fs } from "node:fs";

const names = (await fs.readdir("public")).filter((n) => /^(a|photo\d+)\.jpg$/i.test(n)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
const T = 180;
const tiles = [];
for (let i = 0; i < names.length; i++) {
  const buf = await sharp(`public/${names[i]}`).resize(T, T, { fit: "cover" }).png().toBuffer();
  const label = Buffer.from(`<svg width="${T}" height="26"><rect width="100%" height="100%" fill="rgba(0,0,0,0.6)"/><text x="8" y="18" font-family="Arial" font-size="14" fill="#fff">${names[i]}</text></svg>`);
  tiles.push({ input: buf, left: (i % 4) * T, top: Math.floor(i / 4) * T });
  tiles.push({ input: label, left: (i % 4) * T, top: Math.floor(i / 4) * T + T - 26 });
}
await fs.mkdir(".tmp", { recursive: true });
await sharp({ create: { width: T * 4, height: T * Math.ceil(names.length / 4), channels: 3, background: "#222" } }).composite(tiles).png().toFile(".tmp/contact.png");
console.log("wrote .tmp/contact.png", names.join(", "));
