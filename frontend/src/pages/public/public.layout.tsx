import { Header } from "@/components/layout/header";
// import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <>
      {/* <header className="fixed top-0 flex h-14 w-full items-center justify-between border-b px-8 shadow-sm">
        <h1 className="text-2xl">Hello world from Bun Hono Vite React!</h1>
        <Button variant={"outline"}>Login</Button>
      </header> */}
      <Header />
      <main className="pt-14">
        <Outlet />
      </main>
    </>
  );
}
