import { z } from "zod";
import { userValidationModel } from "./user.model";

export const createUser = {
  body: userValidationModel,
};

export const getUser = {
  params: z.object({
    userId: z.string().uuid(),
  }),
};

export const getUsers = {
  query: z.object({
    name: z.string().optional(),
    sortBy: z.string().optional(),
    limit: z.number().optional(),
    page: z.string().optional(),
  }),
};

export const updateUser = {
  params: z.object({
    userId: z.string().uuid(),
  }),
  body: userValidationModel,
};
