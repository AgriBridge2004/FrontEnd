"use client";

import { Calendar, Video } from "lucide-react";

import type { MediationQueueItem } from "@/components/dashboard/quality-officer/disputes/quality-officer-disputes.types";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import { cn } from "@/lib/cn";

type MediationQueueCardProps = {
  items: MediationQueueItem[];
  onViewSchedule: () => void;
};

export function MediationQueueCard({ items, onViewSchedule }: MediationQueueCardProps) {
  return (
    <DashboardCard className="p-4">
      <h2 className="text-base font-black text-slate-950">Mediation Queue</h2>

      <div className="mt-5 grid gap-3">
        {items.map((item, index) => {
          const Icon = item.icon === "video" ? Video : Calendar;
          const isPrimary = index === 0;

          return (
            <article className="flex items-center gap-3" key={item.id}>
              <div
                className={cn(
                  "grid size-12 shrink-0 place-items-center rounded-lg text-center",
                  isPrimary ? "bg-emerald-100 text-emerald-900" : "bg-slate-100 text-slate-700",
                )}
              >
                <span className="block text-[10px] font-black leading-none">{item.month}</span>
                <span className="block text-lg font-black leading-none">{item.day}</span>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-[13px] font-black leading-5 text-slate-950">{item.title}</h3>
                <p className="text-[11px] font-medium text-slate-600">{item.time}</p>
              </div>

              <Icon className="size-4 shrink-0 text-emerald-800" />
            </article>
          );
        })}
      </div>

      <button
        className="mt-5 h-9 w-full rounded-lg border border-emerald-100 bg-white text-xs font-black text-emerald-800 transition hover:border-emerald-200 hover:bg-emerald-50"
        onClick={onViewSchedule}
        type="button"
      >
        View Full Schedule
      </button>
    </DashboardCard>
  );
}
