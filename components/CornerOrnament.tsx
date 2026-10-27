"use client";

/**
 * Four gold paisley/filigree flourishes anchored to the corners of a section.
 * Replaces the mixed emoji corner decorations so every screen shares one motif.
 */
interface CornerOrnamentProps {
  color?: string;
  opacity?: number;
  size?: number;
  /** Inset from the section edge (px) */
  inset?: number;
}

function Flourish({ color, size }: { color: string; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer sweeping curve */}
      <path
        d="M4 96 C4 50, 20 20, 60 8 C72 5, 84 6, 96 4"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Inner curve */}
      <path
        d="M12 96 C14 58, 30 30, 62 18 C72 15, 82 14, 90 12"
        stroke={color}
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Paisley teardrop */}
      <path
        d="M34 40 C26 32, 30 18, 42 16 C54 14, 60 26, 54 36 C48 46, 38 48, 34 40 Z"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M38 36 C34 30, 38 22, 44 22 C50 22, 52 30, 48 34"
        stroke={color}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.8"
      />
      {/* Small leaves along the curve */}
      <path d="M18 70 C22 62, 30 62, 30 70 C26 74, 20 74, 18 70 Z" stroke={color} strokeWidth="1" fill="none" />
      <path d="M70 18 C72 12, 80 10, 82 16 C80 20, 74 22, 70 18 Z" stroke={color} strokeWidth="1" fill="none" />
      {/* Dots */}
      <circle cx="8" cy="88" r="1.6" fill={color} />
      <circle cx="88" cy="8" r="1.6" fill={color} />
      <circle cx="46" cy="30" r="1.6" fill={color} />
      <circle cx="24" cy="54" r="1.2" fill={color} opacity="0.8" />
      <circle cx="58" cy="22" r="1.2" fill={color} opacity="0.8" />
    </svg>
  );
}

export default function CornerOrnament({
  color = "#C9A84C",
  opacity = 0.45,
  size = 84,
  inset = 14,
}: CornerOrnamentProps) {
  const base: React.CSSProperties = { position: "absolute", opacity, pointerEvents: "none", lineHeight: 0 };
  return (
    <>
      <div style={{ ...base, top: inset, left: inset }}>
        <Flourish color={color} size={size} />
      </div>
      <div style={{ ...base, top: inset, right: inset, transform: "scaleX(-1)" }}>
        <Flourish color={color} size={size} />
      </div>
      <div style={{ ...base, bottom: inset, left: inset, transform: "scaleY(-1)" }}>
        <Flourish color={color} size={size} />
      </div>
      <div style={{ ...base, bottom: inset, right: inset, transform: "scale(-1)" }}>
        <Flourish color={color} size={size} />
      </div>
    </>
  );
}
