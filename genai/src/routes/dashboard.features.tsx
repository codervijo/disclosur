import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Sparkles } from "lucide-react";

export const Route = createFileRoute("/dashboard/features")({
  head: () => ({ meta: [{ title: "AI Features — TransparentAI" }] }),
  component: FeaturesPage,
});

const FEATURES = [
  {
    name: "Meeting summarizer",
    description: "Generates summary text from uploaded meeting transcripts.",
    type: "Generation",
    providers: ["OpenAI"],
    userFacing: true,
    labeled: true,
    status: "Documented",
  },
  {
    name: "In-app chat assistant",
    description: "Conversational assistant grounded on the user's notes.",
    type: "Chat",
    providers: ["Anthropic"],
    userFacing: true,
    labeled: true,
    status: "Documented",
  },
  {
    name: "Auto-tagging",
    description: "Suggests organizational tags for new notes.",
    type: "Classification",
    providers: ["OpenAI"],
    userFacing: true,
    labeled: false,
    status: "Needs labeling",
  },
];

function FeaturesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-accent">
            Inventory
          </div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-primary">
            AI Features
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Every user-facing AI surface in your product. Counsel reviews this list first.
          </p>
        </div>
        <Link to="/questionnaire">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add feature
          </Button>
        </Link>
      </div>

      <Card className="border-border p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Feature</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Providers</th>
              <th className="px-4 py-3">Labeling</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {FEATURES.map((f) => (
              <tr key={f.name}>
                <td className="px-4 py-3">
                  <div className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 h-4 w-4 text-accent" />
                    <div>
                      <div className="font-medium text-primary">{f.name}</div>
                      <div className="text-xs text-muted-foreground">{f.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{f.type}</td>
                <td className="px-4 py-3 text-muted-foreground">{f.providers.join(", ")}</td>
                <td className="px-4 py-3">
                  {f.labeled ? (
                    <Badge variant="secondary">Persistent</Badge>
                  ) : (
                    <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/15">
                      Missing
                    </Badge>
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{f.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
