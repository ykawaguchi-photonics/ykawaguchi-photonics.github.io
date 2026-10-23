// Single source of truth for identity, affiliation, and profile links.
// Samsung rule: affiliation is stated as "Researcher at Samsung R&D", and the work there is
// described by the single word "metasurfaces" only — never tools, projects, products or results.
export const site = {
  name: "Yuma Kawaguchi",
  title: "Photonics Researcher",
  tagline: "Silicon Photonics · Metasurfaces · Topological Photonics",
  // One line under the name on the Home page.
  headline:
    "Photonics Design Engineer — silicon photonics and metasurface design, from FEM- and FDTD-verified components to GDS layout.",
  description:
    "Yuma Kawaguchi is a photonics design engineer working on silicon photonics, metasurfaces, and topological photonics. Publications, research notes, and simulation projects.",
  position: "Researcher",
  affiliation: "Samsung R&D",
  location: "Yokohama, Japan",
  languages: "Japanese (native) · English (fluent, full working proficiency)",
  // Public 2-page industry resume. Leave empty to hide the download button/link; set to
  // "/resume.pdf" only after public/resume.pdf has been approved (see CLAUDE.md, hard rule 3).
  resumePdf: "" as string,
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
    { name: "University of Stuttgart", url: "https://www.uni-stuttgart.de/en/" },
    { name: "Toyohashi University of Technology", url: "https://www.tut.ac.jp/english/" },
  ],
  knowsAbout: [
    "Photonics",
    "Silicon photonics",
    "Photonic integrated circuits",
    "Metasurfaces",
    "Flat optics",
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
