import { ImageResponse } from "next/og";
import { copy, site } from "@/lib/copy";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f3efe6",
          color: "#161412",
          padding: "72px",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#5c564e",
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxWidth: 920,
          }}
        >
          <div style={{ fontSize: 72, lineHeight: 1.05, letterSpacing: -2 }}>
            {copy.headline}
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.4, color: "#5c564e" }}>
            {copy.sub}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
