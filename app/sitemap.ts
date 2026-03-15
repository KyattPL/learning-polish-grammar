import type { MetadataRoute } from "next";
import { getEpisodeSlugs } from "@/lib/content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getEpisodeSlugs();
  const episodeUrls = slugs.map((slug) => ({
    url: `${SITE_URL}/episodes/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${SITE_URL}/episodes`,
      changeFrequency: "daily",
      priority: 0.9
    },
    ...episodeUrls
  ];
}

