import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  uid: uuid("uid").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  emailVerified: boolean("email_verified").default(false),
  confirmationCode: varchar("confirmation_code", { length: 255 }).notNull(),
  avatar: varchar("avatar", { length: 2 }),
  confirmationCodeSentAt: timestamp("confirmation_code_sent_at", {
    precision: 6,
    withTimezone: true,
  }).notNull(),
  confirmedAt: timestamp("confirmed_at", { precision: 6, withTimezone: true }),
  isActivated: boolean("is_activated").default(true),
  lastSignedInAt: timestamp("last_signed_in_at"),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true })
    .notNull()
    .defaultNow(),
});
