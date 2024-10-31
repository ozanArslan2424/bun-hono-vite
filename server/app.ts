import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { notesRoute } from "./routes/notes";

const app = new Hono();

app.use("*", logger());

app.route("/api/notes", notesRoute);

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ root: "./frontend/dist/index.html" }));

export { app };
