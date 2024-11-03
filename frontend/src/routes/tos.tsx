import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tos")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h1 className="text-3xl font-semibold">Terms of Service</h1>
      <p className="mt-4">
        This is a simple example of a React application with TypeScript, Tailwind CSS, and React Router.
      </p>
    </>
  );
}
