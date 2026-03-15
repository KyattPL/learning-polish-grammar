# Project Context: Learning Polish Grammar Web

Last updated: 2026-03-06

## Purpose

Build a static website version of the YouTube course "Learning Polish Grammar" using:

- Next.js (App Router)
- Tailwind CSS
- shadcn-style components
- MDX lesson pages generated from raw episode materials

Raw source materials live one directory above `web/` in per-episode folders (e.g. `1 - Polish Alphabet and Letters`), plus `playlist.json`.

## Current Status

- Next.js app scaffold is complete and builds successfully.
- Content pipeline is in place and validated.
- 40 episode content folders were generated in `web/content/episodes`.
- Each episode currently has:
  - `meta.json` (normalized metadata)
  - `lesson.mdx` (draft template, `published: false`)

## Key Architecture Decisions

1. Two-layer content model:
   - Raw layer: existing local episode folders + transcripts/scripts.
   - Web layer: normalized MDX + metadata under `web/content/episodes`.
2. Stable slug strategy:
   - `part-<part-with-dots-replaced>-<title-slug>`
   - Example: `part-14-5-morphophonologic-alternations`
3. Static generation:
   - `generateStaticParams()` for all episode slugs.
   - Pages are pre-rendered (SSG) for speed and easy deployment.
4. Strong schema validation:
   - Zod schema for `meta.json` and MDX frontmatter.

## Important Files

- App routes:
  - `app/page.tsx`
  - `app/episodes/page.tsx`
  - `app/episodes/[slug]/page.tsx`
- Content logic:
  - `lib/content.ts`
  - `lib/content-schema.ts`
  - `lib/mdx.tsx`
  - `components/mdx-components.tsx`
- Automation scripts:
- `scripts/sync-episodes.ts`
- `scripts/validate-content.ts`
- `scripts/build-llm-prompt.ts`
- `scripts/generate-mdx-gemini.ts`
- `playlist.override.example.json`
- Prompt template:
  - `prompts/episode-mdx.prompt.md`

## Daily Workflow

From `web/`:

1. `npm run content:sync`
2. `npm run llm:prompt -- <episode-slug>` (or no slug for all episodes)
3. Generate/replace `content/episodes/<slug>/lesson.mdx` using LLM
   - `npm run llm:generate -- --slug <episode-slug>`
   - Requires `API_KEY` set inside `scripts/generate-mdx-gemini.py`
   - Default delay is 5s between requests
   - `--use-search` may trigger higher quota usage
4. Set `published: true` in frontmatter when episode is ready
5. `npm run content:validate`
6. `npm run dev` (or `npm run build`)

## Frontmatter Contract (lesson.mdx)

Required/expected keys:

- `part` (string; keep as string for values like `14.5`)
- `title` (string)
- `slug` (string)
- `youtubeId` (optional string)
- `youtubeUrl` (optional URL string)
- `durationSec` (optional number)
- `summary` (optional string)
- `tags` (string array)
- `level` (`beginner | intermediate | advanced`, optional)
- `published` (boolean)

## Future Styling / Dark Mode Plan

When you come back for design iteration:

1. Add theme provider (`next-themes`) in root layout.
2. Extend CSS variables in `app/globals.css` with dark tokens.
3. Add a theme toggle component in header.
4. Tune prose colors (`prose` + table/callout/readability in dark mode).
5. Verify contrast and spacing on:
   - homepage hero
   - episode cards
   - MDX content pages
6. Re-run:
   - `npm run build`
   - visual pass on desktop + mobile

## Known Notes

- `content:sync` updates `meta.json` each run but does **not** overwrite existing `lesson.mdx`.
- Home page currently shows drafts if no published episodes exist.
- `llm-prompt.md` files are ignored by git (`.gitignore`).
- If `playlist.json` is missing entries, add them to `web/playlist.override.json` or `web/playlist.override.local.json`.

## Quick Restart Checklist

1. Open `web/PROJECT_CONTEXT.md` (this file).
2. Run `npm install` (if needed).
3. Run `npm run content:validate`.
4. Start dev server with `npm run dev`.
5. Continue from either:
   - content generation (`lesson.mdx` files), or
   - design improvements (dark mode / styling).
