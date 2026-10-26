import { isIndexable, siteUrl } from "./lib/site";
import type { NextConfig } from "next";
const allowIndex = isIndexable;
let canonicalHost = "";
try {
  canonicalHost = new URL(siteUrl || "").hostname.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );
} catch {}
const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          ...(!allowIndex || !canonicalHost
            ? [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }]
            : []),
        ],
      },
      ...(allowIndex && canonicalHost
        ? [
            {
              source: "/:path*",
              missing: [{ type: "host" as const, value: canonicalHost }],
              headers: [
                { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
              ],
            },
          ]
        : []),
    ];
  },
};
export default nextConfig;
