import { DataTable } from "@/components/shared/DataTable";
import { PageHeader } from "@/components/shared/PageHeader";
import { QualityGradeBadge } from "@/components/shared/QualityGradeBadge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/format";
import type { Inspection } from "@/types";

export default async function AdminInspectionsPage() {
  const inspections = await api.inspections.list();

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Inspections"
        title="Inspections management"
        description="Coordinate assignment, report review, and quality officer activity from one admin view."
      />
      <DataTable<Inspection>
        columns={[
          { key: "crop", header: "Crop", render: (inspection) => <span className="font-semibold text-slate-950">{inspection.crop}</span> },
          { key: "deal", header: "Deal", render: (inspection) => inspection.dealId },
          { key: "officer", header: "Officer", render: (inspection) => inspection.officerId },
          { key: "scheduled", header: "Scheduled", render: (inspection) => formatDate(inspection.scheduledDate) },
          { key: "status", header: "Status", render: (inspection) => <StatusBadge label={inspection.status} tone={inspection.status === "rejected" ? "rose" : "sky"} /> },
          { key: "grade", header: "Grade", render: (inspection) => <QualityGradeBadge grade={inspection.report?.grade} /> },
        ]}
        getRowKey={(inspection) => inspection.id}
        rows={inspections}
      />
    </div>
  );
}
