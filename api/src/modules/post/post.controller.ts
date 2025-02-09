import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import {
  createPostServices,
  deletePostServices,
  getAllPostOfUser,
  getPostById,
  updatePostServices,
} from "./post.service";

export const getAllPost = catchAsync(async (req: Request, res: Response) => {
  return res.status(200).json({ data: await getAllPostOfUser() });
});

export const getPost = catchAsync(async (req: Request, res: Response) => {
  return res.status(200).json({ data: await getPostById(req) });
});

export const createPost = catchAsync(async (req: Request, res: Response) => {
  await createPostServices(req);
  return res.status(201).json({
    code: 201,
    message: "Post created successfully",
  });
});

export const updatePost = catchAsync(async (req: Request, res: Response) => {
  await updatePostServices(req);
  return res.status(200).json({
    code: 200,
    message: "Post updated successfully",
  });
});

export const deletePost = catchAsync(async (req: Request, res: Response) => {
  await deletePostServices(req);
  return res.status(200).json({
    code: 200,
    message: "Post deleted successfully",
  });
});
