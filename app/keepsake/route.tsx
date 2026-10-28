import { ImageResponse } from "next/og";
import { weddingConfig } from "@/config/weddingConfig";

export const dynamic = "force-static";

/**
 * GET /keepsake → 1080×1920 PNG for Instagram Stories / WhatsApp Status.
 * Names, date, venue, monogram on maroon & gold. Guests share it onward.
 */
export async function GET() {
  const { bride, groom, weddingDateDisplay, weddingDay, ceremonies } = weddingConfig;
  const g = groom.firstName[0];
  const b = bride.firstName[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(170deg, #1A0507 0%, #4A0A12 42%, #6B0F1A 72%, #2A0608 100%)",
          color: "#E8C97A",
          fontFamily: "Georgia, 'Times New Roman', serif",
          position: "relative",
        }}
      >
        {/* Double frame */}
        <div style={{ position: "absolute", inset: 48, border: "2px solid rgba(201,168,76,0.6)", borderRadius: 40, display: "flex" }} />
        <div style={{ position: "absolute", inset: 66, border: "1px solid rgba(201,168,76,0.3)", borderRadius: 30, display: "flex" }} />

        {/* Monogram */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}>
          <div style={{ width: 150, height: 150, borderRadius: 999, border: "2px solid #C9A84C", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 76, color: "#E8C97A" }}>
            <span style={{ display: "flex" }}>{g}</span>
            <span style={{ display: "flex", width: 10, height: 10, background: "#C9A84C", transform: "rotate(45deg)" }} />
            <span style={{ display: "flex" }}>{b}</span>
          </div>
        </div>

        <div style={{ fontSize: 30, letterSpacing: 14, textTransform: "uppercase", color: "rgba(232,201,122,0.75)", display: "flex" }}>
          Together with their families
        </div>

        <div style={{ fontSize: 150, fontStyle: "italic", color: "#E8C97A", display: "flex", marginTop: 40, lineHeight: 1 }}>{groom.firstName}</div>
        <div style={{ fontSize: 80, fontStyle: "italic", color: "rgba(201,168,76,0.8)", display: "flex", margin: "10px 0" }}>&amp;</div>
        <div style={{ fontSize: 150, fontStyle: "italic", color: "#E8C97A", display: "flex", lineHeight: 1 }}>{bride.firstName}</div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 60 }}>
          <div style={{ width: 220, height: 2, background: "linear-gradient(90deg, transparent, #C9A84C)", display: "flex" }} />
          <div style={{ width: 16, height: 16, background: "#C9A84C", transform: "rotate(45deg)", display: "flex" }} />
          <div style={{ width: 220, height: 2, background: "linear-gradient(90deg, #C9A84C, transparent)", display: "flex" }} />
        </div>

        <div style={{ fontSize: 34, marginTop: 60, letterSpacing: 10, textTransform: "uppercase", color: "rgba(255,248,240,0.7)", display: "flex" }}>
          Request the honour of your presence
        </div>
        <div style={{ fontSize: 72, marginTop: 30, color: "#FFF8F0", letterSpacing: 2, display: "flex" }}>{weddingDateDisplay}</div>
        <div style={{ fontSize: 30, marginTop: 10, letterSpacing: 8, textTransform: "uppercase", color: "rgba(232,201,122,0.75)", display: "flex" }}>{weddingDay}</div>

        <div style={{ fontSize: 34, marginTop: 70, color: "rgba(255,248,240,0.85)", display: "flex" }}>{ceremonies.wedding.venue}</div>
        <div style={{ fontSize: 26, marginTop: 8, letterSpacing: 4, textTransform: "uppercase", color: "rgba(255,248,240,0.55)", display: "flex" }}>
          {ceremonies.wedding.address}
        </div>
      </div>
    ),
    { width: 1080, height: 1920 },
  );
}
