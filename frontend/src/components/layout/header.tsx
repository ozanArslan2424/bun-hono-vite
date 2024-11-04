"use client";
import { ThemeSwitch } from "@/components/layout/theme-switch";
import Link from "@/components/ui/link";
import { iconSizes, navLinks } from "@/lib/config";
import { Globe2Icon } from "lucide-react";
import { UserButton } from "./user-button";

export function Header() {
  const user = false;
  return (
    <header className="bg-background fixed left-0 right-0 top-0 z-[99999] flex h-16 w-full shrink-0 items-center gap-2 border-b shadow-sm">
      <div className="grid aspect-square h-full place-content-center border-r">
        <Link to="/" asButton variant="ghost" size="icon">
          <Globe2Icon size={iconSizes.md} />
        </Link>
      </div>

      <nav className="flex flex-grow items-center gap-4 px-4">
        {navLinks[user ? "protected" : "public"].map((link) => (
          <Link key={link.to} to={link.to} className="text-foreground/70 hover:text-foreground transition">
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex gap-2 px-4">
        <ThemeSwitch />
        {user ? (
          <UserButton />
        ) : (
          <Link to="/auth" asButton variant="outline" size="sm">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
