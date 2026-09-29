# ykawaguchi-photonics.github.io

Personal research site of **Yuma Kawaguchi**, a photonics researcher working on
metasurfaces, silicon photonics, and topological photonics. The site covers
research areas, the full publication archive, projects, a blog with technical
notes, and a CV.

Built with [Astro](https://astro.build) (static output), TypeScript, MDX, and plain CSS.
It is deployed to GitHub Pages by GitHub Actions.

## Develop

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve dist/
npx astro check   # type-check .astro/.ts
```

## Content

| What | Where |
|---|---|
| Publications (one folder per paper, images alongside) | `src/content/publications/<id>/index.yaml` |
| Research areas | `src/content/research/*.md` |
| Projects | `src/content/projects/<slug>/index.mdx` |
| Blog posts | `src/content/blog/<slug>/index.mdx` |
| Blog categories | `src/data/categories.ts` |
| Profile, links, affiliation | `src/data/site.ts` |
| Positions, education, honors | `src/data/timeline.ts` |
| Coursework (CV page) | `src/data/coursework.ts` |

Schemas are defined in `src/content.config.ts`. An invalid entry fails the build.
See `CLAUDE.md` for step-by-step recipes.

## Deploy

On GitHub, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
After that, every push to `main` builds and deploys the site.

**Custom domain (later):** add `public/CNAME` containing the domain, change `site` in
`astro.config.mjs` and the `Sitemap:` line in `public/robots.txt`, then configure
DNS as described in GitHub's Pages documentation.

**Google Search Console:** paste the HTML-tag verification token into
`googleSiteVerification` in `src/data/site.ts`, then submit `/sitemap-index.xml`.
