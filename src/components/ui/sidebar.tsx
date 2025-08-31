import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface Item {
  icon: LucideIcon;
  label: string;
  href: string;
}

export function SidebarItem({ icon: Icon, label, href }: Item) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button asChild variant="ghost" size="icon" aria-label={label}>
          <Link href={href}>
            <Icon className="h-5 w-5" />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

export function Sidebar({
  items,
  className,
}: {
  items: Item[];
  className?: string;
}) {
  return (
    <aside
      className={cn("border-r border-sidebar-border bg-sidebar", className)}
    >
      <nav className="flex flex-col flex-nowrap m-1 gap-1">
        {items.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </nav>
    </aside>
  );
}
