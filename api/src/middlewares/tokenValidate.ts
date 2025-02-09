import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../config/env";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";

const cookieValidate = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.cookies?.token;
      if (!payload) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are unauthorized");
      }

      const isVerified = jwt.verify(payload, env.JWT_SECRET_KEY) as JwtPayload;

      if (!isVerified || !isVerified.uid) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are unauthorized");
      }
      req.body.userId = isVerified.uid;
      next();
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are unauthorized");
    }
  });
};

export default cookieValidate;
