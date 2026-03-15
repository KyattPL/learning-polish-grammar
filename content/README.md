# Content Structure

Each episode lives in:

- `content/episodes/<slug>/meta.json`
- `content/episodes/<slug>/lesson.mdx`

`meta.json` is generated and updated by `npm run content:sync`.

`lesson.mdx` is your authored/generated lesson file. It is created only once by sync if missing, so edits are preserved.

The frontmatter in `lesson.mdx` must match the schema in `lib/content-schema.ts`.

