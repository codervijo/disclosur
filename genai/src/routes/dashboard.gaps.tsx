import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const Route = createFileRoute("/dashboard/gaps")({
  head: () => ({ meta: [{ title: "Disclosure Gaps — TransparentAI" }] }),
  component: GapsPage,
});

const GAPS = [
  {
    sev: "High",
    title: "AI-generated summaries lack persistent labeling",
    area: "Provenance (AB 853)",
    owner: "Product",
    recommendation:
      "Embed a visible 'AI-generated' badge and metadata tag on all summary outputs.",
  },
  {
    sev: "Med",
    title: "No public AI transparency page",
    area: "SB 53",
    owner: "Legal",
    recommendation:
      "Publish a hosted disclosure page enumerating features, providers, and contact.",
  },
  {
    sev: "Med",
    title: "Provider list missing from Terms of Service",
    area: "Disclosure",
    owner: "Legal",
    recommendation:
      "Append a sub-processor table referencing OpenAI and Anthropic with DPA links.",
  },
  {
    sev: "Low",
    title: "AI feature changelog not published",
    area: "Process",
    owner: "Product Marketing",
    recommendation:
      "Add an AI changelog section to the public site, updated on each release.",
  },
];

function sevClass(s: string) {
  if (s === "High") return "bg-destructive/10 text-destructive";
  if (s === "Med") return "bg-warning/15 text-warning-foreground";
  return "bg-secondary text-secondary-foreground";
}

function GapsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-accent">
            Remediation
          </div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-primary">
            Disclosure Gaps
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Findings against California SB 53, AB 853, and EU AI Act transparency duties.
          </p>
        </div>
        <Link to="/packet">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export remediation plan
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {GAPS.map((g) => (
          <Card key={g.title} className="border-border p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={"rounded-full px-2 py-0.5 text-[11px] font-medium " + sevClass(g.sev)}>
                    {g.sev}
                  </span>
                  <span className="text-xs text-muted-foreground">{g.area}</span>
                </div>
                <div className="mt-2 font-medium text-primary">{g.title}</div>
              </div>
              <div className="text-xs text-muted-foreground">Owner · {g.owner}</div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{g.recommendation}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
