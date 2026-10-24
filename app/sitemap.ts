import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/lib/site";
import { services } from "@/lib/services";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexable || !siteUrl) return [];
  return [
    "",
    "/prestations",
    "/realisations",
    "/a-propos",
    "/contact",
    ...services.filter((s) => s.confirmed).map((s) => `/prestations/${s.slug}`),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
