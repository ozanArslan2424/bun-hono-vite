import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { authRoute } from "./routes/auth";
import { booksRoute } from "./routes/books";

const app = new Hono();

// console.log all requests
app.use("*", logger());

export const apiRoutes = app
  .basePath("/api")
  // /api/books routes
  .route("/books", booksRoute)
  // /api/auth routes handled by better-auth
  .route("/auth", authRoute);

// Serve the frontend
app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export { app };
