import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { book, note } from "../../shared/schemas/books";
import { insertBookSchema } from "../../shared/zod.schema";
import db from "../db";
import type { HonoType } from "../types";
import type { InsertBook } from "../../shared/types";

export const booksRoute = new Hono<HonoType>()
  .get("/", async (c) => {
    const user = c.get("user");

    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }

    const allBooks = await db.select().from(book).where(eq(book.userId, user.id));
    const allNotes = await db.select().from(note).where(eq(note.userId, user.id));

    const allBooksWithNotes = allBooks.map((book) => {
      const notes = allNotes.filter((note) => note.bookId === book.id);

      return {
        ...book,
        notes,
      };
    });

    return c.json({ books: allBooksWithNotes });
  })
  .get("/:id", async (c) => {
    const user = c.get("user");

    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }

    const bookId = c.req.param("id");
    const res = await db
      .select()
      .from(book)
      .where(and(eq(book.id, bookId), eq(book.userId, user.id)));
    const selectedBook = res[0];
    const selectedBookNotes = await db.select().from(note).where(eq(note.bookId, selectedBook.id));
    const selectedBookWithNotes = { ...selectedBook, notes: selectedBookNotes };

    if (!selectedBook) {
      return c.json({ message: "Book not found" }, 404);
    }

    return c.json({ book: selectedBookWithNotes }, 200);
  })
  .post("/", zValidator("json", insertBookSchema), async (c) => {
    const data = c.req.valid("json");

    const newBook: InsertBook = {
      id: crypto.randomUUID(),
      title: data.title,
      userId: data.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const res = await db.insert(book).values(newBook).returning();
    const insertedBook = res[0];

    c.status(201);
    return c.json({ message: "Book created", insertedBook: insertedBook });
  });
