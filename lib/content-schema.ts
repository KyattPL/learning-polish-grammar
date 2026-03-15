import { z } from "zod";

const OptionalString = z.preprocess(
  (value) => {
    if (typeof value === "string" && value.trim() === "") {
      return undefined;
    }
    return value;
  },
  z.string().min(1).optional()
);

const OptionalUrl = z.preprocess(
  (value) => {
    if (typeof value === "string" && value.trim() === "") {
      return undefined;
    }
    return value;
  },
  z.string().url().optional()
);

const PartString = z.preprocess(
  (value) => {
    if (typeof value === "number") {
      return String(value);
    }
    return value;
  },
  z.string().min(1)
);

const DurationNumber = z.preprocess(
  (value) => {
    if (typeof value === "string" && value.trim() !== "") {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : value;
    }
    return value;
  },
  z.number().int().nonnegative().optional()
);

const TagsArray = z.preprocess(
  (value) => {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === "string") {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
    return [];
  },
  z.array(z.string())
);

const PublishedBoolean = z.preprocess(
  (value) => {
    if (typeof value === "string") {
      return value.trim().toLowerCase() === "true";
    }
    return value;
  },
  z.boolean()
);

export const EpisodeSchema = z.object({
  part: PartString,
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  youtubeId: OptionalString,
  youtubeUrl: OptionalUrl,
  durationSec: DurationNumber,
  summary: OptionalString,
  tags: TagsArray.default([]),
  level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  published: PublishedBoolean.default(false),
  sourceDir: z.string().min(1),
  sourceFiles: z.array(z.string()).default([]),
  updatedAt: OptionalString
});

export const EpisodeFrontmatterSchema = EpisodeSchema.omit({
  sourceDir: true,
  sourceFiles: true,
  updatedAt: true
}).partial();

export type Episode = z.infer<typeof EpisodeSchema>;
export type EpisodeFrontmatter = z.infer<typeof EpisodeFrontmatterSchema>;
