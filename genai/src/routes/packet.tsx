import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, FileText, Printer, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/packet")({
  head: () => ({
    meta: [
      { title: "Sample AI Disclosure Readiness Packet — TransparentAI" },
      {
        name: "description",
        content: "A realistic preview of the counsel-ready packet TransparentAI generates.",
      },
    ],
  }),
  component: PacketPreview,
});

const SECTIONS = [
  { n: "01", t: "Executive Summary" },
  { n: "02", t: "Product AI Usage" },
  { n: "03", t: "Model Provider Inventory" },
  { n: "04", t: "User-Facing Disclosure Review" },
  { n: "05", t: "California Transparency Considerations" },
  { n: "06", t: "Open Questions for Counsel" },
  { n: "07", t: "Recommended Remediation" },
  { n: "08", t: "Public Disclosure Page Draft" },
];

function PacketPreview() {
  return (
    <PageShell>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-accent">Sample packet</div>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-primary md:text-4xl">
              AI Disclosure Readiness Packet
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Acme Notes, Inc. · Prepared {new Date().toLocaleDateString()} · Draft v1.3
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Printer className="h-4 w-4" /> Print
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" /> Export PDF
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-12">
        {/* TOC */}
        <aside className="lg:col-span-3">
          <div className="sticky top-24 rounded-lg border border-border bg-surface p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Contents
            </div>
            <ul className="mt-3 space-y-1.5 text-sm">
              {SECTIONS.map((s) => (
                <li key={s.n}>
                  <a href={`#sec-${s.n}`} className="flex gap-3 rounded-md px-2 py-1.5 text-muted-foreground hover:bg-background hover:text-primary">
                    <span className="font-mono text-xs text-accent">{s.n}</span>
                    {s.t}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Document */}
        <article className="lg:col-span-9">
          <Card className="border-border p-0">
            <div className="border-b border-border bg-surface px-8 py-6">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-accent" /> Prepared by TransparentAI · For counsel review
              </div>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-primary">
                Acme Notes, Inc. — AI Disclosure Readiness Packet
              </h2>
            </div>

            <div className="space-y-12 px-8 py-10 leading-relaxed text-primary">
              <Section id="01" title="Executive Summary">
                <p>
                  Acme Notes operates a user-facing AI meeting summarization product. Three
                  AI features are in production, powered by two third-party model providers
                  (OpenAI and Anthropic). Based on the company's self-reported usage and
                  California user base, two features are likely within scope of AB 853
                  content-provenance expectations and one of the three lacks a persistent
                  user-facing disclosure label.
                </p>
                <p>
                  Overall readiness score: <strong>72 / 100 (moderate)</strong>. Four open
                  gaps are tracked in §07.
                </p>
              </Section>

              <Section id="02" title="Product AI Usage">
                <Table
                  head={["Feature", "Type", "User-facing", "Disclosure today"]}
                  rows={[
                    ["Meeting summarizer", "Text generation", "Yes", "Inline 'AI-generated' tag"],
                    ["In-app chat assistant", "Chatbot", "Yes", "Avatar + 'AI' label"],
                    ["Auto-tagging", "Classification", "Indirect", "None"],
                  ]}
                />
              </Section>

              <Section id="03" title="Model Provider Inventory">
                <Table
                  head={["Provider", "Models", "Hosted by", "Data retention"]}
                  rows={[
                    ["OpenAI", "gpt-4o, gpt-4o-mini", "OpenAI API", "30 days (zero-retention requested)"],
                    ["Anthropic", "claude-3-5-sonnet", "Anthropic API", "30 days"],
                  ]}
                />
              </Section>

              <Section id="04" title="User-Facing Disclosure Review">
                <p>
                  Disclosure language is present on two of three features. The auto-tagging
                  feature does not surface an indication that tags are AI-generated. This is
                  a likely gap for California users encountering AI-derived content without
                  labeling.
                </p>
              </Section>

              <Section id="05" title="California Transparency Considerations">
                <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground marker:text-accent">
                  <li>SB 53: Public AI transparency page is recommended given user base &gt; 100k.</li>
                  <li>AB 853: Provenance labeling is recommended for generated text artifacts.</li>
                  <li>Consider documenting fine-tuning practices and retention defaults.</li>
                </ul>
              </Section>

              <Section id="06" title="Open Questions for Counsel">
                <ol className="list-inside list-decimal space-y-2 text-sm">
                  <li>Does auto-tagging constitute "AI-generated content" requiring labeling?</li>
                  <li>Is a static disclosure page sufficient, or are per-feature notices required?</li>
                  <li>Do enterprise contracts require additional AI-usage notices to admins?</li>
                </ol>
              </Section>

              <Section id="07" title="Recommended Remediation">
                <Table
                  head={["Priority", "Action", "Owner", "Target"]}
                  rows={[
                    ["High", "Add persistent label to auto-tagged content", "Product", "Next release"],
                    ["High", "Publish public AI transparency page", "Legal + Marketing", "30 days"],
                    ["Med", "Update ToS provider list", "Legal", "Next ToS revision"],
                    ["Low", "Publish AI feature changelog", "Product", "60 days"],
                  ]}
                />
              </Section>

              <Section id="08" title="Public Disclosure Page Draft">
                <p className="text-sm text-muted-foreground">
                  Full draft available as a hosted preview.
                </p>
                <Link to="/disclosure" className="mt-3 inline-flex">
                  <Button variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" /> Open hosted preview
                  </Button>
                </Link>
              </Section>
            </div>

            <div className="border-t border-border bg-surface px-8 py-5 text-xs text-muted-foreground">
              This packet is generated by TransparentAI for internal review by qualified
              counsel. It is not legal advice.
            </div>
          </Card>
        </article>
      </section>
    </PageShell>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={`sec-${id}`} className="scroll-mt-24">
      <div className="flex items-baseline gap-3 border-b border-border pb-2">
        <span className="font-mono text-xs text-accent">{id}</span>
        <h3 className="font-serif text-xl font-semibold text-primary">{title}</h3>
      </div>
      <div className="mt-4 space-y-3 text-sm">{children}</div>
    </section>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <table className="w-full text-sm">
        <thead className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-2.5 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((c, j) => (
                <td key={j} className="px-4 py-3 text-primary">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
