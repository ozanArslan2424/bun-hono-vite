import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h1 className="text-3xl font-semibold">About</h1>
      <p className="mt-4">
        This is a simple example of a React application with TypeScript, Tailwind CSS, and React Router.
      </p>
    </>
  );
}
