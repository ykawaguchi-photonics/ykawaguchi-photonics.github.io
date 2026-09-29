// Blog categories. To add or rename one, edit this list only:
// the content schema, category bar, and /blog/category/<slug>/ pages all derive from it.
export const categories = [
  {
    slug: "research",
    label: "Research",
    description: "Research topics, paper walkthroughs, and the ideas behind them.",
  },
  {
    slug: "technical-notes",
    label: "Technical Notes",
    description: "Meep, FDTD, RCWA, GDSFactory, Python, and simulation workflows.",
  },
  {
    slug: "career",
    label: "Career",
    description: "Academia, industry, and building an international research career.",
  },
  {
    slug: "life",
    label: "Life",
    description: "Japan, researcher life, and travel.",
  },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export const categorySlugs = categories.map((c) => c.slug) as [CategorySlug, ...CategorySlug[]];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
