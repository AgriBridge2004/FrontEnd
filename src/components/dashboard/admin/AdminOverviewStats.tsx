import { AlertTriangle, Banknote, ChevronRight, ClipboardList, Handshake, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { adminStats } from "@/components/dashboard/admin/admin-dashboard.mock";
import type { AdminStat } from "@/components/dashboard/admin/admin-dashboard.types";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import { cn } from "@/lib/cn";

const statIcons: Record<AdminStat["id"], LucideIcon> = {
  "active-deals": Handshake,
  "active-users": Users,
  "open-disputes": AlertTriangle,
  "pending-inspection": ClipboardList,
  "revenue-summary": Banknote,
};

const accentClasses = {
  blue: {
    card: "",
    icon: "bg-blue-100 text-blue-600",
    link: "text-blue-600",
  },
  green: {
    card: "",
    icon: "bg-emerald-100 text-emerald-700",
    link: "text-emerald-700",
  },
  orange: {
    card: "border-orange-200",
    icon: "bg-orange-100 text-orange-600",
    link: "text-red-600",
  },
  purple: {
    card: "",
    icon: "bg-purple-100 text-purple-600",
    link: "text-purple-600",
  },
};

export function AdminOverviewStats() {
  // TODO: Connect admin overview stats to API.
  return (
    <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
      {adminStats.map((stat) => {
        const Icon = statIcons[stat.id];
        const classes = accentClasses[stat.accent];

        return (
          <DashboardCard className={cn("min-h-[150px] p-4", classes.card)} key={stat.id}>
            <div className="flex items-start justify-between gap-3">
              <span className={cn("grid size-9 place-items-center rounded-full", classes.icon)}>
                <Icon className="size-[18px]" />
              </span>
              <ChevronRight className="size-4 text-slate-300" />
            </div>

            <p className="mt-4 min-h-8 text-[13px] font-black leading-4 text-slate-500">{stat.title}</p>
            <p className={cn("mt-1 text-[22px] font-black leading-none", stat.accent === "orange" ? "text-red-600" : "text-slate-950")}>
              {stat.value}
            </p>
            <p className={cn("mt-4 text-[11px] font-black", stat.trendDirection === "down" ? "text-red-600" : "text-emerald-700")}>
              {stat.trend}
              <span className="ml-2 font-medium text-slate-400">{stat.subtext}</span>
            </p>

            <button className={cn("mt-4 inline-flex items-center gap-1 text-[11px] font-black", classes.link)} type="button">
              View details
              <ChevronRight className="size-3" aria-hidden="true" />
            </button>
          </DashboardCard>
        );
      })}
    </section>
  );
}
