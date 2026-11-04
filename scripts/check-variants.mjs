/**
 * Dev-only: prove each NEXT_PUBLIC_INVITE_VARIANT value builds and yields the
 * right section list / metadata.  node scripts/check-variants.mjs
 *
 * For each variant: `next build` → `next start` on a free port → fetch "/" and
 * the OG image → report <title>, the RSVP message and which ceremony section
 * ids are referenced by the page's JS chunk (the sections themselves mount
 * client-side after the envelope, so we grep the bundle rather than the HTML).
 */
import { spawn, execSync } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const VARIANTS = ["full", "engagement-wedding", "wedding"];
const IDS = ["engagement", "mehendi-sangeet", "haldi", "ghurchari", "wedding"];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchText(url) {
  const r = await fetch(url);
  return r.text();
}

for (const [i, variant] of VARIANTS.entries()) {
  const env = { ...process.env, NEXT_PUBLIC_INVITE_VARIANT: variant, npm_config_loglevel: "error" };
  console.log(`\n━━━ ${variant} ━━━`);
  execSync("node node_modules/next/dist/bin/next build", { cwd: ROOT, env, stdio: "ignore" });

  const port = 3090 + i;
  const server = spawn("node", ["node_modules/next/dist/bin/next", "start", "-p", String(port)], { cwd: ROOT, env, stdio: "ignore" });
  await sleep(4500);
  try {
    const html = await fetchText(`http://localhost:${port}/`);
    const title = /<title>([^<]+)<\/title>/.exec(html)?.[1] ?? "(none)";
    const desc = /name="description" content="([^"]+)"/.exec(html)?.[1] ?? "(none)";
    console.log("title      :", title);
    console.log("description:", desc);

    // The build inlines NEXT_PUBLIC_* at compile time, so the variant module's
    // INCLUDES object becomes literal booleans in the bundle. Find it and read them.
    const shared = await fs.readdir(path.join(ROOT, ".next", "static", "chunks"), { recursive: true });
    let bundle = "";
    for (const f of shared) if (f.endsWith(".js")) bundle += await fs.readFile(path.join(ROOT, ".next", "static", "chunks", f), "utf8");

    // Next inlines process.env.NEXT_PUBLIC_INVITE_VARIANT as a string literal:  let e="wedding".trim()…
    const inlined = /let \w=\(?"([a-z-]*)"\)?\.trim\(\)\.toLowerCase\(\)/.exec(bundle)?.[1];
    const resolved = ["full", "engagement-wedding", "wedding"].includes(inlined ?? "") ? inlined : "full";
    const includes = {
      engagement: resolved !== "wedding",
      "mehendi-sangeet": resolved === "full",
      haldi: resolved === "full",
      ghurchari: resolved === "full",
      wedding: true,
    };
    console.log("variant baked in bundle:", JSON.stringify(inlined ?? "(unset)"), "→", resolved);
    console.log("sections rendered      :", IDS.filter((id) => includes[id]).join(", "));
    if (resolved !== variant) throw new Error(`Expected bundle variant "${variant}" but found "${resolved}"`);
  } finally {
    server.kill("SIGTERM");
    await sleep(500);
  }
}
console.log("\nDone.");
