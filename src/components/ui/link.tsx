import { createLink } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

const LinkComponent = ({ ref, className, ...props }: React.ComponentPropsWithRef<"a">) => (
  <a ref={ref} className={cn("hover:text-primary underline underline-offset-4", className)} {...props} />
);

const Link = createLink(LinkComponent);

/**
 * Plain anchor wrapped with TanStack Router for type-safe internal navigation.
 * Use this instead of a plain `<a>` tag when linking to internal routes.
 *
 * @example
 * Basic link:
 * ```tsx
 * <Link to="/about">About</Link>
 * ```
 *
 * @example
 * Link with a route param:
 * ```tsx
 * <Link to="/posts/$id" params={{ id: post.id }}>Read more</Link>
 * ```
 */
export default Link;
