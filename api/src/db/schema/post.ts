import {
  decimal,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const PostType = pgEnum("post_type", ["RENT", "SALE", "AUCTION"]);

export const PostPropertyType = pgEnum("post_property_type", [
  "APARTMENT",
  "HOUSE",
  "COMMERCIAL",
  "LAND",
  "OTHER",
]);

export const postTable = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  price: decimal("price", { precision: 10, scale: 3 }).notNull(),
  address: text("address").notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  bedroom: integer("bedroom").default(1),
  bathroom: integer("bathroom").default(1),
  latitude: varchar("latitude", { length: 255 }).notNull(),
  longitude: varchar("longitude", { length: 255 }).notNull(),
  type: PostType("type").notNull(),
  propertyType: PostPropertyType("property_type").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.uid),
  img: varchar("img", { length: 555 }).notNull(),
});

export const postDetailTable = pgTable("post_details", {
  id: uuid("id").defaultRandom().primaryKey(),
  postId: uuid("post_id")
    .notNull()
    .references(() => postTable.id)
    .unique(),
  description: text("description").notNull(),
  utility: varchar("utility", { length: 255 }),
  petPolicy: varchar("pet_policy", { length: 255 }),
  parking: varchar("parking", { length: 255 }),
  size: integer("size"),
  school: integer("school"),
  resturant: integer("resturant"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(), // ,
});
