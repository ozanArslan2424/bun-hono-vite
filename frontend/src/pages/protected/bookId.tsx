import { BookNoteView } from "@/components/app/book-note-view";
import { useBook } from "@/lib/api/get";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useBookContext } from "@/components/app/book-note-context";
import { SelectNote } from "@shared/types";

export function BookPage() {
  const { bookId } = useParams();
  const { data, error, isPending } = useBook(bookId);
  const nav = useNavigate();
  const [note, setNote] = useState<SelectNote | null>(null);

  const { selectedNoteId } = useBookContext();

  useEffect(() => {
    if (selectedNoteId) {
      const note = data?.book.notes.find((note) => note.id === selectedNoteId);
      if (!note) return;
      setNote(note);
    }
  }, [selectedNoteId, data]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    toast.error("An error occurred while fetching book");
    nav("/dashboard");
    return;
  }

  if (!data) {
    toast.error("Book not found");
    nav("/dashboard");
    return;
  }

  return (
    <div className="flex-1 px-4">
      {!note && <div className="h-full min-h-[88dvh] w-full rounded-md border p-8"></div>}

      <AnimatePresence>
        {note && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <BookNoteView note={note} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
