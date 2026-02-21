import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const App = () => {
  return (
    <div>
      <h1 className="text-red-600 text-5xl">Hello world</h1>
      <Button>Click me</Button>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: App,
});
