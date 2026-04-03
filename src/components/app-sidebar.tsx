import { Link, linkOptions } from "@tanstack/react-router";
import { HomeIcon, FlaskConicalIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { APP_NAME } from "@/constants";

type NavItem = {
  to: string;
  label: string;
  icon: React.ComponentType;
  exact?: boolean;
};

const navItems = linkOptions([
  { to: "/", label: "Home", icon: HomeIcon, exact: true },
  { to: "/kitchen-sink", label: "Kitchen Sink", icon: FlaskConicalIcon },
]) as NavItem[];

export function AppSidebar() {
  return (
    <Sidebar collapsible="none" className="h-svh sticky top-0">
      <SidebarHeader className="border-b px-4 py-3">
        <Link to="/" className="font-serif text-xl font-light tracking-tight">
          {APP_NAME}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ to, label, icon: Icon, exact }) => (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={to}
                      activeOptions={exact ? { exact: true } : undefined}
                      activeProps={{ "data-active": true }}
                    >
                      <Icon />
                      {label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
