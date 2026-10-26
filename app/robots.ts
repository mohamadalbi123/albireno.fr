import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  // Crawlers must be able to read the noindex headers during pre-launch.
  // A blanket Disallow would hide those directives from Google.
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    ...(isIndexable && siteUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
