import { type ApiRoutes } from "@shared/types";
import { hc } from "hono/client";

export const api = hc<ApiRoutes>("/").api;

export const KEYS = {
  ALL_BOOKS: "allBooks",
  BOOK: "book",
};
