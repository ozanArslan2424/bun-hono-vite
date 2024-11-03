import { Input } from "@/components/forms/input";
import { Button } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="grid gap-4 p-6 md:grid-cols-[20%_60%_20%]">
        <div>
          <Link href="/dashboard" asButton variant="outline" className="flex-nowrap">
            <ArrowLeftIcon size={16} />
            <span>Back</span>
          </Link>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="max-w-lg space-y-8">
            <form className="flex w-full flex-col gap-4">
              <h1>Settings</h1>

              <div className="flex w-full items-center gap-4">
                <img
                  src="/foto.jpeg"
                  alt="Profile picture"
                  height={224}
                  width={224}
                  className="aspect-square h-56 w-56 shrink-0 rounded-lg"
                />

                <div className="flex flex-col gap-4">
                  <Input
                    id="profile_picture"
                    name="profile_picture"
                    label="Profile Picture"
                    type="file"
                    accept="image/*"
                  />
                  <Input id="email" name="email" label="Email" type="email" defaultValue="ozan.5005@gmail.com" />
                  <Input id="name" name="name" label="Username" type="text" defaultValue="Ozan" />
                </div>
              </div>

              <Button>Save Settings</Button>
            </form>

            <form className="flex w-full flex-col gap-4">
              <h2>Change password</h2>

              <div className="flex gap-4">
                <Input id="old_password" name="old_password" label="Old Password" type="password" />
                <Input id="new_password" name="new_password" label="New Password" type="password" />
              </div>

              <Button>Submit new password</Button>
            </form>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
