import BookSidemenu from "@/components/app/sidemenu";
import { useBook } from "@/lib/api/get";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/books/$bookId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { bookId } = Route.useParams();

  const { isPending, error, data } = useBook(bookId);

  return (
    <div className="flex p-4">
      <BookSidemenu currentBookId={bookId} />
      <div className="flex-1 px-4">
        {isPending ? (
          "..."
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div>
            <h1>{data.book.title}</h1>
            <p>{data.book.createdAt}</p>
          </div>
        )}
      </div>
    </div>
  );
}
