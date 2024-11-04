import { Button } from "@/components/elements/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-6">
      <h1>Welcome to Our Landing Page</h1>
      <p>This is the best place to start your journey with us.</p>
      <Button>Get Started</Button>
      <Button variant="secondary">Get Started</Button>
      <Button variant="accent">Get Started</Button>
      <Button variant="danger">Get Started</Button>
      <Button variant="ghost">Get Started</Button>
      <Button variant="muted">Get Started</Button>
      <Button variant="outline">Get Started</Button>
      <Button variant="warning">Get Started</Button>
      <Button variant="success">Get Started</Button>
    </div>
  );
}
