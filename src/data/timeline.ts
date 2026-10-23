// "Path" timeline shown on About and CV, newest first.
// Only public facts. Leave `period` empty rather than guessing dates.
export type TimelineEntry = {
  period: string;
  role: string;
  org: string;
  place?: string;
  detail?: string;
  bullets?: string[];
};

export const positions: TimelineEntry[] = [
  {
    period: "Nov 2024 – Present",
    role: "Researcher",
    org: "Samsung R&D",
    place: "Yokohama, Japan",
    // Samsung rule (CLAUDE.md): describe the work by the single word "metasurfaces" only.
    detail: "Metasurfaces.",
  },
  {
    period: "Sep 2024 – Oct 2024",
    role: "Visiting Researcher",
    org: "Brandenburg University of Technology",
    place: "Cottbus, Germany",
    bullets: ["FDTD (Lumerical) simulations of germanium photodiode pillars."],
  },
   {
    period: "Jun 2024 – Aug 2024",
    role: "Postdoctoral Researcher",
    org: "The City College of New York, CUNY",
    place: "New York, USA",
    bullets: [
      "Continued doctoral research on topological photonic resonators, including freeform topological photonic vortex resonators (arXiv 2026).",
    ],
  },
];

export const education: TimelineEntry[] = [
  {
    period: "Aug 2019 – Jun 2024",
    role: "Ph.D., Electrical Engineering",
    org: "The City College of New York, CUNY",
    place: "New York, USA",
    detail:
      "Dissertation: Ring Resonators Integrating With Dichroic Materials and in Spin-Valley Controlled Photonic Topological System.",
    bullets: [
      "First-author experimental demonstration of pseudo-spin switching of topological boundary modes on a silicon chip (Science Advances 2024).",
    ],
  },
  {
    period: "Apr 2017 – Mar 2019",
    role: "M.Sc.",
    org: "Toyohashi University of Technology",
    place: "Toyohashi, Japan",
  },
  {
    period: "Sep 2017 – Sep 2018",
    role: "Visiting Research Graduate Student",
    org: "University of Stuttgart",
    place: "Stuttgart, Germany",
  },
  {
    period: "Apr 2010 – Mar 2015",
    role: "Associate Degree in Eng.",
    org: "Sasebo National College of Technology",
    place: "Nagasaki, Japan",
  },
];

export const honors: TimelineEntry[] = [
  { 
    period: "2017", role: "Tobitate! Study Abroad Initiative", org: "Ministry of Education, Culture, Sports, Science and Technology (MEXT), Japan",
  detail:
      "Japan’s flagship public-private scholarship program supporting students pursuing international study and global experiences.",
  },
  { 
    period: "2023", role: "Quad Fellowship", org: "Quad Fellowship",
  detail:
      "International STEM fellowship for emerging researchers from Australia, India, Japan, and the United States.",
  },
];
