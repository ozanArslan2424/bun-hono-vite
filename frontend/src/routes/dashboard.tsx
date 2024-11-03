import { Button } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { queryAllBooks } from "@/lib/queries/books";
import { cn, repeat, timestamp } from "@/lib/utils";
import { SelectBook } from "@shared/schemas/notes";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FileTextIcon } from "lucide-react";
import { useState } from "react";

// import SyntaxHighlighter from "react-syntax-highlighter";
// import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, error, isPending } = useQuery({ ...queryAllBooks });

  return (
    <div className="grid w-full grid-cols-[35%_65%] gap-6 p-6">
      <div className="flex flex-col gap-2">
        <div className="bg-accent rounded-lg p-4">
          <h2>Quick Notes</h2>
        </div>
        <motion.div layout className="flex flex-col gap-2">
          {repeat(5, (i) => (
            <QuickNoteItem key={i} />
          ))}
        </motion.div>
      </div>
      {/* <SyntaxHighlighter language="json" style={atomOneDark}>
        {JSON.stringify(data?.books, null, 2)}
      </SyntaxHighlighter> */}

      <div className="space-y-4 pr-6">
        <h1>Library</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "1rem",
          }}
        >
          {!isPending && error && <div>Error: {error.message}</div>}
          {isPending && <div>Loading...</div>}
          {!isPending && !error && data.books.map((book) => <BookLink key={book.id} {...book} />)}
        </div>
      </div>
    </div>
  );
}

function QuickNoteItem() {
  const [settingsVisible, setSettingsVisible] = useState(false);

  function handleShowSettings() {
    setSettingsVisible((prev) => !prev);
  }

  return (
    <>
      <motion.button
        layout
        // className={cn(
        //   "hover:border-primary/50 cursor-pointer rounded-md border bg-white/70 px-3 py-1.5 text-left outline-none transition-all hover:shadow active:shadow-none",
        //   settingsVisible ? "border-primary/50" : "focus:border-primary/50 border-transparent"
        // )}
        className={cn(
          "flex flex-col items-start justify-between",
          "rounded-md border px-3 py-2 text-left transition-all",
          "active:border-primary/20 hover:shadow-sm active:shadow-none",
          settingsVisible ? "border-primary/30" : "focus:border-primary/30 border-border"
        )}
        onClick={handleShowSettings}
        initial={{ height: "auto" }}
        animate={{ height: settingsVisible ? 108 : 70 }}
        transition={{ duration: 0.1, ease: "anticipate" }}
      >
        <div className="z-[2] flex flex-col gap-1.5 py-1.5">
          <h3 className="font-semibold leading-none">Note Title</h3>
          <p className="leading-none">Note contents go here.</p>
        </div>

        <motion.div
          layout
          initial={{
            position: "absolute",
            top: -100,
            // y: -20,
            z: -1,
          }}
          animate={{
            position: settingsVisible ? "static" : "absolute",
            top: -100,
            // y: settingsVisible ? 0 : -20,
            z: settingsVisible ? 1 : -1,
          }}
          exit={{
            position: "absolute",
            top: -100,
            // y: -20,
            z: -1,
          }}
          transition={{ duration: 0.2, delay: 0.15, ease: "anticipate" }}
          className="flex gap-2 py-1"
        >
          <Button
            onClick={(e) => e.stopPropagation()}
            size={"xs"}
            variant={"outline"}
            disabled={!settingsVisible}
            className="border-primary/30 w-2/3 bg-white/70 hover:border-emerald-500 hover:bg-white/70 focus-visible:border-emerald-500 disabled:opacity-0"
          >
            Make full note
          </Button>
          <Button
            onClick={(e) => e.stopPropagation()}
            size={"xs"}
            variant={"outline"}
            disabled={!settingsVisible}
            className="border-primary/30 w-1/3 bg-white/70 hover:border-red-500 hover:bg-white/70 focus-visible:border-red-500 disabled:opacity-0"
          >
            Delete
          </Button>
        </motion.div>
      </motion.button>
    </>
  );
}

function BookLink({ title, created_at, notes }: SelectBook) {
  return (
    <Link href="#" className="relative">
      <Button variant={"outline"} size={"xs"} className="absolute right-3 top-3">
        Edit
      </Button>

      <div className="hover:border-primary/50 flex cursor-pointer flex-col gap-4 rounded-lg border px-4 py-3 transition-all hover:shadow active:shadow-none">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold">{title}</h3>
        </div>
        <div className="flex items-end justify-between gap-3">
          <p className="text-muted-foreground text-sm">{timestamp.toLocaleDateString(created_at)}</p>
          <div className="text-muted-foreground flex items-center gap-1 text-sm">
            {notes.length}
            <FileTextIcon size={13} />
          </div>
        </div>
      </div>
    </Link>
  );
}
