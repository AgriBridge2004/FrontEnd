import { DataTable } from "@/components/shared/DataTable";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { api } from "@/lib/api";
import { formatDate, titleCase } from "@/lib/format";
import type { Dispute } from "@/types";

export default async function AdminDisputesPage() {
  const disputes = await api.disputes.list();

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Disputes"
        title="Disputes management"
        description="Placeholder queue for mediation, evidence review, escrow holds, and final admin resolution."
      />
      <DataTable<Dispute>
        columns={[
          { key: "reason", header: "Reason", render: (dispute) => <span className="font-semibold text-slate-950">{dispute.reason}</span> },
          { key: "deal", header: "Deal", render: (dispute) => dispute.dealId },
          { key: "priority", header: "Priority", render: (dispute) => titleCase(dispute.priority) },
          { key: "status", header: "Status", render: (dispute) => <StatusBadge label={dispute.status} tone={dispute.status === "resolved" ? "emerald" : "amber"} /> },
          { key: "created", header: "Opened", render: (dispute) => formatDate(dispute.createdAt) },
        ]}
        getRowKey={(dispute) => dispute.id}
        rows={disputes}
      />
    </div>
  );
}
