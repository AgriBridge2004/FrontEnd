import { AlertTriangle, CheckCircle2, ClipboardList, Clock, RotateCw } from "lucide-react";

import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import { cn } from "@/lib/cn";

const stats = [
  {
    label: "TOTAL ASSIGNMENTS",
    value: "24",
    footer: "All time",
    icon: ClipboardList,
    tone: "green",
  },
  {
    label: "PENDING",
    value: "8",
    footer: "Awaiting action",
    icon: Clock,
    tone: "orange",
  },
  {
    label: "IN PROGRESS",
    value: "6",
    footer: "Currently inspecting",
    icon: RotateCw,
    tone: "blue",
  },
  {
    label: "COMPLETED",
    value: "10",
    footer: "This month",
    icon: CheckCircle2,
    tone: "green",
  },
  {
    label: "OVERDUE",
    value: "2",
    footer: "Require attention",
    icon: AlertTriangle,
    tone: "red",
  },
] as const;

const toneClasses = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-emerald-50 text-emerald-700",
  orange: "bg-orange-50 text-orange-600",
  red: "bg-red-50 text-red-600",
};

export function QualityOfficerAssignmentsStats() {
  // TODO: Connect assignments stats to API.
  return (
    <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <DashboardCard className="min-h-[120px] p-4" key={stat.label}>
            <div className="flex items-start justify-between gap-3">
              <p className="max-w-[116px] text-[11px] font-black uppercase tracking-wide text-slate-400">{stat.label}</p>
              <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg", toneClasses[stat.tone])}>
                <Icon className="size-[18px]" />
              </span>
            </div>
            <p className="mt-3 text-[28px] font-black leading-none text-slate-950">{stat.value}</p>
            <p className="mt-4 text-xs font-medium leading-5 text-slate-400">{stat.footer}</p>
          </DashboardCard>
        );
      })}
    </section>
  );
}
