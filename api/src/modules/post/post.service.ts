import { and, asc, eq, gte, lte } from "drizzle-orm";
import { Request } from "express";
import db from "../../db";
import { postDetailTable, postImageTable, postTable } from "../../db/schema";
import ApiError from "../../utils/ApiError";

export const getAllPostOfUser = async () => {
  const post = await db.select().from(postTable);
  return post;
};

export const getPostById = async (req: Request) => {
  const postId = req.params.id;
  const post = await db.query.postTable.findFirst({
    where: eq(postTable.id, postId),
    with: {
      postDetail: true,
      postImages: true,
    },
  });
  return post;
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
        img: body.img[0],
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
    const imges = body.img.map((img: string) => {
      return {
        postId: post[0].id,
        img: img,
      };
    });

    await trx.insert(postImageTable).values([...imges]);
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

export const getPostBySearchParams = async (req: Request) => {
  let { city, type, min, max } = req.query;
  if (!city) city = "Rajshahi";
  if (
    (type as string) != "RENT" ||
    (type as string) != "AUCTION" ||
    (type as string) != "SALE"
  )
    type = "RENT";

  const post = await db.query.postTable.findMany({
    where: and(
      eq(postTable.city, city as string),
      gte(postTable.price, min!.toString()), // Ensure price is >= min
      lte(postTable.price, max!.toString()) // Ensure price is <= max
    ),
    orderBy: asc(postTable.price),
  });
  return post;
};
