import { Toaster } from "@/components/elements/sonner";
import { Header } from "@/components/layout/header";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Toaster richColors />
    </>
  );
}
