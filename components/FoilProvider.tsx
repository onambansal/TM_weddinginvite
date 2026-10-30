"use client";

import { useEffect, useRef } from "react";

/**
 * Drives two CSS variables on <html> that every gold element reads:
 *   --foil-x / --foil-y  (0‒100, where the light "hits")
 *
 * Phone: DeviceOrientation (gamma/beta) — tilt the device and the foil
 *        highlight slides across headings, frames and the seal.
 * Desktop: pointer position does the same job.
 *
 * Values are smoothed with a simple critically-damped lerp on rAF so the
 * highlight glides instead of jittering. Falls back to a slow idle drift when
 * no input is available so the gold still looks alive.
 */
export default function FoilProvider() {
  const target = useRef({ x: 50, y: 40 });
  const current = useRef({ x: 50, y: 40 });
  const hasInput = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.style.setProperty("--foil-x", "50");
      root.style.setProperty("--foil-y", "40");
      return;
    }

    const clamp = (v: number) => Math.max(0, Math.min(100, v));

    // ── Pointer (desktop / mouse) ──
    const onPointer = (e: PointerEvent) => {
      hasInput.current = true;
      target.current.x = clamp((e.clientX / window.innerWidth) * 100);
      target.current.y = clamp((e.clientY / window.innerHeight) * 100);
    };

    // ── Gyroscope (phone) ──
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      hasInput.current = true;
      // gamma: left/right tilt (−90..90), beta: front/back (−180..180)
      const g = Math.max(-35, Math.min(35, e.gamma));
      const b = Math.max(0, Math.min(70, e.beta)) - 35; // centre around a natural holding angle
      target.current.x = clamp(50 + (g / 35) * 50);
      target.current.y = clamp(50 + (b / 35) * 50);
    };

    // iOS 13+ needs an explicit permission request from a user gesture
    const requestGyro = async () => {
      const DOE = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<"granted" | "denied"> };
      try {
        if (typeof DOE.requestPermission === "function") {
          const res = await DOE.requestPermission();
          if (res !== "granted") return;
        }
        window.addEventListener("deviceorientation", onOrient, { passive: true });
      } catch {
        /* ignore */
      }
      window.removeEventListener("pointerdown", requestGyro);
      window.removeEventListener("touchend", requestGyro);
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    // Android fires without permission; iOS needs the gesture hook
    if ("DeviceOrientationEvent" in window) {
      const DOE = DeviceOrientationEvent as unknown as { requestPermission?: unknown };
      if (typeof DOE.requestPermission === "function") {
        window.addEventListener("pointerdown", requestGyro, { once: true });
        window.addEventListener("touchend", requestGyro, { once: true });
      } else {
        window.addEventListener("deviceorientation", onOrient, { passive: true });
      }
    }

    // ── Smooth + idle drift ──
    let raf = 0;
    let t = 0;
    let lastX = "";
    let lastY = "";
    const tick = () => {
      t += 0.016;
      if (!hasInput.current) {
        // gentle figure-of-eight drift so the foil never looks static
        target.current.x = 50 + Math.sin(t * 0.35) * 30;
        target.current.y = 40 + Math.sin(t * 0.7) * 18;
      }
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      // Only touch the DOM when the value actually changes at 2-dp precision.
      // Once the lerp has settled (phone resting on a table, cursor still) this
      // drops to zero style recalcs / repaints of every gold surface per frame.
      const x = current.current.x.toFixed(2);
      const y = current.current.y.toFixed(2);
      if (x !== lastX) { root.style.setProperty("--foil-x", x); lastX = x; }
      if (y !== lastY) { root.style.setProperty("--foil-y", y); lastY = y; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Stop the loop entirely while the tab is in the background (browsers throttle
    // rAF there, but not to zero) and pick up where we left off on return.
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("deviceorientation", onOrient);
      window.removeEventListener("pointerdown", requestGyro);
      window.removeEventListener("touchend", requestGyro);
    };
  }, []);

  return null;
}
