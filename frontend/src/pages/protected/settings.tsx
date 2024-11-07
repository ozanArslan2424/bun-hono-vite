import { SettingsForm } from "@/components/app/profile-settings-form";
import { Button } from "@/components/elements/button";
import { Input } from "@/components/elements/input";
import Link from "@/components/elements/link";
import { ArrowLeftIcon } from "lucide-react";

export function SettingsPage() {
  return (
    <>
      <div className="flex gap-4 px-40 py-12">
        <div className="w-1/5">
          <Link to="/dashboard" asButton variant="outline" className="flex-nowrap">
            <ArrowLeftIcon size={16} />
            <span>Back</span>
          </Link>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="max-w-lg space-y-8">
            <SettingsForm />

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
        <div className="w-1/5"></div>
      </div>
    </>
  );
}
