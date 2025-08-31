import type { ReactNode } from "react";
import { Home, Inbox, Settings } from "lucide-react";
import { Sidebar, type Item } from "./ui/sidebar";

// Menu items.
const items: Item[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Inbox",
    href: "#",
    icon: Inbox,
  },
  {
    label: "Settings",
    href: "#",
    icon: Settings,
  },
];

/**
 * The main application shell, which handles the sidebar and main content area
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row min-h-screen">
      <Sidebar items={items} className="shrink-0" />
      {children}
    </div>
  );
}
