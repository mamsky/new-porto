import { z } from "zod";

export const ProfileSchemas = z.object({
  id: z.string().optional(),
  surname: z.string().max(20).min(1, { message: "Name is required" }),
  images: z
    .any()
    .optional()
    .refine((image) => image instanceof FileList && image.length > 0, {
      message: "Please upload an image",
    }),
  profession: z.string().min(1, { message: "Profesi is required" }),
  bio: z.string().min(1, { message: "bio is required" }),
  location: z.string().min(1, { message: "Name is required" }),
  status: z.enum(["true", "false"]),
});

export type ProfileSchemaDTO = z.infer<typeof ProfileSchemas>;

export const ProfileSchemasV2 = z.object({
  id: z.string().optional(),
  surname: z.string().max(20).min(1, { message: "Name is required" }),
  images: z.instanceof(FileList).optional(),
  profession: z.string().min(1, { message: "Profesi is required" }),
  bio: z.string().min(1, { message: "bio is required" }),
  location: z.string().min(1, { message: "Name is required" }),
  status: z.enum(["true", "false"]),
});

export type ProfileSchemasDTOV2 = z.infer<typeof ProfileSchemasV2>;
