import { StaticImageData } from "next/image";
import ImagesLogo from "@/assets/dumbways.png";

export type WorkExperienceDTO = {
  id: number;
  position: string;
  company: string;
  description: string[];
  images: string | StaticImageData;
  technologies: string[];
};

export const dataWorkExperience: WorkExperienceDTO[] = [
  {
    id: 1,
    position: "Software Engineer",
    company: "Company A",
    description: [
      "Worked on various projects using React and Node.js.",
      "Mentoring students in Full Stack Development bootcamp",
      "Implemented CI/CD pipelines using GitHub Actions.",
      "Participated in code reviews and team meetings.",
    ],
    images: ImagesLogo,
    technologies: ["JavaScript", "TypeScript", "Postgress"],
  },
  {
    id: 2,
    company: "Company B",
    position: "Frontend Developer",
    description: [
      "Worked on various projects using React and Node.js.",
      "Mentoring students in Full Stack Development bootcamp",
      "Implemented CI/CD pipelines using GitHub Actions.",
      "Participated in code reviews and team meetings.",
    ],
    images: ImagesLogo,
    technologies: ["JavaScript", "TypeScript", "Postgress"],
  },
  {
    id: 3,
    company: "Company C",
    position: "Backend Developer",
    description: [
      "Worked on various projects using React and Node.js.",
      "Mentoring students in Full Stack Development bootcamp",
      "Implemented CI/CD pipelines using GitHub Actions.",
      "Participated in code reviews and team meetings.",
    ],
    images: ImagesLogo,
    technologies: ["JavaScript", "TypeScript", "Postgress"],
  },
];
