import { ThemeProvider } from "@/components/layout/theme-provider";
import { Outlet } from "react-router-dom";

export default function Providers() {
  return (
    <>
      <>
        <ThemeProvider enableSystem>
          <Outlet />
        </ThemeProvider>
      </>
    </>
  );
}
