import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import {
  EpisodeFrontmatterSchema,
  EpisodeSchema,
  type Episode
} from "@/lib/content-schema";

const CONTENT_ROOT = path.join(process.cwd(), "content", "episodes");

export type EpisodeWithContent = Episode & { content: string };

function parsePartSegments(part: string): number[] {
  return part
    .split(".")
    .map((segment) => Number(segment))
    .filter((segment) => Number.isFinite(segment));
}

function compareParts(a: string, b: string): number {
  const aSegments = parsePartSegments(a);
  const bSegments = parsePartSegments(b);
  const maxLength = Math.max(aSegments.length, bSegments.length);

  for (let index = 0; index < maxLength; index += 1) {
    const left = aSegments[index] ?? 0;
    const right = bSegments[index] ?? 0;
    if (left !== right) {
      return left - right;
    }
  }

  return 0;
}

export async function getEpisodeSlugs(): Promise<string[]> {
  try {
    const entries = await fs.readdir(CONTENT_ROOT, { withFileTypes: true });
    return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  } catch {
    return [];
  }
}

export async function getEpisodeBySlug(
  slug: string
): Promise<EpisodeWithContent | null> {
  const episodeDir = path.join(CONTENT_ROOT, slug);
  const metaPath = path.join(episodeDir, "meta.json");
  const mdxPath = path.join(episodeDir, "lesson.mdx");

  try {
    const [metaRaw, mdxRaw] = await Promise.all([
      fs.readFile(metaPath, "utf8"),
      fs.readFile(mdxPath, "utf8")
    ]);

    const parsedMeta = EpisodeSchema.parse(JSON.parse(metaRaw));
    let parsedMdx = { data: {}, content: mdxRaw };
    try {
      parsedMdx = matter(mdxRaw);
    } catch {
      // Fallback: treat the entire file as content if frontmatter is invalid.
      parsedMdx = { data: {}, content: mdxRaw };
    }

    const frontmatter = EpisodeFrontmatterSchema.parse(parsedMdx.data);

    const mergedEpisode = EpisodeSchema.parse({
      ...parsedMeta,
      ...frontmatter,
      slug: parsedMeta.slug,
      part: parsedMeta.part,
      title: parsedMeta.title,
      youtubeId: parsedMeta.youtubeId,
      youtubeUrl: parsedMeta.youtubeUrl,
      durationSec: parsedMeta.durationSec
    });

    return {
      ...mergedEpisode,
      content: parsedMdx.content
    };
  } catch {
    return null;
  }
}

export async function getAllEpisodes(options?: {
  publishedOnly?: boolean;
}): Promise<EpisodeWithContent[]> {
  const slugs = await getEpisodeSlugs();
  const entries = await Promise.all(slugs.map((slug) => getEpisodeBySlug(slug)));
  const episodes = entries.filter((entry): entry is EpisodeWithContent => Boolean(entry));
  const sorted = episodes.sort((left, right) => {
    const partComparison = compareParts(left.part, right.part);
    if (partComparison !== 0) {
      return partComparison;
    }
    return left.title.localeCompare(right.title);
  });

  if (options?.publishedOnly) {
    return sorted.filter((episode) => episode.published);
  }

  return sorted;
}
