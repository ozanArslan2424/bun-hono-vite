import { z } from "zod";
import { isoDateString } from "../../frontend/src/lib/utils/zod";

const userId = z.string().uuid("Something wrong with user ID. Try refreshing or logging in again.");

const baseNoteSchema = z.object({
  id: z.string().uuid("Invalid note ID."),
  title: z.string().min(1, "Your note must have a title."),
  content: z.optional(z.string()),
  book_id: z.string().uuid("Invalid book ID."),
  user_id: userId,
  created_at: isoDateString,
  updated_at: isoDateString,
});

type BaseNote = z.infer<typeof baseNoteSchema> & {
  sub_notes: BaseNote[];
};

const noteSchema: z.ZodType<BaseNote> = baseNoteSchema.extend({
  sub_notes: z.lazy(() => noteSchema.array()),
});

export const insertNoteSchema = baseNoteSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type SelectNote = z.infer<typeof noteSchema>;
export type InsertNote = z.infer<typeof insertNoteSchema>;

export const bookSchema = z.object({
  id: z.string().uuid("Invalid book ID."),
  title: z.string().min(1, "Your book must have a title."),
  notes: z.array(noteSchema),
  user_id: userId,
  created_at: isoDateString,
  updated_at: isoDateString,
});

export const insertBookSchema = bookSchema.omit({
  id: true,
  notes: true,
  created_at: true,
  updated_at: true,
});

export type SelectBook = z.infer<typeof bookSchema>;
export type InsertBook = z.infer<typeof insertBookSchema>;
