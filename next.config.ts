import {estimatorPath} from "./lib/estimator-path.mjs";
import { isIndexable, siteUrl } from "./lib/site";
import { retiredServiceRedirects } from "./lib/services";
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
  async redirects() {
    return [...['','/en','/ar'].map(prefix=>({source:`${prefix}/testing/:path*`,destination:prefix+estimatorPath,permanent:true})),...Object.entries(retiredServiceRedirects).map(([source, destination]) => ({source, destination, permanent: true}))];
  },
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
      {source:"/:locale(en|ar)/simulateur-pose-cuisine/:path*",headers:[{key:"X-Robots-Tag",value:"noindex, nofollow, noarchive"},{key:"Referrer-Policy",value:"no-referrer"}]},
      {
        source: "/simulateur-pose-cuisine/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
    ];
  },
};
export default nextConfig;
