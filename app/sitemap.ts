import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/lib/site";
import { services } from "@/lib/services";
import { publishedProjects } from "@/lib/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexable || !siteUrl) return [];
  return [
    "",
    "/realisations",
    "/notre-approche",
    "/contact",
    "/devis",
    ...services.filter((s) => s.confirmed).map((s) => `/${s.slug}`),
    ...publishedProjects.map((p) => `/realisations/${p.slug}`),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.6,
  }));
}
