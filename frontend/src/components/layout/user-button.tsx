import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuLink,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { iconSizes, userLinks } from "@/lib/config";
import { cn } from "@/lib/utils";
import { User2Icon } from "lucide-react";
import { useState } from "react";

export function UserButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className={cn("size-8 rounded-full", isOpen && "ring-2 ring-offset-2")}>
          <User2Icon size={iconSizes.md} />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Username</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {userLinks.map((link) => (
          <DropdownMenuLink key={link.to} to={link.to}>
            {link.label}
          </DropdownMenuLink>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuButton className="hover:bg-danger hover:text-danger-foreground">Logout</DropdownMenuButton>
        {/* <form action={logout}>
          <DropdownMenuButton type="submit">Logout</DropdownMenuButton>
        </form> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
