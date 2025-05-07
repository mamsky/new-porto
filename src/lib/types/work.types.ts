export type WorkTypeData = {
  title: string;
  location: string;
  company: string;
  description: DescTypeData[];
  startDate: string;
  endDate: string;
  technology: TechstackTypeData[]; // Pastikan teknologi adalah properti yang wajib ada
  id?: string;
  images?: FileList;
};

export type TechstackTypeData = {
  id?: string;
  techstack: string;
};

export type DescTypeData = {
  id?: string;
  desc: string;
};
