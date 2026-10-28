"use client";

import { useEffect, useState } from "react";
import { weddingDate } from "@/config/weddingConfig";

export type WeddingPhase = "before" | "today" | "after";

/**
 * Tells the UI whether the guest is opening the invite before, on, or after
 * the wedding day (local time). Resolves on the client only, so SSR renders
 * the "before" state and there is no hydration mismatch.
 */
export function useWeddingDay(): { phase: WeddingPhase; mounted: boolean } {
  const [phase, setPhase] = useState<WeddingPhase>("before");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const compute = () => {
      const now = new Date();
      const w = new Date(weddingDate);
      const sameDay = now.getFullYear() === w.getFullYear() && now.getMonth() === w.getMonth() && now.getDate() === w.getDate();
      if (sameDay) setPhase("today");
      else if (now > w) setPhase("after");
      else setPhase("before");
    };
    compute();
    setMounted(true);
    // re-check each minute so a guest who leaves the tab open crosses midnight correctly
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, []);

  return { phase, mounted };
}
