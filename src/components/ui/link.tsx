import { cn } from "@/lib/utils";
import NextLink from "next/link";

import type { AnchorHTMLAttributes, ReactNode } from "react";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children?: ReactNode;
}

/**
 * A universal link component that renders internal, anchor, or external links.
 *
 * @remarks
 * Uses Next.js Link for internal navigation, regular anchor for hash links, and opens external links in a new tab.
 */
export function Link({ href, className, ...props }: LinkProps) {
  // Its an internal link,
  // so we use Next.js Link for client-side navigation
  if (href.startsWith("/")) {
    return (
      <NextLink
        href={href}
        className={cn(
          "text-primary font-medium underline underline-offset-4",
          className,
        )}
        {...props}
      />
    );
  }

  // If it's a hash link (e.g. a link to a heading),
  // we render a regular anchor tag
  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        className={cn(
          "text-primary font-medium underline underline-offset-4",
          className,
        )}
        {...props}
      />
    );
  }

  // For external links, we render a regular anchor tag
  // open them in a new tab and improve security and privacy
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "text-primary font-medium underline underline-offset-4",
        className,
      )}
      {...props}
    />
  );
}
