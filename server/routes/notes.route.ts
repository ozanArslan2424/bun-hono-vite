import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { note } from "../../shared/schemas/books";
import { insertNoteFormSchema } from "../../shared/zod.schema";
import db from "../db";
import type { HonoType } from "../types";
import type { InsertNote } from "../../shared/types";

export const notesRoute = new Hono<HonoType>()
  .get("/:id", async (c) => {
    const noteId = c.req.param("id");
    const user = c.get("user");

    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }

    const res = await db
      .select()
      .from(note)
      .where(and(eq(note.id, noteId), eq(note.userId, user.id)));

    if (!res) {
      return c.json({ message: "Note not found" }, 404);
    }

    const selectedNote = res[0];

    return c.json({ selectedNote: selectedNote }, 200);
  })
  .post("/", zValidator("json", insertNoteFormSchema), async (c) => {
    const data = c.req.valid("json");
    const user = c.get("user");

    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }

    const newNote: InsertNote = {
      id: crypto.randomUUID(),
      title: data.title,
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: data.bookId,
      userId: user.id,
      content: "",
    };

    const res = await db.insert(note).values(newNote).returning();

    if (!res) {
      return c.json({ message: "Note not created" }, 500);
    }

    const insertedNote = res[0];

    c.status(201);
    return c.json({ message: "Note created", insertedNote: insertedNote });
  });
