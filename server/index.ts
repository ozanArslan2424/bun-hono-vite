import { app } from "./app";

const server = Bun.serve({
  port: Bun.env.PORT,
  hostname: "0.0.0.0",
  fetch: app.fetch,
});

console.log("🚀 Server running on port", server.port);
