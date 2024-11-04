import { useForm } from "@/lib/hooks/use-form";
import { SelectUser, SettingsFormValues } from "@shared/types";
import { settingsFormSchema } from "@shared/zod.schema";
import { UserXIcon } from "lucide-react";
import { Button } from "../elements/button";
import { Input } from "../elements/input";

export function SettingsForm({ user }: { user: SelectUser }) {
  const { field, safeSubmit } = useForm<SettingsFormValues>(settingsFormSchema, {
    fields: {
      name: { label: "Username", type: "text", defaultValue: user.name },
      image: { label: "Profile Picture", type: "file", accept: "image/*" },
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    safeSubmit(e, (values) => {
      console.log("submit success", values);
      // TODO: Upload image
      // const imageFile = values.image
      // upload somewhere
      // get the url
      // const imageUrl = "https://example.com/image.jpg"
      // const updatedValues = { ...values, image: imageUrl }
    });
  }

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
      <h1>Settings</h1>

      <div className="flex w-full items-center gap-4">
        {user.image ? (
          <img
            src={user.image}
            alt={user.name + " Profile picture"}
            height={200}
            width={200}
            className="aspect-square h-56 w-56 shrink-0 rounded-lg"
          />
        ) : (
          <div className="bg-foreground/10 grid aspect-square h-[200px] w-[200px] shrink-0 place-content-center rounded-lg">
            <UserXIcon size={32} />
          </div>
        )}

        <div className="flex flex-col gap-4">
          <Input {...field("name")} />
          <Input {...field("image")} />
        </div>
      </div>

      <Button type="submit">Save Settings</Button>
    </form>
  );
}
