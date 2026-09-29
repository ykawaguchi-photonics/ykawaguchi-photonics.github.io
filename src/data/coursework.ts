// Coursework shown near the bottom of /cv/ only (not on Home/About/nav).
// Add one object per course; groups render in the order providers first appear.
export type Course = {
  title: string;
  provider: string; // university or platform, used for grouping
  level?: "graduate" | "undergraduate" | "online" | "certificate";
  year?: string;
  credential?: string; // certificate URL, if public
  notes?: string;
};

export const coursework: Course[] = [
  // Example:
  // { title: "Electromagnetic Theory", provider: "The City College of New York, CUNY", level: "graduate", year: "2020" },
];
