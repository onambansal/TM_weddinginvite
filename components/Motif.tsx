"use client";

/**
 * Thin-line gold motifs used in place of emoji across the invite.
 * All drawn on a 64×64 grid so they size consistently.
 */
export type MotifName =
  | "om"
  | "ring"
  | "mehendi"
  | "marigold"
  | "horse"
  | "mandap"
  | "diya"
  | "lotus"
  | "kalash";

interface MotifProps {
  name: MotifName;
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function Motif({ name, size = 56, color = "#C9A84C", className = "", style }: MotifProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 64 64",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    style: { display: "inline-block", ...style },
    "aria-hidden": true as const,
  };
  const s = { stroke: color, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  switch (name) {
    case "om":
      return (
        <svg {...common}>
          <path {...s} d="M22 22c-4-5-13-3-13 4 0 6 6 9 12 6 3-2 3-6 1-8" />
          <path {...s} d="M20 32c6-2 12 1 12 7 0 7-7 12-15 10 4 2 10 2 14-1 5-4 6-11 2-15" />
          <path {...s} d="M14 48c6 6 20 6 26-2 4-6 3-14-4-17-4-2-8 0-9 3" />
          <path {...s} d="M40 20c3-3 8-3 11 0" />
          <path {...s} d="M38 24c4-2 10-2 14 1" />
          <circle cx="46" cy="12" r="2.2" fill={color} />
          <path {...s} d="M44 30c2 6 8 8 12 4" />
        </svg>
      );
    case "ring":
      return (
        <svg {...common}>
          <circle {...s} cx="32" cy="40" r="15" />
          <circle {...s} cx="32" cy="40" r="11" strokeWidth="1" opacity="0.6" />
          <path {...s} d="M24 20l8-10 8 10-8 6-8-6z" />
          <path {...s} d="M24 20h16M28 10l-4 10M36 10l4 10M32 10v16" strokeWidth="1" />
          <path {...s} d="M20 6l1.5 3M44 6l-1.5 3M32 3v3" strokeWidth="1" />
        </svg>
      );
    case "mehendi":
      return (
        <svg {...common}>
          <path {...s} d="M22 60V36c0-8 4-14 10-14s10 6 10 14v24" />
          <path {...s} d="M22 40l-6-12c-1-2 1-4 3-3l3 5" />
          <path {...s} d="M27 24l-2-14c0-2 3-3 4-1l2 12" />
          <path {...s} d="M32 22l0-16c0-2 3-2 3 0v16" />
          <path {...s} d="M37 24l2-13c0-2 3-2 3 0l-1 14" />
          <circle {...s} cx="32" cy="40" r="5" strokeWidth="1" />
          <circle cx="32" cy="40" r="1.5" fill={color} />
          <path {...s} d="M32 47c-2 3-2 6 0 9M32 47c2 3 2 6 0 9" strokeWidth="1" />
          <path {...s} d="M26 34c1-2 3-3 5-3M38 34c-1-2-3-3-5-3" strokeWidth="1" />
          <circle cx="25" cy="48" r="1" fill={color} />
          <circle cx="39" cy="48" r="1" fill={color} />
        </svg>
      );
    case "marigold":
      return (
        <svg {...common}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <ellipse key={a} {...s} cx="32" cy="18" rx="5" ry="10" transform={`rotate(${a} 32 32)`} strokeWidth="1.1" />
          ))}
          {[22, 67, 112, 157, 202, 247, 292, 337].map((a) => (
            <ellipse key={a} {...s} cx="32" cy="22" rx="3.5" ry="7" transform={`rotate(${a} 32 32)`} strokeWidth="0.9" opacity="0.75" />
          ))}
          <circle {...s} cx="32" cy="32" r="5" />
          <circle cx="32" cy="32" r="2" fill={color} />
        </svg>
      );
    case "horse":
      return (
        <svg {...common}>
          <path {...s} d="M18 56V40c0-10 6-18 14-20l10-8 6 4-4 6 2 6-6 2c-2 6-8 10-14 12v14" />
          <path {...s} d="M32 20c-4-2-8-2-10 2" />
          <circle cx="40" cy="20" r="1.5" fill={color} />
          <path {...s} d="M28 24c-2 3-2 6 0 9M24 28c-2 3-2 6 0 9M20 34c-1 3-1 6 1 8" strokeWidth="1" />
          <path {...s} d="M42 10c2-4 6-5 8-3" strokeWidth="1" />
          <circle cx="50" cy="7" r="1.5" fill={color} />
          <path {...s} d="M18 44h10" strokeWidth="1" />
          <circle cx="23" cy="48" r="1.2" fill={color} />
        </svg>
      );
    case "mandap":
      return (
        <svg {...common}>
          <path {...s} d="M14 58V26M50 58V26" />
          <path {...s} d="M10 58h44" />
          <path {...s} d="M10 26c0-12 10-18 22-18s22 6 22 18" />
          <path {...s} d="M14 26c0-8 8-12 18-12s18 4 18 12" strokeWidth="1" opacity="0.7" />
          <path {...s} d="M32 8V3" />
          <circle cx="32" cy="2.5" r="1.5" fill={color} />
          <path {...s} d="M14 30c6 6 12 6 18 0 6 6 12 6 18 0" strokeWidth="1" />
          <circle cx="23" cy="34" r="1" fill={color} />
          <circle cx="41" cy="34" r="1" fill={color} />
          <path {...s} d="M28 52c-1-4 2-6 4-9 2 3 5 5 4 9-1 3-7 3-8 0z" strokeWidth="1.2" />
          <path {...s} d="M24 56h16" strokeWidth="1" />
        </svg>
      );
    case "diya":
      return (
        <svg {...common}>
          <path {...s} d="M32 10c-4 6-6 10-6 14 0 4 3 7 6 7s6-3 6-7c0-4-2-8-6-14z" />
          <path {...s} d="M32 20c-1.5 2-2 4-2 5.5 0 1.5 1 2.5 2 2.5s2-1 2-2.5c0-1.5-.5-3.5-2-5.5z" strokeWidth="1" opacity="0.7" />
          <path {...s} d="M12 36h40c0 8-8 14-20 14S12 44 12 36z" />
          <path {...s} d="M16 36c4-2 10-3 16-3s12 1 16 3" strokeWidth="1" opacity="0.7" />
          <path {...s} d="M22 50l-2 6h24l-2-6" strokeWidth="1" />
          <path {...s} d="M18 18l3 3M46 18l-3 3M32 4v2" strokeWidth="1" opacity="0.7" />
        </svg>
      );
    case "lotus":
      return (
        <svg {...common}>
          <path {...s} d="M32 50c-6-6-8-16-4-26 4 8 4 18 4 26z" />
          <path {...s} d="M32 50c6-6 8-16 4-26-4 8-4 18-4 26z" />
          <path {...s} d="M32 50c-10-2-18-10-18-22 8 4 14 12 18 22z" />
          <path {...s} d="M32 50c10-2 18-10 18-22-8 4-14 12-18 22z" />
          <path {...s} d="M32 50c-14 0-22-6-26-14 10 0 20 4 26 14z" strokeWidth="1.1" />
          <path {...s} d="M32 50c14 0 22-6 26-14-10 0-20 4-26 14z" strokeWidth="1.1" />
          <path {...s} d="M18 56c8 2 20 2 28 0" strokeWidth="1" />
        </svg>
      );
    case "kalash":
      return (
        <svg {...common}>
          <path {...s} d="M22 20h20l-2 6H24l-2-6z" />
          <path {...s} d="M20 26c-6 8-6 18 0 26h24c6-8 6-18 0-26" />
          <path {...s} d="M20 52h24l-2 6H22l-2-6z" />
          <ellipse {...s} cx="32" cy="12" rx="7" ry="7" />
          <path {...s} d="M24 18c-6-2-10-6-10-10 4 0 8 4 10 10zM40 18c6-2 10-6 10-10-4 0-8 4-10 10z" strokeWidth="1.1" />
          <circle cx="32" cy="38" r="1.5" fill={color} />
          <circle cx="26" cy="40" r="1" fill={color} opacity="0.8" />
          <circle cx="38" cy="40" r="1" fill={color} opacity="0.8" />
          <path {...s} d="M22 46c6-2 14-2 20 0" strokeWidth="1" opacity="0.7" />
        </svg>
      );
  }
}
