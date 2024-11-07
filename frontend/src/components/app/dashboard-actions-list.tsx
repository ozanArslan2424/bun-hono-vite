import { Input } from "@/components/elements/input";
import { useCreateBook } from "@/lib/api/post";
import { useForm } from "@/hooks/use-form";
import { InsertBook } from "@shared/types";
import { insertBookSchema } from "@shared/zod.schema";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon, PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../elements/button";
import Link from "../elements/link";
import { MotionListItem } from "../motion/li-layout";
import { useUserQuery } from "@/lib/api/get";

type NewBookFormProps = {
  formOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

type OpenNewBookFormButtonProps = {
  formOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

export function DashboardActionsList() {
  const formOpenState = useState(false);

  return (
    <>
      <motion.ul layout className="flex flex-col items-end gap-1.5">
        <MotionListItem>
          <Link to="/settings" asButton variant="text" size="text">
            Profile Settings
          </Link>
        </MotionListItem>
        <MotionListItem>
          <OpenNewBookFormButton formOpenState={formOpenState} />
        </MotionListItem>
        <MotionListItem>
          <NewBookForm formOpenState={formOpenState} />
        </MotionListItem>
      </motion.ul>
    </>
  );
}

function OpenNewBookFormButton({ formOpenState }: OpenNewBookFormButtonProps) {
  const [open, setOpen] = formOpenState;

  return (
    <Button
      variant="text"
      size="text"
      type="button"
      className="justify-end disabled:pointer-events-none"
      onClick={() => setOpen(true)}
      disabled={open}
    >
      <PlusIcon size={16} />
      <span>Create New Book</span>
    </Button>
  );
}

function NewBookForm({ formOpenState }: NewBookFormProps) {
  const { mutate } = useCreateBook();
  const [open, setOpen] = formOpenState;

  const { user } = useUserQuery();
  if (!user) return;

  const { field, safeSubmit } = useForm<InsertBook>(insertBookSchema, {
    fields: {
      title: { label: "Book title" },
    },
    afterSubmitSuccess: () => {
      setOpen(false);
    },
  });

  return (
    <AnimatePresence>
      {open && (
        <form
          className="calm-gradient-gray my-2 flex w-full flex-col items-end gap-4 rounded-lg border px-10 py-6"
          onReset={() => setOpen(false)}
          onSubmit={(e) => safeSubmit(e, mutate)}
        >
          <Input {...field("title")} />
          <div className="flex flex-col items-end gap-2">
            <Button type="submit" variant="text" size="text" className="hover:text-success px-1">
              <CheckIcon size={16} />
              <span>Create New Book</span>
            </Button>
            <Button type="reset" variant="text" size="text" className="hover:text-danger px-1">
              <XIcon size={16} />
              <span>Cancel</span>
            </Button>
          </div>
        </form>
      )}
    </AnimatePresence>
  );
}
