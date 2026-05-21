import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — TransparentAI" },
      {
        name: "description",
        content: "Free checklist, one-time startup packet, and team plans for ongoing AI disclosure readiness.",
      },
    ],
  }),
  component: Pricing,
});

const PLANS = [
  {
    name: "Free Checklist",
    price: "$0",
    cadence: "Forever",
    blurb: "Score your readiness in 5 minutes.",
    features: [
      "11-question readiness check",
      "Readiness score & risk areas",
      "Recommended next steps",
    ],
    cta: { label: "Start checklist", to: "/checklist" },
  },
  {
    name: "Startup Packet",
    price: "$299",
    cadence: "One-time",
    blurb: "The packet, generated once.",
    features: [
      "Full readiness questionnaire",
      "Model & feature inventory",
      "Counsel-ready packet (PDF + Doc)",
      "Public disclosure page draft",
      "1 export, 30-day revisions",
    ],
    cta: { label: "Buy packet", to: "/questionnaire" },
  },
  {
    name: "Compliance Workspace",
    price: "$99",
    cadence: "per month",
    blurb: "Living documentation for one product.",
    features: [
      "Everything in Startup Packet",
      "Unlimited packet regeneration",
      "Hosted disclosure page (custom subdomain)",
      "AI feature changelog",
      "3 team seats",
    ],
    highlight: true,
    cta: { label: "Start workspace", to: "/questionnaire" },
  },
  {
    name: "Legal Team",
    price: "$499",
    cadence: "per month",
    blurb: "Counsel collaboration at scale.",
    features: [
      "Everything in Compliance Workspace",
      "Up to 10 products",
      "Counsel review workflow",
      "Audit log & version history",
      "Unlimited seats",
      "Priority support",
    ],
    cta: { label: "Talk to sales", to: "/checklist" },
  },
];

function Pricing() {
  return (
    <PageShell>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-accent">Pricing</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-primary md:text-5xl">
            Start free. Upgrade when counsel asks for the packet.
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Transparent pricing for teams that need real documentation, not a slide deck.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p) => (
            <Card
              key={p.name}
              className={
                "flex flex-col border-border p-6 " +
                (p.highlight ? "ring-2 ring-accent" : "")
              }
            >
              {p.highlight && (
                <div className="mb-3 inline-flex w-fit rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-secondary-foreground">
                  Most popular
                </div>
              )}
              <div className="text-sm font-semibold text-primary">{p.name}</div>
              <div className="mt-3 flex items-baseline gap-1">
                <div className="text-4xl font-semibold tracking-tight text-primary">{p.price}</div>
                <div className="text-sm text-muted-foreground">{p.cadence}</div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
              <ul className="mt-5 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-primary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex-1" />
              <Link to={p.cta.to}>
                <Button className="w-full" variant={p.highlight ? "default" : "outline"}>
                  {p.cta.label}
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl text-center text-xs text-muted-foreground">
          TransparentAI is not a law firm and does not provide legal advice. All generated
          documentation is intended for review by qualified counsel.
        </div>
      </section>
    </PageShell>
  );
}
