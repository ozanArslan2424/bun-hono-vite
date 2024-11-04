import Link from "@/components/ui/link";
import { cn } from "@/lib/utils";
import { SelectBookWithNotes } from "@shared/types";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRightIcon, DotIcon } from "lucide-react";
import { useState } from "react";
import { AddNoteListItem } from "./create/add-note";

export function BookListItem({ book, currentlyOpen }: { book: SelectBookWithNotes; currentlyOpen: boolean }) {
  const [isOpen, setIsOpen] = useState(currentlyOpen);

  return (
    <li key={book.id} className="pb-3 last:pb-0">
      <div
        className={cn(
          "flex items-center gap-1.5",
          currentlyOpen ? "text-foreground" : "text-muted-foreground hover:text-foreground transition-colors"
        )}
      >
        <button onClick={() => setIsOpen(!isOpen)} className="-m-1 p-1">
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="flex"
          >
            <ChevronRightIcon className="text-muted-foreground size-4" />
          </motion.span>
        </button>

        <Link
          to="/books/$bookId"
          params={{ bookId: book.id }}
          className="hover:underline"
          onClick={() => setIsOpen(true)}
        >
          <h2 className="text-base font-semibold">{book.title}</h2>
        </Link>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ol
            className="ml-3 mt-1 flex flex-col justify-end overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ type: "tween", bounce: 0, duration: 0.4 }}
          >
            {book.notes.map((note) => (
              <li key={note.title}>
                <span className="flex items-center gap-1.5 px-2 py-1">
                  <DotIcon className="text-muted-foreground size-4" />
                  <span className="cursor-pointer text-sm hover:underline">{note.title}</span>
                </span>
              </li>
            ))}

            <li>
              <AddNoteListItem bookId={book.id} />
            </li>
          </motion.ol>
        )}
      </AnimatePresence>
    </li>
  );
}
