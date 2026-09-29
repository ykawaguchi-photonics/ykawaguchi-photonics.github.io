import { getCollection, type CollectionEntry } from "astro:content";

export type Publication = CollectionEntry<"publications">;
export type Post = CollectionEntry<"blog">;
export type Project = CollectionEntry<"projects">;
export type ResearchArea = CollectionEntry<"research">;

export const SELF_NAME = /kawaguchi/i;

export const pubTypeLabel: Record<Publication["data"]["type"], string> = {
  journal: "Journal article",
  conference: "Conference paper",
  preprint: "Preprint",
  thesis: "Thesis",
  "book-chapter": "Book chapter",
};

export const pubTypePlural: Record<Publication["data"]["type"], string> = {
  journal: "journal articles",
  conference: "conference papers",
  preprint: "preprints",
  thesis: "thesis",
  "book-chapter": "book chapters",
};

export function formatDate(d: Date, style: "long" | "short" = "long") {
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: style === "long" ? "long" : "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function pubSortKey(p: Publication) {
  return p.data.date ? p.data.date.getTime() : Date.UTC(p.data.year, 0, 1);
}

export async function getPublications() {
  const pubs = await getCollection("publications");
  return pubs.sort((a, b) => pubSortKey(b) - pubSortKey(a));
}

export async function getPosts() {
  const posts = await getCollection("blog", ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getProjects() {
  const projects = await getCollection("projects");
  return projects.sort(
    (a, b) => Number(b.data.featured) - Number(a.data.featured) || b.data.date.getTime() - a.data.date.getTime(),
  );
}

export async function getResearchAreas() {
  const areas = await getCollection("research");
  return areas.sort((a, b) => a.data.order - b.data.order);
}

export function areaIds(refs: { id: string }[]) {
  return refs.map((r) => r.id);
}

/** Journal 43(8), 1838 (2018) style venue line. */
export function venueLine(p: Publication) {
  const d = p.data;
  let s = d.venue;
  if (d.volume) s += ` ${d.volume}`;
  if (d.issue) s += `(${d.issue})`;
  if (d.pages) s += `, ${d.pages}`;
  return s;
}

export function doiUrl(doi: string) {
  return `https://doi.org/${doi}`;
}

export function arxivUrl(id: string) {
  return `https://arxiv.org/abs/${id}`;
}

/** Best landing URL for a publication. */
export function primaryUrl(p: Publication) {
  const d = p.data;
  if (d.doi) return doiUrl(d.doi);
  if (d.url) return d.url;
  if (d.arxiv) return arxivUrl(d.arxiv);
  return undefined;
}

export function bibtex(p: Publication) {
  const d = p.data;
  const firstFamily = (d.authors[0].split(" ").pop() ?? "anon").toLowerCase().normalize("NFD").replace(/[^a-z]/g, "");
  const firstWord = d.title.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(" ").find((w) => w.length > 3) ?? "paper";
  const key = `${firstFamily}${d.year}${firstWord}`;
  const kind =
    d.type === "journal" ? "article" : d.type === "conference" ? "inproceedings" : d.type === "thesis" ? "phdthesis" : "misc";
  const fields: [string, string | undefined][] = [
    ["title", `{${d.title}}`],
    ["author", d.authors.join(" and ")],
    [d.type === "conference" ? "booktitle" : d.type === "thesis" ? "school" : d.type === "preprint" ? "howpublished" : "journal", d.venue],
    ["volume", d.volume],
    ["number", d.issue],
    ["pages", d.pages],
    ["year", String(d.year)],
    ["doi", d.doi],
    ["eprint", d.arxiv],
    ["archivePrefix", d.arxiv ? "arXiv" : undefined],
    ["url", d.doi ? undefined : d.url],
  ];
  const body = fields
    .filter(([, v]) => v)
    .map(([k, v]) => `  ${k} = {${v}}`)
    .join(",\n");
  return `@${kind}{${key},\n${body}\n}`;
}

export function readingTime(body: string | undefined) {
  const words = (body ?? "").replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function relatedPosts(post: Post, all: Post[], n = 3) {
  const tags = new Set(post.data.tags);
  return all
    .filter((p) => p.id !== post.id)
    .map((p) => ({
      p,
      score: p.data.tags.filter((t) => tags.has(t)).length * 2 + (p.data.category === post.data.category ? 1 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.p.data.date.getTime() - a.p.data.date.getTime())
    .slice(0, n)
    .map((x) => x.p);
}

export function slugifyTag(tag: string) {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
