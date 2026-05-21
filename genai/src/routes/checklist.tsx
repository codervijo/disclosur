import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AlertTriangle, ArrowRight, CheckCircle2, Circle, FileText, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/checklist")({
  head: () => ({
    meta: [
      { title: "Free California AI Disclosure Readiness Check — TransparentAI" },
      {
        name: "description",
        content:
          "Eleven plain-English questions to score your AI disclosure readiness against California SB 53 and AB 853.",
      },
      { property: "og:title", content: "California AI Disclosure Readiness Check" },
      {
        property: "og:description",
        content: "Free 5-minute readiness score for product and legal teams shipping with LLMs.",
      },
    ],
  }),
  component: ChecklistPage,
});

type Q = {
  id: string;
  q: string;
  /** If true, a "yes" answer increases risk; otherwise "no" increases risk */
  riskIfYes?: boolean;
  hint?: string;
  options?: { value: string; label: string }[]; // for multi-pick
};

const QUESTIONS: Q[] = [
  { id: "userFacing", q: "Do you offer a user-facing AI feature?", riskIfYes: true },
  { id: "generative", q: "Does your product generate image, video, audio, or text content?", riskIfYes: true },
  { id: "chatbot", q: "Do users interact with an AI chatbot?", riskIfYes: true },
  { id: "unlabeled", q: "Do users ever see AI-generated content without explicit labeling?", riskIfYes: true, hint: "AB 853 focuses on provenance and labeling." },
  {
    id: "providers",
    q: "Which model providers do you use?",
    options: [
      { value: "openai", label: "OpenAI" },
      { value: "anthropic", label: "Anthropic" },
      { value: "google", label: "Google / Gemini" },
      { value: "mistral", label: "Mistral" },
      { value: "oss", label: "Open-source / self-hosted" },
      { value: "other", label: "Other" },
    ],
  },
  { id: "finetune", q: "Do you fine-tune models?", riskIfYes: true },
  { id: "weights", q: "Do you host model weights or source code?", riskIfYes: true },
  { id: "publicPage", q: "Do you publish an AI disclosure page?", riskIfYes: false, hint: "Most teams should." },
  { id: "inventory", q: "Do you maintain an internal model inventory?", riskIfYes: false },
  { id: "changelog", q: "Do you log AI feature changes?", riskIfYes: false },
  { id: "california", q: "Do you serve California users?", riskIfYes: true },
];

type Answer = "yes" | "no" | string[];

function ChecklistPage() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100);

  const result = useMemo(() => {
    let risk = 0;
    let maxRisk = 0;
    const gaps: string[] = [];
    const risks: string[] = [];

    for (const q of QUESTIONS) {
      if (q.options) continue;
      maxRisk += 1;
      const a = answers[q.id];
      if (a === undefined) continue;
      if (q.riskIfYes && a === "yes") {
        risk += 1;
        risks.push(q.q);
      }
      if (q.riskIfYes === false && a === "no") {
        risk += 1;
        gaps.push(q.q);
      }
    }

    const providers = (answers["providers"] as string[]) || [];
    const score = Math.max(0, Math.round(100 - (risk / maxRisk) * 70));
    const tier = score >= 80 ? "Low" : score >= 55 ? "Moderate" : "Elevated";

    const nextSteps = [
      "Generate a model & provider inventory document",
      "Draft AI-generated content labeling policy",
      "Publish a public AI transparency page",
      "Add an internal AI feature changelog",
    ];

    return { score, tier, gaps, risks, providers, nextSteps };
  }, [answers]);

  function setYesNo(id: string, v: "yes" | "no") {
    setAnswers((a) => ({ ...a, [id]: v }));
  }
  function toggleOption(id: string, value: string) {
    setAnswers((a) => {
      const current = (a[id] as string[]) || [];
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      return { ...a, [id]: next };
    });
  }

  return (
    <PageShell>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" /> Free tool · No login required
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            California AI Disclosure Readiness Check
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Eleven plain-English questions. Get a readiness score, risk areas, and a
            recommended next-step list you can share with counsel.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-accent transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs font-medium text-muted-foreground">
              {answeredCount}/{QUESTIONS.length}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="space-y-4">
          {QUESTIONS.map((q, i) => {
            const a = answers[q.id];
            const answered = a !== undefined && (Array.isArray(a) ? a.length > 0 : true);
            return (
              <Card key={q.id} className="border-border p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-base font-medium text-primary">{q.q}</div>
                        {q.hint && (
                          <p className="mt-1 text-xs text-muted-foreground">{q.hint}</p>
                        )}
                      </div>
                      {answered ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                      ) : (
                        <Circle className="h-5 w-5 shrink-0 text-muted-foreground/40" />
                      )}
                    </div>

                    {q.options ? (
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {q.options.map((opt) => {
                          const checked = ((a as string[]) || []).includes(opt.value);
                          return (
                            <Label
                              key={opt.value}
                              className="flex cursor-pointer items-center gap-3 rounded-md border border-border bg-surface p-3 text-sm font-normal text-primary hover:border-accent/50"
                            >
                              <Checkbox
                                checked={checked}
                                onCheckedChange={() => toggleOption(q.id, opt.value)}
                              />
                              {opt.label}
                            </Label>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="mt-4 flex gap-2">
                        <Button
                          size="sm"
                          variant={a === "yes" ? "default" : "outline"}
                          onClick={() => setYesNo(q.id, "yes")}
                        >
                          Yes
                        </Button>
                        <Button
                          size="sm"
                          variant={a === "no" ? "default" : "outline"}
                          onClick={() => setYesNo(q.id, "no")}
                        >
                          No
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <Button size="lg" onClick={() => setSubmitted(true)} disabled={answeredCount < 4}>
            See my readiness score
          </Button>
        </div>

        {submitted && (
          <Card className="mt-10 border-border p-0">
            <div className="flex items-center justify-between border-b border-border bg-surface px-6 py-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <ShieldCheck className="h-4 w-4 text-accent" /> Your readiness snapshot
              </div>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-secondary-foreground">
                Preview
              </span>
            </div>
            <div className="grid gap-8 p-6 md:grid-cols-3">
              <div className="md:col-span-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Readiness score
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <div className="text-5xl font-semibold text-primary">{result.score}</div>
                  <div className="text-sm text-muted-foreground">/ 100</div>
                </div>
                <div className="mt-3 inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                  {result.tier} risk
                </div>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${result.score}%` }} />
                </div>
                {result.providers.length > 0 && (
                  <div className="mt-6">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Providers in use
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {result.providers.map((p) => (
                        <span key={p} className="rounded-md bg-surface px-2 py-1 text-xs text-primary ring-1 ring-border">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Likely risk areas
                  </div>
                  <ul className="mt-2 space-y-2">
                    {(result.risks.length ? result.risks : ["No major risk triggers detected from your answers."]).map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-primary">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Missing documentation
                  </div>
                  <ul className="mt-2 space-y-2">
                    {(result.gaps.length ? result.gaps : ["Documentation appears complete based on your answers."]).map((g) => (
                      <li key={g} className="flex items-start gap-2 text-sm text-primary">
                        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Recommended next steps
                  </div>
                  <ul className="mt-2 space-y-2">
                    {result.nextSteps.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-primary">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/questionnaire">
                    <Button className="gap-2">
                      Generate full packet <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/packet">
                    <Button variant="outline">View sample packet</Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        )}
      </section>
    </PageShell>
  );
}
