import { Typography } from "@/components/ui/typography";
import { List, ListItem } from "@/components/ui/list";
import { Link } from "@/components/ui/link";

export default function Home() {
  return (
    <div className="m-10 lg:m-40">
      <Typography variant="h1" className="text-center mb-8">
        App Template
      </Typography>
      <Typography variant="lead" className="text-center mb-16">
        Welcome to your new app! This template is pre-configured with{" "}
        <Link href="https://nextjs.org/">Next.js</Link>,{" "}
        <Link href="https://react.dev/">React</Link>,{" "}
        <Link href="https://www.typescriptlang.org/">TypeScript</Link>,{" "}
        <Link href="https://tailwindcss.com/">Tailwind CSS</Link> and{" "}
        <Link href="https://ui.shadcn.com/">shadcn/ui</Link> components.
        Everything you need to start building fast.
      </Typography>
      <Typography variant="h2">Getting Started</Typography>
      <List>
        <ListItem>
          <strong>Start the dev server:</strong> Run the{" "}
          <Typography variant="inline-code">Start Dev Server</Typography> VSCode
          task or run <Typography variant="inline-code">bun dev</Typography>
        </ListItem>
        <ListItem>
          <strong>Build for production:</strong>{" "}
          <Typography variant="inline-code">bun run build</Typography>
        </ListItem>
        <ListItem>
          <strong>Run tests:</strong>{" "}
          <Typography variant="inline-code">bun test</Typography>
        </ListItem>
        <ListItem>
          <strong>Format code:</strong>{" "}
          <Typography variant="inline-code">bun format</Typography>
        </ListItem>
        <ListItem>
          <strong>Add a UI component:</strong>{" "}
          <Typography variant="inline-code">
            bun shadcn add &lt;component&gt;
          </Typography>
        </ListItem>
      </List>
      <Typography variant="muted" className="mt-4">
        Edit <Typography variant="inline-code">src/app/page.tsx</Typography> to
        customize this page.
      </Typography>
    </div>
  );
}
