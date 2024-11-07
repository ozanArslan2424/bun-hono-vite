import { timestamp } from "@/lib/utils";
import { SelectNote } from "@shared/types";

export function BookNoteView({ note }: { note: SelectNote }) {
  const createdAt = timestamp.toReadable(note.createdAt);
  const updatedAt = timestamp.toReadable(note.updatedAt);

  const ago =
    timestamp.howManyDaysAgo(createdAt) === 0
      ? "today"
      : timestamp.howManyDaysAgo(createdAt) === 1
        ? "yesterday"
        : `${timestamp.howManyDaysAgo(createdAt)} days ago`;

  return (
    <article>
      <address className="calm-gradient-slate rounded-t-md">
        <div className="bg-secondary/60 flex items-start justify-between rounded-t-md px-6 py-4">
          <h1>{note.title}</h1>
          <div className="text-muted-foreground flex flex-col items-end gap-2">
            <time dateTime={createdAt}>Created: {createdAt}</time>
            <time dateTime={updatedAt}>Last updated {ago}</time>
          </div>
        </div>
      </address>
    </article>
  );
}
