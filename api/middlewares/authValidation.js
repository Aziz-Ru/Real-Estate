import { body } from "express-validator";

export const registerValidation = [
  body("email").isEmail().withMessage("Email is not valid"),
  body("username")
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];
