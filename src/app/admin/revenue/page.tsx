import { DataTable } from "@/components/shared/DataTable";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { api } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Deal, Payment } from "@/types";

type PaymentRow = Payment & {
  dealTitle: string;
};

export default async function AdminRevenuePage() {
  const [stats, deals] = await Promise.all([api.admin.getDashboardStats(), api.deals.list()]);
  const payments: PaymentRow[] = deals.map((deal: Deal) => ({
    ...deal.payment,
    dealTitle: deal.title,
  }));

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Revenue"
        title="Revenue and escrow"
        description="Simulated escrow and platform revenue data are prepared for future payment provider integration."
      />
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Escrow balance" value={formatCurrency(stats.escrowBalance)} helper="Funded mock deals" />
        <StatCard label="Monthly revenue" value={formatCurrency(stats.monthlyRevenue)} helper="Mock platform fees" />
        <StatCard label="Completed deals" value={`${deals.filter((deal) => deal.status === "completed").length}`} helper="Released payments" />
      </section>
      <DataTable<PaymentRow>
        columns={[
          { key: "deal", header: "Deal", render: (payment) => <span className="font-semibold text-slate-950">{payment.dealTitle}</span> },
          { key: "amount", header: "Amount", render: (payment) => formatCurrency(payment.amount) },
          { key: "status", header: "Status", render: (payment) => <StatusBadge label={payment.status} tone={payment.status === "released" ? "emerald" : "sky"} /> },
          { key: "reference", header: "Escrow ref", render: (payment) => payment.escrowReference },
          { key: "created", header: "Created", render: (payment) => formatDate(payment.createdAt) },
        ]}
        getRowKey={(payment) => payment.id}
        rows={payments}
      />
    </div>
  );
}
