"use client";

interface FormattedDateProps {
  /** e.g. "4th December 2026" */
  value: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Renders a display date with a true superscript ordinal (4<sup>th</sup>)
 * and old-style numerals — the typographic detail printed stationery gets right.
 */
export default function FormattedDate({ value, className = "", style }: FormattedDateProps) {
  const m = value.match(/^(\d{1,2})(st|nd|rd|th)\s+(.*)$/i);
  if (!m) return <span className={`nums-oldstyle ${className}`} style={style}>{value}</span>;
  const [, day, suffix, rest] = m;
  return (
    <span className={`nums-oldstyle ${className}`} style={style}>
      {day}
      <span className="ordinal">{suffix}</span> {rest}
    </span>
  );
}
