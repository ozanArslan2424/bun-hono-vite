import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { fakeNotes } from "../../frontend/src/lib/fake-notes";
import { insertNoteSchema, type SelectNote } from "../../frontend/src/lib/schemas/notes";

export const notesRoute = new Hono()
  .get("/", async (c) => {
    return c.json({ notes: fakeNotes });
  })
  .post("/", zValidator("json", insertNoteSchema), async (c) => {
    const data = c.req.valid("json");

    console.log(data);

    const newNote: SelectNote = {
      ...data,
      id: crypto.randomUUID(),
      content: "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    fakeNotes.push(newNote);

    c.status(201);
    return c.json({ message: "Note created" });
  })
  .get("/:id", async (c) => {
    const noteId = c.req.param("id");
    const note = fakeNotes.find((n) => n.id === noteId);

    if (!note) {
      return c.notFound();
    }

    return c.json({ note });
  })
  .delete("/:id", async (c) => {
    const noteId = c.req.param("id");
    const noteIndex = fakeNotes.findIndex((n) => n.id === noteId);

    if (noteIndex === -1) {
      return c.notFound();
    }

    const deletedNote = fakeNotes.splice(noteIndex, 1);

    return c.json({ message: "Note deleted", deletedNote });
  });
