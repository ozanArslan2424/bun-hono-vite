import { useForm } from "@/hooks/use-form";
import { SettingsFormValues } from "@shared/types";
import { settingsFormSchema } from "@shared/zod.schema";
import { UserXIcon } from "lucide-react";
import { Button } from "../elements/button";
import { FileInput } from "../elements/input-types/file";
import { Input } from "../elements/input";
import { useUserQuery } from "@/lib/api/get";

export function SettingsForm() {
  const { user } = useUserQuery();

  const { field, safeSubmit } = useForm<SettingsFormValues>(settingsFormSchema, {
    fields: {
      name: { label: "Username", type: "text", defaultValue: user?.name },
      image: { label: "Profile Picture", type: "file", accept: "image/*" },
    },
  });

  if (!user) return;

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
    <div className="flex w-full flex-col gap-4">
      <h1>Profile Settings</h1>

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

        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
          <Input {...field("name")} />
          <FileInput {...field("image")} />
          <Button type="submit">Save Settings</Button>
        </form>
      </div>
    </div>
  );
}
