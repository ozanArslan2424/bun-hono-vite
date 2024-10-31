import { z } from "zod";
import { isoDateString } from "../utils/zod";

export const noteSchema = z.object({
  id: z.string().uuid("Invalid note ID."),
  title: z.string().min(1, "Your note must have a title."),
  content: z.optional(z.string()),
  book_id: z.string().uuid("Invalid book ID."),
  user_id: z.string().uuid("Invalid user ID."),
  created_at: isoDateString,
  updated_at: isoDateString,
});

export const insertNoteSchema = noteSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type SelectNote = z.infer<typeof noteSchema>;
export type InsertNote = z.infer<typeof insertNoteSchema>;
