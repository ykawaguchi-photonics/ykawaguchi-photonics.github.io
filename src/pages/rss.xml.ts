import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCategory } from "../data/categories";
import { site } from "../data/site";
import { getPosts } from "../utils/content";

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${site.name} — Blog`,
    description: "Research notes, technical notes on photonics simulation, and essays by Yuma Kawaguchi.",
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/blog/${p.id}/`,
      categories: [getCategory(p.data.category)?.label ?? p.data.category, ...p.data.tags],
    })),
    customData: "<language>en</language>",
    trailingSlash: true,
  });
}
