import { z } from "zod";

export const TechSchemas = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Required" }),
  images: z.instanceof(FileList).optional(),
});

export type TechSchemasDTO = z.infer<typeof TechSchemas>;

export const CreateTechSchemas = z.object({
  name: z.string().min(1, { message: "Required" }),
  images: z.any().refine((img) => img instanceof FileList && img.length > 0, {
    message: "Image Required",
  }),
});

export type CreateTechSchemasDTO = z.infer<typeof TechSchemas>;
