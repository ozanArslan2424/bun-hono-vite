import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { boolean, date } from "../../server/utils";

export const user = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: date("createdAt")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: date("updatedAt")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const session = sqliteTable("session", {
  id: text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  expiresAt: date("expiresAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});

export const account = sqliteTable("account", {
  id: text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  expiresAt: date("expiresAt"),
  password: text("password"),
});

export const verification = sqliteTable("verification", {
  id: text("id")
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: date("expiresAt").notNull(),
});
