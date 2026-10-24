import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return isIndexable && siteUrl
    ? {
        rules: { userAgent: "*", allow: "/", disallow: "/api/" },
        sitemap: `${siteUrl}/sitemap.xml`,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
