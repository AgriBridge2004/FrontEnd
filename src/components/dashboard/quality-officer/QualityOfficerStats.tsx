import { Banknote, CalendarDays, ClipboardList, FileText } from "lucide-react";

import type { QualityOfficerStat } from "@/components/dashboard/quality-officer/quality-officer-dashboard.types";
import { cn } from "@/lib/cn";

type QualityOfficerStatsProps = {
  stats: QualityOfficerStat[];
};

const iconMap = {
  assignments: ClipboardList,
  compensation: Banknote,
  inspections: CalendarDays,
  reports: FileText,
};

const accentClasses = {
  green: "bg-emerald-50 text-emerald-700",
  lime: "bg-lime-50 text-lime-700",
  orange: "bg-orange-50 text-orange-600",
};

export function QualityOfficerStats({ stats }: QualityOfficerStatsProps) {
  return (
    <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon];

        return (
          <article
            className="min-h-[104px] rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md"
            key={stat.id}
          >
            <div className="flex items-center gap-3.5">
              <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl", accentClasses[stat.accent])}>
                <Icon className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-[26px] font-black leading-none text-slate-950">{stat.value}</p>
                <p className="mt-1 text-[11px] font-black uppercase tracking-[0.12em] text-slate-500">{stat.label}</p>
                <p className={cn("mt-1.5 text-[11px] font-black", stat.footerTone === "orange" ? "text-orange-600" : "text-emerald-700")}>
                  {stat.footer}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
