import {readFile} from "node:fs/promises";
import {join} from "node:path";
import { business } from "@/lib/business";
import { ImageResponse } from "next/og";
export const alt = "Conception et installation de cuisines à La Rochelle";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image() {
  const logo="data:image/png;base64,"+(await readFile(join(process.cwd(),"public/brand/albireno-emblem.png"))).toString("base64");
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
        <div style={{ display: "flex", alignItems:"center",gap:24,fontSize: 27, letterSpacing: 5 }}>
          <img src={logo} width={110} height={110} alt=""/>
          {business.name}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 58,
            fontWeight: 700,
            lineHeight: 1.12,
          }}
        >
          <div>Conception et installation</div>
          <div style={{ color: "#526976" }}>de cuisines à La Rochelle.</div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 23,
            justifyContent: "space-between",
          }}
        >
          <span>LA ROCHELLE · CHARENTE-MARITIME</span>
          <span>Parlons de votre projet →</span>
        </div>
      </div>
    ),
    size,
  );
}
