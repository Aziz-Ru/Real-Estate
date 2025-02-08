import { Router } from "express";
import cookieValidate from "../../middlewares/tokenValidate";
import validate from "../../middlewares/validate";
import { login, logout, register } from "./auth.controller";
import { loginValidation, registerValidation } from "./auth.validation";

const router = Router();

router.post("/login", validate(loginValidation), login);
router.post("/register", validate(registerValidation), register);
router.post("/logout", cookieValidate(), logout);

export default router;
