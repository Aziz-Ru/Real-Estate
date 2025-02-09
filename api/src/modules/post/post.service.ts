import { eq } from "drizzle-orm";
import { Request } from "express";
import db from "../../db";
import { postDetailTable, postTable } from "../../db/schema";
import ApiError from "../../utils/ApiError";

export const getAllPostOfUser = async () => {
  const post = await db.select().from(postTable);
  return post;
};

export const getPostById = async (req: Request) => {
  const postId = req.params.id;
  console.log(postId);
  const post = await db
    .select()
    .from(postTable)
    .where(eq(postTable.id, postId))
    .innerJoin(postDetailTable, eq(postDetailTable.postId, postId));
  if (post.length === 0) {
    throw new ApiError(404, "Post not found");
  }
  return post[0];
};

export const createPostServices = async (req: Request) => {
  const body = req.body;
  await db.transaction(async (trx) => {
    const post = await trx
      .insert(postTable)
      .values({
        title: body.title,
        price: body.price,
        address: body.address,
        city: body.city,
        bedroom: body.bedroom,
        bathroom: body.bathroom,
        latitude: body.latitude,
        longitude: body.longitude,
        type: body.type,
        propertyType: body.propertyType,
        userId: body.userId,
        img: body.img,
      })
      .returning({
        id: postTable.id,
      });
    await trx.insert(postDetailTable).values({
      postId: post[0].id,
      description: body.description,
      utility: body.utility,
      petPolicy: body.petPolicy,
      parking: body.parking,
      size: body.size,
      school: body.school,
      resturant: body.resturant,
    });
  });
};

export const updatePostServices = async (req: Request) => {
  const postId = req.params.id;
  const body = req.body;
  await db
    .update(postTable)
    .set({
      title: body.title,
      price: body.price,
      address: body.address,
      city: body.city,
      bedroom: body.bedroom,
      bathroom: body.bathroom,
      latitude: body.latitude,
      longitude: body.longitude,
      type: body.type,
      propertyType: body.propertyType,
      userId: body.userId,
      img: body.img,
    })
    .where(eq(postTable.id, postId));
};

export const deletePostServices = async (req: Request) => {
  const postId = req.params.id;
  const post = await db
    .select()
    .from(postTable)
    .where(eq(postTable.id, postId));
  if (post.length == 0 || post[0].userId != req.body.userId) {
    throw new ApiError(401, "You are unauthorized");
  }
  await db.delete(postTable).where(eq(postTable.id, postId));
};
