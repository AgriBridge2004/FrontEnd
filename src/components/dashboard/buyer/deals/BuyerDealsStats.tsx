import { CheckCircle, CircleDollarSign, Clock, ShoppingCart } from "lucide-react";

import { buyerDealStats } from "@/components/dashboard/buyer/deals/buyer-deals.mock";
import { cn } from "@/lib/cn";

const stats = [
  {
    detail: "Ongoing orders",
    icon: ShoppingCart,
    iconClassName: "bg-emerald-50 text-emerald-700",
    label: "Active Deals",
    value: String(buyerDealStats.activeDeals),
  },
  {
    detail: "Waiting for farmer",
    icon: Clock,
    iconClassName: "bg-amber-50 text-amber-600",
    label: "Awaiting Confirmation",
    value: String(buyerDealStats.awaitingConfirmation),
  },
  {
    detail: "Successfully received",
    icon: CheckCircle,
    iconClassName: "bg-indigo-50 text-indigo-600",
    label: "Completed",
    value: String(buyerDealStats.completed),
  },
  {
    detail: "",
    icon: CircleDollarSign,
    iconClassName: "bg-emerald-50 text-emerald-700",
    label: "Total Spent",
    value: `$ ${buyerDealStats.totalSpent.toLocaleString()}`,
  },
];

export function BuyerDealsStats() {
  return (
    <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            className="flex min-h-[112px] items-center gap-5 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md"
            key={stat.label}
          >
            <span className={cn("grid size-14 shrink-0 place-items-center rounded-2xl", stat.iconClassName)}>
              <Icon className="size-6" strokeWidth={2.1} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-5 text-slate-500">{stat.label}</p>
              <div className="mt-1 flex items-end gap-2">
                <p className="text-[28px] font-black leading-none text-slate-950">{stat.value}</p>
                {stat.detail ? <p className="max-w-24 text-xs font-medium leading-4 text-slate-400">{stat.detail}</p> : null}
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
