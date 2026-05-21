import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Settings — TransparentAI" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-accent">
          Workspace
        </div>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-primary">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your workspace, disclosure subdomain, and notification preferences.
        </p>
      </div>

      <Card className="border-border p-6">
        <div className="text-sm font-semibold text-primary">Organization</div>
        <Separator className="my-4" />
        <div className="grid gap-4 md:grid-cols-2">
          <Field id="org" label="Legal name" defaultValue="Acme Notes, Inc." />
          <Field id="contact" label="Primary counsel email" defaultValue="counsel@acmenotes.example" />
          <Field id="sub" label="Disclosure subdomain" defaultValue="acme-notes" suffix=".disclosur.co" />
          <Field id="reg" label="Jurisdiction" defaultValue="Delaware, USA" />
        </div>
      </Card>

      <Card className="border-border p-6">
        <div className="text-sm font-semibold text-primary">Notifications</div>
        <Separator className="my-4" />
        <div className="space-y-4">
          <Toggle
            title="New disclosure gaps"
            description="Email me when a scan surfaces a new high-severity gap."
            defaultChecked
          />
          <Toggle
            title="Regulatory updates"
            description="Weekly digest of changes to SB 53, AB 853, and EU AI Act guidance."
            defaultChecked
          />
          <Toggle
            title="Packet exports"
            description="Notify counsel when a new packet version is exported."
          />
        </div>
      </Card>

      <Card className="border-border p-6">
        <div className="text-sm font-semibold text-primary">Danger zone</div>
        <Separator className="my-4" />
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium text-primary">Delete workspace</div>
            <div className="text-xs text-muted-foreground">
              Permanently removes all questionnaire data and exported packets.
            </div>
          </div>
          <Button variant="outline" className="text-destructive">
            Delete workspace
          </Button>
        </div>
      </Card>
    </div>
  );
}

function Field({
  id,
  label,
  defaultValue,
  suffix,
}: {
  id: string;
  label: string;
  defaultValue: string;
  suffix?: string;
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <div className="mt-1.5 flex items-center gap-2">
        <Input id={id} defaultValue={defaultValue} />
        {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );
}

function Toggle({
  title,
  description,
  defaultChecked,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="text-sm font-medium text-primary">{title}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
