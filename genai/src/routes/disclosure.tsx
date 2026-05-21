import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/disclosure")({
  head: () => ({
    meta: [
      { title: "Sample hosted AI disclosure page — TransparentAI" },
      {
        name: "description",
        content: "A preview of the public AI transparency page TransparentAI hosts for customers.",
      },
    ],
  }),
  component: DisclosurePreview,
});

function DisclosurePreview() {
  return (
    <PageShell>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-accent">
              Hosted disclosure page · Preview
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              Lives at <span className="font-mono text-primary">acme-notes.disclosur.co</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/packet">
              <Button variant="outline">Back to packet</Button>
            </Link>
            <Button className="gap-2">
              <ExternalLink className="h-4 w-4" /> Publish
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-14">
        {/* Mock hosted page */}
        <Card className="border-border p-10">
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck className="h-5 w-5 text-accent" />
            <div className="text-sm font-semibold">Acme Notes — AI Transparency</div>
          </div>
          <h1 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            How we use AI at Acme Notes
          </h1>
          <p className="mt-4 text-muted-foreground">
            We use third-party AI models to power summarization, chat, and tagging
            features in our product. This page describes which features use AI, which
            providers we rely on, and how we label AI-generated content for our users.
          </p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-primary">
            <Block title="AI features in our product">
              <ul className="list-inside list-disc space-y-1.5 text-muted-foreground marker:text-accent">
                <li><strong className="text-primary">Meeting summarizer</strong> — AI-generated summary text from your meeting transcripts.</li>
                <li><strong className="text-primary">In-app chat assistant</strong> — A conversational AI that helps you search and act on your notes.</li>
                <li><strong className="text-primary">Auto-tagging</strong> — AI-assisted labeling of notes for organization.</li>
              </ul>
            </Block>

            <Block title="Model providers">
              <p className="text-muted-foreground">
                We currently use models from OpenAI and Anthropic. We do not allow these
                providers to train on your data. Inputs and outputs may be retained by the
                provider for up to 30 days for abuse monitoring.
              </p>
            </Block>

            <Block title="How AI-generated content is labeled">
              <p className="text-muted-foreground">
                AI-generated text in Acme Notes is shown with a visible
                "AI-generated" indicator. The chat assistant identifies itself as AI in
                every conversation. We are rolling out persistent labeling for AI-suggested
                tags in our next release.
              </p>
            </Block>

            <Block title="Changes and updates">
              <p className="text-muted-foreground">
                We publish a changelog of meaningful changes to our AI features. This page
                was last updated on {new Date().toLocaleDateString()}.
              </p>
            </Block>

            <Block title="Contact">
              <p className="text-muted-foreground">
                Questions about how we use AI? Email{" "}
                <a className="text-primary underline-offset-4 hover:underline" href="mailto:ai@acmenotes.example">
                  ai@acmenotes.example
                </a>
                .
              </p>
            </Block>
          </div>

          <div className="mt-12 border-t border-border pt-4 text-xs text-muted-foreground">
            Hosted by TransparentAI · This page is generated documentation, not legal advice.
          </div>
        </Card>
      </section>
    </PageShell>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-serif text-lg font-semibold text-primary">{title}</h2>
      <div className="mt-2">{children}</div>
    </div>
  );
}
