import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as authSchema from "../shared/schemas/auth";
import * as schema from "../shared/schemas/books";
import db from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      ...schema,
      ...authSchema,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["http://localhost:3000", "http://localhost:5173"],
  advanced: {
    useSecureCookies: true,
  },
});
