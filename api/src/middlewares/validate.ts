import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { z } from "zod";
import ApiError from "../utils/ApiError";
interface ValidationSchema {
  params?: z.ZodObject<any, any>;
  query?: z.ZodObject<any, any>;
  body?: z.ZodObject<any, any>;
}

const validate = (schema: ValidationSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors: Record<string, string> = {};
      const validationPromise = Object.entries(schema).map(
        async ([key, zodSchema]) => {
          if (!zodSchema) return;
          const result = await zodSchema.safeParseAsync(
            req[key as keyof Request]
          );
          if (!result.success) {
            result.error.errors.forEach((error: any) => {
              errors[error.path[0]] = error.message;
            });
          }
          // req[key as keyof Request] = result.data;
        }
      );
      await Promise.all(validationPromise);
      if (Object.keys(errors).length > 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Validation Error", errors);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validate;
