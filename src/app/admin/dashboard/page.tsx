import Link from "next/link";
import { DataTable } from "@/components/shared/DataTable";
import { DealStatusBadge } from "@/components/shared/DealStatusBadge";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { api } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Deal, Dispute } from "@/types";

export default async function AdminDashboardPage() {
  const [stats, deals, disputes] = await Promise.all([
    api.admin.getDashboardStats(),
    api.deals.list(),
    api.disputes.list(),
  ]);

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="Admin dashboard"
        title="Platform operations"
        description="Monitor users, deal contracts, inspections, disputes, and revenue using mock operational data."
      />
      <section className="grid gap-4 md:grid-cols-4">
        <StatCard label="Active users" value={`${stats.activeUsers}`} helper="Farmers, buyers, officers" />
        <StatCard label="Escrow balance" value={formatCurrency(stats.escrowBalance)} helper="Simulated funds" />
        <StatCard label="Open disputes" value={`${stats.openDisputes}`} helper="Needs review" />
        <StatCard label="Monthly revenue" value={formatCurrency(stats.monthlyRevenue)} helper="Mock platform fees" />
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-950">Recent deals</h2>
          <DataTable<Deal>
            columns={[
              { key: "title", header: "Deal", render: (deal) => <Link className="font-semibold text-emerald-700" href="/admin/deals">{deal.title}</Link> },
              { key: "status", header: "Status", render: (deal) => <DealStatusBadge status={deal.status} /> },
              { key: "value", header: "Value", render: (deal) => formatCurrency(deal.totalValue) },
            ]}
            getRowKey={(deal) => deal.id}
            rows={deals.slice(0, 4)}
          />
        </div>
        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-950">Dispute queue</h2>
          <DataTable<Dispute>
            columns={[
              { key: "reason", header: "Reason", render: (dispute) => <span className="font-semibold text-slate-950">{dispute.reason}</span> },
              { key: "status", header: "Status", render: (dispute) => <StatusBadge label={dispute.status} tone={dispute.status === "resolved" ? "emerald" : "amber"} /> },
              { key: "opened", header: "Opened", render: (dispute) => formatDate(dispute.createdAt) },
            ]}
            getRowKey={(dispute) => dispute.id}
            rows={disputes}
          />
        </div>
      </section>
    </div>
  );
}
