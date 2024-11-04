import { Button } from "@/components/elements/button";
import { Checkbox } from "@/components/elements/checkbox";
import { Input } from "@/components/elements/input";
import { Callout } from "@/components/ui/callout";
import Link from "@/components/ui/link";
import { useForm } from "@/lib/hooks/use-form";
import { loginWithCredentials } from "@shared/auth.client";
import { LoginFormValues } from "@shared/types";
import { loginFormSchema } from "@shared/zod.schema";

import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const { field, safeSubmit, setRootError, errors } = useForm<LoginFormValues>(loginFormSchema, {
    fields: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
      rememberMe: { label: "Remember me", type: "checkbox", defaultValue: "on" },
    },
    afterSubmitSuccess: () => {
      navigate({ to: "/dashboard" });
    },
    afterSubmitError: () => {
      setRootError("Invalid email or password");
    },
  });

  return (
    <div className="flex flex-1 items-center justify-center pt-8">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1>Login</h1>
        <form onSubmit={(e) => safeSubmit(e, loginWithCredentials)}>
          <div className="flex flex-col gap-4 pb-6">
            <Input {...field("email")} />
            <Input {...field("password")} />
            <Checkbox {...field("rememberMe")} />
          </div>
          <Callout variant="error">{errors._root}</Callout>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <Link to="/register" className="hover:underline">
          Don&apos;t have an account? Register here.
        </Link>
      </div>
    </div>
  );
}
