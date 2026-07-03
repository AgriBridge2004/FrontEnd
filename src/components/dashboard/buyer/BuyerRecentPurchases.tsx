import Link from "next/link";

import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import { DashboardTable } from "@/components/dashboard/shared/DashboardTable";
import type { BuyerRecentPurchase } from "@/components/dashboard/buyer/buyer-dashboard.types";
import { cn } from "@/lib/cn";

type BuyerRecentPurchasesProps = {
  purchases: BuyerRecentPurchase[];
};

const statusLabels: Record<BuyerRecentPurchase["status"], string> = {
  completed: "COMPLETED",
  confirmed: "CONFIRMED",
  "in-progress": "IN PROGRESS",
  pending: "PENDING",
};

const statusClasses: Record<BuyerRecentPurchase["status"], string> = {
  completed: "bg-emerald-100 text-emerald-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  "in-progress": "bg-amber-100 text-amber-700",
  pending: "bg-slate-100 text-slate-600",
};

const productMarks: Record<string, string> = {
  Potatoes: "bg-amber-100 text-amber-700",
  Tomatoes: "bg-red-100 text-red-700",
};

export function BuyerRecentPurchases({ purchases }: BuyerRecentPurchasesProps) {
  return (
    <DashboardCard className="overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-5 py-5">
        <h2 className="text-lg font-black text-slate-900">Recent Purchases</h2>
        <Link className="text-[13px] font-black text-emerald-700 hover:text-emerald-900" href="/buyer/deals">
          View all →
        </Link>
      </div>

      <DashboardTable
        columns={[
          {
            cell: (purchase) => <span className="font-semibold text-slate-900">{purchase.id}</span>,
            header: "DEAL ID",
          },
          {
            cell: (purchase) => purchase.supplier,
            header: "SUPPLIER",
          },
          {
            cell: (purchase) => (
              <span className="inline-flex items-center gap-2">
                <span className={cn("grid size-5 place-items-center rounded-full text-[10px] font-black", productMarks[purchase.product] ?? "bg-emerald-100 text-emerald-700")}>
                  {purchase.product.slice(0, 1)}
                </span>
                {purchase.product}
              </span>
            ),
            header: "PRODUCT",
          },
          {
            cell: (purchase) => <span className="font-black text-slate-900">{purchase.amount.toLocaleString()}</span>,
            header: "AMOUNT",
          },
          {
            cell: (purchase) => (
              <span className={cn("inline-flex rounded-md px-2.5 py-1 text-[10px] font-black", statusClasses[purchase.status])}>
                {statusLabels[purchase.status]}
              </span>
            ),
            header: "STATUS",
          },
        ]}
        getRowKey={(purchase) => purchase.id}
        rows={purchases}
      />
    </DashboardCard>
  );
}
