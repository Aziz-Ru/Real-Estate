import { Router } from "express";
import {
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/tokenVerify.js";

const route = Router({ strict: true });

route.get("/:id", verifyJWT, getUser);
route.put("/:id", verifyJWT, updateUser);
route.delete("/:id", verifyJWT, deleteUser);

export default route;
