import { createFileRoute } from "@tanstack/react-router";
import Button from "@mui/material/Button";

const App = () => {
  return (
    <div>
      <h1 className="text-red-600">Hello world</h1>
      <Button variant="contained">Click me</Button>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: App,
});
