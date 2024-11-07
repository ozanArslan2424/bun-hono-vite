import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { booksRoute } from "./routes/books.route";
import { authMiddleware } from "./middleware";
import { authRoutes } from "./routes/auth.route";
import type { HonoType } from "./types";
import { notesRoute } from "./routes/notes.route";

const app = new Hono<HonoType>();

export const apiRoutes = app
  .basePath("/api")
  //------------------------------------------ middleware
  .use(logger())
  .use((c, n) => authMiddleware(c, n))
  //------------------------------------------ /api/auth routes handled by better-auth
  .route("/auth", authRoutes)
  //------------------------------------------ /api/books routes
  .route("/books", booksRoute)
  //------------------------------------------ /api/notes routes
  .route("/notes", notesRoute);

//-------------------------------------------- serve the frontend
app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

// * export the app at the end
export { app };
