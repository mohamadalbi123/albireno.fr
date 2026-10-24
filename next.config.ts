import { business } from "./lib/business";
import type { NextConfig } from "next";
const allowIndex =
  business.brandApproved &&
  business.legalApproved &&
  business.privacyApproved &&
  business.servicesApproved &&
  business.launchApproved &&
  process.env.SITE_INDEXABLE === "true" &&
  process.env.VERCEL_ENV !== "preview";
let canonicalHost = "";
try {
  canonicalHost = new URL(process.env.SITE_URL || "").hostname.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );
} catch {}
const nextConfig: NextConfig = {
  poweredByHeader: false,
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
