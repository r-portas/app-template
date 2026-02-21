import { createLink } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import type React from "react";

const ButtonLink = createLink(Button);

/**
 * shadcn Button wrapped with TanStack Router for type-safe internal navigation.
 * Use this when a navigation action should look like a button rather than a text link.
 *
 * @example
 * Basic button link:
 * ```tsx
 * <ButtonLink to="/about">Go to About</ButtonLink>
 * ```
 *
 * @example
 * Button link with a route param:
 * ```tsx
 * <ButtonLink to="/posts/$id" params={{ id: post.id }} variant="outline">View post</ButtonLink>
 * ```
 */
export default function ButtonLinkWithPreload(props: React.ComponentProps<typeof ButtonLink>) {
  return <ButtonLink preload="intent" {...props} />;
}
