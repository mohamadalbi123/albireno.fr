import {localePath} from "@/lib/i18n";
import {languageUrls} from "@/lib/language-routes";
import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/lib/site";
import { services } from "@/lib/services";
import { publishedProjects } from "@/lib/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexable || !siteUrl) return [];
  const origin=siteUrl;
  return [
    "",
    "/realisations",
    "/notre-approche",
    "/contact",
    ...services.filter((s) => s.confirmed).map((s) => `/${s.slug}`),
    ...publishedProjects.filter((p) => p.indexable !== false).map((p) => `/realisations/${p.slug}`),
  ].flatMap((path) => (["fr","en","ar"] as const).map(locale=>({
    url: `${siteUrl}${localePath(path||"/",locale)}`,
    alternates:{languages:languageUrls(path||"/",origin)},
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.6,
  })));
}
