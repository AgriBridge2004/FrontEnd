import Link from "next/link";
import { DataTable } from "@/components/shared/DataTable";
import { PageHeader } from "@/components/shared/PageHeader";
import { QualityGradeBadge } from "@/components/shared/QualityGradeBadge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { buttonClasses } from "@/components/ui/Button";
import { api } from "@/lib/api";
import { mockCurrentUserByRole } from "@/lib/auth";
import { formatDate } from "@/lib/format";
import type { Inspection } from "@/types";

export default async function AssignedInspectionsPage() {
  const inspections = await api.inspections.listByOfficer(mockCurrentUserByRole.quality_officer);

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Assigned inspections"
        title="Inspection queue"
        description="This page is a placeholder for scheduling, route planning, evidence uploads, and report review."
      />
      <DataTable<Inspection>
        columns={[
          {
            key: "crop",
            header: "Assignment",
            render: (inspection) => (
              <div>
                <Link className="font-semibold text-emerald-700" href={`/officer/inspections/${inspection.id}`}>
                  {inspection.crop}
                </Link>
                <p className="mt-1 text-xs text-slate-500">{inspection.dealId}</p>
              </div>
            ),
          },
          { key: "location", header: "Location", render: (inspection) => inspection.location },
          { key: "scheduled", header: "Scheduled", render: (inspection) => formatDate(inspection.scheduledDate) },
          { key: "status", header: "Status", render: (inspection) => <StatusBadge label={inspection.status} tone={inspection.status === "rejected" ? "rose" : "sky"} /> },
          { key: "grade", header: "Grade", render: (inspection) => <QualityGradeBadge grade={inspection.report?.grade} /> },
          {
            key: "report",
            header: "Report",
            render: (inspection) => (
              <Link className={buttonClasses("secondary")} href={`/officer/inspections/${inspection.id}/report`}>
                Submit
              </Link>
            ),
          },
        ]}
        getRowKey={(inspection) => inspection.id}
        rows={inspections}
      />
    </div>
  );
}
