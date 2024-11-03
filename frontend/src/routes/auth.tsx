import { Input } from "@/components/forms/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@/lib/hooks/use-form";
import { authSchema, type AuthFormValues } from "@shared/schemas/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const { field, isPending, safeAction } = useForm<AuthFormValues>(authSchema);

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1>Login or Register</h1>
        <form>
          <div className="flex flex-col gap-4">
            <Input {...field("email")} label="Email" type="email" errors={["1ajshd"]} />
            <Input {...field("password")} label="Password" type="password" />
          </div>
          <div className="flex flex-col gap-2 pt-6">
            <Button isPending={isPending} type="submit">
              Login
            </Button>
            <Button isPending={isPending} type="submit" variant={"secondary"}>
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
