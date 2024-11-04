import { Header } from "@/components/layout/header";
import NotFoundPage from "@/components/layout/not-found";
import { Toaster } from "@/components/ui/sonner";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import * as React from "react";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundPage,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
      <Toaster richColors />
    </React.Fragment>
  );
}
