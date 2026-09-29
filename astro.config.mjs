// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// When a custom domain is attached: set `site` to it and add public/CNAME.
export default defineConfig({
  site: "https://ykawaguchi-photonics.github.io",
  trailingSlash: "always",
  integrations: [mdx(), sitemap()],
  markdown: {
    // unified (remark/rehype) processor so $math$ renders with KaTeX.
    processor: unified({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }),
    shikiConfig: { theme: "github-dark-dimmed", wrap: false },
  },
});
