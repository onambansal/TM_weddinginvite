import { ImageResponse } from "next/og";
import { weddingConfig } from "@/config/weddingConfig";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon — couple initials in gold on maroon */
export default function Icon() {
  const initials = `${weddingConfig.bride.firstName[0]}${weddingConfig.groom.firstName[0]}`;
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
          fontSize: 30,
          fontStyle: "italic",
          fontFamily: "Georgia, serif",
          letterSpacing: -1,
        }}
      >
        {initials}
      </div>
    ),
    { ...size },
  );
}
