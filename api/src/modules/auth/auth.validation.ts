import { z } from "zod";

export const loginValidation = {
  body: z.object({
    email: z
      .string({
        message: "Invalid email",
      })
      .email({
        message: "Invalid email",
      }),
    password: z
      .string({
        message: "Invalid password",
      })
      .min(6, {
        message: "Password must be at least 6 characters",
      }),
  }),
};

export const registerValidation = {
  body: z.object({
    email: z
      .string({
        message: "email must be a string",
      })
      .email({
        message: "Invalid email",
      }),
    password: z
      .string({
        message: "Invalid password",
      })
      .min(6, {
        message: "Password must be at least 6 characters",
      }),
  }),
};
