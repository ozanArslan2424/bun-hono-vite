import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { date } from "../../server/utils";
import { user } from "./auth";

const createdAt = date("createdAt")
  .notNull()
  .default(sql`(current_timestamp)`);

const updatedAt = date("updatedAt")
  .notNull()
  .default(sql`(current_timestamp)`);

const userId = text("userId")
  .notNull()
  .references(() => user.id);

export const book = sqliteTable("book", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  userId,
  createdAt,
  updatedAt,
});

export const note = sqliteTable("note", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  bookId: text("bookId")
    .notNull()
    .references(() => book.id),
  userId,
  createdAt,
  updatedAt,
});

export const backlinks = sqliteTable("backlinks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId,
  noteId: text("noteId")
    .notNull()
    .references(() => note.id),
  bookId: text("bookId")
    .notNull()
    .references(() => book.id),
  referencedNoteId: text("referencedNoteId")
    .notNull()
    .references(() => note.id),
});
