import Link from "next/link";
import { DataTable } from "@/components/shared/DataTable";
import { PageHeader } from "@/components/shared/PageHeader";
import { QualityGradeBadge } from "@/components/shared/QualityGradeBadge";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { buttonClasses } from "@/components/ui/Button";
import { api } from "@/lib/api";
import { mockCurrentUserByRole } from "@/lib/auth";
import { formatDate } from "@/lib/format";
import type { Inspection } from "@/types";

export default async function OfficerDashboardPage() {
  const inspections = await api.inspections.listByOfficer(mockCurrentUserByRole.quality_officer);
  const pending = inspections.filter(
    (inspection) => inspection.status === "assigned" || inspection.status === "scheduled",
  );

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="Quality officer dashboard"
        title="Inspection assignments"
        description="Review assigned inspections, submit reports, and support escrow release decisions."
      />
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Assigned" value={`${pending.length}`} helper="Needs action" />
        <StatCard label="Submitted" value={`${inspections.filter((item) => item.status === "submitted").length}`} helper="Awaiting review" />
        <StatCard label="Rejected" value={`${inspections.filter((item) => item.status === "rejected").length}`} helper="Quality issues" />
      </section>
      <DataTable<Inspection>
        columns={[
          {
            key: "crop",
            header: "Crop",
            render: (inspection) => (
              <Link className="font-semibold text-emerald-700" href={`/officer/inspections/${inspection.id}`}>
                {inspection.crop}
              </Link>
            ),
          },
          { key: "location", header: "Location", render: (inspection) => inspection.location },
          { key: "date", header: "Scheduled", render: (inspection) => formatDate(inspection.scheduledDate) },
          { key: "status", header: "Status", render: (inspection) => <StatusBadge label={inspection.status} tone={inspection.status === "rejected" ? "rose" : "sky"} /> },
          { key: "grade", header: "Grade", render: (inspection) => <QualityGradeBadge grade={inspection.report?.grade} /> },
          {
            key: "action",
            header: "Action",
            render: (inspection) => (
              <Link className={buttonClasses("secondary")} href={`/officer/inspections/${inspection.id}/report`}>
                Report
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
