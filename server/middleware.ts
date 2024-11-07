import { createMiddleware } from "hono/factory";
import type { HonoType } from "./types";
import { auth } from "./auth";

export const authMiddleware = createMiddleware<HonoType>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    console.log("No session found");

    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  console.log("Session found, user:", session.user);

  return next();
});
