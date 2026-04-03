import { createFileRoute } from "@tanstack/react-router";

import { Heading, Lead } from "@/components/ui/typography";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex flex-col gap-4">
      <Heading level={1}>Home</Heading>
      <Lead>Welcome to your new app.</Lead>
    </div>
  );
}
