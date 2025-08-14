import type { Metadata } from "next";
import { fontClassNames } from "./fonts";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "App Template",
  description:
    "An opinionated template for building web applications, preconfigured with everything needs to start building an idea quickly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontClassNames} antialiased dark`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
