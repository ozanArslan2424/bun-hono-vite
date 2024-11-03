import { ThemeProvider } from "@/components/layout/theme-provider";
import { Outlet } from "react-router-dom";
import { Header } from "./header";

export default function Providers() {
  return (
    <>
      <>
        <ThemeProvider enableSystem attribute="class">
          <Header />
          <Outlet />
        </ThemeProvider>
      </>
    </>
  );
}
