import { createLink } from "@tanstack/react-router";
import MuiLink from "@mui/material/Link";

// See {@link https://tanstack.com/router/latest/docs/framework/react/guide/custom-link#mui-example}
const Link = createLink(MuiLink);

/**
 * MUI Link wrapped with TanStack Router for type-safe internal navigation.
 * Use this instead of MUI's Link or a plain `<a>` tag when linking to internal routes.
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
