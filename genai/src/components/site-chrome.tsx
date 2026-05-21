import { Link, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/checklist", label: "Free checklist" },
  { to: "/questionnaire", label: "Questionnaire" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/pricing", label: "Pricing" },
];

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 text-primary">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
            <ShieldCheck className="h-4 w-4" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">TransparentAI</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => {
            const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={
                  "text-sm transition-colors " +
                  (active ? "text-primary font-medium" : "text-muted-foreground hover:text-primary")
                }
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/checklist" className="hidden sm:inline-flex">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link to="/checklist">
            <Button size="sm">Start free checklist</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-primary">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground">
                <ShieldCheck className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-semibold">TransparentAI</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              AI compliance packets your legal team can review in one afternoon.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              TransparentAI is not a law firm and does not provide legal advice.
              We generate structured documentation for review by qualified counsel.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">Product</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/checklist" className="hover:text-primary">Free checklist</Link></li>
              <li><Link to="/questionnaire" className="hover:text-primary">Questionnaire</Link></li>
              <li><Link to="/packet" className="hover:text-primary">Sample packet</Link></li>
              <li><Link to="/disclosure" className="hover:text-primary">Sample disclosure page</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">Company</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/pricing" className="hover:text-primary">Pricing</Link></li>
              <li><a className="hover:text-primary" href="mailto:hello@disclosur.co">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} TransparentAI, Inc. · disclosur.co</div>
          <div>Built for California AI transparency (SB 53, AB 853)</div>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
