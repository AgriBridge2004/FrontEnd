import { AlertCircle, Banknote, ClipboardList, Truck } from "lucide-react";

import { StatCard } from "@/components/dashboard/shared/StatCard";
import type { BuyerDashboardStats } from "@/components/dashboard/buyer/buyer-dashboard.types";

type BuyerStatsGridProps = {
  stats: BuyerDashboardStats;
};

export function BuyerStatsGrid({ stats }: BuyerStatsGridProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard icon={ClipboardList} title="Active Contracts" trend="+2 this month" value={stats.activeContracts} />
      <StatCard icon={Truck} title="Pending Deliveries" tone="amber" trend="+1 this week" value={stats.pendingDeliveries} />
      <StatCard icon={Banknote} title="Total Spent (SAR)" trend="+12% growth" value={stats.totalSpent.toLocaleString()} />
      <StatCard icon={AlertCircle} linkLabel="view details" title="Open Disputes" tone="red" value={stats.openDisputes} />
    </section>
  );
}
