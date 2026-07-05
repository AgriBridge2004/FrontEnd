import { BadgeCheck, BarChart3, ClipboardClock, Timer } from "lucide-react";

import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import { cn } from "@/lib/cn";

const stats = [
  {
    label: "TOTAL DISPUTES",
    value: "128",
    footer: "vs. last month",
    trend: "+5%",
    icon: BarChart3,
    tone: "green",
  },
  {
    label: "OPEN / ACTIVE",
    value: "34",
    footer: "Requiring immediate attention",
    smallText: "12 high priority",
    icon: ClipboardClock,
    tone: "amber",
  },
  {
    label: "RESOLUTION RATE",
    value: "94.2%",
    footer: "Last 90 days",
    status: "Stable",
    icon: BadgeCheck,
    tone: "green",
  },
  {
    label: "AVG. RESOLUTION TIME",
    value: "4.2 Days",
    footer: "days improvement",
    trend: "-0.5",
    icon: Timer,
    tone: "slate",
  },
] as const;

const toneClasses = {
  amber: "bg-amber-50 text-amber-700",
  green: "bg-emerald-50 text-emerald-700",
  slate: "bg-slate-100 text-slate-600",
};

export function QualityOfficerDisputesStats() {
  return (
    <section className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <DashboardCard className="min-h-[132px] p-4" key={stat.label}>
            <div className="flex items-start justify-between gap-3">
              <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-slate-600">{stat.label}</p>
              <span className={cn("grid size-9 shrink-0 place-items-center rounded-full", toneClasses[stat.tone])}>
                <Icon className="size-4" />
              </span>
            </div>

            <div className="mt-5 flex flex-wrap items-end gap-2">
              <p className="text-2xl font-black leading-none text-slate-950">{stat.value}</p>
              {"trend" in stat && stat.trend ? (
                <span className={cn("pb-0.5 text-[11px] font-black", stat.trend.startsWith("-") ? "text-emerald-800" : "text-emerald-700")}>
                  {stat.trend}
                </span>
              ) : null}
              {"status" in stat && stat.status ? <span className="pb-0.5 text-[11px] font-black text-emerald-800">{stat.status}</span> : null}
              {"smallText" in stat && stat.smallText ? <span className="pb-0.5 text-[11px] font-black text-red-600">{stat.smallText}</span> : null}
            </div>

            <p className="mt-2 text-[11px] font-semibold leading-4 text-slate-600">{stat.footer}</p>
          </DashboardCard>
        );
      })}
    </section>
  );
}
