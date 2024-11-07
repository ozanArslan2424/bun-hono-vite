import { Hono } from "hono";
import type { HonoType } from "../app";
import { auth } from "../auth";

export const authRoutes = new Hono<HonoType>()
  .get("/*", (c) => auth.handler(c.req.raw))
  .post("/*", (c) => auth.handler(c.req.raw));
