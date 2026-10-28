/**
 * Tiny haptic taps for key moments (envelope open, card flip, RSVP).
 * Android Chrome supports navigator.vibrate; iOS Safari ignores it silently.
 */
export function tap(pattern: number | number[] = 8) {
  if (typeof navigator === "undefined") return;
  if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  try {
    navigator.vibrate?.(pattern);
  } catch {
    /* ignore */
  }
}

export const HAPTIC = {
  open: [10, 30, 14] as number[],  // envelope: two soft pulses
  flip: 8,                         // card flip: a tick
  reveal: [8, 40, 8, 40, 16] as number[], // all three cards: little flourish
  confirm: [12, 30, 12] as number[],
};
