import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import {
  ClipboardList,
  Cpu,
  FileText,
  Globe,
  LayoutDashboard,
  ListChecks,
  Settings,
  ShieldAlert,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

const NAV: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/questionnaire", label: "Questionnaire", icon: ClipboardList },
  { to: "/dashboard/features", label: "AI Features", icon: ListChecks },
  { to: "/dashboard/providers", label: "Model Providers", icon: Cpu },
  { to: "/dashboard/gaps", label: "Disclosure Gaps", icon: ShieldAlert },
  { to: "/disclosure", label: "Public Page", icon: Globe },
  { to: "/packet", label: "Counsel Packet", icon: FileText },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

function DashboardLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-6 py-8">
        <aside className="hidden w-60 shrink-0 md:block">
          <div className="sticky top-24 rounded-lg border border-border bg-surface p-3">
            <div className="px-2 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Acme Notes, Inc.
            </div>
            <nav className="space-y-0.5">
              {NAV.map((n) => {
                const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
                return (
                  <Link
                    key={n.label}
                    to={n.to}
                    className={
                      "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors " +
                      (active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-background hover:text-primary")
                    }
                  >
                    <n.icon className="h-4 w-4" />
                    {n.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
