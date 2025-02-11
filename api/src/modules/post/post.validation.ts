import { z } from "zod";

const postSchema = z.object({
  title: z
    .string({
      message: "Title must be a string",
    })
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(255, { message: "Title must be at most 255 characters long" }),
  price: z
    .number({
      message: "Price must be a number",
    })
    .min(0, { message: "Price must be at least 0" }),
  address: z.string({
    message: "Address must be a string",
  }),
  city: z.string({
    message: "City must be a string",
  }),
  bedroom: z
    .number({
      message: "Bedroom must be a number",
    })
    .min(1, { message: "Bedroom must be at least 1" }),
  bathroom: z
    .number({
      message: "Bathroom must be a number",
    })
    .min(1, { message: "Bathroom must be at least 1" }),
  latitude: z.number({
    message: "Latitude must be a number",
  }),
  longitude: z.number({
    message: "Longitude must be a number",
  }),
  type: z.enum(["RENT", "SALE", "AUCTION"], {
    message: "Type must be RENT, SALE or AUCTION",
  }),
  propertyType: z.enum(["APARTMENT", "HOUSE", "COMMERCIAL", "LAND", "OTHER"], {
    message:
      "Property type must be APARTMENT, HOUSE, COMMERCIAL, LAND or OTHER",
  }),
  img: z.array(
    z
      .string({
        message: "Image must be a string",
      })
      .url({ message: "Image must be a valid URL" })
  ),
  description: z.string({
    message: "Description must be a string",
  }),
  utility: z
    .string({
      message: "Utility must be a string",
    })
    .optional(),
  petPolicy: z.enum(["YES", "NO"], {
    message: "Pet policy must be YES or NO",
  }),
  parking: z.enum(["YES", "NO"], {
    message: "Parking must be YES or NO",
  }),
  size: z
    .number({
      message: "Size must be a number",
    })
    .min(15, { message: "Size must be at least 15" })
    .optional(),
  school: z
    .number({
      message: "School must be a number",
    })
    .max(5000, { message: "School must be at most 5000km" })
    .optional(),
  resturant: z
    .number({
      message: "Resturant must be a number",
    })
    .min(1, { message: "Resturant must be at least 1" })
    .optional(),
});

export const postCreateSchema = {
  body: postSchema,
};
