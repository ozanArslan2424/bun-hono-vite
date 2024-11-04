import { SelectNote } from "@shared/schemas/notes";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { AddSubNoteListItem } from "./create/add-note";

export function NoteListItem({ note }: { note: SelectNote }) {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <li key={note.title}>
      <span className="flex items-center gap-1.5 px-2 py-1">
        {note.sub_notes && note.sub_notes.length > 0 ? (
          <button onClick={() => setIsOpen(!isOpen)} className="-m-1 p-1">
            <motion.span
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="flex"
            >
              <ChevronRightIcon className="text-muted-foreground size-4" />
            </motion.span>
          </button>
        ) : (
          <AddSubNoteListItem noteId={note.id} />
        )}
        <span className="cursor-pointer text-sm hover:underline">{note.title}</span>
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.ol
            className="flex flex-col justify-end overflow-hidden pl-2"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          >
            {note.sub_notes
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              .map((note) => (
                <NoteListItem note={note} key={note.id} />
              ))}
          </motion.ol>
        )}
      </AnimatePresence>
    </li>
  );
}
