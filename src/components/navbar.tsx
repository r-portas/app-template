import { Link } from "@tanstack/react-router";

type NavItem = {
  to: "/" | "/dashboard" | "/blog" | "/kitchen-sink";
  label: string;
  exact?: boolean;
};

const navItems: NavItem[] = [
  { to: "/", label: "Home", exact: true },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/blog", label: "Blog" },
  { to: "/kitchen-sink", label: "Kitchen Sink" },
];

export function Navbar() {
  return (
    <header className="border-border bg-background/90 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <Link
            to="/"
            className="text-foreground font-serif text-base font-light tracking-tight transition-opacity hover:opacity-70"
          >
            App Template
          </Link>

          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-1" role="list">
              {navItems.map(({ to, label, exact }) => (
                <li key={to}>
                  <Link
                    to={to}
                    activeOptions={exact ? { exact: true } : undefined}
                    className="hover:bg-accent hover:text-foreground rounded-sm px-3 py-1.5 text-xs font-medium tracking-widest uppercase transition-colors"
                    activeProps={{ className: "bg-accent text-foreground" }}
                    inactiveProps={{ className: "text-muted-foreground" }}
                    preload="intent"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
