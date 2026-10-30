"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

/**
 * True while the referenced element is on screen or within one viewport
 * height of it (above or below).
 *
 * Used to pause *ambient* decoration — spinning mandalas, twinkling sparkles,
 * drifting particles — for sections the guest cannot see. Everything resumes
 * a full screen before it scrolls into view, so nothing is ever caught
 * "starting up". Entry animations (`whileInView … once`) are not affected.
 */
export function useNearViewport<T extends Element = HTMLElement>() {
  const ref = useRef<T>(null);
  const near = useInView(ref, { margin: "100% 0px 100% 0px" });
  return { ref, near };
}
