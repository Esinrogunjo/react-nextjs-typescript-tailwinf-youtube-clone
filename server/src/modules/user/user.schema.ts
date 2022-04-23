import { object, string, TypeOf } from "zod";

export const registerUserSchema = {
  body: object({
    username: string({
      required_error: "username is required",
    }),
    email: string({
      required_error: "email is required",
    }).email("must be a valid email"),
    password: string({
      required_error: "password is required",
    }),
    confirmPassword: string({
      required_error: "username is required",
    })
      .min(6, "Password must be at least 6 characters long")
      .max(64, "password cannot be more than 64 characters"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Password do not macth",
    path: ["confirmPassword"],
  }),
};

export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>;
