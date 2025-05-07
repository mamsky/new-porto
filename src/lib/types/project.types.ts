export type ProjectTypes = {
  id?: string;
  title?: string;
  description?: string;
  techstack: TechstackTypeData[];
  demo?: string;
  github?: string;
  images?: FileList;
};

type TechstackTypeData = {
  id?: string;
  techstack: string;
};
