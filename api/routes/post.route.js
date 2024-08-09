import { Router } from "express";
import { addPost, getposts } from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/tokenVerify.js";
const router = Router({ strict: true });

router.get("/:id", verifyJWT, getposts);

router.post("/add", verifyJWT, addPost);

export default router;
