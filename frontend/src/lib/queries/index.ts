import { type ApiRoutes } from "@shared/types";
import { hc } from "hono/client";

export const apiClient = hc<ApiRoutes>("/");
