import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { book, note } from "../../shared/schemas/books";
import { insertBookSchema } from "../../shared/zod.schema";
import db from "../db";

export const booksRoute = new Hono()
  .get("/", async (c) => {
    // TODO: ADD USERID FILTERS

    const allBooks = await db.select().from(book);
    const allNotes = await db.select().from(note);

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
    const bookId = c.req.param("id");

    const selectedBook = await db.select().from(book).where(eq(book.id, bookId));

    if (!selectedBook) {
      return c.notFound();
    }

    return c.json({ selectedBook: selectedBook[0] });
  })
  .post("/", zValidator("json", insertBookSchema), async (c) => {
    const data = c.req.valid("json");

    const newBook = await db.insert(book).values(data).returning();

    c.status(201);
    return c.json({ message: "Book created", newBook: newBook[0] });
  });
