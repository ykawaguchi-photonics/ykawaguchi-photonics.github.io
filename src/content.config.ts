import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { categorySlugs } from "./data/categories";

// `2024-foo/index.yaml` -> `2024-foo`; `bar.mdx` -> `bar`.
const folderOrFileId = ({ entry }: { entry: string }) =>
  entry.replace(/\/index\.(ya?ml|mdx?)$/, "").replace(/\.(ya?ml|mdx?)$/, "");

const optionalUrl = z.url().optional();

const publications = defineCollection({
  loader: glob({ pattern: "*/index.{yaml,yml}", base: "./src/content/publications", generateId: folderOrFileId }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      authors: z.array(z.string()).min(1),
      year: z.number().int(),
      date: z.coerce.date().optional(),
      venue: z.string(),
      venueShort: z.string().optional(),
      volume: z.string().optional(),
      issue: z.string().optional(),
      pages: z.string().optional(),
      type: z.enum(["journal", "conference", "preprint", "thesis", "book-chapter"]),
      doi: z.string().optional(),
      url: optionalUrl,
      arxiv: z.string().optional(),
      pdf: optionalUrl,
      code: optionalUrl,
      abstract: z.string().optional(),
      areas: z.array(reference("research")).default([]),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      selfRole: z.enum(["first", "corresponding", "co"]).optional(),
      // Drop an image into the paper's folder and reference it as ./file.png
      image: image().optional(),
      imageAlt: z.string().optional(),
      figures: z
        .array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() }))
        .default([]),
    })
    .refine((d) => !d.image || !!d.imageAlt, { message: "imageAlt is required when image is set", path: ["imageAlt"] }),
});

const research = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/research", generateId: folderOrFileId }),
  schema: z.object({
    title: z.string(),
    short: z.string(),
    description: z.string(),
    order: z.number(),
    questions: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: ["*.{md,mdx}", "*/index.{md,mdx}"], base: "./src/content/projects", generateId: folderOrFileId }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      status: z.enum(["active", "maintained", "archived"]).default("active"),
      repo: optionalUrl,
      website: optionalUrl,
      technologies: z.array(z.string()).default([]),
      areas: z.array(reference("research")).default([]),
      featured: z.boolean().default(false),
      image: image().optional(),
      imageAlt: z.string().optional(),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: ["*.{md,mdx}", "*/index.{md,mdx}"], base: "./src/content/blog", generateId: folderOrFileId }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      category: z.enum(categorySlugs),
      tags: z.array(z.string()).default([]),
      author: z.string().default("Yuma Kawaguchi"),
      image: image().optional(),
      imageAlt: z.string().optional(),
      draft: z.boolean().default(false),
      areas: z.array(reference("research")).default([]),
      relatedPublications: z.array(reference("publications")).default([]),
    }),
});

export const collections = { publications, research, projects, blog };
