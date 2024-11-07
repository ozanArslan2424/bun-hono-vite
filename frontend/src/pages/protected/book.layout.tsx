import { BookSidemenu, BookSidemenuSkeleton } from "@/components/app/book-sidemenu";
import { Callout } from "@/components/elements/callout";
import { useAllBooks } from "@/lib/api/get";
import { Outlet, useParams } from "react-router-dom";
import { BookContextProvider } from "@/components/app/book-note-context";
import { CreateNoteForm } from "@/components/app/create-note-form";

export function BookLayout() {
  const { bookId } = useParams();
  const { isPending, error, data } = useAllBooks();

  if (isPending) {
    return <BookSidemenuSkeleton />;
  }

  if (error) {
    return (
      <>
        <Callout variant="error">There was an error fetching your books:</Callout>
        <pre>
          <code>{JSON.stringify(error, null, 2)}</code>
        </pre>
      </>
    );
  }

  if (!data) {
    return <Callout variant="warning">No data regarding books found.</Callout>;
  }

  if (!bookId) return;

  return (
    <BookContextProvider>
      <div className="flex p-4">
        <div className="flex flex-col gap-4">
          <CreateNoteForm />
          <BookSidemenu currentBookId={bookId} books={data.books} />
        </div>
        <Outlet />
      </div>
    </BookContextProvider>
  );
}
