import { Typography } from "@/components/ui/typography";

export default function Home() {
  return (
    <div className="m-10 md:m-40 flex flex-col items-center gap-8">
      <Typography variant="h1">App Template</Typography>
      <div className="max-w-xl w-full text-center">
        <Typography variant="lead">
          Welcome to your new app! This template is pre-configured with Next.js,
          React, TypeScript, Tailwind CSS, and shadcn/ui components. Everything
          you need to start building fast.
        </Typography>
      </div>
      <div className="w-full max-w-xl flex flex-col gap-4">
        <Typography variant="h2">Getting Started</Typography>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>
            <strong>Start the dev server:</strong>{" "}
            <Typography variant="inline-code">bun dev</Typography>
          </li>
          <li>
            <strong>Build for production:</strong>{" "}
            <Typography variant="inline-code">bun run build</Typography>
          </li>
          <li>
            <strong>Run tests:</strong>{" "}
            <Typography variant="inline-code">bun test</Typography>
          </li>
          <li>
            <strong>Format code:</strong>{" "}
            <Typography variant="inline-code">bun format</Typography>
          </li>
          <li>
            <strong>Add a UI component:</strong>{" "}
            <Typography variant="inline-code">
              bun shadcn add &lt;component&gt;
            </Typography>
          </li>
        </ul>
        <div className="mt-4">
          <Typography variant="muted">
            Edit <Typography variant="inline-code">src/app/page.tsx</Typography>{" "}
            to customize this page.
          </Typography>
        </div>
      </div>
    </div>
  );
}
