import Link from "@/components/ui/link";
import { useAllBooks } from "@/lib/api/get";
import { timestamp } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

// import SyntaxHighlighter from "react-syntax-highlighter";
// import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const Route = createFileRoute("/_protected/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending, error, data } = useAllBooks();

  return (
    <div className="flex-1 px-8 py-6">
      <h1>Dashboard</h1>

      <div className="py-6">
        {isPending ? (
          "..."
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          data.books
            .sort((a, b) => timestamp.toTime(b.created_at) - timestamp.toTime(a.created_at))
            .map((book, i) => {
              const createdAtText = timestamp.toReadable(book.created_at);

              return (
                <Link to={"/books/$bookId"} params={{ bookId: book.id }} key={book.id}>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.2, delay: i * 0.1 }}
                    className="hover:border-primary/70 mb-4 rounded-md border p-4 transition-all hover:shadow-sm active:shadow-none"
                  >
                    <h2 className="text-xl font-semibold">{book.title}</h2>
                    <time dateTime={book.created_at} className="text-sm text-gray-500">
                      {createdAtText}
                    </time>
                  </motion.div>
                </Link>
              );
            })
        )}
      </div>
    </div>
  );
}
