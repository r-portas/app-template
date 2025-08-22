import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Renders a styled unordered or ordered list.
 *
 * @remarks
 * Use for displaying bulleted or numbered lists. Supports nested lists.
 */
export function List({
  children,
  className,
  variant = "ul",
}: {
  children: ReactNode;
  className?: string;
  variant?: "ul" | "ol";
}) {
  switch (variant) {
    case "ol":
      return (
        <ol className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)}>
          {children}
        </ol>
      );
    case "ul":
      return (
        <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>
          {children}
        </ul>
      );
  }
}
/**
 * Renders a single list item with consistent spacing.
 *
 * @remarks
 * Use inside the List component for each item.
 */
export function ListItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <li className={className}>{children}</li>;
}
