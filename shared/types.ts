import type { z } from "zod";
import { apiRoutes } from "../server/app";
import {
  insertBookSchema,
  insertNoteFormSchema,
  insertNoteSchema,
  insertUserSchema,
  loginFormSchema,
  registerFormSchema,
  selectBookSchema,
  selectNoteSchema,
  selectUserSchema,
  settingsFormSchema,
} from "./zod.schema";

// * TYPES
export type ApiRoutes = typeof apiRoutes;

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type RegisterFormValues = z.infer<typeof registerFormSchema>;
export type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type SelectUser = Omit<z.infer<typeof selectUserSchema>, "image"> & {
  image?: string | undefined;
};

export type InsertBook = z.infer<typeof insertBookSchema>;
export type SelectBook = z.infer<typeof selectBookSchema>;

export type InsertNote = z.infer<typeof insertNoteSchema>;
export type SelectNote = z.infer<typeof selectNoteSchema>;

export type InsertNoteForm = z.infer<typeof insertNoteFormSchema>;

export type SelectBookWithNotes = SelectBook & { notes: SelectNote[] };
