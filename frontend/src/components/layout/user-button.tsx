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
import { User2Icon } from "lucide-react";

export function UserButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <User2Icon size={iconSizes.md} />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Username</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userLinks.map((link) => (
          <DropdownMenuLink key={link.href} to={link.href}>
            {link.label}
          </DropdownMenuLink>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuButton>Logout</DropdownMenuButton>
        {/* <form action={logout}>
          <DropdownMenuButton type="submit">Logout</DropdownMenuButton>
        </form> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
