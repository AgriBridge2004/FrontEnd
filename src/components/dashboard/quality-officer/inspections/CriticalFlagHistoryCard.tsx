import { AlertCircle } from "lucide-react";

import type { CriticalFlag } from "@/components/dashboard/quality-officer/inspections/quality-officer-inspections.types";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";

type CriticalFlagHistoryCardProps = {
  flags: CriticalFlag[];
  onViewAll: () => void;
};

export function CriticalFlagHistoryCard({ flags, onViewAll }: CriticalFlagHistoryCardProps) {
  return (
    <DashboardCard className="p-5">
      <h2 className="inline-flex items-center gap-2 text-lg font-black text-slate-950">
        <AlertCircle className="size-5 text-red-600" />
        Critical Flag History
      </h2>

      <div className="mt-5 divide-y divide-slate-200">
        {flags.map((flag) => (
          <article className="py-4 first:pt-0 last:pb-0" key={flag.id}>
            <div className="flex gap-3">
              <span className="mt-1 size-2 shrink-0 rounded-full bg-red-600" />
              <div>
                <h3 className="text-xs font-black uppercase text-slate-950">{flag.title}</h3>
                <p className="mt-1 text-sm font-medium leading-5 text-slate-600">{flag.description}</p>
                <p className="mt-2 text-xs font-semibold text-slate-700">{flag.meta}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button
        className="mx-auto mt-6 block text-xs font-black uppercase tracking-[0.18em] text-emerald-800 transition hover:text-emerald-950"
        onClick={onViewAll}
        type="button"
      >
        View All Incidents
      </button>
    </DashboardCard>
  );
}
