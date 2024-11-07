import Link from "@/components/elements/link";
import { cn } from "@/lib/utils";
import { SelectBookWithNotes } from "@shared/types";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRightIcon, ChevronRightIcon, MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "../elements/skeleton";
import { useBookContext } from "./book-note-context";

export function BookSidemenu({
  books,
  currentBookId,
}: {
  books: SelectBookWithNotes[];
  currentBookId: string;
}) {
  return (
    <motion.aside className="calm-gradient-slate h-full min-w-[320px] rounded-md border">
      <h2 className="bg-secondary/60 rounded-t-md p-4 text-lg font-semibold leading-none tracking-wide backdrop-blur-md">
        Library
      </h2>
      <ol className="px-4 py-3">
        {books
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((book) => (
            <BookSidemenuListItem
              key={book.id}
              book={book}
              currentlyOpen={currentBookId === book.id}
            />
          ))}
      </ol>
    </motion.aside>
  );
}

export function BookSidemenuListItem({
  book,
  currentlyOpen,
}: {
  book: SelectBookWithNotes;
  currentlyOpen: boolean;
}) {
  const [isOpen, setIsOpen] = useState(currentlyOpen);
  const { selectedNoteId, setSelectedNoteId, setCreateNoteFormOpen, setCreateNoteFormBookId } =
    useBookContext();

  function toggleOpen() {
    if (currentlyOpen) {
      setIsOpen(false);
    }

    setIsOpen(!isOpen);
  }

  function handleNoteSelect(noteId: string) {
    setSelectedNoteId(noteId);
  }

  function handleOpenCreateNoteForm() {
    setCreateNoteFormOpen(true);
    setCreateNoteFormBookId(book.id);
  }

  return (
    <li className="pb-3 last:pb-0">
      <div
        className={cn(
          "flex items-center gap-1.5",
          currentlyOpen
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground transition-colors"
        )}
      >
        <button onClick={toggleOpen} className="-m-1 p-1">
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="flex"
          >
            <ChevronRightIcon className="text-muted-foreground size-4" />
          </motion.span>
        </button>

        <Link to={"/book/" + book.id} className="hover:underline" onClick={toggleOpen}>
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
                <button
                  onClick={() => handleNoteSelect(note.id)}
                  className={cn(
                    "text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-2 py-1 transition-colors",
                    selectedNoteId === note.id && "text-foreground"
                  )}
                >
                  {selectedNoteId === note.id ? (
                    <ArrowRightIcon size={16} />
                  ) : (
                    <MinusIcon size={16} />
                  )}
                  <span className="cursor-pointer text-sm">{note.title}</span>
                </button>
              </li>
            ))}

            <li>
              <button
                className="hover:text-foreground text-muted-foreground/70 flex items-center gap-1.5 px-2 py-1 transition-colors"
                onClick={handleOpenCreateNoteForm}
              >
                <PlusIcon size={16} />
                <span className="cursor-pointer text-sm">New Note</span>
              </button>
            </li>
          </motion.ol>
        )}
      </AnimatePresence>
    </li>
  );
}

export function BookSidemenuSkeleton() {
  return (
    <aside className="calm-gradient-slate min-w-[320px] rounded-md border">
      <h2 className="bg-secondary/60 rounded-t-md p-4 text-lg font-semibold leading-none tracking-wide backdrop-blur-md">
        Library
      </h2>
      <ol className="px-4 py-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </ol>
    </aside>
  );
}
