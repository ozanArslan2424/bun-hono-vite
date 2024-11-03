import { randomUUID } from "crypto";
import type { SelectBook, SelectNote } from "./schemas/notes";

export const fakeNotes: SelectNote[] = [
  {
    id: randomUUID(),
    title: "My first note",
    content: "This is the",
    book_id: randomUUID(),
    user_id: randomUUID(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: randomUUID(),
    title: "My second note",
    content: "This is the second note",
    book_id: randomUUID(),
    user_id: randomUUID(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const fakeBooks: SelectBook[] = [
  {
    id: randomUUID(),
    title: "My first book",
    user_id: randomUUID(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    notes: fakeNotes,
  },
  {
    id: randomUUID(),
    title: "My second book",
    user_id: randomUUID(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    notes: fakeNotes,
  },
];
