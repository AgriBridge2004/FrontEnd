import { DataTable } from "@/components/shared/DataTable";
import { DealStatusBadge } from "@/components/shared/DealStatusBadge";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { api } from "@/lib/api";
import { mockCurrentUserByRole } from "@/lib/auth";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Deal } from "@/types";

export default async function BuyerDealsPage() {
  const deals = await api.deals.listByBuyer(mockCurrentUserByRole.buyer);

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Deals"
        title="Purchasing contracts"
        description="Track inspections, escrow funding, delivery, and dispute status for buyer-side deals."
      />
      <DataTable<Deal>
        columns={[
          { key: "title", header: "Deal", render: (deal) => <span className="font-semibold text-slate-950">{deal.title}</span> },
          { key: "status", header: "Status", render: (deal) => <DealStatusBadge status={deal.status} /> },
          { key: "value", header: "Value", render: (deal) => formatCurrency(deal.totalValue) },
          { key: "payment", header: "Escrow", render: (deal) => <StatusBadge label={deal.payment.status} tone={deal.payment.status === "released" ? "emerald" : "sky"} /> },
          { key: "delivery", header: "Delivery", render: (deal) => formatDate(deal.deliveryDate) },
        ]}
        getRowKey={(deal) => deal.id}
        rows={deals}
      />
    </div>
  );
}
