# Learning Polish Grammar Web

Next.js + Tailwind + shadcn architecture for rendering episode MDX files as static lesson pages.

See [`PROJECT_CONTEXT.md`](./PROJECT_CONTEXT.md) for a full handoff context and future roadmap.

## Stack

- Next.js (App Router)
- Tailwind CSS
- shadcn-style UI components
- MDX rendering with `next-mdx-remote`
- Zod schema validation

## Setup

```bash
npm install
npm run content:sync
npm run content:validate
npm run llm:prompt -- part-1-polish-alphabet-and-letters
npm run dev
```

## Content Pipeline

1. `npm run content:sync`
   - Scans raw episode folders one level above `web/`
   - Reads `../playlist.json`
   - Also reads `web/playlist.override.json` or `web/playlist.override.local.json` if present
   - Generates/updates `content/episodes/<slug>/meta.json`
   - Creates draft `lesson.mdx` only if missing
2. Generate/replace `lesson.mdx` using your LLM workflow
   - `npm run llm:prompt -- <slug>` creates `llm-prompt.md` for one episode
   - `npm run llm:prompt` creates prompts for all episodes
   - `npm run llm:generate -- --slug <slug>` calls Gemini and writes `lesson.mdx`
   - Set `API_KEY` directly in `scripts/generate-mdx-gemini.py`
   - Optional: `--overwrite` to skip backup, `--dry-run` for a preview
   - `--delay 5` is the default (15 req/min safe)
   - `--model gemini-3.1-flash-lite-preview` to override model
   - `--thinking LOW|MEDIUM|HIGH` (default LOW)
   - `--use-search` enables Google Search tool (higher quota usage)
3. `npm run content:validate` to enforce metadata and frontmatter integrity
4. Build or run dev server

## Routes

- `/` homepage
- `/episodes` list of all episodes
- `/episodes/[slug]` lesson detail page

## Frontmatter Contract

Each `lesson.mdx` must include:

- `part` string
- `title` string
- `slug` string
- `youtubeId` optional string
- `youtubeUrl` optional URL string
- `durationSec` optional number
- `summary` optional string
- `tags` string array
- `level` optional: `beginner | intermediate | advanced`
- `published` boolean
