import { createLink } from "@tanstack/react-router";
import type { VariantProps } from "class-variance-authority";
import { type ComponentProps } from "react";

import { Button, buttonVariants } from "./button";

type ButtonLinkInnerProps = ComponentProps<"a"> & VariantProps<typeof buttonVariants>;

const ButtonLinkInner = ({ ref, variant, size, className, ...props }: ButtonLinkInnerProps) => (
  <Button variant={variant} size={size} className={className} asChild>
    <a ref={ref} {...props} />
  </Button>
);

/**
 * shadcn Button wrapped with TanStack Router for type-safe internal navigation.
 * Use this when a navigation action should look like a button rather than a text link.
 *
 * @example
 * Basic button link:
 * ```tsx
 * <ButtonLink to="/about" preload="intent">Go to About</ButtonLink>
 * ```
 *
 * @example
 * Button link with a route param:
 * ```tsx
 * <ButtonLink to="/posts/$id" params={{ id: post.id }} variant="outline" preload="intent">View post</ButtonLink>
 * ```
 */
const ButtonLink = createLink(ButtonLinkInner);

export default ButtonLink;
