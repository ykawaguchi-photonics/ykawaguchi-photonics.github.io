# Agent guide: Yuma Kawaguchi research site

Static Astro 7 site (TypeScript, MDX, plain CSS), deployed to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main`.
Live URL: https://ykawaguchi-photonics.github.io (`site` in `astro.config.mjs`).

## Hard rules (never break these)

1. **Samsung.** The only permitted mention is the affiliation "Researcher at
   Samsung R&D" (from `src/data/site.ts`). Never describe, infer, or speculate
   about work, projects, products, or unpublished results there. No Samsung
   images or data.
2. **No patents.** No Patents page, nav item, list, or mention anywhere.
3. **The CV is private reference material.** Yuma's full CV contains
   confidential information. Never copy, commit, upload, or link it (no PDF in
   `public/`). Read it only to learn facts, retype approved public facts into
   `src/data/*.ts`, and skip anything about patents or confidential work.
   `.gitignore` blocks `private/`, `*.pdf`, and `*.docx` as a safety net. Keep
   any local copy outside this repo.
4. **Don't invent content.** Publication metadata comes from DOI/Crossref/arXiv
   or from Yuma. Leave a field empty rather than guessing it.
5. **Blog posts drafted by Claude start with `draft: true`.** Yuma reviews them
   before publishing.

## Common tasks

### "Add this paper to the publication archive"
1. Create `src/content/publications/YYYY-firstauthorfamily-venue/index.yaml`
   (all lowercase ASCII, e.g. `2024-kawaguchi-sciadv`).
2. Fill it from Crossref (`https://api.crossref.org/works/<DOI>`) or arXiv.
   Schema: `src/content.config.ts`. Required: `title, authors, year, venue, type`.
   Also set `date`, `doi`/`arxiv`, `venueShort`, `volume`, `issue`, `pages`,
   `abstract` (if public), `areas` (ids of `src/content/research/*.md`),
   `tags`, `featured` (shown on Home, keep about 5), and `selfRole`.
3. Build to validate: `npm run build`.

### "Add a figure to this paper"
Put the image file in the paper's folder, then add:
```yaml
image: ./figure.png
imageAlt: "What the figure shows"
# extra figures for the paper's own page:
figures:
  - src: ./fig2.png
    alt: "..."
    caption: "... Reproduced from <journal>, <license>."
```
Astro optimizes images automatically. Only use figures Yuma supplies.

### "Add this Markdown to the blog"
Create `src/content/blog/<slug>/index.mdx` (put images next to it) with this frontmatter:
```yaml
title: ...
description: ...          # 1–2 sentences, used for SEO and cards
date: YYYY-MM-DD
category: research | technical-notes | career | life
tags: [ ... ]
areas: [ ... ]            # optional research-area ids
relatedPublications: [ ... ]  # optional publication ids
draft: true               # until Yuma approves
```
Available MDX components: `Figure` (`src/components/Figure.astro`),
`Cite pub="<publication-id>"` (`src/components/Cite.astro`), `$math$` and
`$$display math$$` (KaTeX), fenced code blocks (Shiki), and GFM footnotes.

### Categories, research areas, coursework, profile links
- Blog categories: `src/data/categories.ts` (the single source).
- Research areas: `src/content/research/*.md` (`order` controls the sort).
- Coursework (shown only near the bottom of `/cv/`): `src/data/coursework.ts`.
- Positions, education, honors: `src/data/timeline.ts`.
- Name, links, email, ORCID, Search Console token: `src/data/site.ts`.

## Conventions
- Colors are defined only in `src/styles/tokens.css`. There is one amber accent
  (`--accent`), and categories are never color-coded.
- Fonts: Inter (UI), Source Serif 4 (long-form), JetBrains Mono (code), all
  self-hosted via @fontsource.
- Markdown uses the `unified` processor (`@astrojs/markdown-remark`) so that
  remark-math and rehype-katex run. Astro 7's default Sätteri processor would skip them.
- In `.astro` templates, a link that starts on a new source line after text
  needs `{" "}` at the end of the previous line, or the space is dropped.

## Verify before committing
```bash
npm run build && npx astro check
grep -ril "patent" dist/ ; echo "(expect nothing)"
grep -rl "Samsung" dist/ | head   # only affiliation text should match
git ls-files | grep -iE "\.(pdf|docx)$|cv" ; echo "(expect no CV files)"
```
