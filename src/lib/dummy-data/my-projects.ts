import DummyImage from "@/assets/dumbways.png";
import { StaticImageData } from "next/image";

export type MyProjectDTO = {
  id: number;
  title: string;
  description: string;
  image: string | StaticImageData;
  tags: string[];
  github: string;
  demo: string;
};

export const dummyDataMyProject: MyProjectDTO[] = [
  {
    id: 1,
    title: "Create Hallo World",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos autem accusamus quas qui labore recusandae eligendi voluptatibus animi architecto in.",
    image: DummyImage,
    tags: ["TypeScript", "Express", "Prisma"],
    github: "",
    demo: "",
  },
  {
    id: 2,
    title: "Create Hallo World",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos autem accusamus quas qui labore recusandae eligendi voluptatibus animi architecto in.",
    image: DummyImage,
    tags: ["TypeScript", "Express", "Prisma"],
    github: "",
    demo: "",
  },
];
