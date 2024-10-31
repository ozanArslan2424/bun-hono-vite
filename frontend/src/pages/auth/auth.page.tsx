import { Input } from "@/components/forms/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@/lib/hooks/use-form";
import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type AuthFormValues = z.infer<typeof authSchema>;

export default function AuthPage() {
  const { field, isPending, safeAction } = useForm<AuthFormValues>(authSchema);

  return (
    <>
      <h1>Login or Register</h1>
      <form>
        <div className="flex flex-col gap-4">
          <Input {...field("email")} label="Email" type="email" />
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
    </>
  );
}
