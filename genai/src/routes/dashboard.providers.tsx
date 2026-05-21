import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cpu, Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/providers")({
  head: () => ({ meta: [{ title: "Model Providers — TransparentAI" }] }),
  component: ProvidersPage,
});

const PROVIDERS = [
  {
    name: "OpenAI",
    models: ["gpt-4o", "gpt-4o-mini"],
    region: "US",
    retention: "30 days (abuse monitoring)",
    training: "Opt-out confirmed",
    dpa: true,
  },
  {
    name: "Anthropic",
    models: ["claude-3.5-sonnet"],
    region: "US",
    retention: "30 days (abuse monitoring)",
    training: "Opt-out confirmed",
    dpa: true,
  },
  {
    name: "Mistral (planned)",
    models: ["mistral-large-latest"],
    region: "EU",
    retention: "Unknown",
    training: "Pending review",
    dpa: false,
  },
];

function ProvidersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-accent">
            Inventory
          </div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-primary">
            Model Providers
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Third-party model vendors and the data terms attached to each.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add provider
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {PROVIDERS.map((p) => (
          <Card key={p.name} className="border-border p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-secondary p-2">
                  <Cpu className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-primary">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.region}</div>
                </div>
              </div>
              {p.dpa ? (
                <Badge variant="secondary">DPA on file</Badge>
              ) : (
                <Badge className="bg-warning/15 text-warning-foreground hover:bg-warning/20">
                  DPA missing
                </Badge>
              )}
            </div>
            <dl className="mt-5 space-y-2.5 text-sm">
              <Row label="Models">{p.models.join(", ")}</Row>
              <Row label="Data retention">{p.retention}</Row>
              <Row label="Training use">{p.training}</Row>
            </dl>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right text-primary">{children}</dd>
    </div>
  );
}
