import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

export default function AdminSettingsPage() {
  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Settings"
        title="Platform settings"
        description="Configure platform fees, verification rules, and quality thresholds once admin APIs are available."
      />
      <section className="grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField htmlFor="fee" label="Platform fee percent">
            <Input id="fee" defaultValue="3.5" step="0.1" type="number" />
          </FormField>
          <FormField htmlFor="inspection" label="Inspection requirement">
            <Select id="inspection" defaultValue="high_value">
              <option value="all">All deals</option>
              <option value="high_value">High-value deals</option>
              <option value="export">Export deals only</option>
            </Select>
          </FormField>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button type="submit">Save settings</Button>
          <Button variant="secondary">Reset</Button>
        </div>
      </section>
      <Modal
        description="This reusable placeholder shows where confirmation dialogs can be wired for sensitive admin actions."
        title="Confirm admin action"
      />
    </div>
  );
}
