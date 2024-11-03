import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { booksRoute } from "./routes/books";
import { notesRoute } from "./routes/notes";

const app = new Hono();

app.use("*", logger());

export const apiRoutes = app.basePath("/api").route("/books", booksRoute).route("/notes", notesRoute);

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ root: "./frontend/dist/index.html" }));

export { app };
