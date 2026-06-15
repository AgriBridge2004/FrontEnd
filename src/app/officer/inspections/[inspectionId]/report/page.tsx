import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { api } from "@/lib/api";

type SubmitInspectionReportPageProps = {
  params: {
    inspectionId: string;
  };
};

export default async function SubmitInspectionReportPage({ params }: SubmitInspectionReportPageProps) {
  const inspection = await api.inspections.getById(params.inspectionId);

  if (!inspection) {
    notFound();
  }

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Submit report"
        title={`Report for ${inspection.crop}`}
        description="The form is a frontend placeholder for quality grade, measurements, officer notes, and photo uploads."
      />
      <form className="grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField htmlFor="grade" label="Quality grade">
            <Select id="grade" defaultValue={inspection.report?.grade ?? "A"}>
              <option value="A">Grade A</option>
              <option value="B">Grade B</option>
              <option value="C">Grade C</option>
              <option value="Rejected">Rejected</option>
            </Select>
          </FormField>
          <FormField htmlFor="moisture" label="Moisture percent">
            <Input id="moisture" min="0" placeholder="0.2" step="0.1" type="number" />
          </FormField>
          <FormField htmlFor="defects" label="Defect rate percent">
            <Input id="defects" min="0" placeholder="1.1" step="0.1" type="number" />
          </FormField>
          <FormField htmlFor="photos" label="Evidence photos" hint="Upload handling will be connected later.">
            <Input id="photos" type="file" />
          </FormField>
        </div>
        <FormField htmlFor="packaging" label="Packaging notes">
          <Textarea id="packaging" placeholder="Describe packaging condition and label checks." />
        </FormField>
        <FormField htmlFor="summary" label="Inspection summary">
          <Textarea id="summary" placeholder="Summarize whether this shipment matches the agreed quality terms." />
        </FormField>
        <div className="flex flex-wrap gap-3">
          <Button type="submit">Submit report</Button>
          <Button variant="secondary">Save draft</Button>
        </div>
      </form>
    </div>
  );
}
