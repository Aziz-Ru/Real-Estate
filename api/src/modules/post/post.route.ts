import { Router } from "express";
import cookieValidate from "../../middlewares/tokenValidate";
import validate from "../../middlewares/validate";
import {
  createPost,
  deletePost,
  getAllPost,
  getPost,
  updatePost,
} from "./post.controller";
import { postCreateSchema } from "./post.validation";

const router = Router();

router
  .route("/")
  .get(cookieValidate(), getAllPost)
  .post(cookieValidate(), validate(postCreateSchema), createPost);

router.route("/user").get(cookieValidate(), getAllPost);
router
  .route("/:id")
  .get(cookieValidate(), getPost)
  .put(cookieValidate(), validate(postCreateSchema), updatePost)
  .delete(cookieValidate(), deletePost);

export default router;
