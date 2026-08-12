import { Outlet } from "@tanstack/react-router";
import { Home, Blocks } from "lucide-react";

import { Sidebar } from "@/components/ui/sidebar";
import type { SidebarItem } from "@/components/ui/sidebar";

/**
 * The app icon shown at the top of the sidebar.
 */
const APP_ICON = Blocks;

/**
 * The items shown in the sidebar, each with an icon and a title.
 */
const SIDEBAR_ITEMS: SidebarItem[] = [
  { icon: Home, title: "Home", to: "/", activeOptions: { exact: true } }
];

/**
 * The app shell: a sidebar alongside the routed page content.
 *
 * @remarks
 * Rendered once from `__root.tsx`.
 */
function AppLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar appIcon={APP_ICON} items={SIDEBAR_ITEMS} />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export { AppLayout };
