import { useAllBooks } from "@/lib/api/get";
import { timestamp } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "../elements/link";
import { BookIcon } from "lucide-react";
import { Callout } from "../elements/callout";

export function DashboardBookList() {
  const { isPending, error, data } = useAllBooks();

  if (isPending) {
    return <DashboardBookListSkeleton />;
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

  return data.books
    .sort((a, b) => timestamp.toTime(b.createdAt) - timestamp.toTime(a.createdAt))
    .map((book, i) => (
      <Link to={"/book/" + book.id} key={book.id}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.2, delay: i * 0.1 }}
        >
          <DashboardBookListItem title={book.title} createdAt={book.createdAt} />
        </motion.div>
      </Link>
    ));
}

type DashboardBookListItemProps = {
  title: string;
  createdAt: string;
};

export function DashboardBookListItem(props: DashboardBookListItemProps) {
  return (
    <div className="hover:border-primary shadow-primary group flex items-start rounded-md border transition-all hover:shadow-sm">
      <div className="bg-muted group-hover:border-primary grid place-content-center rounded-l-[5px] border px-4 py-8 duration-200">
        <BookIcon size={36} />
      </div>
      <div className="px-4 py-2">
        <h3 className="text-xl font-semibold">{props.title}</h3>
        <time className="text-muted-foreground" dateTime={props.createdAt}>
          {timestamp.toReadable(props.createdAt)}
        </time>
      </div>
    </div>
  );
}

export function DashboardBookListSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="flex items-center gap-4 py-4">
            <div className="bg-muted h-12 w-12 rounded-full" />
            <div className="flex-1">
              <div className="bg-muted h-4 w-1/2 rounded" />
              <div className="bg-muted mt-1 h-3 w-1/4 rounded" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
