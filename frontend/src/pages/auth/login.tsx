import { Button } from "@/components/elements/button";
import { Checkbox } from "@/components/elements/input-types/checkbox";
import { Input } from "@/components/elements/input";
import { Callout } from "@/components/elements/callout";
import Link from "@/components/elements/link";
import { useForm } from "@/hooks/use-form";
import { loginWithCredentials } from "@/lib/auth.client";
import { LoginFormValues } from "@shared/types";
import { loginFormSchema } from "@shared/zod.schema";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();

  const { field, safeSubmit, setRootError, errors } = useForm<LoginFormValues>(loginFormSchema, {
    fields: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
      rememberMe: {
        label: "Remember me",
        type: "checkbox",
        defaultValue: "on",
      },
    },
    afterSubmitSuccess: () => {
      navigate("/dashboard");
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
