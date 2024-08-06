"use strict";
import { validationResult } from "express-validator";

export const ValidationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(406)
      .json({ errors: errors.array(), msg: "Invalid Credential" });
  }
  next();
};
export const NotFoundHandler = (req, res, next) => {
  next({ msg: "url not found" });
};
export const DefaultErrorHandler = (err, req, res, next) => {
  return res.status(err.status ? err.status : 400).json({ errors: err });
};
