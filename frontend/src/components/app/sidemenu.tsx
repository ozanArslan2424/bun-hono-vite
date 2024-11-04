import { useAllBooks } from "@/lib/api/get";
import { LoaderIcon } from "lucide-react";
import { BookListItem } from "./book-li";
import { AddBookListItem } from "./create/add-book";

export default function BookSidemenu({ currentBookId }: { currentBookId: string }) {
  const { isPending, error, data } = useAllBooks();

  return (
    <aside className="calm-gradient min-w-[320px] rounded-md border">
      <h2 className="bg-secondary/60 rounded-t-md p-4 text-lg font-semibold leading-none tracking-wide backdrop-blur-md">
        Library
      </h2>
      <div className="px-4 py-3">
        {isPending ? (
          <div className="flex items-center gap-2">
            <LoaderIcon className="size-4 animate-spin" />
            <span>Loading books...</span>
          </div>
        ) : error ? (
          <p>{error.message}</p>
        ) : (
          <ol>
            {data.books
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((book) => (
                <BookListItem key={book.id} book={book} currentlyOpen={currentBookId === book.id} />
              ))}
            <li>
              <AddBookListItem />
            </li>
          </ol>
        )}
      </div>
    </aside>
  );
}
