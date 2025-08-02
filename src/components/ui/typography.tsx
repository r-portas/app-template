/**
 * Reusable typography elements for consistent text styling
 *
 * @remarks
 * @see {@link https://ui.shadcn.com/docs/components/typography}
 */
export function Typography({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "h1" | "h2" | "h3" | "h4" | "p" | "blockquote" | "lead" | "muted";
}) {
  switch (variant) {
    case "h1":
      return (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {children}
        </h4>
      );
    case "p":
      return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
    case "blockquote":
      return (
        <blockquote className="mt-6 border-l-2 pl-6 italic">
          {children}
        </blockquote>
      );
    case "lead":
      return <p className="text-muted-foreground text-xl">{children}</p>;
    case "muted":
      return <p className="text-muted-foreground text-sm">{children}</p>;
  }
}
