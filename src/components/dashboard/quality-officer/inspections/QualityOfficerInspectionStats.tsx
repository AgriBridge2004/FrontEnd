import { BadgeCheck, ClipboardCheck, ClipboardList, Zap } from "lucide-react";

import { qualityOfficerInspectionStats } from "@/components/dashboard/quality-officer/inspections/quality-officer-inspections.mock";
import { cn } from "@/lib/cn";

const iconMap = {
  active: Zap,
  pending: ClipboardList,
  quality: BadgeCheck,
  total: ClipboardCheck,
};

const accentClasses = {
  green: "bg-emerald-50 text-emerald-700",
  orange: "bg-orange-50 text-orange-700",
};

export function QualityOfficerInspectionStats() {
  return (
    <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {qualityOfficerInspectionStats.map((stat) => {
        const Icon = iconMap[stat.icon];
        const isPriority = stat.id === "pending-reports";

        return (
          <article
            className="min-h-[128px] rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md"
            key={stat.id}
          >
            <div className="flex items-start justify-between gap-3">
              <span className={cn("grid size-10 place-items-center rounded-xl", accentClasses[stat.accent])}>
                <Icon className="size-5" />
              </span>
              <span className={cn("text-xs font-black", isPriority ? "text-red-600" : "text-emerald-700")}>{stat.badge}</span>
            </div>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.12em] text-slate-500">{stat.label}</p>
            <p className="mt-1 text-3xl font-black leading-none text-slate-950">{stat.value}</p>
          </article>
        );
      })}
    </section>
  );
}
