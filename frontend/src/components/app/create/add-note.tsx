import { PlusIcon } from "lucide-react";

export function AddNoteListItem({ bookId }: { bookId: string }) {
  return (
    <button className="hover:text-foreground text-muted-foreground/70 flex items-center gap-1.5 px-2 py-1 transition-colors">
      <PlusIcon className="size-4" />
      <span className="cursor-pointer text-sm">New Note</span>
    </button>
  );
}
