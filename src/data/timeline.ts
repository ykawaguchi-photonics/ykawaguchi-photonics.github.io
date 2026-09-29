// "Path" timeline shown on About and CV, newest first.
// Only public facts. Leave `period` empty rather than guessing dates.
export type TimelineEntry = {
  period: string;
  role: string;
  org: string;
  place?: string;
  detail?: string;
};

export const positions: TimelineEntry[] = [
  {
    period: "Present",
    role: "Researcher",
    org: "Samsung R&D",
    place: "Yokohama, Japan",
  },
];

export const education: TimelineEntry[] = [
  {
    period: "2024",
    role: "Ph.D., Electrical Engineering",
    org: "The City College of New York, CUNY",
    place: "New York, USA",
    detail:
      "Dissertation: Ring Resonators Integrating With Dichroic Materials and in Spin-Valley Controlled Photonic Topological System.",
  },
  {
    period: "",
    role: "M.Sc.",
    org: "University of Stuttgart",
    place: "Stuttgart, Germany",
  },
];

export const honors: TimelineEntry[] = [
  { period: "2023", role: "Quad Fellowship", org: "Quad Fellowship" },
];
