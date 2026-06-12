import type { MetadataRoute } from "next";
import { villes } from "@/lib/data/villes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.equatys.ch";

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/a-propos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Pages légales volontairement absentes : elles sont en noindex,
    // les lister dans le sitemap contredit la directive et déclenche
    // une alerte Search Console.
    // Pages locales SEO
    ...villes.map((v) => ({
      url: `${base}/${v.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
