import { Hono } from "hono";
import { auth } from "../auth";

export const authRoute = new Hono()
  // get
  .get("/*", (c) => auth.handler(c.req.raw))
  // post
  .post("/*", (c) => auth.handler(c.req.raw));
