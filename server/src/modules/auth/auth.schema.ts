import { object, string, TypeOf } from "zod";
export const loginSchema = {
  body: object({
    email: string({
      required_error: "email is required",
    }).email("Not a valid email"),
    password: string({
      required_error: "password is required",
    })
      .min(6, "cannot be less than 6 characters")
      .max(64, "password cannot be more than 64 characters"),
  }),
};

export type LoginBody = TypeOf<typeof loginSchema.body>;
