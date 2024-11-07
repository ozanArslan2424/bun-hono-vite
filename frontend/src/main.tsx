import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import "./assets/styles.css";
import { Router } from "./router";
import { ThemeProvider } from "next-themes";
import React from "react";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" enableSystem defaultTheme="system">
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
