import { useRouter } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Heading, Typography } from "@/components/ui/typography";

import ButtonLink from "./ui/button-link";

interface ErrorComponentProps {
  error: Error;
  reset: () => void;
}

export function ErrorComponent({ error }: ErrorComponentProps) {
  const router = useRouter();

  return (
    <div className="flex h-full min-h-[calc(100vh-3rem)] flex-col items-center justify-center gap-6 text-center">
      <Typography
        variant="muted"
        className="text-foreground/20 font-serif text-7xl font-light tracking-tight"
      >
        Error
      </Typography>
      <div className="flex flex-col gap-2">
        <Heading level={2}>Something went wrong</Heading>
        <Typography variant="muted">{error.message}</Typography>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => router.invalidate()}>
          Try again
        </Button>
        <ButtonLink to="/">Go home</ButtonLink>
      </div>
    </div>
  );
}
