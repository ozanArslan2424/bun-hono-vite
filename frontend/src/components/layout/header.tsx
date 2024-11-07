import { ThemeSwitch } from "@/components/layout/theme-switch";
import Link from "@/components/elements/link";
import { iconSizes } from "@/lib/config";
import { Globe2Icon } from "lucide-react";
import { UserButton } from "./user-button";
import { useUserQuery } from "@/lib/api/get";

export function Header() {
  const { user } = useUserQuery();

  const navLinks = {
    protected: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/settings", label: "Settings" },
    ],
    public: [
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
    ],
  };

  return (
    <header className="calm-gradient-slate sticky left-0 right-0 top-0 z-[99999] flex h-16 w-full shrink-0 items-center gap-2 border-b shadow-sm">
      <div className="grid aspect-square h-full place-content-center border-r">
        <Link to="/" asButton variant="ghost" size="icon">
          <Globe2Icon size={iconSizes.md} />
        </Link>
      </div>

      <nav className="flex flex-grow items-center gap-4 px-4">
        {navLinks[user ? "protected" : "public"].map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-foreground/70 hover:text-foreground transition"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex gap-2 px-4">
        <ThemeSwitch />
        {user ? (
          <UserButton />
        ) : (
          <Link to="/login" asButton variant="outline" size="sm">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
