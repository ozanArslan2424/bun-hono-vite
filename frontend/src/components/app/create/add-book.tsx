import { Button } from "@/components/elements/button";
import { Input } from "@/components/elements/input";
import { Callout } from "@/components/ui/callout";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateBook } from "@/lib/api/post";
import { useForm } from "@/lib/hooks/use-form";
import { InsertBook } from "@shared/types";
import { insertBookSchema } from "@shared/zod.schema";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function AddBookListItem() {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate } = useCreateBook();

  const { safeSubmit, errors, field, isPending } = useForm<InsertBook>(insertBookSchema, {
    fields: {
      userId: { type: "hidden", value: crypto.randomUUID(), readOnly: true },
      title: { type: "text", label: "Book Title" },
    },
    afterSubmitSuccess: () => {
      setIsOpen(false);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <button className="hover:text-foreground text-muted-foreground/70 flex items-center gap-1.5 py-1 transition-colors">
          <PlusIcon className="size-4" />
          <span className="cursor-pointer text-sm">New Book</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Book</DialogTitle>
          <DialogDescription>You only need a title to start a new book.</DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => safeSubmit(e, mutate)} className="space-y-4">
          <Callout variant="error" className="text-sm">
            {errors.userId || errors._root}
          </Callout>

          <Input {...field("title")} />
          <input {...field("userId")} />

          <div className="flex w-full justify-end gap-2 pt-2">
            <DialogClose asChild>
              <Button variant="danger" type="reset">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" pending={isPending}>
              Create Book
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
