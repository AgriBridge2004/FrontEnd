import { BadgeCheck, BarChart3, ClipboardCheck, Map } from "lucide-react";

import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import { cn } from "@/lib/cn";

const stats = [
  {
    title: "TOTAL VOLUME",
    value: "42,850",
    suffix: "MT",
    trend: "+12.4%",
    trendTone: "green",
    footer: "vs. 38,120 MT last month",
    icon: BarChart3,
    tone: "green",
  },
  {
    title: "AVG QUALITY GRADE",
    value: "Grade A-",
    status: "Stable",
    progress: 82,
    icon: BadgeCheck,
    tone: "amber",
  },
  {
    title: "COMPLIANCE RATE",
    value: "98.4%",
    trend: "-0.8%",
    trendTone: "red",
    footer: "12 minor infractions detected",
    icon: ClipboardCheck,
    tone: "green",
  },
  {
    title: "REGIONAL INDEX",
    value: "Al Qassim",
    footer: "Highest performing cluster",
    icon: Map,
    tone: "green",
  },
] as const;

const toneClasses = {
  green: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
};

export function QualityOfficerReportsStats() {
  // TODO: Connect reports analytics stats to API.
  return (
    <section className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <DashboardCard className="min-h-[132px] p-4" key={stat.title}>
            <div className="flex items-start justify-between gap-3">
              <span className={cn("grid size-8 place-items-center rounded-lg", toneClasses[stat.tone])}>
                <Icon className="size-4" />
              </span>
              {"trend" in stat && stat.trend ? (
                <span className={cn("text-[11px] font-black", stat.trendTone === "red" ? "text-red-600" : "text-emerald-700")}>
                  {stat.trend}
                </span>
              ) : "status" in stat && stat.status ? (
                <span className="text-[11px] font-black text-emerald-700">{stat.status}</span>
              ) : null}
            </div>

            <p className="mt-4 text-[10px] font-black uppercase tracking-wide text-slate-600">{stat.title}</p>
            <p className="mt-1.5 text-2xl font-black leading-none text-slate-950">
              {stat.value}
              {"suffix" in stat && stat.suffix ? <span className="ml-2 text-xs font-bold text-slate-500">{stat.suffix}</span> : null}
            </p>

            {"progress" in stat && stat.progress ? (
              <div className="mt-3 flex items-center gap-2.5">
                <div className="h-1 flex-1 rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-emerald-800" style={{ width: `${stat.progress}%` }} />
                </div>
                <span className="text-[11px] font-black text-emerald-800">{stat.progress}%</span>
              </div>
            ) : null}

            {"footer" in stat && stat.footer ? <p className="mt-2 text-[11px] font-semibold leading-4 text-slate-600">{stat.footer}</p> : null}
          </DashboardCard>
        );
      })}
    </section>
  );
}
