import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./shared/schemas",
  out: "./drizzle",
});
