import { ImageResponse } from "next/og";
import { weddingConfig } from "@/config/weddingConfig";

export const alt = "Wedding Invitation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social-share preview (WhatsApp / iMessage / Twitter).
 * Generated at build/request time — no image file to maintain.
 */
export default function OpenGraphImage() {
  const { bride, groom, weddingDateDisplay, ceremonies } = weddingConfig;

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
          background: "linear-gradient(160deg, #1A0507 0%, #4A0A12 45%, #6B0F1A 75%, #2A0608 100%)",
          color: "#E8C97A",
          fontFamily: "Georgia, 'Times New Roman', serif",
          position: "relative",
        }}
      >
        {/* Frame */}
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: "1px solid rgba(201,168,76,0.45)",
            borderRadius: 24,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 40,
            border: "1px solid rgba(201,168,76,0.25)",
            borderRadius: 18,
            display: "flex",
          }}
        />

        <div style={{ fontSize: 22, letterSpacing: 10, textTransform: "uppercase", color: "rgba(232,201,122,0.75)", display: "flex" }}>
          Together with their families
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 36, marginTop: 28 }}>
          <div style={{ fontSize: 112, fontStyle: "italic", color: "#E8C97A", display: "flex" }}>{groom.firstName}</div>
          <div style={{ fontSize: 64, fontStyle: "italic", color: "rgba(201,168,76,0.8)", display: "flex" }}>&amp;</div>
          <div style={{ fontSize: 112, fontStyle: "italic", color: "#E8C97A", display: "flex" }}>{bride.firstName}</div>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 24 }}>
          <div style={{ width: 160, height: 1, background: "linear-gradient(90deg, transparent, #C9A84C)", display: "flex" }} />
          <div style={{ width: 12, height: 12, background: "#C9A84C", transform: "rotate(45deg)", display: "flex" }} />
          <div style={{ width: 160, height: 1, background: "linear-gradient(90deg, #C9A84C, transparent)", display: "flex" }} />
        </div>

        <div style={{ fontSize: 40, marginTop: 28, color: "#FFF8F0", letterSpacing: 2, display: "flex" }}>{weddingDateDisplay}</div>
        <div style={{ fontSize: 22, marginTop: 10, color: "rgba(255,248,240,0.7)", letterSpacing: 4, textTransform: "uppercase", display: "flex" }}>
          {ceremonies.wedding.venue} · {ceremonies.wedding.address}
        </div>
      </div>
    ),
    { ...size },
  );
}
