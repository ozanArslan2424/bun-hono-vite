import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/email/verify")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /email/verify!";
}
