import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { zFile } from "../server/utils";
import { user } from "./schemas/auth";
import { book, note } from "./schemas/books";

export const loginFormSchema = z.object({
  email: z.string().email("This isn't a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  rememberMe: z.string().optional(),
});

export const registerFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters."),
    email: z.string().email("This isn't a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

export const settingsFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  image: z.optional(zFile("image", 5 * 1024 * 1024, "File must be under 5MB.")),
});

export const insertUserSchema = createInsertSchema(user);
export const selectUserSchema = createSelectSchema(user);

export const insertBookSchema = createInsertSchema(book);
export const selectBookSchema = createSelectSchema(book, {
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const insertNoteSchema = createInsertSchema(note);
export const selectNoteSchema = createSelectSchema(note, {
  createdAt: z.string(),
  updatedAt: z.string(),
});
