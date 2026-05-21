import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/questionnaire")({
  head: () => ({
    meta: [
      { title: "AI Disclosure Questionnaire — TransparentAI" },
      {
        name: "description",
        content: "Guided intake that powers your AI Disclosure Readiness Packet.",
      },
    ],
  }),
  component: QuestionnairePage,
});

const STEPS = [
  { id: "company", label: "Company" },
  { id: "features", label: "AI features" },
  { id: "models", label: "Models" },
  { id: "disclosure", label: "Disclosure" },
  { id: "jurisdiction", label: "Jurisdiction" },
];

const PROVIDERS = ["OpenAI", "Anthropic", "Google / Gemini", "Mistral", "Cohere", "Open-source"];

function QuestionnairePage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [providers, setProviders] = useState<string[]>([]);

  const next = () => (step < STEPS.length - 1 ? setStep(step + 1) : setDone(true));
  const back = () => setStep(Math.max(0, step - 1));

  function toggleProvider(p: string) {
    setProviders((arr) => (arr.includes(p) ? arr.filter((x) => x !== p) : [...arr, p]));
  }

  return (
    <PageShell>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-accent">
            Readiness questionnaire
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            Tell us how AI shows up in your product.
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            5 short sections. About 10 minutes. We'll assemble a counsel-ready packet from your answers.
          </p>
          <div className="mt-8 grid grid-cols-5 gap-2">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex flex-col gap-2">
                <div
                  className={
                    "h-1.5 rounded-full " +
                    (i <= step ? "bg-accent" : "bg-muted")
                  }
                />
                <div className={"text-xs " + (i <= step ? "text-primary font-medium" : "text-muted-foreground")}>
                  {i + 1}. {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12">
        {done ? (
          <Card className="border-border p-10 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-secondary">
              <CheckCircle2 className="h-6 w-6 text-accent" />
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-primary">
              Questionnaire complete
            </h2>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              We've assembled your AI Disclosure Readiness Packet. Review it in the dashboard or open the live preview.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link to="/dashboard">
                <Button>Open dashboard</Button>
              </Link>
              <Link to="/packet">
                <Button variant="outline" className="gap-2">
                  View packet <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <Card className="border-border p-8">
            {step === 0 && (
              <div className="space-y-5">
                <div>
                  <Label htmlFor="company">Company name</Label>
                  <Input id="company" placeholder="Acme Notes, Inc." className="mt-1.5" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="stage">Funding stage</Label>
                    <Input id="stage" placeholder="Series B" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="users">Monthly active users</Label>
                    <Input id="users" placeholder="125,000" className="mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="desc">One-line product description</Label>
                  <Input id="desc" placeholder="AI-powered meeting notes for product teams." className="mt-1.5" />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <Label htmlFor="features">List user-facing AI features</Label>
                  <Textarea
                    id="features"
                    rows={5}
                    placeholder={"e.g.\nMeeting summarizer (text generation)\nIn-app chat assistant\nAuto-tagging of notes"}
                    className="mt-1.5"
                  />
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {[
                    "Generates text",
                    "Generates images",
                    "Generates audio",
                    "Generates video",
                    "Chat interface",
                    "Voice interface",
                  ].map((opt) => (
                    <Label
                      key={opt}
                      className="flex cursor-pointer items-center gap-3 rounded-md border border-border bg-surface p-3 text-sm font-normal text-primary hover:border-accent/50"
                    >
                      <Checkbox /> {opt}
                    </Label>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <Label>Model providers in use</Label>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {PROVIDERS.map((p) => (
                      <Label
                        key={p}
                        className="flex cursor-pointer items-center gap-3 rounded-md border border-border bg-surface p-3 text-sm font-normal text-primary hover:border-accent/50"
                      >
                        <Checkbox
                          checked={providers.includes(p)}
                          onCheckedChange={() => toggleProvider(p)}
                        />
                        {p}
                      </Label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="finetune">Do you fine-tune or host weights? Describe.</Label>
                  <Textarea id="finetune" rows={3} placeholder="We fine-tune a small Llama model for tagging." className="mt-1.5" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <Label htmlFor="labels">How is AI-generated content labeled to users today?</Label>
                  <Textarea id="labels" rows={4} placeholder="Summary cards show a small 'AI-generated' tag." className="mt-1.5" />
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {[
                    "Public AI transparency page",
                    "In-product disclosure on AI features",
                    "Terms of Service mentions AI",
                    "Privacy policy mentions AI training",
                  ].map((opt) => (
                    <Label
                      key={opt}
                      className="flex cursor-pointer items-center gap-3 rounded-md border border-border bg-surface p-3 text-sm font-normal text-primary hover:border-accent/50"
                    >
                      <Checkbox /> {opt}
                    </Label>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <div className="grid gap-2 sm:grid-cols-2">
                  {["California users", "EU users", "UK users", "US — other states"].map((opt) => (
                    <Label
                      key={opt}
                      className="flex cursor-pointer items-center gap-3 rounded-md border border-border bg-surface p-3 text-sm font-normal text-primary hover:border-accent/50"
                    >
                      <Checkbox /> {opt}
                    </Label>
                  ))}
                </div>
                <div>
                  <Label htmlFor="counsel">Outside counsel contact (optional)</Label>
                  <Input id="counsel" placeholder="jane@lawfirm.com" className="mt-1.5" />
                </div>
                <p className="text-xs text-muted-foreground">
                  TransparentAI does not provide legal advice. Your packet is for review by qualified counsel.
                </p>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <Button variant="ghost" onClick={back} disabled={step === 0} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button onClick={next} className="gap-2">
                {step === STEPS.length - 1 ? "Generate packet" : "Continue"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}
      </section>
    </PageShell>
  );
}
