import { Button } from "@/components/elements/button";
import { iconSizes } from "@/lib/config";
import { LoaderIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  if (!mounted)
    return (
      <Button variant="outline" size="icon">
        <LoaderIcon fill="#fff" size={iconSizes.md} className="animate-spin" />
      </Button>
    );

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {resolvedTheme === "dark" ? (
        <SunIcon size={iconSizes.md} />
      ) : (
        <MoonIcon size={iconSizes.md} />
      )}
    </Button>
  );
}

export { ThemeSwitch };
