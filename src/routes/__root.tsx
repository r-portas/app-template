import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import { AppLayout } from "@/components/app-layout";
import { Providers } from "@/components/providers";
import clientEnv from "@/lib/env";

import appCss from "@/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: clientEnv.VITE_APP_NAME,
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Providers>
          <AppLayout />
        </Providers>
        <Scripts />
      </body>
    </html>
  );
}
