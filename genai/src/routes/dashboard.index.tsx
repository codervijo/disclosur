import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Download,
  FileText,
  Globe,
  ListChecks,
  ShieldAlert,
} from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Dashboard — TransparentAI" }] }),
  component: Overview,
});

const STATS = [
  { label: "Readiness score", value: "72", suffix: "/100", icon: ShieldAlert },
  { label: "AI features", value: "3", icon: ListChecks },
  { label: "Model providers", value: "2", icon: Cpu },
  { label: "Open gaps", value: "4", icon: AlertTriangle },
];

const GAPS = [
  { sev: "High", title: "AI-generated summaries lack persistent labeling", area: "Provenance (AB 853)" },
  { sev: "Med", title: "No public AI transparency page", area: "SB 53" },
  { sev: "Med", title: "Provider list missing from Terms of Service", area: "Disclosure" },
  { sev: "Low", title: "AI feature changelog not published", area: "Process" },
];

function sevClass(s: string) {
  if (s === "High") return "bg-destructive/10 text-destructive";
  if (s === "Med") return "bg-warning/15 text-warning-foreground";
  return "bg-secondary text-secondary-foreground";
}

function Overview() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-accent">Overview</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-primary">
            AI Disclosure Readiness
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Last updated 2 hours ago · Draft v1.3
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/disclosure">
            <Button variant="outline" className="gap-2">
              <Globe className="h-4 w-4" /> Preview public page
            </Button>
          </Link>
          <Link to="/packet">
            <Button className="gap-2">
              <Download className="h-4 w-4" /> Export packet
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <Card key={s.label} className="border-border p-5">
            <div className="flex items-center justify-between">
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <div className="text-3xl font-semibold text-primary">{s.value}</div>
              {s.suffix && <div className="text-sm text-muted-foreground">{s.suffix}</div>}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-primary">Disclosure gaps</div>
            <Link to="/dashboard/gaps" className="text-xs text-muted-foreground hover:text-primary">
              View all
            </Link>
          </div>
          <div className="mt-4 overflow-hidden rounded-md border border-border">
            <table className="w-full text-sm">
              <thead className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5">Severity</th>
                  <th className="px-4 py-2.5">Finding</th>
                  <th className="px-4 py-2.5">Area</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {GAPS.map((g) => (
                  <tr key={g.title}>
                    <td className="px-4 py-3">
                      <span className={"rounded-full px-2 py-0.5 text-[11px] font-medium " + sevClass(g.sev)}>
                        {g.sev}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-primary">{g.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{g.area}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="border-border p-6">
          <div className="text-sm font-semibold text-primary">Packet checklist</div>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              ["Executive summary", true],
              ["Product AI usage", true],
              ["Model provider inventory", true],
              ["Disclosure review", true],
              ["Open questions for counsel", false],
              ["Recommended remediation", false],
              ["Public disclosure page draft", true],
            ].map(([t, ok]) => (
              <li key={String(t)} className="flex items-center gap-2">
                {ok ? (
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                ) : (
                  <FileText className="h-4 w-4 text-muted-foreground" />
                )}
                <span className={ok ? "text-primary" : "text-muted-foreground"}>{t}</span>
              </li>
            ))}
          </ul>
          <Link to="/packet" className="mt-5 inline-block">
            <Button variant="outline" size="sm" className="w-full">Open packet preview</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
