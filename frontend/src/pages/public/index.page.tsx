import { Button } from "@/components/ui/button";
import { useFetch } from "@/lib/hooks/use-fetch";
import { SelectNote } from "@/lib/schemas/notes";

export default function IndexPage() {
  const { data, loading } = useFetch<{ notes: SelectNote[] }>("/api/notes");

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <h2>Here are your notes</h2>
        <div className="grid grid-cols-2 gap-4">
          {!loading && data ? data.notes.map((note) => <NoteLink key={note.id} {...note} />) : <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
}

function NoteLink({ title, created_at, book_id }: SelectNote) {
  return (
    <div className="flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 transition-all hover:border-primary/50 hover:shadow active:shadow-none">
      <div className="flex flex-col items-start gap-3">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">Created at {created_at}</p>
      </div>
      <div className="flex flex-col items-end gap-3">
        <Button variant={"outline"} size={"sm"}>
          Edit
        </Button>
        <p className="text-sm text-muted-foreground">{book_id}</p>
      </div>
    </div>
  );
}
