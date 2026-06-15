import { DataTable } from "@/components/shared/DataTable";
import { DealStatusBadge } from "@/components/shared/DealStatusBadge";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { api } from "@/lib/api";
import { mockCurrentUserByRole } from "@/lib/auth";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Deal } from "@/types";

export default async function FarmerDealsPage() {
  const deals = await api.deals.listByFarmer(mockCurrentUserByRole.farmer);

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Deals"
        title="My deal contracts"
        description="Contracts, escrow payment status, delivery dates, and dispute states are mocked for now."
      />
      <DataTable<Deal>
        columns={[
          { key: "title", header: "Deal", render: (deal) => <span className="font-semibold text-slate-950">{deal.title}</span> },
          { key: "status", header: "Status", render: (deal) => <DealStatusBadge status={deal.status} /> },
          { key: "value", header: "Value", render: (deal) => formatCurrency(deal.totalValue) },
          { key: "payment", header: "Payment", render: (deal) => <StatusBadge label={deal.payment.status} tone={deal.payment.status === "released" ? "emerald" : "sky"} /> },
          { key: "delivery", header: "Delivery", render: (deal) => formatDate(deal.deliveryDate) },
        ]}
        getRowKey={(deal) => deal.id}
        rows={deals}
      />
    </div>
  );
}
