import { Router } from "express";
import {
  addPost,
  deletepost,
  getpost,
  getposts,
  updatepost,
} from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/tokenVerify.js";
const router = Router({ strict: true });

router.get("/", verifyJWT, getposts);
router.get("/:postId", verifyJWT, getpost);
router.post("/", verifyJWT, addPost);
router.put("/:postId", verifyJWT, updatepost);
router.delete("/:postId", verifyJWT, deletepost);

export default router;
