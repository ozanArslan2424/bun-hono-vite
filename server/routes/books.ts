import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { fakeBooks } from "../../shared/fake-data";
import { insertBookSchema, type SelectBook } from "../../shared/schemas/notes";

export const booksRoute = new Hono()
  .get("/", async (c) => {
    return c.json({ books: fakeBooks });
  })
  .get("/:id", async (c) => {
    const bookId = c.req.param("id");
    const book = fakeBooks.find((b) => b.id === bookId);

    if (!book) {
      return c.notFound();
    }

    return c.json({ book });
  })
  .post("/", zValidator("json", insertBookSchema), async (c) => {
    const data = c.req.valid("json");

    console.log(data);

    const newBook: SelectBook = {
      ...data,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      notes: [],
    };

    fakeBooks.push(newBook);

    c.status(201);
    return c.json({ message: "Book created", newBook });
  })

  .delete("/:id", async (c) => {
    const bookId = c.req.param("id");
    const bookIndex = fakeBooks.findIndex((b) => b.id === bookId);

    if (bookIndex === -1) {
      return c.notFound();
    }

    const deletedBook = fakeBooks.splice(bookIndex, 1);

    return c.json({ message: "Book deleted", deletedBook });
  });
