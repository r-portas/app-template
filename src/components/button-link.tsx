import { createLink } from "@tanstack/react-router";
import Button, { type ButtonProps } from "@mui/material/Button";
import type React from "react";

// See {@link https://tanstack.com/router/latest/docs/framework/react/guide/custom-link#mui-example}
const ButtonLink = createLink((props: ButtonProps<"a">) => <Button component="a" {...props} />);

/**
 * MUI Button wrapped with TanStack Router for type-safe internal navigation.
 * Use this when a navigation action should look like a button rather than a text link.
 *
 * @example
 * Basic button link:
 * ```tsx
 * <ButtonLink to="/about" variant="contained">Go to About</ButtonLink>
 * ```
 *
 * @example
 * Button link with a route param:
 * ```tsx
 * <ButtonLink to="/posts/$id" params={{ id: post.id }} variant="outlined">View post</ButtonLink>
 * ```
 */
export default function ButtonLinkWithPreload(props: React.ComponentProps<typeof ButtonLink>) {
  return <ButtonLink preload="intent" {...props} />;
}
