import { Button } from "@/components/elements/button";
import {
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/elements/dropdown-menu";
import { iconSizes } from "@/lib/config";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/auth.client";
import { User2Icon } from "lucide-react";
import { useState } from "react";
import Link from "../elements/link";
import { useUserQuery } from "@/lib/api/get";

export function UserButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserQuery();
  if (!user) return;

  return (
    <DropdownMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className={cn("", isOpen && "ring-2 ring-offset-2")}>
          <User2Icon size={iconSizes.md} />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link to="/settings">
          <DropdownMenuButton>Settings</DropdownMenuButton>
        </Link>

        <DropdownMenuSeparator />
        <DropdownMenuButton
          className="hover:bg-danger hover:text-danger-foreground"
          onClick={() => logout()}
        >
          Logout
        </DropdownMenuButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
