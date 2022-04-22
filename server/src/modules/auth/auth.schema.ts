import { object, string, TypeOf } from "zod";
export const loginSchema = {
  body: object({
    email: string({
      required_error: "email is required",
    }),
  }),
};
