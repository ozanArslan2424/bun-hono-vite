import { Button } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <Button onClick={() => toast.success("Hello, world!")}>Click me</Button>

        <Link to="/password/forgot">Test</Link>
        <h1 className="text-4xl font-bold">Welcome to Hono!</h1>

        <Link asButton href="/dashboard">
          Dashboard
        </Link>

        <p className="text-lg">
          Hono is a full-stack TypeScript framework for building scalable and maintainable web applications. It is built
          on top of Express.js and React.js, and provides a set of tools and conventions to help you build your
          application faster.
        </p>
        <p className="text-lg">To get started, check out the </p>
      </div>
    </div>
  );
}
