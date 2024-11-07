import { Input } from "@/components/elements/input";
import { Button } from "@/components/elements/button";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";
import { useForm } from "@/hooks/use-form";
import { InsertNoteForm } from "@shared/types";
import { insertNoteFormSchema } from "@shared/zod.schema";
import { useBookContext } from "./book-note-context";
import { useCreateNote } from "@/lib/api/post";

export function CreateNoteForm() {
  const { createNoteFormOpen, setCreateNoteFormOpen, setSelectedNoteId, createNoteFormBookId } =
    useBookContext();

  const { mutate, data } = useCreateNote();

  const { field, safeSubmit } = useForm<InsertNoteForm>(insertNoteFormSchema, {
    fields: {
      bookId: {
        label: "Book ID",
        type: "hidden",
        readOnly: true,
        value: createNoteFormBookId,
      },
      title: { label: "Title", type: "text", autoFocus: true },
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    safeSubmit(e, (values) => {
      mutate(values);
      if (data) setSelectedNoteId(data.id);
      setCreateNoteFormOpen(false);
    });
  }

  return (
    <AnimatePresence>
      {createNoteFormOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ type: "tween", bounce: 0, duration: 0.3 }}
          className="w-[320px]"
        >
          <form
            className="calm-gradient-gray flex flex-col gap-4 rounded-lg border p-4"
            onSubmit={handleSubmit}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-wrap text-lg font-semibold">Enter a name for your new note.</h3>

              <button
                type="button"
                onClick={() => setCreateNoteFormOpen(false)}
                className="text-muted-foreground hover:bg-muted rounded-md p-1 transition"
              >
                <XIcon size={16} />
                <span className="sr-only">close new note dialog</span>
              </button>
            </div>

            <Input {...field("title")} />
            <Input {...field("bookId")} />

            <Button type="submit">Create Note</Button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
