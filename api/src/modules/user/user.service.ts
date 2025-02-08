import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { Request } from "express";
import db from "../../db";
import { userTable } from "../../db/schema";

// import { userTable } from "../../db/schema";
// export const getUsers = async () => {
//   return await db.select().from(userView);
// };

// export const getUser = async (req: Request) => {
//   const userId = req.params.userId;
//   const user = await db.select().from(userView).where(eq(userView.uid, userId));
//   if (!user[0]) {
//     throw new ApiError(404, "User not found");
//   }
//   return user[0];
// };

// export const updateUser = async (req: Request) => {
//   const userId = req.params.userId;
//   const body = req.body;
//   console.log(body);
//   return await db
//     .update(userSchema)
//     .set(body)
//     .where(eq(userSchema.uid, userId));
// };

// export const deleteUser = async (req: Request) => {
//   const userId = req.params.userId;
//   return await db.delete(userSchema).where(eq(userSchema.uid, userId));
// };

export const createUser = async (req: Request) => {
  const body = req.body;
  const today = new Date();
  const confirmCodeSentAt = today;
  today.setMinutes(today.getMinutes() + 3);
  const salts = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(body.password, salts);
  const randomCode = Math.floor(100000 + Math.random() * 900000);

  await db.insert(userTable).values({
    email: body.email,
    password: hashPassword,
    emailVerified: false,
    confirmationCode: randomCode.toString(),
    confirmationCodeSentAt: confirmCodeSentAt,
    confirmedAt: today,
    lastSignedInAt: new Date(),
    avatar: body.email[0].toUpperCase(),
  });
};

export const getUserByEmail = async (email: string) => {
  const existingUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));
  return existingUser[0];
};
