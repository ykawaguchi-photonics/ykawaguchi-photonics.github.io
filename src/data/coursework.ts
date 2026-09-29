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
  { title: "Image Processing", provider: "The City College of New York, CUNY", level: "graduate", year: "Spring 2021" },
  { title: "Optical Signal Processing", provider: "The City College of New York, CUNY", level: "graduate", year: "Fall 2020" },
  { title: "Optical Remote Sensing", provider: "The City College of New York, CUNY", level: "graduate", year: "Fall 2020" },
  { title: "Introduction to Robotics", provider: "The City College of New York, CUNY", level: "graduate", year: "Fall 2020" },
  { title: "Photonics Engineering", provider: "The City College of New York, CUNY", level: "graduate", year: "Spring 2020" },
  { title: "5G Technologies and IoT", provider: "The City College of New York, CUNY", level: "graduate", year: "Spring 2020" },
  { title: "Fiber Optic Communications I", provider: "The City College of New York, CUNY", level: "graduate", year: "Fall 2019" },
  { title: "Wireless Communication", provider: "The City College of New York, CUNY", level: "graduate", year: "Fall 2019" },
  { title: "Renewable Energy", provider: "The City College of New York, CUNY", level: "graduate", year: "Fall 2019" },
  { title: "Advanced Seminar: Photonics Engineering", provider: "The City College of New York, CUNY", level: "graduate", notes: "CUNY Graduate Center" },
  { title: "Introduction to Lasers", provider: "The City College of New York, CUNY", level: "graduate", notes: "CUNY Graduate Center" },
  { title: "Intelligent Sensing Systems", provider: "Toyohashi University of Technology", level: "graduate", year: "Fall 2018" },
  { title: "Solid State Electronic Materials", provider: "Toyohashi University of Technology", level: "graduate", year: "Fall 2018" },
  { title: "Analysis of Materials at Interfaces", provider: "Toyohashi University of Technology", level: "graduate", year: "Fall 2018" },
  { title: "Functional Materials for Optical Applications", provider: "Toyohashi University of Technology", level: "graduate", year: "Spring 2017" },
  { title: "Electronic Materials", provider: "Toyohashi University of Technology", level: "graduate", year: "Spring 2017" },
  { title: "Electronic Devices", provider: "Toyohashi University of Technology", level: "graduate", year: "Spring 2017" },
  { title: "LSI Systems", provider: "Toyohashi University of Technology", level: "graduate", year: "Spring 2017" },
  { title: "Material Engineering of Thin Films", provider: "Toyohashi University of Technology", level: "graduate", year: "Spring 2017" },
  { title: "Advanced Topics in Mechanical Engineering 1A", provider: "Toyohashi University of Technology", level: "graduate" },
  { title: "Advanced Topics in Mechanical Engineering 1B", provider: "Toyohashi University of Technology", level: "graduate" },
];
