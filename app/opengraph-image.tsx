import { ImageResponse } from "next/og";
export const alt =
  "Luna Plâtrerie — Votre intérieur, de nouvelles perspectives. Aytré et La Rochelle.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#f6f4ee",
          padding: "70px 80px",
          color: "#162e3b",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 27, letterSpacing: 5 }}>
          LUNA PLÂTRERIE
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 77,
            fontWeight: 700,
            lineHeight: 1.12,
          }}
        >
          <div>De beaux espaces.</div>
          <div style={{ color: "#b95d2a" }}>De nouvelles perspectives.</div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 23,
            justifyContent: "space-between",
          }}
        >
          <span>AYTRÉ · LA ROCHELLE</span>
          <span>Parlons de votre projet →</span>
        </div>
      </div>
    ),
    size,
  );
}
