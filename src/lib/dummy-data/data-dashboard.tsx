import ImageData from "@/assets/images.jpg";
import { StaticImageData } from "next/image";
export type DummyHero = {
  surname: string;
  image: string | StaticImageData;
  profesi: string;
  bio: string;
  location: string;
  status: boolean;
};

export const DataDummyHero: DummyHero = {
  surname: "Paste",
  image: ImageData,
  profesi: "Full-Stack Developer",
  bio: "I build and ship digital products from scratch to production. Passionate about creating end-to-end solutions and turning ideas into fully functional applications. With expertise in both frontend and backend development, I handle everything from initial concept to deployment and maintenance.",
  location: "Depok, Sawangan, Indonesia",
  status: true,
};
