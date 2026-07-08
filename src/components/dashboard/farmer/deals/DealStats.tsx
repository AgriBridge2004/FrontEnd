import { CheckSquare, DollarSign, Handshake, Wallet } from "lucide-react";

import { cn } from "@/lib/cn";
import { farmerDealStats } from "@/lib/mock-data";
import type { FarmerDeal } from "@/components/dashboard/farmer/deals/deals-types";

const statIcons = {
  active: Handshake,
  payment: Wallet,
  completed: CheckSquare,
  value: DollarSign,
};

const statIconStyles = {
  green: "bg-emerald-50 text-emerald-700",
  yellow: "bg-amber-50 text-amber-600",
  slate: "bg-slate-50 text-slate-600",
};

type DealStatsProps = {
  deals?: FarmerDeal[];
};

export function DealStats({ deals }: DealStatsProps) {
  const stats = deals
    ? [
        {
          icon: "active",
          label: "Active Deals",
          tone: "green",
          value: String(deals.filter((deal) => deal.status !== "Completed" && deal.status !== "Cancelled").length),
        },
        {
          icon: "payment",
          label: "Pending Payment",
          tone: "yellow",
          value: String(deals.filter((deal) => deal.status === "Pending").length),
        },
        {
          icon: "completed",
          label: "Completed",
          tone: "slate",
          value: String(deals.filter((deal) => deal.status === "Completed").length),
        },
        {
          icon: "value",
          label: "Total Deals",
          tone: "green",
          value: String(deals.length),
        },
      ]
    : farmerDealStats;

  return (
    <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = statIcons[stat.icon as keyof typeof statIcons] ?? Handshake;
        const iconClassName = statIconStyles[stat.tone as keyof typeof statIconStyles] ?? statIconStyles.green;

        return (
          <article
            className="flex min-h-[112px] items-center gap-5 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:bg-emerald-50/30 hover:shadow-md"
            key={stat.label}
          >
            <span className={cn("grid size-14 shrink-0 place-items-center rounded-2xl", iconClassName)}>
              <Icon className="size-6" strokeWidth={2.1} />
            </span>
            <div>
              <p className="text-sm font-semibold leading-5 text-slate-500">{stat.label}</p>
              <p className="mt-1 text-[28px] font-black leading-none text-emerald-800">
                {stat.value}
                {stat.suffix ? <span className="ml-2 text-xs font-bold uppercase tracking-wide text-slate-400">{stat.suffix}</span> : null}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
