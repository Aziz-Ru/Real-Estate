import { z } from "zod";

export const userValidationModel = z.object({
  email: z
    .string({
      message: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: z
    .string({
      message: "Password is required",
    })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(128, { message: "Password must be at most 128 characters long" }),

  gender: z.enum(["MALE", "FEMALE"], { message: "Invalid Gender" }),
  platform: z.enum(["WEB", "ANDROID", "IOS"], { message: "Invalid Platform" }),
  photoUrl: z
    .string()
    .url({
      message: "Invalid URL",
    })
    .optional(),
  deviceId: z.string({
    message: "Device ID is required",
  }),
});

export type userModel = z.infer<typeof userValidationModel>;
