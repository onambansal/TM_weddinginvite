import { ImageResponse } from "next/og";
import { weddingConfig } from "@/config/weddingConfig";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon — couple monogram (groom first: T·M) in engraved gold on maroon */
export default function Icon() {
  const g = weddingConfig.groom.firstName[0];
  const b = weddingConfig.bride.firstName[0];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #4A0A12, #6B0F1A)",
          borderRadius: 16,
          border: "2px solid #C9A84C",
          color: "#E8C97A",
          fontSize: 28,
          fontFamily: "Georgia, 'Times New Roman', serif",
          gap: 3,
        }}
      >
        <span style={{ display: "flex" }}>{g}</span>
        <span style={{ display: "flex", width: 5, height: 5, background: "#C9A84C", transform: "rotate(45deg)" }} />
        <span style={{ display: "flex" }}>{b}</span>
      </div>
    ),
    { ...size },
  );
}
