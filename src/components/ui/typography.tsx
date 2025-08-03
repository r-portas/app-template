import { cn } from "@/lib/utils";
/**
 * Reusable typography elements for consistent text styling
 *
 * @remarks
 * @see {@link https://ui.shadcn.com/docs/components/typography}
 */
export function Typography({
  children,
  className,
  variant,
}: {
  children: React.ReactNode;
  className?: string;
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "p"
    | "blockquote"
    | "lead"
    | "muted"
    | "inline-code";
}) {
  switch (variant) {
    case "h1":
      return (
        <h1
          className={cn(
            "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",
            className,
          )}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={cn(
            "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
            className,
          )}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={cn(
            "scroll-m-20 text-2xl font-semibold tracking-tight",
            className,
          )}
        >
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4
          className={cn(
            "scroll-m-20 text-xl font-semibold tracking-tight",
            className,
          )}
        >
          {children}
        </h4>
      );
    case "p":
      return (
        <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
          {children}
        </p>
      );
    case "blockquote":
      return (
        <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
          {children}
        </blockquote>
      );
    case "lead":
      return (
        <p className={cn("text-muted-foreground text-xl", className)}>
          {children}
        </p>
      );
    case "muted":
      return (
        <p className={cn("text-muted-foreground text-sm", className)}>
          {children}
        </p>
      );
    case "inline-code":
      return (
        <code
          className={cn(
            "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
            className,
          )}
        >
          {children}
        </code>
      );
  }
}
