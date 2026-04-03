import { Heading, Typography } from "@/components/ui/typography";

import ButtonLink from "./ui/button-link";

export function NotFound() {
  return (
    <div className="flex h-full min-h-[calc(100vh-3rem)] flex-col items-center justify-center gap-6 text-center">
      <Typography
        variant="muted"
        className="text-foreground/20 font-serif text-7xl font-light tracking-tight"
      >
        404
      </Typography>
      <div className="flex flex-col gap-2">
        <Heading level={2}>Page not found</Heading>
      </div>
      <ButtonLink to="/">Go home</ButtonLink>
    </div>
  );
}
