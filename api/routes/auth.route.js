import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { registerValidation } from "../middlewares/authValidation.js";
import { ValidationErrorHandler } from "../middlewares/commonHandler.js";
import { verifyJWT } from "../middlewares/tokenVerify.js";

const route = Router({ strict: true });

route.post("/register", registerValidation, ValidationErrorHandler, register);
route.post("/login", login);
route.post("/logout", verifyJWT, logout);

export default route;
