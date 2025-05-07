import { z, ZodType } from "zod";
import { LoginTypes } from "../types/login.types";

export const LoginSchemas: ZodType<LoginTypes> = z.object({
  username: z.string().min(1, { message: "email/password cannot be empty" }),
  password: z.string().min(1, { message: "password cannot be empty" }),
});
export type LoginSchemaDTO = z.infer<typeof LoginSchemas>;
