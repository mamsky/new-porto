import { z } from "zod";

export const ProjectSchemas = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  techstack: z.array(z.string().min(1, { message: "Required" })),
  images: z.instanceof(FileList).optional(),
  demo: z.string().optional().or(z.literal("")),
  github: z.string().optional().or(z.literal("")),
});

export type ProjectSchemasDTO = z.infer<typeof ProjectSchemas>;
