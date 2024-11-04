import { Button } from "@/components/elements/button";
import { Input } from "@/components/elements/input";
import Link from "@/components/ui/link";
import { useForm } from "@/lib/hooks/use-form";
import { registerWithCredentials } from "@shared/auth.client";
import { RegisterFormValues } from "@shared/types";
import { registerFormSchema } from "@shared/zod.schema";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const { field, safeSubmit, setRootError } = useForm<RegisterFormValues>(registerFormSchema, {
    fields: {
      name: { label: "Name", type: "text" },
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
      confirmPassword: { label: "Confirm Password", type: "password" },
    },
    afterSubmitError: () => {
      setRootError("Something went wrong. Please try again.");
    },
  });

  return (
    <div className="flex flex-1 items-center justify-center pt-8">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1>Register</h1>
        <form onSubmit={(e) => safeSubmit(e, registerWithCredentials)}>
          <div className="flex flex-col gap-4 pb-6">
            <Input {...field("name")} />
            <Input {...field("email")} />
            <Input {...field("password")} />
            <Input {...field("confirmPassword")} />
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
        <Link to="/login" className="hover:underline">
          Already have an account? Login here.
        </Link>
      </div>
    </div>
  );
}
