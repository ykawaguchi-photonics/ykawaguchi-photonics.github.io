# Agent guide: Yuma Kawaguchi research site

Static Astro 7 site (TypeScript, MDX, plain CSS), deployed to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main`.
Live URL: https://ykawaguchi-photonics.github.io (`site` in `astro.config.mjs`).

## Hard rules (never break these)

1. **Samsung.** The only permitted mentions are the affiliation "Researcher at
   Samsung R&D" (from `src/data/site.ts`) and the single word "metasurfaces"
   to describe the work there (e.g. "…, where I work on metasurfaces",
   "Metasurfaces."). Never name tools, projects, products, customers, results
   or unpublished work there, and never infer or speculate about them. No
   Samsung images or data. The same applies to the resume in `resume/`.
2. **No patents.** No Patents page, nav item, list, or mention anywhere.
3. **The CV is private reference material.** Yuma's full CV contains
   confidential information. Never copy, commit, upload, or link it. Read it
   only to learn facts, retype approved public facts into `src/data/*.ts`, and
   skip anything about patents or confidential work. `.gitignore` blocks
   `private/`, `*.pdf`, and `*.docx` as a safety net. Keep any local copy
   outside this repo. **One exception:** the separate 2-page industry resume
   built from public facts only (Typst sources in `resume/`, PDFs in the
   ignored `resume/build/`) may be published as `public/resume.pdf` (allowed
   by `!public/resume.pdf` in `.gitignore`) — but only after Yuma approves
   that exact PDF and every `[INSERT]`/`[CHECK]` placeholder in it is
   resolved. The download button/link appears only when `site.resumePdf` is
   set in `src/data/site.ts`.
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
`$$display math$$` (KaTeX), fenced code blocks (Shiki), GFM footnotes, and the
reading aids `Term`, `Glossary` + `Def`, `Symbols` and `Callout`
(`src/components/`, usage in "Writing technical articles" below).

## Writing technical articles

Technical posts (devices, simulation methods, optimization, ...) form a
textbook-style reference for beginners in PIC design. Every new or revised
technical post follows these rules so the blog stays consistent. The model
posts are `src/content/blog/{directional-couplers-cmt-fdtd,mach-zehnder-interferometers,ring-resonators,grating-couplers-phase-matching-fdtd,coupling-interference-resonance-pic}/index.mdx`.

### Editorial principles
- **Each post stands alone.** No series framing ("Part 2", "第2回", "the
  previous part", a series tag). Point to related posts with named links
  ("see [Ring Resonators](/blog/ring-resonators/)"). Each post states its own
  model, assumptions and definitions instead of relying on another post.
- **Learning order:** purpose → physical intuition → equation → meaning of
  every symbol → assumptions → design implications → simulation.
- **Design viewpoint:** readers should come away knowing *what to change to
  get which property*: which geometry or process parameter sets each symbol,
  which ones the designer controls and which fabrication fixes, and what must
  be tuned to reach a target condition.
- Beginner-friendly does not mean superficial: keep the equations, the
  assumptions and the limits, and explain them.

### Structure (both languages, in parallel)
```
**Language:** [English](#english) · [日本語](#日本語)
## English
(opening paragraph: a self-contained definition, "A ... is a ... that ...")
### Overview        purpose, uses, basic structure (Fig. 1 here)
### Theory          #### subsections; ends with a "What changes what" table
### Simulation      #### model used, what is extracted, theory vs simulation
### Code and data
---
## 日本語           same structure: 概要 / 理論 / シミュレーション / コードとデータ
---
## References / 参考文献   (shared GFM footnotes)
```
The TOC shows only h2/h3, so use `####` for subsections. Keep the Japanese half
a faithful parallel of the English (same sections, numbers, figures, boxes).
Omit the Simulation section only when simulation is genuinely irrelevant.

### Reading aids (components)
- **After every display equation**, leave a blank line and add a `Symbols` box
  that defines every symbol with its unit. Use a markdown list, or a table for
  parameter overviews (blank lines inside the tags around a table):
  ```mdx
  $$
  \mathrm{FSR} = \frac{\lambda^2}{n_g L}
  $$

  <Symbols>

  - $\lambda$ — vacuum wavelength (µm)
  - $n_g$ — group index (dimensionless)

  </Symbols>
  ```
  Japanese: `<Symbols title="記号">`. Display math must be multi-line `$$`;
  a one-line `$$ x $$` renders inline.
  - **Never split a sentence across an equation and its Symbols box.** Finish
    the lead-in before the equation ("… the transmission is:"), and start the
    text after the box as a new sentence. In Japanese put the verb before the
    equation (「…次のようになります。」), never 「となります。」 after the box.
  - One symbol per bullet; only symbols go in Symbols (conventions and remarks
    such as "boundary terms are omitted" go in the prose or a note Callout).
    Mark terms with `Term` in the prose, not inside a Symbols bullet.
  - Keep equations narrow enough for a phone: no `\qquad … \Longrightarrow …`
    chains; split them with `\begin{aligned} … \\ … \end{aligned}` or into
    separate equations.
- **Technical terms**: mark the first occurrence with
  `<Term id="en-fsr" n={3}>free spectral range</Term>` (shows ※3) and explain
  it in a `Glossary` right after that paragraph:
  ```mdx
  <Glossary>
  <Def id="en-fsr" n={3} term="Free spectral range (FSR)">
  Plain-language definition, $math$ allowed.
  </Def>
  </Glossary>
  ```
  Japanese: `<Glossary title="用語">`, ids `ja-...`. Ids must be unique on the
  page (prefix `en-`/`ja-`); use each `Term` id once; number terms from 1 in
  each language half; every `Term` needs a `Def` (a `Def` without a `Term`
  needs `back={false}`); `Def` only inside `Glossary`. Each post defines its
  own terms (posts are independent), e.g. effective index, group index, FSR,
  Q factor, finesse.
- **Design takeaways** go in `<Callout kind="design" title="What this means for design">`
  (日本語 `title="設計上の意味"`); assumptions and caveats in
  `<Callout kind="note" title="Assumptions">` (`title="前提"`). Put blank lines
  inside the tags when the content has paragraphs, tables or display math.
- **Each Theory section ends with a design table** inside a design Callout:
  `| If you change… | …this happens | Why |` (日本語 `| 変えるもの | 起こること | 理由 |`),
  or, when the cells are full sentences, a list of
  "**change** → effect. *Why:* reason" items (better on phones).
- **Box rhythm:** place each Glossary right after the paragraph that marks the
  term (split a Glossary rather than collect definitions at the end of a long
  subsection); never put two tables back to back or a Glossary directly against
  a Callout without a sentence of prose between them.
- Colours: the amber accent family means "terms" (※ and Glossary); Symbols is
  neutral; Callout design has an amber left rule, note a grey rule. Do not add
  new hues (tokens only in `src/styles/tokens.css`).

### Notation and conventions
- State every convention that changes a formula: field amplitude vs power;
  amplitude vs energy decay rates; $e^{+j\omega t}$ vs $e^{-i\omega t}$.
- `κ` must be labelled: coupling coefficient per length (µm⁻¹) in
  coupled-mode theory, or the dimensionless field cross-coupling in coupler
  matrices ($t^2+\kappa^2=1$, power $K=\kappa^2$). Do not reuse a symbol for two
  quantities in one post (e.g. grating vector `K_g` vs power coupling `K`).
- Use the group index $n_g$ for FSR and linewidth; say so explicitly.

### Metadata and SEO
- `title`: short and centred on the device or method ("Ring Resonators").
  The layout renders it as the only H1; do not add another `#` heading.
- `description`: starts with a definition, ≤ 160 characters, no "English and
  Japanese".
- Revisions of published posts add `updated: YYYY-MM-DD`; new posts drafted by
  Claude start with `draft: true` (hard rule 5). Never change a post's folder
  name (it is the URL).

### Technical accuracy
- Check every key equation against textbooks, review papers or dissertations,
  and by re-deriving or recomputing it; verify every DOI with Crossref
  (`https://api.crossref.org/works/<DOI>`). Flag anything that cannot be
  verified instead of asserting it.
- Numbers come only from saved simulation data or cited sources; say which.
  Distinguish ideal analytic models from 2D/effective-index simulations and
  from measured devices.
- Figures are generated from saved data by scripts in
  `photonics-simulation-toolkit/scripts/blog_figures/` (one script per post),
  following the figure rule under Conventions.

### Checks for a technical post
```bash
npm run build && npx astro check
f=dist/blog/<slug>/index.html
grep -c katex-error $f                                  # expect 0
grep -o ' id="[^"]*"' $f | sort | uniq -d               # expect nothing
grep -nE "Part [0-9]|第[0-9]回|four-part" src/content/blog/<slug>/index.mdx   # expect nothing
```
Drafts are excluded from `npm run build` (`src/utils/content.ts`) but shown by
`npm run dev`. To run the checks above on a draft, set `draft: false`
temporarily, build, check, and set it back.

### Categories, research areas, coursework, profile links
- Blog categories: `src/data/categories.ts` (the single source).
- Research areas: `src/content/research/*.md` (`order` controls the sort).
- Coursework (shown only near the bottom of `/cv/`): `src/data/coursework.ts`.
- Positions, education, honors: `src/data/timeline.ts`.
- Name, links, email, ORCID, Search Console token: `src/data/site.ts`.

## Conventions
- Figures: no text, legend or label may overlap the drawn structure or the data
  (labels outside the structure, legends outside busy axes; check every PNG).
  Same rule as `photonics-simulation-toolkit/CLAUDE.md` §3.
- Colors are defined only in `src/styles/tokens.css`. There is one amber accent
  (`--accent`), and categories are never color-coded.
- Fonts: Inter (UI), Source Serif 4 (long-form), JetBrains Mono (code), all
  self-hosted via @fontsource.
- Markdown uses the `unified` processor (`@astrojs/markdown-remark`) so that
  remark-math and rehype-katex run. Astro 7's default Sätteri processor would skip them.
- In `.astro` templates, a link that starts on a new source line after text
  needs `{" "}` at the end of the previous line, or the space is dropped.

### "Confirm a publication's role / key result"
Publication yaml files may carry `role:` and `keyResult:` (shown as "My role" /
"Key result" above the abstract on research and publication pages). They are
currently not set: the drafts are parked in the git-ignored `private/TODO.md`
until Yuma confirms them. Any value containing `[` (e.g. `[CHECK]`) is never
rendered (`isConfirmed()` in `src/utils/content.ts`). Home-page order:
`featuredRank` (1 = first).

## Verify before committing
```bash
npm run build && npx astro check
grep -ril "patent" dist/ ; echo "(expect nothing)"
grep -rl "Samsung" dist/ | head   # only the affiliation (+ "metasurfaces") should match
grep -rn "\[CHECK\]\|\[INSERT" dist/ | head   # expect nothing (placeholders never published)
git ls-files | grep -iE "\.(pdf|docx)$|cv" ; echo "(expect no CV files)"
```
