"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Download, Check } from "lucide-react";
import { bride, groom, weddingDateDisplay } from "@/config/weddingConfig";
import { tap, HAPTIC } from "@/lib/haptics";
import Magnetic from "./Magnetic";

type State = "idle" | "busy" | "done";

/**
 * "Save this invite" — fetches the 1080×1920 keepsake image and either opens
 * the native share sheet (phones) or downloads the PNG (desktop).
 */
export default function ShareKeepsake() {
  const [state, setState] = useState<State>("idle");
  const title = `${groom.firstName} & ${bride.firstName} — ${weddingDateDisplay}`;

  const handle = async () => {
    if (state === "busy") return;
    tap(HAPTIC.confirm);
    setState("busy");
    try {
      const res = await fetch("/keepsake", { cache: "force-cache" });
      const blob = await res.blob();
      const file = new File([blob], "tanuj-mansi-wedding.png", { type: "image/png" });
      const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
      if (nav.share && nav.canShare?.({ files: [file] })) {
        await nav.share({ files: [file], title, text: `${title}\n${window.location.href}` });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      }
      setState("done");
      setTimeout(() => setState("idle"), 2500);
    } catch {
      // user cancelled the share sheet, or fetch failed — just reset quietly
      setState("idle");
    }
  };

  const canShare = typeof navigator !== "undefined" && typeof (navigator as Navigator).share === "function";
  const Icon = state === "done" ? Check : canShare ? Share2 : Download;
  const label = state === "done" ? "Saved" : state === "busy" ? "Preparing…" : canShare ? "Share this invite" : "Save this invite";

  return (
    <Magnetic strength={5} radius={60}>
      <motion.button
        type="button"
        onClick={handle}
        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-poppins text-[0.7rem] tracking-[0.25em] uppercase"
        style={{
          color: "#E8C97A",
          background: "rgba(42,6,8,0.5)",
          boxShadow: "0 0 0 1px rgba(201,168,76,calc(0.6 + var(--magnet, 0) * 0.4)), 0 0 calc(8px + var(--magnet, 0) * 14px) 1px rgba(201,168,76,calc(0.2 + var(--magnet, 0) * 0.35))",
          backdropFilter: "blur(4px)",
        }}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        aria-live="polite"
      >
        <Icon className="w-4 h-4" />
        {label}
      </motion.button>
    </Magnetic>
  );
}
