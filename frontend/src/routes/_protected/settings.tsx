import { SettingsForm } from "@/components/app/settings";
import { Button } from "@/components/elements/button";
import { Input } from "@/components/elements/input";
import Link from "@/components/ui/link";
import { useSession } from "@shared/auth.client";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";

export const Route = createFileRoute("/_protected/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, error, isPending } = useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="grid gap-4 p-6 md:grid-cols-[20%_60%_20%]">
        <div>
          <Link to="/dashboard" asButton variant="outline" className="flex-nowrap">
            <ArrowLeftIcon size={16} />
            <span>Back</span>
          </Link>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="max-w-lg space-y-8">
            <SettingsForm user={data.user} />

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
