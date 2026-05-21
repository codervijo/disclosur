import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Database,
  FileText,
  Layers,
  ScanSearch,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TransparentAI — AI compliance packets for LLM teams" },
      {
        name: "description",
        content:
          "Generate counsel-ready AI disclosure documentation for California SB 53 and AB 853. Built for product and legal teams shipping with LLMs.",
      },
      { property: "og:title", content: "TransparentAI — AI compliance packets for LLM teams" },
      {
        property: "og:description",
        content:
          "Answer a guided questionnaire and ship a clean AI Disclosure Readiness Packet your GC can review in an afternoon.",
      },
    ],
  }),
  component: LandingPage,
});

const trustBadges = [
  "Built for LLM apps",
  "California AI transparency focused",
  "Counsel-review ready",
  "Exportable documentation",
];

const productCards = [
  {
    icon: ClipboardList,
    title: "Applicability questionnaire",
    body: "Guided intake mapped to SB 53 and AB 853 triggers — no statute reading required.",
  },
  {
    icon: Database,
    title: "Model & AI feature inventory",
    body: "Track every model, provider, and user-facing AI feature in one source of truth.",
  },
  {
    icon: ScanSearch,
    title: "Disclosure gap analysis",
    body: "Automatic diff between what you ship and what California-style transparency expects.",
  },
  {
    icon: FileText,
    title: "Counsel-ready packet export",
    body: "Executive summary, memo, and public page draft — exported to PDF and Google Docs.",
  },
];

const lawyerQuestions = [
  "Which AI features are user-facing?",
  "Which models power them?",
  "Do users know when content is AI-generated?",
  "Do you rely on OpenAI, Anthropic, Gemini, or open-source models?",
  "Do you have disclosure language?",
  "Do you have a public AI transparency page?",
  "What changed since the last release?",
];

function LandingPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-20 md:pt-28">
          <div className="grid items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                Built for California SB 53 &amp; AB 853 readiness
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-primary md:text-6xl">
                AI compliance packets for teams building with LLMs.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                TransparentAI helps product and legal teams generate disclosure-ready
                documentation for California AI transparency questions — without
                starting from a blank Google Doc.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/checklist">
                  <Button size="lg" className="gap-2">
                    Start free checklist <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/packet">
                  <Button size="lg" variant="outline">
                    View sample packet
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {trustBadges.map((b) => (
                  <div key={b} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Hero packet preview */}
            <div className="lg:col-span-5">
              <Card className="overflow-hidden border-border p-0 shadow-xl shadow-primary/5">
                <div className="flex items-center justify-between border-b border-border bg-surface px-5 py-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <ShieldCheck className="h-4 w-4 text-accent" />
                    AI Disclosure Readiness Packet
                  </div>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-secondary-foreground">
                    Draft v1.3
                  </span>
                </div>
                <div className="space-y-4 p-6">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Acme Notes, Inc.
                    </div>
                    <div className="mt-1 text-base font-semibold text-primary">
                      Executive Summary
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Acme Notes ships 3 user-facing AI features powered by OpenAI
                      and Anthropic. Two features are likely in scope for AB 853
                      content provenance and require disclosure language updates
                      before the next release.
                    </p>
                  </div>
                  <div className="rounded-md border border-border bg-surface p-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Readiness score</span>
                      <span className="font-medium text-primary">72 / 100</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-[72%] rounded-full bg-accent" />
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-3 text-center text-xs">
                      <div>
                        <div className="font-semibold text-primary">3</div>
                        <div className="text-muted-foreground">AI features</div>
                      </div>
                      <div>
                        <div className="font-semibold text-primary">2</div>
                        <div className="text-muted-foreground">Providers</div>
                      </div>
                      <div>
                        <div className="font-semibold text-primary">4</div>
                        <div className="text-muted-foreground">Open gaps</div>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Model & provider inventory",
                      "Disclosure gap analysis",
                      "Public AI transparency page draft",
                      "Internal counsel memo",
                    ].map((row) => (
                      <li key={row} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        {row}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pain section */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-accent">
                The blank-doc problem
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-primary md:text-4xl">
                Your lawyer asks seven questions. You don't have one document that answers them.
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                California's AI transparency laws are arriving faster than internal
                process. Counsel needs concrete artifacts — not a Notion page and
                three Slack threads. TransparentAI gives you the artifact.
              </p>
            </div>
            <div className="lg:col-span-7">
              <Card className="divide-y divide-border p-0">
                {lawyerQuestions.map((q, i) => (
                  <div key={q} className="flex items-start gap-4 px-6 py-4">
                    <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                      {i + 1}
                    </div>
                    <div className="text-sm text-primary">{q}</div>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Product */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-accent">
              The product
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-primary md:text-4xl">
              From questionnaire to counsel-ready packet.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Four building blocks that turn your AI surface area into something a GC can sign off on.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {productCards.map((c) => (
              <Card key={c.title} className="border-border p-6">
                <div className="grid h-10 w-10 place-items-center rounded-md bg-secondary text-secondary-foreground">
                  <c.icon className="h-5 w-5" />
                </div>
                <div className="mt-5 text-base font-semibold text-primary">{c.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-3">
            {[
              { n: "01", t: "Run the checklist", b: "11 plain-English questions. Five minutes. No login required." },
              { n: "02", t: "Complete the questionnaire", b: "Inventory your AI features, models, and disclosures with structured prompts." },
              { n: "03", t: "Export your packet", b: "Hand counsel a PDF that maps each finding back to SB 53 and AB 853." },
            ].map((s) => (
              <div key={s.n} className="border-l-2 border-accent pl-5">
                <div className="text-xs font-mono text-accent">{s.n}</div>
                <div className="mt-2 text-lg font-semibold text-primary">{s.t}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Card className="border-border bg-primary p-10 text-primary-foreground md:p-14">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary-foreground/70">
                  <Layers className="h-3.5 w-3.5" />
                  Disclosure readiness, on the record
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                  Give your GC something to review this week.
                </h3>
                <p className="mt-2 text-sm text-primary-foreground/80">
                  Start with the free California AI Disclosure Readiness Check.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/checklist">
                  <Button size="lg" variant="secondary">Start free checklist</Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                    See pricing
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
