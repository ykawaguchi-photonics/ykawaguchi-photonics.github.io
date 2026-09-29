// Single source of truth for identity, affiliation, and profile links.
// Samsung rule: affiliation is stated as "Researcher at Samsung R&D" only —
// never describe work, projects, or products there anywhere on this site.
export const site = {
  name: "Yuma Kawaguchi",
  title: "Photonics Researcher",
  tagline: "Metasurfaces · Silicon Photonics · Topological Photonics",
  description:
    "Yuma Kawaguchi is a photonics researcher working on metasurfaces, silicon photonics, and topological photonics. Publications, research notes, and simulation projects.",
  position: "Researcher",
  affiliation: "Samsung R&D",
  location: "Yokohama, Japan",
  locale: "en_US",
  // Leave empty to hide. Set only to an address you want published.
  email: "" as string,
  // Google Search Console HTML-tag verification token (content="..."), if used.
  googleSiteVerification: "" as string,
  links: {
    scholar: "https://scholar.google.com/citations?user=GyF-IcQAAAAJ&hl=en",
    github: "https://github.com/ykawaguchi-photonics",
    linkedin: "https://www.linkedin.com/in/yumakawaguchi-96/",
    orcid: "", // e.g. https://orcid.org/0000-0000-0000-0000
  } as Record<"scholar" | "github" | "linkedin" | "orcid", string>,
  education: [
    { name: "The City College of New York, CUNY", url: "https://www.ccny.cuny.edu/" },
    { name: "University of Stuttgart", url: "https://www.uni-stuttgart.de/" },
  ],
  knowsAbout: [
    "Photonics",
    "Metasurfaces",
    "Flat optics",
    "Silicon photonics",
    "Photonic integrated circuits",
    "Topological photonics",
    "Nonreciprocal photonics",
    "Optical sensing",
    "FDTD simulation",
  ],
  tools: ["Lumerical FDTD", "Meep", "COMSOL", "RCWA / Meent", "Python", "GDSFactory"],
} as const;

export const nav = [
  { href: "/research/", label: "Research" },
  { href: "/publications/", label: "Publications" },
  { href: "/projects/", label: "Projects" },
  { href: "/blog/", label: "Blog" },
  { href: "/cv/", label: "CV" },
  { href: "/about/", label: "About" },
] as const;

export type ProfileLink = { label: string; href: string };

export function profileLinks(): ProfileLink[] {
  const l = site.links;
  return [
    { label: "Google Scholar", href: l.scholar },
    { label: "ORCID", href: l.orcid },
    { label: "GitHub", href: l.github },
    { label: "LinkedIn", href: l.linkedin },
    { label: "Email", href: site.email ? `mailto:${site.email}` : "" },
  ].filter((x) => x.href);
}
